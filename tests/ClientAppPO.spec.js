const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const {POManager} = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


test(`Client App login for ${dataset.productName}`, async ({page})=>
{
  const poManager = new POManager(page);
   //js file- Login js, DashboardPage
    const username = "anshika@gmail.com";
    const password = "Iamking@000"
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataset.username,dataset.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(dataset.productName);
   await cartPage.Checkout();

   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind","India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

   //Zara Coat 4


});


customtest.only('Client App login', async ({page,testDataForOrder})=>
  {
    const poManager = new POManager(page);
     //js file- Login js, DashboardPage
      const username = "anshika@gmail.com";
      const password = "Iamking@000"
      const productName = 'Zara Coat 4';
      const products = page.locator(".card-body");
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(testDataForOrder.productName);
      await dashboardPage.navigateToCart();
  
     const cartPage = poManager.getCartPage();
     await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
     await cartPage.Checkout();
  
     const ordersReviewPage = poManager.getOrdersReviewPage();
     await ordersReviewPage.searchCountryAndSelect("ind","India");
     const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  
     //Zara Coat 4
  
  
  });





