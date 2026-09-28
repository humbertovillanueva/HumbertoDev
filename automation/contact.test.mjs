import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, emailBody, emailHtml } from '../lib/contact.ts';
const valid = {name:' Visitor ',email:'visitor@example.com',company:'Example',message:'Hello <script> & welcome',submissionId:'12345678-1234-4123-8123-123456789012'};
test('valid input is trimmed and email body remains plain text',()=>{
 const value=validateContact(valid); assert.ok(value); assert.equal(value.name,'Visitor');assert.match(emailBody(value),/Hello <script> & welcome/);
});
for (const [name,patch] of Object.entries({blank:{name:'  '},invalidEmail:{email:'a@'},headerInjection:{email:'a@example.com\r\nBcc:x@example.com'},oversize:{message:'x'.repeat(1501)},wrongType:{company:22},invalidId:{submissionId:'abc'}})) {
 test(`rejects ${name}`,()=>assert.equal(validateContact({...valid,...patch}),null));
}
test('rejects missing body and arrays',()=>{assert.equal(validateContact(null),null);assert.equal(validateContact([]),null)});

test('branded HTML escapes visitor content and preserves line breaks',()=>{
 const html=emailHtml({...valid,name:'<img src=x onerror=alert(1)>',company:'A & B',message:'<script>alert(1)</script>\nNext line'});
 assert.ok(html.includes('https://humbertovillanueva.dev/icon.png'));
 assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
 assert.ok(html.includes('A &amp; B'));
 assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;<br>Next line'));
 assert.ok(!html.includes('<script>'));
});
