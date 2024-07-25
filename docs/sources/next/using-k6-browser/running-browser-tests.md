---
title: 'Running browser tests'
description: 'Follow along to learn how to run a browser test, interact with elements on the page, wait for page navigation, write assertions and run both browser-level and protocol-level tests in a single script.'
weight: 02
---

# Running browser tests

Follow along to learn how to:

1. Run a test
2. Interact with elements on your webpage
3. Wait for page navigation
4. Run both browser-level and protocol-level tests in a single script

## Run a test

To run a simple local script:

1. Copy the following code, paste it into your favorite editor, and save it as `script.js`.

   Note that providing an `executor` and setting the `browser` scenario option's `type` to `chromium` is mandatory. Please see the [options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options) and [scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios) documentation for more information.

   {{< code >}}

   ```javascript
   import { browser } from 'k6/browser';

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
     thresholds: {
       checks: ['rate==1.0'],
     },
   };

   export default async function () {
     const page = await browser.newPage();

     try {
       await page.goto('https://test.k6.io/');
       await page.screenshot({ path: 'screenshots/screenshot.png' });
     } finally {
       await page.close();
     }
   }
   ```

   {{< /code >}}

   The preceding code imports the `browser` [the browser module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser)), and uses its `newPage` method to open a new page.

   After getting the page, you can interact with it using the [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page) methods. This example visits a test URL and takes a screenshot of the page.

   Subsequently, the page is closed. This allows for the freeing up of allocated resources and enables the accurate calculation of [Web Vital metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/metrics).

   {{% admonition type="note" %}}

   Starting from v0.52.0 the browser module API has been converted to an asynchronous API. That means that most of the methods now return promises. Refer to the [migration guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/migrating-to-k6-v0-52/) to learn more about the changes and how to update your scripts.

   {{% /admonition %}}

