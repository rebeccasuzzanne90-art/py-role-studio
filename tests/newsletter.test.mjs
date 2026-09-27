import assert from 'node:assert/strict';
import { test } from 'node:test';
import { saveNewsletterSubscriber, validateSubscriber } from '../lib/newsletter.ts';

const subscriber = { name: 'Alex', email: 'alex@example.com' };
const ok = (data) => ({ data, error: null });
const failure = (statusCode) => ({ data: null, error: { statusCode } });
function clientWith({ existing = failure(404), create = ok({ id: 'contact-1' }), send = ok({ id: 'email-1' }), update = ok({ id: 'contact-1' }) } = {}) {
  const calls = [];
  return {
    calls,
    contacts: {
      get: async (...args) => { calls.push(['get', ...args]); return existing; },
      create: async (...args) => { calls.push(['create', ...args]); return create; },
      update: async (...args) => { calls.push(['update', ...args]); return update; },
    },
    emails: { send: async (...args) => { calls.push(['send', ...args]); return send; } },
  };
}

test('normalises email and rejects invalid or injected input', () => {
  assert.deepEqual(validateSubscriber(' Alex ', ' ALEX@example.com '), subscriber);
  for (const email of ['', 'broken', 'alex@example.com\nBcc: other@example.com', 'a'.repeat(255) + '@example.com']) {
    assert.equal(validateSubscriber('', email), null);
  }
  assert.equal(validateSubscriber(null, subscriber.email), null);
});

test('saves contact before notifying Rebecca with subscriber as reply-to', async () => {
  const client = clientWith();
  await saveNewsletterSubscriber(subscriber, client, 'studio@example.com');
  assert.deepEqual(client.calls.map(c => c[0]), ['get', 'create', 'send']);
  assert.deepEqual(client.calls[1][1], { email: subscriber.email, firstName: 'Alex', unsubscribed: false });
  assert.deepEqual(client.calls[2][1].to, ['rebeccasuzzanne90@gmail.com']);
  assert.equal(client.calls[2][1].replyTo, subscriber.email);
  assert.equal(client.calls[2][2].idempotencyKey, 'newsletter-notification/contact-1');
});

test('send-only key fails without sending notification or reporting success', async () => {
  const client = clientWith({ existing: failure(401) });
  await assert.rejects(saveNewsletterSubscriber(subscriber, client, 'studio@example.com'));
  assert.deepEqual(client.calls.map(c => c[0]), ['get']);
});

test('contact creation failure prevents notification', async () => {
  const client = clientWith({ create: failure(500) });
  await assert.rejects(saveNewsletterSubscriber(subscriber, client, 'studio@example.com'));
  assert.equal(client.calls.some(c => c[0] === 'send'), false);
});

test('repeat signup reuses contact and same notification idempotency key', async () => {
  const client = clientWith({ existing: ok({ id: 'contact-1', unsubscribed: false }) });
  await saveNewsletterSubscriber({ name: '', email: subscriber.email }, client, 'studio@example.com');
  assert.deepEqual(client.calls.map(c => c[0]), ['get', 'send']);
  assert.equal(client.calls[1][2].idempotencyKey, 'newsletter-notification/contact-1');
});

test('explicit resubscription updates unsubscribed contact', async () => {
  const client = clientWith({ existing: ok({ id: 'contact-1', unsubscribed: true }) });
  await saveNewsletterSubscriber(subscriber, client, 'studio@example.com');
  assert.deepEqual(client.calls.map(c => c[0]), ['get', 'update', 'send']);
  assert.equal(client.calls[1][1].unsubscribed, false);
});

test('notification failures remain retryable instead of false success', async () => {
  const client = clientWith({ send: failure(500) });
  await assert.rejects(saveNewsletterSubscriber(subscriber, client, 'studio@example.com'));
});

test('retries transient Resend rate limits', async () => {
  const client = clientWith();
  let attempts = 0;
  client.contacts.get = async () => ++attempts === 1 ? failure(429) : failure(404);
  await saveNewsletterSubscriber(subscriber, client, 'studio@example.com');
  assert.equal(attempts, 2);
});
