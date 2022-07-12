---
title: 'newContext([options])'
excerpt: 'xk6-browser: Browser.newContext method'
---

Creates and returns a new [BrowserContexts](/javascript-api/xk6-browser/browsercontext/).

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### Returns

| Type   | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| object | [BrowserContext](/javascript-api/xk6-browser/browsercontext/) object |

### options

You can customize the creation of a new [BrowserContexts](/javascript-api/xk6-browser/browsercontext/) using the following options.

<!-- vale off -->

| Option                                           | Type    | Description                                                                                                                                                                                                                                                                      |
|--------------------------------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>bypassCSP</nobr>                           | boolean | Whether to bypass a page's Content-Security-Policy.                                                                                                                                                                                                                              |
| <nobr>colorScheme</nobr>                         | string  | Whether to display a page in dark or light mode by emulating the 'prefers-colors-scheme' media feature. It can be one of `'light'`, `'dark'`, `'no-preference'`. Defaults to `'light'`.                                                                                          |
| <nobr><BWIPT id="433"/> deviceScaleFactor</nobr> | number  | Sets the resolution ratio in physical pixels to the resolution in CSS pixels i.e. if set higher than `1`, then images will look sharper on high pixel density screens. See an [example](#devicescalefactor-example) below. Defaults to `1`.                                      |
| <nobr>extraHTTPHeaders</nobr>                    | object  | Contains additional HTTP headers to be sent with every request, where the keys are HTTP headers and values are HTTP header values.                                                                                                                                               |
| <nobr><BWIPT id="435"/> geolocation</nobr>       | object  | Sets the user's geographical location. See [geolocation](#geolocation-options) for the options.                                                                                                                                                                                  |
| <nobr><BWIPT id="436"/> hasTouch</nobr>          | boolean | Whether to simulate a device with touch events. Defaults to `false`.                                                                                                                                                                                                             |
| <nobr>httpCredentials</nobr>                     | object  | Sets the credentials for HTTP authentication using Basic Auth. See: [httpCredentials](#httpcredentials-options).                                                                                                                                                                 |
| <nobr>ignoreHTTPSErrors</nobr>                   | boolean | Whether to ignore HTTPS errors that may be caused by invalid certificates. Defaults to `false`.                                                                                                                                                                                  |
| <nobr>isMobile</nobr>                            | boolean | Whether to simulate a mobile device. Defaults to `false`.                                                                                                                                                                                                                        |
| <nobr>javaScriptEnabled</nobr>                   | boolean | Whether to activate JavaScript support for the context. Defaults to `true`.                                                                                                                                                                                                      |
| <nobr>locale</nobr>                              | string  | Specifies the user's locale, such as `en-US`, `tr-TR`, etc.                                                                                                                                                                                                                      |
| <nobr>offline</nobr>                             | boolean | Whether to emulate an offline network. Defaults to `false`.                                                                                                                                                                                                                      |
| <nobr>permissions</nobr>                         | Array   | Permissions to grant for the context's pages. See [browserContext.grantPermissions()](/javascript-api/xk6-browser/browsercontext#browsercontext-grantpermissions-permissions-options) for the options.                                                                           |
| <nobr>reducedMotion</nobr>                       | string  | Minimizes the amount of motion by emulating the 'prefers-reduced-motion' media feature. It can be one of `'reduce'` and `'no-preference'`. See [page.emulateMedia()](/javascript-api/xk6-browser/page#page-emulatemedia-options) for the options. Defaults to `'no-preference'`. |
| <nobr>screen</nobr>                              | object  | Sets a window screen size for all pages in the context. It can only be used when the viewport is set. See: [screen](#screen-options) for the options.                                                                                                                            |
| <nobr>timezoneID</nobr>                          | string  | Changes the context's timezone. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.                                                |
| <nobr>userAgent</nobr>                           | string  | Specifies the user agent to use in the context.                                                                                                                                                                                                                                  |
| <nobr>viewport</nobr>                            | object  | Sets a viewport size for all pages in the context. `null` disables the default viewport. See: [viewport](#viewport-options) for the options. Defaults to `1280x720`.                                                                                                             |

<!-- vale on -->

### geolocation options

| Option    | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| latitude  | number | Latitude should be between `-90` and `90`.            |
| longitude | number | Longitude should be between `-180` and `180`.         |
| accuracy  | number | Accuracy should only be a non-negative number. Defaults to `0`. |

### httpCredentials options

| Option   | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| username | string | Username to pass to the web browser for Basic HTTP Authentication. |
| password | string | Password to pass to the web browser for Basic HTTP Authentication. |

### screen options

| Option | Type   | Description            |
| ------ | ------ | ---------------------- |
| width  | number | Page width in pixels.  |
| height | number | Page height in pixels. |

<!-- vale off -->

### viewport options

<!-- vale on -->

| Option | Type   | Description            |
| ------ | ------ | ---------------------- |
| width  | number | Page width in pixels.  |
| height | number | Page height in pixels. |

<!-- vale off -->

### deviceScaleFactor example

```javascript
import k6b from 'k6/x/browser';

export default function () {
  const browser = k6b.launch('chromium', {
    headless: false,
  });

  const context = browser.newContext({
    viewport: {
      width: 375,
      height: 812,
    },
    deviceScaleFactor: 3,
  });
  const page = context.newPage();

  page.goto('https://k6.io/');

  page.close();
  browser.close();
}
```
