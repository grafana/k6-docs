---
title: 'Running xk6-browser'
excerpt: 'Follow along to learn how to run xk6-browser test, interact with elements on the page, wait for page navigation, write assertions and run both browser-level and protocol-level in a single script.'
---

Follow along to learn how to:

1. Run a test
2. Interact with elements on your webpage
3. Wait for page navigation
4. Run both browser-level and protocol-level test in a single script

<Blockquote mod="note" title="">

With these example snippets, you'll run the test locally with your machine's resources. xk6-browser is not available within k6 cloud as of yet.

</Blockquote>

## Run a test

To run a simple local script:

1. Follow the [Installation Guidelines](/javascript-api/xk6-browser/get-started/installation/) and make sure there is a binary named `xk6-browser` in your current working directory.

2. Copy the following code, paste it into your favorite editor, and save it as `script.js`:

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { chromium } from 'k6/x/browser';

  export default function () {
    const browser = chromium.launch({ headless: false });
    const page = browser.newPage();

    page
      .goto('https://test.k6.io/', { waitUntil: 'networkidle' })
      .then(() => {
        page.screenshot({ path: 'screenshot.png' });
      })
      .finally(() => {
        page.close();
        browser.close();
      });
  }
  ```

  </CodeGroup>

  The preceding code imports the `chromium` [BrowserType](/javascript-api/xk6-browser/browsertype) (currently the only available `BrowserType` implementation), and uses its `launch` method to start up a Chromium [Browser](/javascript-api/xk6-browser/browser) process. After it starts, you can interact with it using the [browser-level APIs](/javascript-api/xk6-browser/#browser-level-apis). This example visits a test URL, waits until the network is idle and takes a screenshot of the page. Afterwards, it closes the page and the browser.

  <Blockquote mod="note" title="">

  To provide rough compatibility with the Playwright API, the xk6-browser API is also being converted from synchronous to asynchronous. `page.goto()` is now asynchronous so `.then()` is used to deal with the asynchronous nature of the operation.

  </Blockquote>

3. Then, run xk6-browser on your terminal with this command:

  <CodeGroup labels={["CLI"]}>

  ```bash
  $ ./xk6-browser run script.js
  ```

  </CodeGroup>

  <Blockquote mod="note" title="">

  The `./` prefix tells your shell to run the binary located in the current working directory. This is required on macOS and Linux, but not on the Windows `cmd.exe` shell. On PowerShell, specify `.\xk6-browser` instead.

  If you installed xk6-browser with a system package, or placed the binary in a directory that's part of your `$PATH` environment variable, you can omit the `./` or `.\` prefixes.

  </Blockquote>

## Interact with elements on your webpage

You can use `page.locator()` and pass in the element's selector you want to find on the page. `page.locator()` will create and return a [Locator](/javascript-api/xk6-browser/locator/) object, which you can later use to interact with the element.

To find out which selectors xk6-browser supports, check out [Selecting Elements](/javascript-api/xk6-browser/get-started/selecting-elements/).

<Blockquote mod="note" title="">

You can also use `page.$()` instead of `page.locator()`. You can find the differences between `page.locator()` and `page.$` in the [Locator API documentation](/javascript-api/xk6-browser/locator/).

</Blockquote>

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  page
    .goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' })
    .then(() => {
      // Enter login credentials
      page.locator('input[name="login"]').type('admin');
      page.locator('input[name="password"]').type('123');

      page.screenshot({ path: 'screenshot.png' });
    })
    .finally(() => {
      page.close();
      browser.close();
    });
}
```

</CodeGroup>

The preceding code creates and returns a Locator object with the selectors for both login and password passed as arguments. 

Within the Locator API, various methods such as `type()` can be used to interact with the elements. The `type()` method types a text to an input field. 

## Asynchronous operations

As explained previously, the k6 API is synchronous. However, since many browser operations happen asynchronously, and in order to follow the Playwright API more closely, we are working on migrating most xk6-browser methods to be asynchronous as well.

At the moment, methods such as `page.goto()`, `page.waitForNavigation()` and `Element.click()` return [JavaScript promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), and scripts must be written to handle this properly.

To avoid timing errors or other race conditions in your script, if you have actions that load up a different page, you need to make sure that you wait for that action to finish before continuing.

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
import { check } from 'k6';
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  page
    .goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' })
    .then(() => {
      // Enter login credentials and login
      page.locator('input[name="login"]').type('admin');
      page.locator('input[name="password"]').type('123');
      
      // Wait for asynchronous operations to complete
      return Promise.all([
        page.waitForNavigation(),
        page.locator('input[type="submit"]').click(),
      ]).then(() => {
        check(page, {
          'header': page.locator('h2').textContent() == 'Welcome, admin!',
        });
      }).finally(() => {
        page.close();
        browser.close();
      });
    });
}
```

</CodeGroup>

The preceding code uses `Promise.all([])` to wait for the two promises to be resolved before continuing. Since clicking the submit button causes page navigation, `page.waitForNavigation()` is needed because the page won't be ready until the navigation completes. This is required because there can be a race condition if these two actions don't happen simultaneously. 

Then, you can use [`check`](/javascript-api/k6/check/) from the k6 API to assert the text content of a specific element. Finally, you close the page and the browser.

## Run both browser-level and protocol-level in a single script

The real power of xk6-browser shines when it’s combined with the existing features of k6. A common scenario that you can try is to mix a smaller subset of browser-level tests with a larger protocol-level test which can simulate how your website responds to various performance events.

To run a browser-level and protocol-level test concurrently, you can use [scenarios](/using-k6/scenarios/). 

<Blockquote mod="note" title="">

  Keep in mind that there is an additional performance overhead when it comes to spinning up a browser VU and that the resource usage will depend on the system under test.

  </Blockquote>

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/x/browser';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    messages: {
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

export function browser() {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  page
    .goto('https://test.k6.io/browser.php', { waitUntil: 'networkidle' })
    .then(() => {
      page.locator('#checkbox1').check();

      check(page, {
        'checkbox is checked': (p) =>
          p.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
      });
    })
    .finally(() => {
      page.close();
      browser.close();
    });
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
