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

  test('Client App login', async ({page}) => {
    const email = "anshika@gmail.com";
    const productName = "ZARA COAT 3"
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);


   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   //checkout page
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    //find the order in orders page assig
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();


   await page.pause();
  });

  test('@Webst Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
  
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  
    await page.getByRole("button",{name :"Checkout"}).click();
  
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
  
    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
  
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
 });
 // how to select in a calender 
 test("Calendar validations",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
})