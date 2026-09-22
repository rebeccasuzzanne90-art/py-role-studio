import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, contactEmail } from '../lib/contact.ts';
const valid = { firstName: 'Test', lastName: 'Enquiry', email: 'test@example.com', company: 'Example Pty Ltd', country: 'AU', phone: '0412 345 678', message: 'Testing validation only.', newsSignup: false };
test('valid enquiry produces the requested recipient, reply address and all details', () => {
 const data = validateContact(valid);
 assert.ok(data);
 const email = contactEmail(data);
 assert.deepEqual(email.to, ['rebeccasuzzanne90@gmail.com']);
 assert.equal(email.replyTo, valid.email);
 assert.match(email.text, /\+61 412 345 678/);
 for (const value of [valid.firstName, valid.lastName, valid.company, valid.message, 'Australia', 'updates: No']) assert.ok(email.text.includes(value));
 assert.match(contactEmail({...data, newsSignup:true}).text, /updates: Yes/);
});
test('rejects invalid input and header injection', () => {
 for (const patch of [{email:'invalid'}, {email:'a@example.com\nBcc:x@y.com'}, {firstName:'Test\r\nInjected'}, {message:' '}, {phone:'abc'}, {phone:'12'}, {country:'XX'}, {newsSignup:'yes'}, {message:'x'.repeat(5001)}, {country:'OTHER',phone:'123456789'}]) assert.equal(validateContact({...valid,...patch}), null);
 for(const value of [null, [], 'hello', 12]) assert.equal(validateContact(value),null);
});
test('preserves international numbers and supports other countries', () => {
 const data=validateContact({...valid,country:'OTHER',phone:'+49 123456789'});
 assert.ok(data);
 assert.match(contactEmail(data).text,/Phone: \+49 123456789/);
});
