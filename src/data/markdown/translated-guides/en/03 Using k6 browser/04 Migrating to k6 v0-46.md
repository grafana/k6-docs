---
title: 'Migrating to k6 v0.46'
excerpt: 'A migration guide to ease the process of transitioning to the new k6 browser module version'
slug: '/using-k6-browser/migrating-to-k6-v0-46/'
---

This guide outlines the key changes users will need to make when moving their existing k6 browser test scripts to the new browser module (bundled up with the k6 version 0.46). The updated version makes the browser module easier to use, with structural changes that reduce the need for manual setup, enhance scenario definitions, and make the code more straightforward.

For all the details, check the complete changelog for the [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0).

<Blockquote mod="note" title="">

Users no longer need to use the `K6_BROWSER_ENABLED` flag when running browser tests with the `k6` command.

</Blockquote>


## Key changes in the new API

The updated k6 browser API introduces notable structural changes in its operation and API. 

* [Scenario options](#scenario-options) must now be defined for running browser tests.
* The [import path](#import-path) for the browser module has switched from `chromium` to [browser](/javascript-api/k6-experimental/browser/#browser-module-api).
* Browser options can now only be set using certain [environment variables](/javascript-api/k6-experimental/browser/#browser-module-options). The `launch()` method, used earlier for this purpose, has been removed.
* [Simplified resource management](#simplified-resource-management). The browser now starts automatically, managed by the browser module itself. There's no need to use `browser.close()` anymore.
* [Single browser context per iteration](#browser-context-limit). Users can now only run a single [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) at a time in the same iteration.



## Before and after comparison

Let's start with an overview of the primary differences between the previous and new versions of the k6 browser API. Subsequent sections will delve into each difference in detail.

<CodeGroup labels={["Before: The previous k6 browser API"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
    const browser = chromium.launch({
        headless: false,
        timeout: '60s',
    });
    const page = browser.newPage();

    try {
        await page.goto('https://test.k6.io/');
        page.screenshot({ path: 'screenshot.png' });
    } finally {
        page.close();
        browser.close();
    }
}
```

</CodeGroup>

<CodeGroup labels={["After: The new k6 browser API"]} lineNumbers={[true]}>

```javascript
import { browser } from 'k6/experimental/browser';

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
    checks: ["rate==1.0"]
  }
}

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
    page.screenshot({ path: 'screenshot.png' });
  } finally {
    page.close();
  }
}
```

</CodeGroup>





## Import path

Changes have been made to how the [browser module](/javascript-api/k6-experimental/browser/) is imported. With the browser type (i.e., `chromium`) now set in [scenario options](#scenario-options), users should directly import the [browser](/javascript-api/k6-experimental/browser/#browser-module-api) object from the [browser module](/javascript-api/k6-experimental/browser/). In the past, users relied on `chromium.launch()` for accessing the running browser. Now, a simple import of the [browser](/javascript-api/k6-experimental/browser/#browser-module-api) is sufficient.

<CodeGroup labels={["Before: Import Path"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/experimental/browser';
```

</CodeGroup>

<CodeGroup labels={["After: Import Path"]} lineNumbers={[true]}>

```javascript
import { browser } from 'k6/experimental/browser';
```

</CodeGroup>





## Browser options

In the updated version, the need to manually start a browser and set its configuration has been removed, and this part can simply be omitted from test scripts.

Users can still change some browser settings by using environment variables. For more information, refer to the [browser module options](/javascript-api/k6-experimental/browser/#browser-module-options) documentation.


<CodeGroup labels={["Before"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
export default async function () {
    const browser = chromium.launch({
        headless: false,
        timeout: '60s',
    });
}
```

</CodeGroup>

<Blockquote mod="note" title="">

The following browser options are no longer supported: `slowMo`, `devtools`, `env`, and `proxy`.

</Blockquote>




## Scenario options

In the new update, users must set the [executor](/using-k6/scenarios/executors/) and browser type as options in a [k6 scenario](/using-k6/scenarios/) definition. Specifically, the `browser.type` option should be set to `chromium`, as Chromium is the only browser supported.

This change helps identify the test as a browser test and allows automatic control of the browser's lifecycle. Users no longer need to start or stop the browser manually through the browser API. If the `browser.type` option is set in the scenario options, a browser instance will automatically start at the beginning and close at the end of each test iteration.

<CodeGroup labels={["After"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
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
    checks: ["rate==1.0"]
  }
}
```

</CodeGroup>




## Opening a new page

You can open a new page by using the imported [browser](/javascript-api/k6-experimental/browser/#browser-module-api) object.

<CodeGroup labels={["After"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
export default async function () {
    const page = browser.newPage();
    // ...
    page.close();
}
```
</CodeGroup>

<Blockquote mod="note" title="">

Closing of the page is critical for the calculation of accurate Web Vital metrics. See the [browser metrics](/using-k6-browser/browser-metrics/) for more details.

</Blockquote>




## Simplified resource management

As [mentioned earlier](#scenario-options), in the new API, there's a shift in how the browser's lifecycle is managed. Previously, users were required to handle the creation and closing of the browser instance using methods like `chromium.launch()` and `chromium.connect()` for creation, and the `browser.close()` method for releasing resources before ending the iteration. This repetitive code has been eliminated. Now, all that is needed is to specify the browser type within the [scenario options](#scenario-options). A browser instance will be automatically created and closed for each iteration, streamlining the process.

Since the browser lifecycle is automatically managed by the browser module, the closing of the browser has been simplified. The explicit `browser.close()` call has been removed. Simply close the page using the [page.close()](/javascript-api/k6-experimental/browser/page/close/) method as in the example below.

<CodeGroup labels={["Before"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
page.close();
browser.close();
```

</CodeGroup>

<CodeGroup labels={["After"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
page.close();
```

</CodeGroup>




## Browser context limit

Since the browser lifecycle is now being managed by the [browser module](/javascript-api/k6-experimental/browser/), the new browser implementation limits the use to a single active [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) per iteration. This change supports better prediction of resource requirements for a test run and allows for more controlled management of [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)s.

If a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) needs to be created, the existing one must be closed first using the [browserContext.close()](/javascript-api/k6-experimental/browser/browsercontext/close) method. And, a new one can be created either with the [browser.newContext()](/javascript-api/k6-experimental/browser/newcontext/) or [browser.newPage()](/javascript-api/k6-experimental/browser/newpage) methods.

Alongside these changes, the method `browser.contexts()` has been altered to [browser.context()](/javascript-api/k6-experimental/browser/context/) to retrieve the current [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/).

These updates make the usage of our API more straightforward for users, aiding in more consistent and automatic resource management.