---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

[X]: ## "Not implemented"

<BrowserCompatibility/>

A Browser is created via [browserType.launch([options])](03-browser-type.md#launch). An example of using a Browser to create a [Page](09-page.md):

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium');
  const context = browser.newContext();
  const page = context.newPage();
  const res = page.goto('https://test.k6.io/');
  page.close();
  browser.close();
}
```

- [browser.close()](#browser-close)
- [browser.contexts()](#browser-contexts)
- [browser.isConnected()](#browser-isconnected)
- 🚧 [browser.newBrowserCDPSession()](#browser-newbrowsercdpsession)
- [browser.newContext([options])](#browser-newcontext-options)
- [browser.newPage([options])](#browser-newpage-options)
- 🚧 [browser.on()](#browser-on)
- ❌ [browser.startTracing()](#browser-starttracing)
- ❌ [browser.stopTracing()](#browser-stoptracing)
- [browser.version()](#browser-version)

## browser.close()

Closes the browser and all of its pages (if any were opened).

The [Browser](01-browser.md) object itself is considered to be disposed and cannot be used anymore.

## browser.contexts()

Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

### Returns

| Type         | Description  |
| ------------ | ------------ |
| Array        | Array of [BrowserContext](../browsercontext/) objects |

<!-- eslint-skip -->

```javascript
const browser = launcher.launch('chromium');
console.log(browser.contexts().length); // prints `0`

const context = browser.newContext();
console.log(browser.contexts().length); // prints `1`
```

## browser.isConnected()

Indicates that the browser is connected.

## browser.newBrowserCDPSession()

Returns the newly created browser session.

> **Note**:
> CDP Sessions are only supported on Chromium-based browsers.

## browser.newContext([options])

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| options   | object | See [options](#newcontext-options). |

### Returns

| Type         | Description  |
| ------------ | ------------ |
| object       | [BrowserContext](../browsercontext/) object |

<a name="newcontext-options" style="visibility: hidden;"></a>

### options

You can customize the creation of a new browser context using the following options.

<!-- vale off -->

| Option                  | Type                   | Description |
| ----------------------- | ---------------------- | ----------- |
| acceptDownloads         | boolean                | Whether to automatically download all the attachments. Defaults to true where all the downloads are accepted. |
| [❌][X] baseURL         | string                 | - |
| bypassCSP               | boolean                | Toggles bypassing page's Content-Security-Policy. |
| colorScheme             | string                 | Emulates 'prefers-colors-scheme' media feature. It can be one of `"light"`, `"dark"`, `"no-preference"`. See [page.emulateMedia](../page#page-emulatemedia-options) for more details. Defaults to `"light"`. |
| deviceScaleFactor       | number                 | Specify device scale factor (can be thought of as dpr). Defaults to `1`. |
| extraHTTPHeaders        | object                 | An object containing additional HTTP headers to be sent with every request, where the keys are HTTP headers and values are HTTP header values. |
| [❌][X] forcedColors    | string                 | - |
| geolocation             | object                 | See [geolocation](#newcontext-geolocation). |
| hasTouch                | boolean                | Specifies if viewport supports touch events. Defaults to `false`. |
| httpCredentials         | object                 | Credentials for HTTP authentication. See: [httpCredentials](#newcontext-http-credentials). |
| ignoreHTTPSErrors       | boolean                | Whether to ignore HTTPS errors when sending network requests. Defaults to `false`. |
| isMobile                | boolean                | Whether the meta `viewport` tag is taken into account and touch events are enabled. Defaults to `false`. |
| javaScriptEnabled       | boolean                | Whether or not to enable JavaScript in the context. Defaults to `true`. |
| locale                  | string                 | Specify user locale, for example `en-GB`, `de-DE`, etc. |
| [❌][X] logger          | object                 | - |
| offline                 | boolean                | Whether to emulate network being offline. Defaults to `false`. |
| permissions             | Array                  | A list of permissions to grant to all pages in this context. See [browserContext.grantPermissions()](../browsercontext#browsercontext-grantpermissions-permissions-options) for more details. |
| [❌][X] proxy           | object                 | - |
| [❌][X] recordHar       | object                 | - |
| [❌][X] recordVideo     | object                 | - |
| reducedMotion           | string                 | Emulates 'prefers-reduced-motion' media feature, supported values are `"reduce"`, `"no-preference"`. See [page.emulateMedia()](../page#page-emulatemedia-options) for more details. Defaults to `"no-preference"`. |
| screen                  | object                 | Emulates consistent window screen size available inside web page via window.screen. Is only used when the viewport is set. See: [screen](#newcontext-screen) |
| [❌][X] strictSelectors | bool                   | - |
| timezoneID              | string                 | Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. |
| userAgent               | string                 | Specific user agent to use in this context.# |
| viewport                | object                 | Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. `null` disables the default viewport. See: [viewport](#newcontext-viewport). |

<!-- vale on -->

<a name="newcontext-geolocation" style="visibility: hidden;"></a>

### geolocation option

| Option    | Type   | Description |
| --------- | :----- | ----------- |
| latitude  | number | Latitude between -90 and 90. |
| longitude | number | Longitude between -180 and 180. |
| accuracy  | number | Non-negative accuracy value. Defaults to 0. |

<a name="newcontext-http-credentials"></a>

### httpCredentials option

| Option   | Type   | Description |
| -------- | ------ | ----------- |
| username | string | Username to pass to the web browser for Basic HTTP Authentication. |
| password | string | Password to pass to the web browser for Basic HTTP Authentication. |

<a name="newcontext-screen"></a>

### screen option

| Option   | Type   | Description |
| -------- | ------ | ----------- |
| username | string | Username to pass to the web browser for Basic HTTP Authentication. |
| password | string | Password to pass to the web browser for Basic HTTP Authentication. |

<!-- vale off -->

<a name="newcontext-viewport"></a>

### viewport option

<!-- vale on -->

| Option   | Type   | Description |
| -------- | ------ | ----------- |
| width    | number | Page width in pixels. |
| height   | number | Page height in pixels. |


## browser.newPage([options])

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| options   | object | See [options](#newpage-options). |

### Returns

| Type         | Description  |
| ------------ | ------------ |
| object       | [Page](../page/) object |

<a name="newpage-options"></a>

### options

You can customize the creation of a new page using the following options.

| Option                  | Type                   | Description |
| ----------------------- | ---------------------- | ----------- |
| acceptDownloads         | boolean                | Whether to automatically download all the attachments. Defaults to true where all the downloads are accepted. |

TODO

## browser.on()

TODO

## browser.startTracing()

TODO

## browser.stopTracing()

TODO

## browser.version()

TODO