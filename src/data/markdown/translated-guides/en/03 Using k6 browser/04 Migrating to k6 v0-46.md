---
title: 'Migrating to k6 v0.46'
excerpt: 'A migration guide to ease the process of transitioning to the new k6 browser module version'
slug: '/using-k6-browser/migrating-to-k6-v0-46/'
---

This guide outlines the key changes you will need to make when moving your existing k6 browser test scripts to the new [k6 browser module](/javascript-api/k6-experimental/browser/) (bundled with [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0)).

## Key changes

The updated version introduces notable structural changes in its operation and API, including breaking changes:

* The [import path](#import-path) for the browser module has switched from `chromium` to [`browser`](/javascript-api/k6-experimental/browser/#browser-module-api).
* [Simplified resource management](#simplified-resource-management). The browser module now handles the startup and shutdown of browser processes automatically. The `chromium.launch()`, `chromium.connect()`, and `browser.close()` methods are no longer necessary and have been removed.
* [Browser options](#browser-options) can now only be set using [environment variables](/javascript-api/k6-experimental/browser/#browser-module-options).
* [Scenario options](#scenario-options) must now be defined for running browser tests.
* [Single browser context per iteration](#browser-context-limit). You can now only run a single [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) at a time in the same iteration.

<Blockquote mod="note" title="">

You no longer need to use the `K6_BROWSER_ENABLED` flag when running browser tests with the `k6` command.

</Blockquote>

## Before and after comparison

Let's start with an overview of the main differences between the previous and new versions of the k6 browser API.

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

## Import path

With the browser type (specifically `chromium`) now set in [scenario options](#scenario-options), you should directly import the [browser](/javascript-api/k6-experimental/browser/#browser-module-api) object from the [browser module](/javascript-api/k6-experimental/browser/).

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

## Simplified resource management

The browser lifecycle is now automatically managed by the browser module, and so the `chromium.launch()`, `chromium.connect()`, and `browser.close()` methods are no longer necessary and have been removed.

Now, all that is needed is to specify the `browser.type` within the [scenario options](#scenario-options). If the option is set, a browser instance will automatically start at the beginning and close at the end of each test iteration.

## Browser options

With the removal of the `chromium.launch()` and `chromium.connect()` methods, setting browsers options is now done by using environment variables. For more information, refer to [Browser Module Options](/javascript-api/k6-experimental/browser/#browser-module-options).

Before:

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

After:

<CodeGroup labels={["Bash", "Docker", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ K6_BROWSER_HEADLESS=false K6_BROWSER_TIMEOUT='60s' k6 run script.js
```

```bash
# WARNING!
# Be aware that grafana/k6:master-with-browser launches Chrome browser setting 'no-sandbox'
# argument. Use it only with trustworthy websites.
#
# As an alternative, our recomendation is to use a Docker SECCOMP profile instead, and
# overwrite the Chrome arguments to not use 'no-sandbox' such as:
# docker container run --rm -i -e K6_BROWSER_ARGS='' --security-opt seccomp=$(pwd)/chrome.json grafana/k6:master-with-browser run - <script.js
#
# You can find an example of a hardened SECCOMP profile in:
# https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json.
docker run --rm -i -e K6_BROWSER_HEADLESS=false -e K6_BROWSER_TIMEOUT='60s' grafana/k6:master-with-browser run - <script.js
```

```bash
C:\k6> set "K6_BROWSER_HEADLESS=false" && set "K6_BROWSER_TIMEOUT='60s' " && k6 run script.js
```

```bash
PS C:\k6> $env:K6_BROWSER_HEADLESS="false" ; $env:K6_BROWSER_TIMEOUT='60s' ; k6 run script.js
```

</CodeGroup>

<Blockquote mod="note" title="">

The following browser options are no longer supported: `devtools`, `env`, and `proxy` since they weren't providing much value. `slowMo` has been temporarily removed, and we're working on reintroducing it.

</Blockquote>

## Scenario options

You must now set the [executor](/using-k6/scenarios/executors/) and browser type as options in a [scenario](/using-k6/scenarios/) definition. Specifically, the `browser.type` option should be set to `chromium`, as Chromium is the only browser supported.

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

## Opening and closing a page

You can open a new page by using the imported [browser](/javascript-api/k6-experimental/browser/#browser-module-api) object's [browser.newPage()](/javascript-api/k6-experimental/browser/newpage) method. You can still use the [Page](/javascript-api/k6-experimental/browser/page/) object as before.

<CodeGroup labels={["Before"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
export default async function () {
    const browser = chromium.launch();
    const page = browser.newPage();
    // ...
    page.close();
    browser.close();
}
```
</CodeGroup>

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

The `browser.close()` method has been removed, so you can remove that from your scripts and use [`page.close()`](/javascript-api/k6-experimental/browser/page/close/) once you're done using the page object.

<Blockquote mod="note" title="">

Closing of the page is critical for the calculation of accurate Web Vital metrics. See the [browser metrics](/using-k6-browser/browser-metrics/) for more details.

</Blockquote>

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

On the other hand, the next example will function correctly by closing the initial [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) prior to establishing a new one.

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

These updates make the usage of the API more straightforward for users, aiding in more consistent and automatic resource management.

For all the details, make sure to review the complete changelog for [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0). For more information watch [k6 Office Hours #98](https://www.youtube.com/watch?v=fK6Hpvt0pY0), where we discuss the latest changes in k6 browser, and, as always, ask in [the community forum](https://community.grafana.com/c/grafana-k6/k6-browser/79) if you need help!
