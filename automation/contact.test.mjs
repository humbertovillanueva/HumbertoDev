import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, emailBody } from '../lib/contact.ts';
const valid = {name:' Visitor ',email:'visitor@example.com',company:'Example',message:'Hello <script> & welcome',submissionId:'12345678-1234-4123-8123-123456789012'};
test('valid input is trimmed and email body remains plain text',()=>{
 const value=validateContact(valid); assert.ok(value); assert.equal(value.name,'Visitor');assert.match(emailBody(value),/Hello <script> & welcome/);
});
for (const [name,patch] of Object.entries({blank:{name:'  '},invalidEmail:{email:'a@'},headerInjection:{email:'a@example.com\r\nBcc:x@example.com'},oversize:{message:'x'.repeat(1501)},wrongType:{company:22},invalidId:{submissionId:'abc'}})) {
 test(`rejects ${name}`,()=>assert.equal(validateContact({...valid,...patch}),null));
}
test('rejects missing body and arrays',()=>{assert.equal(validateContact(null),null);assert.equal(validateContact([]),null)});
