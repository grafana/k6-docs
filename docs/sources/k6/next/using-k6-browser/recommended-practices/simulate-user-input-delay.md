---
title: 'Simulate user input delay'
description: 'A guide on how to simulate user input delay.'
weight: 600
---

# Simulate user input delay

On this page, you'll learn how to best work with `sleep` in `k6` and the various `wait*` prepended methods available in `k6/browser` to simulate user input delay, wait for navigations, and wait for element state changes. By the end of this page, you should be able to successfully use the correct API where necessary.

{{< admonition type="note" >}}

While using the `sleep` or `page.waitForTimeout` functions to wait for element state changes may seem helpful, it's best to avoid them to prevent flakey tests. Instead, it's better to use the other `wait*` prepended methods listed on this page.

{{< /admonition >}}

## What is `sleep`?

[sleep](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/sleep) is a first class function built into k6. It's main use is to _"suspend VU execution for the specified duration"_ which is most useful when you want to simulate user input delay, such as:

- Navigating to a page.
- Sleeping for one second to simulate a user looking for a specific element on the page.
- Clicking on the element.

{{< admonition type="warning" >}}

`sleep` is a synchronous function that blocks the JavaScript event loop, which means that all asynchronous work will also be suspended until `sleep` completes.

The browser module predominantly provides asynchronous APIs, so it's best to avoid working with `sleep`. Instead, _use the [page.waitForTimeout](#pagewaitfortimeout) function_. Refer to [When to use sleep() and page.waitForTimeout()](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/recommended-practices/sleep-vs-page-wait-for-timeout/) for more details.

{{< /admonition >}}

## What is `wait*`?

In the browser modules there are various asynchronous APIs that can be used to wait for certain states:

