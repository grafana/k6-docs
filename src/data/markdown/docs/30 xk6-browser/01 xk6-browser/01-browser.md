---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

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
- [browser.newContext([options])](#browser-newcontext-options)
- [browser.newPage([options])](#browser-newpage-options)
- [browser.version()](#browser-version)
- 🚧 [browser.newBrowserCDPSession()](#browser-newbrowsercdpsession)
- 🚧 [browser.on()](#browser-on)
- ❌ [browser.startTracing()](#browser-starttracing)
- ❌ [browser.stopTracing()](#browser-stoptracing)


## browser.close()

In case this browser is obtained using [browserType.launch([options])](03-browser-type.md#launch), closes the browser and all of its pages (if any were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the browser server.

The [Browser](01-browser.md) object itself is considered to be disposed and cannot be used anymore.

## browser.contexts()

Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

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

### options: returns <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>

You can customize the creation of a new browser context using the following options.

<!-- vale off -->

| Option            | Type                   | Description |
| ----------------- | ---------------------- | ----------- |
| acceptDownloads   | boolean                | TODO |
| bypassCSP         | boolean                | TODO |
| colorScheme       | string                 | Emulates 'prefers-colors-scheme' media feature. It can be one of `"light"`, `"dark"`, `"no-preference"`. |
| deviceScaleFactor | number                 | TODO |
| extraHTTPHeaders  | object                 | TODO |
| geolocation       | object                 | See [geolocation](#newcontext-geolocation). |
| hasTouch          | boolean                | TODO |
| httpCredentials   | object                 | Credentials for HTTP authentication. See: [httpCredentials](#newcontext-http-credentials). |
| ignoreHTTPSErrors | boolean                | TODO |
| isMobile          | boolean                | TODO |
| javaScriptEnabled | boolean                | TODO |
| locale            | string                 | TODO |
| offline           | boolean                | TODO |
| permissions       | Array                  | TODO |
| reducedMotion     | string                 | TODO |
| screen            | object                 | Emulates consistent window screen size available inside web page via window.screen. Is only used when the viewport is set. See: [screen](#newcontext-screen) |
| timezoneID        | xx                     | TODO |
| userAgent         | xx                     | TODO |
| videosPath        | xx                     | TODO |
| viewport          | xx                     | TODO |

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

<a name="#newcontext-screen"></a>

### screen option

| Option   | Type   | Description |
| -------- | ------ | ----------- |
| username | string | Username to pass to the web browser for Basic HTTP Authentication. |
| password | string | Password to pass to the web browser for Basic HTTP Authentication. |


Not yet implemented options:

  * `baseURL`, `forcedColors`, `logger`, `proxy`, `recordHar`, `recordVideo`, `storageState`, `strictSelectors`, `videoSize`.

## browser.newPage([options])

## browser.on()

## browser.startTracing()

## browser.stopTracing()

## browser.version()
