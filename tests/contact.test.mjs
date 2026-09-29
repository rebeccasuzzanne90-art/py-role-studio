import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, contactEmail } from '../lib/contact.ts';
const valid = { firstName: 'Test', lastName: 'Enquiry', email: 'test@example.com', company: 'Example Pty Ltd', role: 'Payroll Manager', phone: '0412 345 678', message: 'Testing validation only.', newsSignup: false };
test('valid enquiry produces the requested recipient, reply address and all details', () => {
 const data = validateContact(valid);
 assert.ok(data);
 const email = contactEmail(data);
 assert.deepEqual(email.to, ['rebecca@thepayrollstudio.com.au', 'rebeccasuzzanne90@gmail.com']);
 assert.equal(email.replyTo, valid.email);
 assert.match(email.text, /\+61 412 345 678/);
 for (const value of [valid.firstName, valid.lastName, valid.company, valid.message, valid.role, 'updates: No']) assert.ok(email.text.includes(value));
 assert.match(contactEmail({...data, newsSignup:true}).text, /updates: Yes/);
});
test('rejects invalid input and header injection', () => {
 for (const patch of [{email:'invalid'}, {email:'a@example.com\nBcc:x@y.com'}, {firstName:'Test\r\nInjected'}, {message:' '}, {phone:'abc'}, {phone:'12'}, {newsSignup:'yes'}, {message:'x'.repeat(5001)}]) assert.equal(validateContact({...valid,...patch}), null);
 for(const value of [null, [], 'hello', 12]) assert.equal(validateContact(value),null);
});
test('preserves international numbers and supports other countries', () => {
 const data=validateContact({...valid,country:'OTHER',phone:'+49 123456789'});
 assert.ok(data);
 assert.match(contactEmail(data).text,/Phone: \+49 123456789/);
});

test('company, role and phone are optional, including the untouched +61 prefix', () => {
 for (const phone of ['', '+61 ', undefined]) {
  const data = validateContact({...valid, company: undefined, role: undefined, phone});
  assert.ok(data);
  assert.equal(data.phone, '');
  assert.match(contactEmail(data).text, /Phone: Not provided/);
 }
 for (const field of ['firstName', 'lastName', 'email', 'message']) {
  assert.equal(validateContact({...valid, [field]: ''}), null);
 }
});

test('full-name enquiries preserve single names and multi-part names without requiring a surname', () => {
 for (const name of ['Rebecca', '  Ana María de la Cruz  ']) {
  const data=validateContact({name,email:'person@example.com',message:'Help with payroll risk.',newsSignup:false});
  assert.ok(data);
  assert.equal(data.firstName,name.trim());
  assert.equal(data.lastName,'');
  assert.equal(contactEmail(data).subject,`Payroll Studio enquiry: ${name.trim()}`);
  assert.ok(contactEmail(data).text.includes(`Name: ${name.trim()}`));
 }
});
test('rejects invalid full names even when legacy names are supplied', () => {
 for (const name of ['', '  ', 123, 'A\nB', 'A\rB', 'x'.repeat(255)]) {
  assert.equal(validateContact({...valid,name}),null);
 }
});