1. Then, run the test on your terminal with this command:

   {{< code >}}

   ```bash
   $ k6 run script.js
   ```

   ```docker
   # WARNING!
   # The grafana/k6:master-with-browser image launches a Chrome browser by setting the
   # 'no-sandbox' argument. Only use it with trustworthy websites.
   #
   # As an alternative, you can use a Docker SECCOMP profile instead, and overwrite the
   # Chrome arguments to not use 'no-sandbox' such as:
   # docker container run --rm -i -e K6_BROWSER_ARGS='' --security-opt seccomp=$(pwd)/chrome.json grafana/k6:master-with-browser run - <script.js
   #
   # You can find an example of a hardened SECCOMP profile in:
   # https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json.
   docker run --rm -i -v $(pwd):/home/k6/screenshots grafana/k6:master-with-browser run - <script.js
   ```

   ```windows
   C:\k6> k6 run script.js
   ```

   ```powershell
   PS C:\k6> k6 run script.js
   ```

   {{< /code >}}

   You can also use [the browser module options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/options) to customize the launching of a browser process. For instance, you can start a headful browser using the previous test script with this command.

   {{< code >}}

   ```bash
   $ K6_BROWSER_HEADLESS=false k6 run script.js
   ```

   ```docker
   # WARNING!
   # The grafana/k6:master-with-browser image launches a Chrome browser by setting the
   # 'no-sandbox' argument. Only use it with trustworthy websites.
   #
   # As an alternative, you can use a Docker SECCOMP profile instead, and overwrite the
   # Chrome arguments to not use 'no-sandbox' such as:
   # docker container run --rm -i -e K6_BROWSER_ARGS='' --security-opt seccomp=$(pwd)/chrome.json grafana/k6:master-with-browser run - <script.js
   #
   # You can find an example of a hardened SECCOMP profile in:
   # https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json.
   docker run --rm -i -v $(pwd):/home/k6/screenshots -e K6_BROWSER_HEADLESS=false grafana/k6:master-with-browser run - <script.js
   ```

   ```windows
   C:\k6> set "K6_BROWSER_HEADLESS=false" && k6 run script.js
   ```

   ```powershell
   PS C:\k6> $env:K6_BROWSER_HEADLESS=false ; k6 run script.js
   ```

   {{< /code >}}

   {{% admonition type="note" %}}

   When using Docker to run k6 browser tests, make sure you have pulled the correct image with Chromium built-in. See [k6 Installation via Docker](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6#docker) for more information.

   {{% /admonition %}}

1. Optional step: running browser tests in Docker on Mac computers with Apple Silicon:

   1. Make sure you’re running [the latest Docker](https://docs.docker.com/engine/install/) version.

   2. Update [Rosetta](<https://en.wikipedia.org/wiki/Rosetta_(software)>) and export an environment variable with the following:

      ```bash
       $ softwareupdate --install-rosetta
       $ export DOCKER_DEFAULT_PLATFORM=linux/amd64
      ```

   3. Select VirtuoFS in **Settings** > **General** > **VirtuoFS**.

   4. Enable the Rosetta emulation in **Settings** > **Features in development** > **Use Rosetta for x86/amd64 emulation on Apple Silicon**.

   5. Restart Docker.

   6. Run the browser image with the following command (adds the `--platform` flag):

      ```bash
      $ docker run --rm -i --platform linux/amd64 -v $(pwd):/home/k6/screenshots -e K6_BROWSER_HEADLESS=false grafana/k6:master-with-browser run - <script.js
      ```

## Interact with elements on your webpage

You can use `page.locator()` and pass in the element's selector you want to find on the page. `page.locator()` will create and return a [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator) object, which you can later use to interact with the element.

To find out which selectors the browser module supports, check out [Selecting Elements](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/recommended-practices/selecting-elements).

{{% admonition type="note" %}}

You can also use `page.$()` instead of `page.locator()`. You can find the differences between `page.locator()` and `page.$` in the [Locator API documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator).

{{% /admonition %}}

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    // Enter login credentials
    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

The preceding code creates and returns a Locator object with the selectors for both login and password passed as arguments.

Within the Locator API, various methods such as `type()` can be used to interact with the elements. The `type()` method types a text to an input field.

## Asynchronous operations

Since many browser operations happen asynchronously, and to follow the Playwright API more closely, we are working on migrating most of the browser module methods to be asynchronous as well.

At the moment, methods such as `page.goto()`, `page.waitForNavigation()` and `Element.click()` return [JavaScript promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), and scripts must be written to handle this properly.

To avoid timing errors or other race conditions in your script, if you have actions that load up a different page, you need to make sure that you wait for that action to finish before continuing.

{{< code >}}

```javascript
import { check } from 'k6';
import { browser } from 'k6/browser';

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    const header = await page.locator('h2').textContent();
    check(header, {
      header: (h) => h == 'Welcome, admin!',
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

The preceding code uses `Promise.all([])` to wait for the two promises to be resolved before continuing. Since clicking the submit button causes page navigation, `page.waitForNavigation()` is needed because the page won't be ready until the navigation completes. This is required because there can be a race condition if these two actions don't happen simultaneously.

Then, you can use [`check`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) from the k6 API to assert the text content of a specific element. Finally, you close the page and the browser.

## Run both browser-level and protocol-level tests in a single script

The real power of the browser module shines when it’s combined with the existing features of k6. A common scenario that you can try is to mix a smaller subset of browser-level tests with a larger protocol-level test which can simulate how your website responds to various performance events. This approach is what we refer to as [hybrid load testing](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/load-testing-websites#hybrid-load-testing) and provides advantages such as:

- testing real user flows on the frontend while generating a higher load in the backend
- measuring backend and frontend performance in the same test execution
- increased collaboration between backend and frontend teams since the same tool can be used

To run a browser-level and protocol-level test concurrently, you can use [scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios).

{{% admonition type="note" %}}

Keep in mind that there is an additional performance overhead when it comes to spinning up a browser VU and that the resource usage will depend on the system under test.

{{% /admonition %}}

{{< code >}}

```javascript
import { browser } from 'k6/browser';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 1,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
    news: {
      executor: 'constant-vus',
      exec: 'news',
      vus: 20,
      duration: '1m',
    },
  },
};

export async function browserTest() {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');

    await page.locator('#checkbox1').check();

    const info = await page.locator('#checkbox-info-display').textContent();
    check(info, {
      'checkbox is checked': (info) => info === 'Thanks for checking the box',
    });
  } finally {
    await page.close();
  }
}

export function news() {
  const res = http.get('https://test.k6.io/news.php');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
```

{{< /code >}}

The preceding code contains two scenarios. One for the browser-level test called `browser` and one for the protocol-level test called `news`. Both scenarios are using the [constant-vus executor](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/constant-vus) which introduces a constant number of virtual users to execute as many iterations as possible for a specified amount of time.

Since it's all in one script, this allows for greater collaboration amongst teams.
