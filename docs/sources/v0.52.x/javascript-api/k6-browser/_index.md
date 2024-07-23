---
title: 'k6/browser'
description: 'An overview of the browser-level APIs from browser module.'
weight: 02
---

# browser

The browser module APIs aim for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright).

Note that because k6 does not run in NodeJS, the browser module APIs will slightly differ from their Playwright counterparts.

You can find examples of using [the browser module API](#browser-module-api) in our [getting started guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser).

{{% admonition type="note" %}}

To work with the browser module, make sure you are using the latest [k6 version](https://github.com/grafana/k6/releases).

{{% /admonition %}}

## Properties

The table below lists the properties you can import from the browser module (`'k6/browser'`).

| Property | Description                                                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| browser  | The browser module API is the entry point for all your tests. See the [example](#example) and the [API](#browser-module-api) below.                                                  |
| devices  | Returns predefined emulation settings for many end-user devices that can be used to simulate browser behavior on a mobile device. See the [devices example](#devices-example) below. |

## Browser Module API

The browser module is the entry point for all your tests, and it is what interacts with the actual web browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:

- [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext) which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page) which is where your rendered site is displayed.

{{< docs/shared source="k6" lookup="javascript-api/k6-browser-module.md" version="<K6_VERSION>" >}}

### Example

{{< code >}}

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

Then, you can run the test with this command. Also, see the [browser module options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/options) for customizing the browser module's behavior using environment variables.

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
docker run --rm -i grafana/k6:master-with-browser run - <script.js
```

```windows
C:\k6> k6 run script.js
```

```windows-powershell
PS C:\k6> k6 run script.js
```

{{< /code >}}

### Devices Example

To emulate the browser behaviour on a mobile device and approximately measure the browser performance, you can import `devices` from `k6/browser`.

{{< code >}}

```javascript
import { browser, devices } from 'k6/browser';

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const iphoneX = devices['iPhone X'];
  const context = await browser.newContext(iphoneX);
  const page = await context.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}
```

{{< /code >}}

## Browser-level APIs

{{< docs/shared source="k6" lookup="javascript-api/k6-browser-api.md" version="<K6_VERSION>" >}}
