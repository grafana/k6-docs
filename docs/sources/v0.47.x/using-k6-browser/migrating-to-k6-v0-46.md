---
title: 'Migrating to k6 v0.46'
description: 'A migration guide to ease the process of transitioning to the new k6 browser module version'
weight: 04
---

# Migrating to k6 v0.46

This guide outlines the key changes you will need to make when moving your existing k6 browser test scripts to the new [k6 browser module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser) (bundled with [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0)).

## Key changes

The updated version introduces notable structural changes in its operation and API, including breaking changes:

- The [import path](#import-path) for the browser module has switched from `chromium` to [`browser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser#browser-module-api).
- [Simplified resource management](#simplified-resource-management). The browser module now handles the startup and shutdown of browser processes automatically. The `chromium.launch()`, `chromium.connect()`, and `browser.close()` methods are no longer necessary and have been removed.
- [Browser options](#browser-options) can now only be set using [environment variables](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser#browser-module-options).
- [Scenario options](#scenario-options) must now be defined for running browser tests.
- [Single browser context per iteration](#browser-context-limit). You can now only run a single [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) at a time in the same iteration.

{{% admonition type="note" %}}

You no longer need to use the `K6_BROWSER_ENABLED` flag when running browser tests with the `k6` command.

{{% /admonition %}}

## Before and after comparison

Let's start with an overview of the main differences between the previous and new versions of the k6 browser API.

{{< code >}}

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

{{< /code >}}

{{< code >}}

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
};

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

{{< /code >}}

## Import path

With the browser type (specifically `chromium`) now set in [scenario options](#scenario-options), you should directly import the [browser](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser#browser-module-api) object from the [browser module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser).

{{< code >}}

```javascript
import { chromium } from 'k6/experimental/browser';
```

{{< /code >}}

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
```

{{< /code >}}

## Simplified resource management

The browser lifecycle is now automatically managed by the browser module, and so the `chromium.launch()`, `chromium.connect()`, and `browser.close()` methods are no longer necessary and have been removed.

Now, all that is needed is to specify the `browser.type` within the [scenario options](#scenario-options). If the option is set, a browser instance will automatically start at the beginning and close at the end of each test iteration.

## Browser options

With the removal of the `chromium.launch()` and `chromium.connect()` methods, setting browsers options is now done by using environment variables. For more information, refer to [Browser Module Options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser#browser-module-options).

### Launching a browser

Before:

{{< code >}}

<!-- eslint-skip -->

```javascript
export default async function () {
  const browser = chromium.launch({
    headless: false,
    timeout: '60s',
  });
}
```

{{< /code >}}

After:

{{< code >}}

```bash
$ K6_BROWSER_HEADLESS=false K6_BROWSER_TIMEOUT='60s' k6 run script.js
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
docker run --rm -i -e K6_BROWSER_HEADLESS=false -e K6_BROWSER_TIMEOUT='60s' grafana/k6:master-with-browser run - <script.js
```

```windows
C:\k6> set "K6_BROWSER_HEADLESS=false" && set "K6_BROWSER_TIMEOUT='60s' " && k6 run script.js
```

```powershell
PS C:\k6> $env:K6_BROWSER_HEADLESS="false" ; $env:K6_BROWSER_TIMEOUT='60s' ; k6 run script.js
```

{{< /code >}}

### Connecting to a remote browser

Before:

{{< code >}}

<!-- eslint-skip -->

```javascript
export default async function () {
  const remoteURL = 'REMOTE_URL';
  const browser = chromium.connect(remoteURL);
  const page = browser.newPage();
}
```

{{< /code >}}

After:

{{< code >}}

```bash
$ K6_BROWSER_WS_URL='REMOTE_URL' k6 run script.js
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
docker run --rm -i -e K6_BROWSER_WS_URL='REMOTE_URL' grafana/k6:master-with-browser run - <script.js
```

```windows
C:\k6> set "K6_BROWSER_WS_URL='REMOTE_URL'" && set "K6_BROWSER_TIMEOUT='60s' && k6 run script.js
```

```powershell
PS C:\k6> $env:K6_BROWSER_WS_URL='REMOTE_URL' ; k6 run script.js
```

{{< /code >}}

{{% admonition type="note" %}}

The following browser options are no longer supported: `devtools`, `env`, and `proxy` since they weren't providing much value. `slowMo` has been temporarily removed, and we're working on reintroducing it.

{{% /admonition %}}

## Scenario options

You must now set the [executor](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors) and browser type as options in a [scenario](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios) definition. Specifically, the `browser.type` option should be set to `chromium`, as Chromium is the only browser supported.

{{< code >}}

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
};
```

{{< /code >}}

## Opening and closing a page

You can open a new page by using the imported [browser](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser#browser-module-api) object's [browser.newPage()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/newpage) method. You can still use the [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page) object as before.

{{< code >}}

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

{{< /code >}}

{{< code >}}

<!-- eslint-skip -->

```javascript
export default async function () {
  const page = browser.newPage();
  // ...
  page.close();
}
```

{{< /code >}}

The `browser.close()` method has been removed, so you can remove that from your scripts and use [`page.close()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/close) once you're done using the page object.

{{% admonition type="note" %}}

Closing of the page is critical for the calculation of accurate Web Vital metrics. See the [browser metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/metrics) for more details.

{{% /admonition %}}

## Browser context limit

The new browser implementation limits the usage to a single active [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) per iteration. This change enhances the prediction of resource requirements for a test run and promotes the use of [scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios) to separate independent browser sessions.

- A new [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) can be created either with the [browser.newContext()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/newcontext) or [browser.newPage()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/newpage) methods.
- If a new [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) needs to be created, the existing one must be closed first using the [browserContext.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/close) method.
- Alongside these changes, the `browser.contexts()` method has been altered to [browser.context()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/context) to retrieve the current [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext).

For instance, the code below will not function as intended, as it attempts to execute two simultaneous [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext)s within the same iteration.

{{< code >}}

<!-- eslint-skip -->

```javascript
export default async function () {
  const context1 = browser.newContext();
  // Simultaneous browser contexts are not permitted!
  const context2 = browser.newContext();
}
```

{{< /code >}}

On the other hand, the next example will function correctly by closing the initial [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) prior to establishing a new one.

{{< code >}}

<!-- eslint-skip -->

```javascript
export default async function () {
  const context1 = browser.newContext();
  context1.close();

  // Since the first browser context is closed, a new browser context can be created.
  const context2 = browser.newContext();
  context2.close();
}
```

{{< /code >}}

These updates make the usage of the API more straightforward for users, aiding in more consistent and automatic resource management.

For all the details, make sure to review the complete changelog for [k6 version 0.46](https://github.com/grafana/k6/releases/tag/v0.46.0). For more information watch [k6 Office Hours #98](https://www.youtube.com/watch?v=fK6Hpvt0pY0), where we discuss the latest changes in k6 browser, and, as always, ask in [the community forum](https://community.grafana.com/c/grafana-k6/k6-browser/79) if you need help!
