---
title: 'Running xk6-browser'
excerpt: 'Follow along to learn how to run xk6-browser test, interact with elements on the page, wait for page navigation, write assertions and run both browser-level and protocol-level in a single script.'
---

Follow along to learn how to:

1. Run a test
2. Interact with elements on your webpage
3. Wait for page navigation
4. Write assertions
5. Run both browser-level and protocol-level test in a single script

> With these example snippets, you'll run the test locally with your machine's resources. xk6-browser is not available within k6 cloud as of yet.

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

    page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    page.screenshot({ path: 'messages.png' });

    page.close();
    browser.close();
  }
  ```

  </CodeGroup>

  The preceding code imports the `chromium` [BrowserType](/javascript-api/xk6-browser/browsertype), and use its `launch` method to start up a Chromium [Browser](/javascript-api/xk6-browser/browser) process (which is currently the only available `BrowserType`). After it starts, you can interact with it using the [browser-level APIs](#browser-level-apis). This example visits a test URL, waits until the network is idle and takes a screenshot of the page. Afterwards, it closes the page and the browser.

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

You can use `page.locator()` and pass in the element's selector you want to find on the page. `page.locator()` will create and return a [Locator](https://k6.io/docs/javascript-api/xk6-browser/locator/) object, which you can later use to interact with the element.

<Blockquote mod="note" title="">

You can also use `page.$()` instead of `page.locator()`. You can find the differences between `page.locator()` and `page.$` in the [Locator API documentation](https://k6.io/docs/javascript-api/xk6-browser/locator/).

</Blockquote>
  
  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { chromium } from 'k6/x/browser';

  export default function () {
    const browser = chromium.launch({ headless: false });
    const page = browser.newPage();

    page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });
  
    // Enter login credentials and click submit button
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');
    page.locator('input[name="submit"]').click();

    page.close();
    browser.close();
  }
  ```

  </CodeGroup>

The preceding code creates and returns a Locator object with the selectors for both login and password passed as arguments. 

Within the Locator API, various methods such as `type()` or `click()` can be used to interact with the elements. The `type()` method types a text to an input field while `click()` will do a mouse click on the element. 

## Asynchronous operations

For some context, k6 operations are synchronous. However, Playwright operations are asynchronous in nature and since xk6-browser aims to provide rough compatibility with Playwright, some of our operations are now asynchronous.

At the moment, `page.waitForNavigation()` and `Element.click()` return promises and work similarly to [JavaScript promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

To avoid timing errors or other race conditions in your script, if you have actions that load up a different page, you need to make sure that you wait for that action to finish before continuing.

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { check } from 'k6';
  import { chromium } from 'k6/x/browser';

  export default function () {
    const browser = chromium.launch({ headless: false });
    const page = browser.newPage();

    page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    // Enter login credentials and login
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    // Wait for asynchronous operations
    // eslint-disable-next-line no-undef
    Promise.all([page.waitForNavigation(), page.locator('input[type="submit"]').click()])
      .then(() => {
        check(page, {
          header: page.locator('h2').textContent() == 'Welcome, admin!',
        });
      })
      .finally(() => {
        page.close();
        browser.close();
      });
  }
  ```

  </CodeGroup>

The preceding code uses `Promise.all([])` to wait for the two promises to be resolved before continuing. Then, you can use [`check`](https://k6.io/docs/javascript-api/k6/check/) from the k6 API to assert the text content of a specific element. Finally, you close the page and the browser.

## Assertions

You can add assertions in your browser script via:
1. Checks, as mentioned in the previous section
2. [k6chaijs](https://k6.io/docs/javascript-api/jslib/k6chaijs/) for a more BDD (Behavior Driven Development) or TDD (Test Driven Development) style

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { chromium } from 'k6/x/browser';
  import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';

  export default function () {
    const browser = chromium.launch({ headless: false });
    const page = browser.newPage();

    page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    // Enter login credentials and login
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    // Wait for asynchronous operations
    // eslint-disable-next-line no-undef
    Promise.all([page.waitForNavigation(), page.locator('input[type="submit"]').click()])
      .then(() => {
        expect(page.locator('h2').textContent()).to.equal('Welcome, admin!');
      })
      .finally(() => {
        page.close();
        browser.close();
      });
  }
  ```

  </CodeGroup>

## Run both browser-level and protocol-level in a single script

The real power of xk6-browser shines when it’s combined with the existing features of k6. A common scenario that you can try is to mix browser-level tests with a protocol-level test which can simulate how your website responds to various performance events.

To run a browser-level and protocol-level test concurrently, you can use [scenarios](https://k6.io/docs/using-k6/scenarios/). 

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { chromium } from 'k6/x/browser';
  import { check } from 'k6';
  import http from 'k6/http';

  export const options = {
    scenarios: {
      messages: {
        executor: 'constant-vus',
        exec: browser,
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

    page.goto('https://test.k6.io/browser.php', { waitUntil: 'networkidle' });
    page.locator('#checkbox1').check();

    check(page, {
      'checkbox is checked': (p) =>
        p.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
    });

    page.close();
    browser.close();
  }

  export function news() {
    const res = http.get('https://test.k6.io/news.php');

    check(res, {
      'status is 200': (r) => r.status === 200,
    });
  }
  ```

  </CodeGroup>

The preceding code contains two scenarios. One for the browser-level test called `browser` and one for the protocol-level test called `news`. Both scenarios are using the [constant-vus executor](https://k6.io/docs/using-k6/scenarios/executors/constant-vus) which introduces a constant number of virtual users to execute as many iterations as possible for a specified amount of time. 

Since it's all in one script, this allows for greater collaboration amongst teams.
