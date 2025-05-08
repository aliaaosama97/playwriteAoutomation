// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 *1000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  //reports
  reporter: 'html',
  projects: [
    {
      name : 'safari',
      use: {
        browserName: 'webkit',
        headless : true,
        //to create screen shoot for everystep 
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        //to create reports for each step 
        trace: 'retain-on-failure',
        ...devices['iPhone 15']
    
    
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      
      },
    },
    {
      name : 'chrome',
      use: {
        browserName: 'chromium',
        headless : false,
        //to create screen shoot for everystep 
        screenshot: 'on',
        //to create reports for each step 
        trace: 'retain-on-failure',
        //viewport : {width:720, height:720} change the windows size to test it on mobile 
    
    
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      
      },

    }

  ]
  


 
});

