import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactConversionTracker, CONTACT_CONVERSION } from '../lib/contact-conversion.ts';

test('failed, rejected and unconfirmed submissions never emit a conversion', () => {
  const events = [];
  const track = createContactConversionTracker((...args) => events.push(args));
  track(false, { success: true, submissionId: 'failed' });
  track(true, { success: false, submissionId: 'rejected' });
  track(true, { success: true });
  track(true, {});
  assert.deepEqual(events, []);
});

test('one accepted enquiry emits one Ads conversion, deduplicated by receipt', () => {
  const events = [];
  const track = createContactConversionTracker((...args) => events.push(args));
  const result = { success: true, submissionId: 'receipt-1', email: 'private@example.com', message: 'Private content' };
  assert.equal(track(true, result), true);
  assert.equal(track(true, result), false);
  assert.deepEqual(events, [
    ['event', 'generate_lead', { send_to: 'G-T23JJH27FJ', form_name: 'contact_enquiry' }],
    ['event', 'conversion', { send_to: CONTACT_CONVERSION, transaction_id: 'receipt-1' }],
  ]);
  track(true, { success: true, submissionId: 'receipt-2' });
  assert.equal(events.filter(e => e[1] === 'conversion').length, 2);
});

test('an unavailable analytics destination does not fail a successful enquiry', () => {
  let attempts = 0;
  const track = createContactConversionTracker(() => { attempts++; throw new Error('blocked'); });
  assert.doesNotThrow(() => track(true, { success: true, submissionId: 'receipt-3' }));
  assert.equal(attempts, 2);
});
