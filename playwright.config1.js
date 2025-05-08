// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1, //retry the tests 
  workers: 1, //only one test file will run without it all files will run paraller 
  timeout: 30 *1000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  //reports
  reporter: 'html',
  use: {
    browserName: 'webkit',
    headless : true,
    //to create screen shoot for everystep 
    screenshot: 'on',
    //to create reports for each step 
    trace: 'retain-on-failure'


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },


 
});

