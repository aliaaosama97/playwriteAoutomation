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


test('UI Controls', async ({page})=> 
  {
  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const dropdown = page.locator("select[class='form-control']");
   const radioButton =  page.locator(".radiotextsty");
   const tearmsCheck = page.locator("#terms");
   const documentLink = page.locator(".blinkingText");
   await dropdown.selectOption("Consultant");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();

   console.log(await radioButton.last().isChecked());
   await expect(radioButton.last()).toBeChecked();
   await tearmsCheck.click();
   await expect(tearmsCheck).toBeChecked();
   await tearmsCheck.uncheck();
   expect(await tearmsCheck.isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class", "blinkingText");


   ///assertion
   //await page.pause();
    //
  });


  test('Child windows hadl', async ({browser})=>
  {
    //to open a new page through a link or any clikable items & split to get the mail
    const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator(".blinkingText");
    const [newPage] = await Promise.all(
    [
      context.waitForEvent('page'),
      documentLink.click(),
    ])
     const text =await newPage.locator(".red").textContent();
     const arrayText = text.split("@");
     const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain)
    await page. pause();
    console.log(await page.locator("#username").textContent());
  });