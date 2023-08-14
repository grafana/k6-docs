---
title: 'Migrating to k6 v0.46'
excerpt: 'A migration guide to ease the process of transitioning to the new k6 browser module version'
slug: '/using-k6-browser/migrating-to-k6-v0-46/'
---

This guide outlines the key changes users will need to make when moving their existing k6 browser test scripts to the new browser module (bundled up with the k6 version 0.46).

The new version abstracts away the handling of the browser lifecycle and instead takes care of allocating and deallocating browser resources for you. To enable this, a newly required field is introduced to define the browser within the `scenario`.

Previously, users were responsible for establishing and shutting down the browser instance. However, with the current changes, the API has concealed the intricacies of `browserType`, and so the `chromium` named export has been removed from `k6/experimental/browser`, which has been replaced with `browser`.

For all the details, make sure to review the complete changelog for [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0). For more information watch [k6 Office Hours #98](https://www.youtube.com/watch?v=fK6Hpvt0pY0), where we discuss the latest changes in k6 browser, and, as always, ask in [the community forum](https://community.grafana.com/c/grafana-k6/k6-browser/79) if you need our help!

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

* [Scenario options](#scenario-options) must now be defined for running browser tests.
* The [import path](#import-path) for the browser module has switched from `chromium` to [browser](/javascript-api/k6-experimental/browser/#browser-module-api).
* Browser options can now only be set using certain [environment variables](/javascript-api/k6-experimental/browser/#browser-module-options). The `launch()` method, used earlier for this purpose, has been removed.
* [Simplified resource management](#simplified-resource-management). The browser now starts and closes automatically, managed by the browser module itself. There's no need to use `browser.launch()`/`browser.connect()`, nor `browser.close()` anymore.
* [Single browser context per iteration](#browser-context-limit). Users can now only run a single [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) at a time in the same iteration.




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

In k6 v0.46.0, the need to manually start a browser via `browser.launch()` or `browser.connect()` and set its configuration through these methods has been removed, so this part can simply be omitted from test scripts. Users can still change some browser settings by using environment variables. For more information, refer to the [browser module options](/javascript-api/k6-experimental/browser/#browser-module-options) documentation.

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

The following browser options are no longer supported: `devtools`, `env`, and `proxy` since they weren't providing much value. `slowMo` has been removed for now, but we are working on adding it back in.

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

You can open a new page by using the imported [browser](/javascript-api/k6-experimental/browser/#browser-module-api) object's [browser.newPage()](/javascript-api/k6-experimental/browser/newpage) method. You can still use the [Page](/javascript-api/k6-experimental/browser/page/) object as before.

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

The new browser implementation limits the use to a single active [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) per iteration. This change supports better prediction of resource requirements for a test run.

Please click on the links below to see usage examples.

* If a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) needs to be created, the existing one must be closed first using the [browserContext.close()](/javascript-api/k6-experimental/browser/browsercontext/close) method.
* A new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) can be created either with the [browser.newContext()](/javascript-api/k6-experimental/browser/newcontext/) or [browser.newPage()](/javascript-api/k6-experimental/browser/newpage) methods.
* Alongside these changes, the method `browser.contexts()` has been altered to [browser.context()](/javascript-api/k6-experimental/browser/context/) to retrieve the current [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/).

These updates make the usage of our API more straightforward for users, aiding in more consistent and automatic resource management.