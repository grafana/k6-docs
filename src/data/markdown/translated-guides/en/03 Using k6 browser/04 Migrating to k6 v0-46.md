---
title: 'Migrating to k6 v0.46'
excerpt: 'A migration guide to ease the process of transitioning to the new k6 browser module version'
slug: '/using-k6-browser/migrating-to-k6-v0-46/'
---

This guide outlines [the key changes](#key-changes) users will need to make when moving their existing k6 browser test scripts to the new browser module (bundled up with [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0)).

The latest release simplifies the management of the browser lifecycle by automatically providing and releasing browser resources for users. To facilitate this, a new mandatory field is introduced to define the browser type within [scenario options](#scenario-options).

Previously, users had to launch and close the browser processes themselves. With the recent updates, the API has abstracted the details of `browserType` (i.e., `chromium`). Consequently, the `chromium` named export, previously found in `k6/experimental/browser`, has been replaced with `browser`.

<Blockquote mod="note" title="">

Users no longer need to use the `K6_BROWSER_ENABLED` flag when running browser tests with the `k6` command.

</Blockquote>


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


## Key changes

The updated version introduces notable structural changes in its operation and API. Let's take a look at them.

* The [import path](#import-path) for the browser module has switched from `chromium` to [browser](/javascript-api/k6-experimental/browser/#browser-module-api).
* [Browser options](#browser-options) can now only be set using certain [environment variables](/javascript-api/k6-experimental/browser/#browser-module-options). The `launch()` method, used earlier for this purpose, has been removed.
* [Scenario options](#scenario-options) must now be defined for running browser tests.
* [Simplified resource management](#simplified-resource-management). The browser module now handles the startup and shutdown of browser processes automatically. `chromium.launch()`, `chromium.connect()`, and `browser.close()` methods are no longer necessary, as these methods have been removed.
* [Single browser context per iteration](#browser-context-limit). Users can now only run a single [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) at a time in the same iteration.




## Import path

Changes have been made to how the [browser module](/javascript-api/k6-experimental/browser/) is imported. With the browser type (specifically `chromium`) now set in [scenario options](#scenario-options), users should directly import the [browser](/javascript-api/k6-experimental/browser/#browser-module-api) object from the [browser module](/javascript-api/k6-experimental/browser/). Previously, users relied on `chromium.launch()` for accessing a running browser. Now, a simple import of the [browser](/javascript-api/k6-experimental/browser/#browser-module-api) is sufficient.

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

In k6 v0.46.0, the need to manually start a browser via `chromium.launch()` or `chromium.connect()` and set its configuration through these methods has been removed, so this part can simply be omitted from test scripts. Users can still change some browser settings by using environment variables. For more information, refer to the [browser module options](/javascript-api/k6-experimental/browser/#browser-module-options) documentation.

### Before:

<CodeGroup lineNumbers={[true]}>

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

### After:

<CodeGroup labels={["Bash", "Docker", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ K6_BROWSER_HEADLESS=false K6_BROWSER_TIMEOUT='60s' k6 run script.js
```

```bash
# When using the `k6:master-with-browser` Docker image, you need to add `--cap-add=SYS_ADMIN`
# to grant further system permissions on the host for the Docker container.
docker run --rm -i --cap-add=SYS_ADMIN -e K6_BROWSER_HEADLESS=false -e K6_BROWSER_TIMEOUT='60s' grafana/k6:master-with-browser run - <script.js
```

```bash
C:\k6> set "K6_BROWSER_HEADLESS=false" && set "K6_BROWSER_TIMEOUT='60s' " && k6 run script.js
```

```bash
PS C:\k6> $env:K6_BROWSER_HEADLESS="false" ; $env:K6_BROWSER_TIMEOUT='60s' ; k6 run script.js
```

</CodeGroup>


<Blockquote mod="note" title="">

The following browser options are no longer supported: `devtools`, `env`, and `proxy` since they weren't providing much value. Although `slowMo` has been temporarily removed, we're working on reintroducing it.

</Blockquote>




## Scenario options

In k6 v0.46.0, users must set the [executor](/using-k6/scenarios/executors/) and browser type as options in a [k6 scenario](/using-k6/scenarios/) definition. Specifically, the `browser.type` option should be set to `chromium`, as Chromium is the only browser supported.


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
  }
}
```

</CodeGroup>

Previously, users were required to handle the creation and closing of the browser instance using `chromium.launch()` or `chromium.connect()` for creation, and the `browser.close()` method for releasing resources before ending the iteration. This repetitive code has been eliminated.

Now, all that is needed is to specify the browser type within the [scenario options](#scenario-options). A browser instance will be automatically created and closed for each iteration by the browser module, streamlining the process.

This change allows to identify the test as a browser test and provides automatic control of the browser's lifecycle. Users no longer need to start or stop the browser manually through the browser API. If the `browser.type` option is set in the scenario options, a browser instance will automatically start at the beginning and close at the end of each test iteration.


## Opening a new page

Users can open a new page by using the imported [browser](/javascript-api/k6-experimental/browser/#browser-module-api) object's [browser.newPage()](/javascript-api/k6-experimental/browser/newpage) method. Users can still use the [Page](/javascript-api/k6-experimental/browser/page/) object as before.

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

As [mentioned earlier](#scenario-options), in the new API, there's a shift in how the browser's lifecycle is managed.

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

The new browser implementation limits the usage to a single active [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) per iteration. This change enhances the prediction of resource requirements for a test run and promotes the use of [scenarios](/using-k6/scenarios/) to separate independent browser sessions.

* A new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) can be created either with the [browser.newContext()](/javascript-api/k6-experimental/browser/newcontext/) or [browser.newPage()](/javascript-api/k6-experimental/browser/newpage) methods.
* If a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) needs to be created, the existing one must be closed first using the [browserContext.close()](/javascript-api/k6-experimental/browser/browsercontext/close) method.
* Alongside these changes, the `browser.contexts()` method has been altered to [browser.context()](/javascript-api/k6-experimental/browser/context/) to retrieve the current [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/).

For instance, the code below will not function as intended, as it attempts to execute two simultaneous [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)s within the same iteration.

<CodeGroup labels={["Incorrect usage"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
export default async function() {
  const context1 = browser.newContext();
  // Simultaneous browser contexts are not permitted!
  const context2 = browser.newContext();
}
```

</CodeGroup>

On the other hand, the subsequent example will function correctly by closing the initial [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) prior to establishing a new one.

<CodeGroup labels={["Correct usage"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
export default async function() {
  const context1 = browser.newContext();
  context1.close();

  // Since the first browser context is closed, a new browser context can be created.
  const context2 = browser.newContext();
  context2.close()
}
```

</CodeGroup>


These updates make the usage of our API more straightforward for users, aiding in more consistent and automatic resource management.

For all the details, make sure to review the complete changelog for [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0). For more information watch [k6 Office Hours #98](https://www.youtube.com/watch?v=fK6Hpvt0pY0), where we discuss the latest changes in k6 browser, and, as always, ask in [the community forum](https://community.grafana.com/c/grafana-k6/k6-browser/79) if you need our help!