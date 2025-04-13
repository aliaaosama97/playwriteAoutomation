const {test, expect} = require('@playwright/test');
const { Locator } = require('puppeteer');


//chapter 9 
test("Popup validations",async ({page}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("http://google.com");
  // await page.goBack();
  // await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  page.on("dialog", dialog => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();

  //switch between frames on the same page 

  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
})