---
title: 'Write your first browser test'
description: 'Learn how to write your first k6 browser test script.'
weight: 100
---

# Write your first browser test

k6 browser tests allow you to simulate real user interactions with web applications, such as clicking buttons, filling out forms, and verifying page content. This helps you test not only backend performance, but also frontend reliability and user experience.

In this guide, you'll learn how to write your first k6 browser test script using the browser module.

## Before you begin

To write and run k6 browser tests, you'll need:

- A basic knowledge of JavaScript or TypeScript.
- A code editor to write your scripts, such as [Visual Studio Code](https://code.visualstudio.com/) or [JetBrains editors](https://www.jetbrains.com/).
- A Chromium-based browser (such as Google Chrome) installed locally.
- [Install k6](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6/) on your machine.

## Basic structure of a k6 browser test

For k6 to be able to interpret and execute your test, every k6 script follows a common structure, revolving around a few core components:

1. **Default function**: This is where the test logic resides. It defines what your test will do and how it will behave during execution. It should be exported as the default function in your script. For browser scripts, it's written as an `async` function to handle browser actions.
1. **Imports**: You can import additional [k6 modules](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/) or [JavaScript libraries (jslibs)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/) to extend your script’s functionality, such as making HTTP requests. Note that k6 is not built upon Node.js, and instead uses its own JavaScript runtime. Compatibility with some npm modules may vary.
1. **Options**: Enable you to configure the execution of the test, such as defining the number of virtual users, the test duration, or setting performance thresholds. Refer to [Options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/) for more details.
1. **Lifecycle operations (optional)**: Because your test might need to run code before and/or after the execution of the test logic, such as parsing data from a file, or download an object from Amazon S3, [lifecycle operations](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle/) allow you to write code, either as predefined functions or within specific code scopes, that will be executed at different stages of the test execution.

## Key concepts

To write k6 browser tests, its important to understand a few key concepts:

1. **Browser type**: A browser script must have the `options.browser.type` field set in the `options` object. For example:

   ```js
   export const options = {
     scenarios: {
       ui: {
         executor: 'shared-iterations',
         options: {
           browser: {
             type: 'chromium',
           },
         },
       },
     },
   };
   ```

   If that option isn't set, k6 will throw an error when trying to execute your script.

1. **Asynchronous operations**: Browser interactions (like navigation and clicks) are asynchronous, so your test must use `async`/`await`. Refer to [Asynchronous operations](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/how-to-write-browser-tests/asynchronous-operations/) for more details.
1. **Locators**: The Locator API can be used to find and interact with elements on a page, such as buttons or headers. There are other ways to find elements, such as using the `Page.$()` method, but the Locator API provides several benefits, including finding an element even if the underlying frame navigates, and working with dynamic web pages and SPAs such as React.

## Write your first browser test script

Let's walk through creating a browser test that loads a page, clicks a button, takes a screenshot, and checks for recommendations.

1. **Create a test file**: A test file can be named anything you like, and live wherever you see fit in your project, but it should have a `.js` or `.ts` extension. In this example, create a JavaScript file named `my-first-browser-test.js`. Open your terminal and run the following command:

   ```bash
   touch my-first-browser-test.js
   ```

1. **Import k6 modules**: Import the necessary modules for HTTP requests, browser automation, and utility functions.

   <!-- md-k6:skip -->

   ```js
   import http from 'k6/http';
   import exec from 'k6/execution';
   import { browser } from 'k6/browser';
   import { sleep, check, fail } from 'k6';
   ```

1. **Define options**: Configure the `options` object to use the browser executor and specify the browser type.

   <!-- md-k6:skip -->

   ```js
   export const options = {
     scenarios: {
       ui: {
         executor: 'shared-iterations',
         vus: 1,
         iterations: 1,
         options: {
           browser: {
             type: 'chromium',
           },
         },
       },
     },
   };
   ```

1. **Setup function**: Create a `setup` function to check if the target site is available, before running the main test logic.

   <!-- md-k6:skip -->

   ```typescript
   export function setup() {
     let res = http.get(BASE_URL);
     if (res.status !== 200) {
       exec.test.abort(`Got unexpected status code ${res.status} when trying to setup. Exiting.`);
     }
   }
   ```

1. **Default function**: The default exported function is the entry point for the test script. It will be executed repeatedly the number of times you define with the `iterations` option. In this function, using `async`/`await`, add the functions that open a browser page, interacts with the elements on the page, takes a screenshot, and performs a `check`:

   <!-- md-k6:skip -->

   ```typescript
   export default async function () {
     let checkData;
     const page = await browser.newPage();

     try {
       await page.goto(BASE_URL);

       checkData = await page.locator('h1').textContent();
       check(page, {
         header: checkData === 'Looking to break out of your pizza routine?',
       });

       await page.locator('//button[. = "Pizza, Please!"]').click();
       await page.waitForTimeout(500);

       await page.screenshot({ path: 'screenshot.png' });

       checkData = await page.locator('div#recommendations').textContent();
       check(page, {
         recommendation: checkData !== '',
       });
     } catch (error) {
       fail(`Browser iteration failed: ${error.message}`);
     } finally {
       await page.close();
     }

     sleep(1);
   }
   ```

Your final script should look like this:

```js
import http from 'k6/http';
import exec from 'k6/execution';
import { browser } from 'k6/browser';
import { sleep, check, fail } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export function setup() {
  const res = http.get(BASE_URL);
  if (res.status !== 200) {
    exec.test.abort(`Got unexpected status code ${res.status} when trying to setup. Exiting.`);
  }
}

export default async function () {
  let checkData;
  const page = await browser.newPage();

  try {
    await page.goto(BASE_URL);

    checkData = await page.locator('h1').textContent();
    check(page, {
      header: checkData === 'Looking to break out of your pizza routine?',
    });

    await page.locator('//button[. = "Pizza, Please!"]').click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'screenshot.png' });

    checkData = await page.locator('div#recommendations').textContent();
    check(page, {
      recommendation: checkData !== '',
    });
  } catch (error) {
    fail(`Browser iteration failed: ${error.message}`);
  } finally {
    await page.close();
  }

  sleep(1);
}
```

## Extending your browser test

Once you're comfortable with the basics, you can extend your browser test by:

- Simulating more complex user flows (multiple pages, form submissions, etc.).
- Adding more checks and assertions to validate UI elements and content.
- Creating hybrid performance tests to test both the frontend and backend simultaneously.

Refer to the [Using k6 browser](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/) section for more details about the browser module and its features.

## Next steps

Now that you've written your first k6 browser test script, it's time to run it. Refer to [Running k6 browser tests](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/running-browser-tests/) for instructions on executing your script and analyzing results.