| Method                                                     | Description                                                                 |
| ---------------------------------------------------------- | --------------------------------------------------------------------------- |
| [browserContext.waitForEvent](#browsercontextwaitforevent) | Waits for the selected event to fire and returns its value.                 |
| [page.waitForFunction](#pagewaitforfunction)               | Waits for the given function to return a truthy value.                      |
| [page.waitForLoadState](#pagewaitforloadstate)             | Waits for the specified page life cycle event.                              |
| [page.waitForNavigation](#pagewaitfornavigation)           | Waits for the navigation to complete after one starts.                      |
| [page.waitForResponse](#pagewaitforresponse)               | Wait for an HTTP response that matches the specified URL pattern.           |
| [page.waitForTimeout](#pagewaitfortimeout)                 | Waits the given time. _Use this instead of `sleep` in your frontend tests_. |
| [page.waitForURL](#pagewaitforurl)                         | Wait for the page to navigate to the specified URL.                         |
| [locator.waitFor](#locatorwaitfor)                         | Wait for the element to be in a particular state.                           |

### browserContext.waitForEvent

[browserContext.waitForEvent](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/waitforevent) is used when waiting for specific events to fire, which then returns the element associated to that event. At the moment the only event that is available to use is `page`. It can be useful when you want to track and retrieve a new tab opening. When working with a predicate function, it can be used to wait for a specific page to open before returning `true`.

<!-- eslint-skip-->
<!-- md-k6:skip -->

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
};

export default async function () {
  const page = await browser.newPage();

  await page.goto('https://test.k6.io/');

  await page.keyboard.down('ControlOrMeta');

  // Open the link in a new tab with the help of the meta key.
  // Wait for the new page to be created.
  const browserContext = browser.context();
  const [newTab] = await Promise.all([
    browserContext.waitForEvent('page'),
    page.locator('a[href="/my_messages.php"]').click(),
  ]);

  await page.keyboard.up('ControlOrMeta');

  // Wait for the new page (tab) to load.
  await newTab.waitForLoadState('load');

  // Take screenshots of each page.
  await page.screenshot({ path: `screenshot-page.png` });
  await newTab.screenshot({ path: `screenshot-newTab.png` });

  await newTab.close();
  await page.close();
}
```

### page.waitForFunction

[page.waitForFunction](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforfunction) is useful when you want more control over when a test progresses with a javascript function that returns true when a condition (or many conditions) is met. It can be used to poll for changes in the DOM or non-DOM elements and variables.

<!-- eslint-skip-->

```javascript
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // Setting up the example that will mutate the h1 element by setting the
    // h1 elements text value to "Hello".
    await page.evaluate(() => {
      setTimeout(() => {
        const el = document.createElement('h1');
        el.innerHTML = 'Hello';
        document.body.appendChild(el);
      }, 1000);
    });

    // Waiting until the h1 element has mutated.
    const ok = await page.waitForFunction("document.querySelector('h1')", {
      polling: 'mutation',
      timeout: 2000,
    });

    await check(ok, {
      'waitForFunction successfully resolved': async (ok) => (await ok.innerHTML()) == 'Hello',
    });
  } finally {
    await page.close();
  }
}
```

### page.waitForLoadState

[page.waitForLoadState](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforloadstate) is useful when there’s no explicit navigation, but you need to wait for the page or network to settle. This is mainly used when working with single-page applications or when no full page reloads happen.

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // Goto a SPA
    await page.goto('<url>');

    // ... perform some actions that reload part of the page.

    // waits for the default `load` event.
    await page.waitForLoadState();
  } finally {
    await page.close();
  }
}
```

### page.waitForNavigation

[page.waitForNavigation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfornavigation) is a very useful API when performing other actions that could start a page navigation, and they don't automatically wait for the navigation to end. Usually, you'll find it in our examples with a `click` API call. Note that [goto](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/goto) is an example of an API that _doesn't_ require `waitForNavigation` since it will automatically wait for the navigation to complete before returning.

It's important to call this in a [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) along with the API that will cause the navigation to start.

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    // The click action will start a navigation, and the waitForNavigation
    // will help the test wait until the navigation completes.
    await Promise.all([page.waitForNavigation(), submitButton.click()]);
  } finally {
    await page.close();
  }
}
```

### page.waitForResponse

[page.waitForResponse](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitForResponse) waits for an HTTP response that matches the specified URL pattern. This method is particularly useful for waiting for responses from AJAX/fetch requests, API calls, or specific resources to be loaded before proceeding with the test.

```js
import { browser } from 'k6/browser';
import { check } from 'k6';

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

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/');

    // Test waitForResponse with user interaction
    const pizzaResponsePromise = page.waitForResponse('https://quickpizza.grafana.com/api/pizza');

    await page.getByRole('button', { name: /pizza/i }).click();

    const pizzaResponse = await pizzaResponsePromise;

    // Check that the pizza API call was successful
    check(pizzaResponse, {
      'pizza API status is 200': (r) => r.status() === 200,
      'pizza API URL is correct': (r) => r.url() === 'https://quickpizza.grafana.com/api/pizza',
    });
  } finally {
    await page.close();
  }
}
```

### page.waitForTimeout

[page.waitForTimeout](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfortimeout) will wait the given amount of time. It's functionally the same as k6's [sleep](#whatissleep), but it's asynchronous, which means it will not block the event loop and allows the background tasks to continue to be worked on.

```js
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io');

    // Slow the test down to mimic a user looking for the element on the page.
    await page.waitForTimeout(1000);

    // ... perform the next action
  } finally {
    await page.close();
  }
}
```

### page.waitForURL

[page.waitForURL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforurl) waits for the page to navigate to the specified URL. This method is useful for ensuring that navigation to a particular URL has completed before proceeding with the test. This is especially useful if there are multiple redirects before hitting the end destination.

```js
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/test.k6.io/');

    // Wait for navigation to a specific URL
    await Promise.all([
      page.click('a[href="/my_messages.php"]'),
      page.waitForURL('https://quickpizza.grafana.com/my_messages.php'),
    ]);

    await page.goto('https://quickpizza.grafana.com/test.k6.io/');

    // Wait for navigation using URL pattern with RegExp
    await Promise.all([page.click('a[href="/browser.php"]'), page.waitForURL(/\/browser\.php$/)]);
  } finally {
    await page.close();
  }
}
```

### locator.waitFor

[locator.waitFor](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/waitfor/) will wait until the element meets the waiting criteria. It's useful when dealing with dynamic websites where elements may take time to appear or change state. For example, if elements load after some delay due to async calls, or because of slow JavaScript execution.

<!-- md-k6:skip -->

```js
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  const text = page.locator('#input-text-hidden');
  await text.waitFor({
    state: 'hidden',
  });
}
```
