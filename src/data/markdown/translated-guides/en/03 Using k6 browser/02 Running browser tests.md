---
title: 'Running browser tests'
excerpt: 'Follow along to learn how to run a browser test, interact with elements on the page, wait for page navigation, write assertions and run both browser-level and protocol-level tests in a single script.'
---

Follow along to learn how to:

1. Run a test
2. Interact with elements on your webpage
3. Wait for page navigation
4. Run both browser-level and protocol-level tests in a single script

<Blockquote mod="note" title="">

With these example snippets, you'll run the test locally with your machine's resources. The browser module is not available within k6 cloud as of yet.

</Blockquote>

## Run a test

To run a simple local script:

1. Copy the following code, paste it into your favorite editor, and save it as `script.js`:

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { chromium } from 'k6/experimental/browser';

  export default async function () {
    const browser = chromium.launch({
      headless: false,
      timeout: '60s', // Or whatever time you want to define
    });
    const page = browser.newPage();

    try {
      await page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
      page.screenshot({ path: 'screenshot.png' });
    } finally {
      page.close();
      browser.close();
    }
  }
  ```

  </CodeGroup>

  The preceding code imports the `chromium` [BrowserType](/javascript-api/k6-experimental/browser/browsertype/) (currently the only available `BrowserType` implementation), and uses its `launch` method to start up a Chromium [Browser](/javascript-api/k6-experimental/browser/) process. Two parameters are passed to it. One is the `headless` parameter with the value `false` so you can see the browser launching, and `timeout` parameter with the value `60s` which will be the timeout used for various actions and navigation. For a full list of parameters that you can pass, check out the documentation for [BrowserType.launch()](/javascript-api/k6-experimental/browser/browsertype/launch/).
  
  After it starts, you can interact with it using the [browser-level APIs](/javascript-api/k6-experimental/browser/#browser-level-apis). This example visits a test URL, waits until the network is idle and takes a screenshot of the page. Afterwards, it closes the page and the browser.

  <Blockquote mod="note" title="">

  To provide rough compatibility with the Playwright API, the browser module API is also being converted from synchronous to asynchronous. `page.goto()` is now asynchronous so `await` keyword is used to deal with the asynchronous nature of the operation.

  </Blockquote>

2. Then, run the test on your terminal with this command:

  <CodeGroup labels={["CLI"]}>

  ```bash
  $ K6_BROWSER_ENABLED=true k6 run script.js
  ```

  </CodeGroup>

## Interact with elements on your webpage

You can use `page.locator()` and pass in the element's selector you want to find on the page. `page.locator()` will create and return a [Locator](/javascript-api/k6-experimental/browser/locator/) object, which you can later use to interact with the element.

To find out which selectors the browser module supports, check out [Selecting Elements](/using-k6-browser/selecting-elements/).

<Blockquote mod="note" title="">

You can also use `page.$()` instead of `page.locator()`. You can find the differences between `page.locator()` and `page.$` in the [Locator API documentation](/javascript-api/k6-experimental/browser/locator/).

</Blockquote>

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    // Enter login credentials
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    page.screenshot({ path: 'screenshot.png' });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>

The preceding code creates and returns a Locator object with the selectors for both login and password passed as arguments. 

Within the Locator API, various methods such as `type()` can be used to interact with the elements. The `type()` method types a text to an input field. 

## Asynchronous operations

Since many browser operations happen asynchronously, and to follow the Playwright API more closely, we are working on migrating most of the browser module methods to be asynchronous as well.

At the moment, methods such as `page.goto()`, `page.waitForNavigation()` and `Element.click()` return [JavaScript promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), and scripts must be written to handle this properly.

To avoid timing errors or other race conditions in your script, if you have actions that load up a different page, you need to make sure that you wait for that action to finish before continuing.

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    await Promise.all([page.waitForNavigation(), page.locator('input[type="submit"]').click()]);

    check(page, {
      header: page.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>

The preceding code uses `Promise.all([])` to wait for the two promises to be resolved before continuing. Since clicking the submit button causes page navigation, `page.waitForNavigation()` is needed because the page won't be ready until the navigation completes. This is required because there can be a race condition if these two actions don't happen simultaneously. 

Then, you can use [`check`](/javascript-api/k6/check/) from the k6 API to assert the text content of a specific element. Finally, you close the page and the browser.

## Run both browser-level and protocol-level tests in a single script

The real power of the browser module shines when it’s combined with the existing features of k6. A common scenario that you can try is to mix a smaller subset of browser-level tests with a larger protocol-level test which can simulate how your website responds to various performance events. This approach is what we refer to as [hybrid load testing](/testing-guides/load-testing-websites/#hybrid-load-testing) and provides advantages such as:

- testing real user flows on the frontend while generating a higher load in the backend
- measuring backend and frontend performance in the same test execution
- increased collaboration between backend and frontend teams since the same tool can be used

To run a browser-level and protocol-level test concurrently, you can use [scenarios](/using-k6/scenarios/). 

<Blockquote mod="note" title="">

  Keep in mind that there is an additional performance overhead when it comes to spinning up a browser VU and that the resource usage will depend on the system under test.

  </Blockquote>

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browser',
      vus: 1,
      duration: '10s',
    },
    news: {
      executor: 'constant-vus',
      exec: 'news',
      vus: 20,
      duration: '1m',
    },
  },
};

export async function browser() {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php', { waitUntil: 'networkidle' });

    page.locator('#checkbox1').check();

    check(page, {
      'checkbox is checked':
        page.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
    });
  } finally {
    page.close();
    browser.close();
  }
}

export function news() {
  const res = http.get('https://test.k6.io/news.php');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
```

</CodeGroup>

The preceding code contains two scenarios. One for the browser-level test called `browser` and one for the protocol-level test called `news`. Both scenarios are using the [constant-vus executor](/using-k6/scenarios/executors/constant-vus/) which introduces a constant number of virtual users to execute as many iterations as possible for a specified amount of time. 

Since it's all in one script, this allows for greater collaboration amongst teams.