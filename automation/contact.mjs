import { chromium, expect } from 'playwright/test';
const base=process.env.PREVIEW_URL||'http://localhost:3016';
const browser=await chromium.launch();
try {
 const page=await browser.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/contact', route => route.request().method() === 'GET' ? route.fulfill({contentType:'application/json',body:'{"enabled":true}'}) : route.continue());
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await page.getByLabel('YOUR NAME').fill('Test Visitor');
 await page.getByLabel('YOUR EMAIL').fill('visitor@example.com');
 await page.getByLabel('MESSAGE *',{exact:true}).fill('Contact delivery test');
 let calls=0; const ids=[];
 await page.route('**/api/contact',async route=>{calls++;ids.push(route.request().postDataJSON().submissionId);await route.fulfill({status:calls===1?503:200,contentType:'application/json',body:calls===1?'\u007b"error":"Service unavailable. Please retry."\u007d':'\u007b"ok":true\u007d'});});
 await page.getByRole('button',{name:'SEND MESSAGE',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Service unavailable');
 await expect(page.getByLabel('MESSAGE *',{exact:true})).toHaveValue('Contact delivery test');
 await page.getByRole('button',{name:'SEND MESSAGE',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('accepted for delivery');
 expect(ids[0]).toBe(ids[1]);
 await expect(page.getByLabel('MESSAGE *',{exact:true})).toHaveValue('');
 const valid={name:'Visitor',email:'visitor@example.com',company:'',message:'Testing validation',website:'',submissionId:'12345678-1234-4123-8123-123456789012'};
 const response=await page.request.post(base+'/api/contact',{headers:{Origin:base},data:valid});
 expect(response.status()).toBe(503); // Test server has sending disabled; never sends live email.
 expect((await page.request.post(base+'/api/contact',{headers:{Origin:'https://wrong.example'},data:valid})).status()).toBe(403);
 expect((await page.request.post(base+'/api/contact',{headers:{Origin:base},data:{...valid,email:'invalid'}})).status()).toBe(400);
 expect((await page.request.post(base+'/api/contact',{headers:{Origin:base},data:{...valid,website:'spam'}})).status()).toBe(400);
 expect((await page.request.post(base+'/api/contact',{headers:{Origin:base},data:{...valid,message:'x'.repeat(13000)}})).status()).toBe(413);
 expect(errors).toEqual([]);
 console.log('Contact retry, idempotency, preserved drafts, success reset, and API rejection checks passed.');
}finally{await browser.close();}
