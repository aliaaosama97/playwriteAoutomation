const {test, expect} = require('@playwright/test');
const { Locator } = require('puppeteer');


test('Browser Context Playeright test', async ({browser})=> 
{
   
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //css
  await userName.fill("rahulshetty");
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
 console.log(await page.locator("[style*='block']").textContent());
 await expect(page.locator("[style*='block']")).toContainText('Incorrect');

 //to clear a typebox
 await userName.fill("");
 await userName.fill("rahulshettyacademy");
 await signIn.click();
 await page.waitForLoadState('networkidle');
  console.log(await cardTitles.first().waitFor());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
  
});


test.only('UI Controls', async ({page})=> 
  {
  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const dropdown = page.locator("select[class='form-control']");
   await dropdown.selectOption("Consultant");
   await page.locator('document.querySelector("label:nth-child(2)")')
   await page.pause();

  });