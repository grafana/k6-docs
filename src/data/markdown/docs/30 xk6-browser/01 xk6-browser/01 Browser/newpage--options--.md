---
title: 'newPage([options])'
excerpt: 'xk6-browser: Browser.newPage method'
---

Creates a new [Page](/javascript-api/xk6-browser/page/) in a new [BrowserContext](/javascript-api/xk6-browser/browsercontext/) and returns the page.

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### Returns

| Type   | Description                                      |
| ------ | ------------------------------------------------ |
| object | [Page](/javascript-api/xk6-browser/page/) object |

You can customize the creation of a new page using the following options.

### options

| Option                                                              | Type    | Description                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr>bypassCSP</nobr>                                                           | boolean | Whether to bypass a page's Content-Security-Policy. |
| <nobr>colorScheme</nobr>                                                         | string  | Whether to display a page in dark or light mode by emulating the 'prefers-colors-scheme' media feature. It can be one of `'light'`, `'dark'`, `'no-preference'`. See [page.emulateMedia](/javascript-api/xk6-browser/page#page-emulatemedia-options) for the options and the [example](https://github.com/grafana/xk6-browser/blob/main/examples/colorscheme.js). Defaults to `'light'`. |
| <nobr><span title="Work in progress">[🚧](https://github.com/grafana/xk6-browser/issues/433)</span> deviceScaleFactor</nobr>          | number  | Sets the resolution ratio in physical pixels to the resolution in CSS pixels. See the [link](https://github.com/grafana/xk6-browser/blob/main/examples/device_emulation.js) as an example. Defaults to `1`. |
| <nobr>extraHTTPHeaders</nobr>                                                    | object  | Contains additional HTTP headers to be sent with every request, where the keys are HTTP headers and values are HTTP header values.                                                                                                                                                                                                                                                       |
| <nobr><span title="Work in progress">[🚧](https://github.com/grafana/xk6-browser/issues/435)</span> geolocation</nobr>                | object  | Sets the user's geographical location. See [geolocation](#geolocation-options) for the options. |
| <nobr><span title="Work in progress">[🚧](https://github.com/grafana/xk6-browser/issues/436)</span> hasTouch</nobr>                   | boolean | Whether to simulate a device with touch events. Defaults to `false`. |
| <nobr>httpCredentials</nobr>                                                     | object  | Sets the credentials for HTTP authentication using Basic Auth. See: [httpCredentials](#httpcredentials-options).                                                                                                                                                                                                                                                                                          |
| <nobr>ignoreHTTPSErrors</nobr>                                                   | boolean | Whether to ignore HTTPS errors that may be caused by invalid certificates. Defaults to `false`.                                                                                                                                                                                                                                                                                          |
| <nobr>isMobile</nobr>                                                            | boolean | Whether to simulate a mobile device. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                |
| <nobr>javaScriptEnabled</nobr>                                                   | boolean | Whether to activate JavaScript support for the context. Defaults to `true`.                                                                                                                                                                                                                                                                                                              |
| <nobr>locale</nobr>                                                              | string  | Specifies the user's locale, such as `en-US`, `tr-TR`, etc.                                                                                                                                                                                                                                                                                                                              |
| <nobr>offline</nobr>                                                             | boolean | Whether to emulate an offline network. Defaults to `false`.                                                                                                                                                                                                                                                                                                                              |
| <nobr>permissions</nobr>                                                         | Array   | Permissions to grant for the context's pages. See [browserContext.grantPermissions()](/javascript-api/xk6-browser/browsercontext#browsercontext-grantpermissions-permissions-options) for the options.                                                                                                                                                                                   |
| <nobr>reducedMotion</nobr>                                                       | string  | Minimizes the amount of motion by emulating the 'prefers-reduced-motion' media feature. It can be one of `'reduce'` and `'no-preference'`. See [page.emulateMedia()](/javascript-api/xk6-browser/page#page-emulatemedia-options) for the options. Defaults to `'no-preference'`.                                                                                                         |
| <nobr>screen</nobr>                                                              | object  | Sets a window screen size for all pages in the context. It can only be used when the viewport is set. See: [screen](#screen-options) for the options.                                                                                                                                                                                                                                    |
| <nobr>timezoneID</nobr>                                                          | string  | Changes the context's timezone. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.                                                                                                                                                        |
| <nobr>userAgent</nobr>                                                           | string  | Specifies the user agent to use in the context.                                                                                                                                                                                                                                                                                                                                          |
| <nobr>viewport</nobr>                                                            | object  | Sets a viewport size for all pages in the context. `null` disables the default viewport. See: [viewport](#viewport-options) for the options. Defaults to `1280x720`.                                                                                                                                                                                                                     |


<!-- vale on -->

### geolocation options

| Option    | Type   | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| latitude  | number | Latitude should be between `-90` and `90`.                      |
| longitude | number | Longitude should be between `-180` and `180`.                   |
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

### storageSpace options

| Option  | Type  | Description                                                                                              |
| ------- | ----- | -------------------------------------------------------------------------------------------------------- |
| cookies | Array | A list of `cookie` objects. See [storageSpace cookies](#storagespace-cookies-options) for details.       |
| origins | Array | A list of `localStorage` objects. See [storageSpace origins](#storagespace-origins-options) for details. |

#### storageSpace cookies options

| Option   | Type    | Description                                                                        |
| -------- | ------- | ---------------------------------------------------------------------------------- |
| name     | string  | Cookie name.                                                                       |
| value    | string  | Cookie value.                                                                      |
| domain   | string  | Cookie domain (_required_).                                                        |
| path     | string  | Cookie path (_required_).                                                          |
| expires  | number  | Cookie expiration time as Unix time in seconds.                                    |
| httpOnly | boolean | When enabled, the cookie will be inaccessible to `document.cookie` Javascript API. |
| secure   | boolean | When enabled, the cookie will be encrypted and sent over the HTTPS protocol.       |
| sameSite | string  | It can be one of `'Strict'`, `'Lax'`, or `'None'`.                                 |

#### storageSpace origins options

| Option       | Type   | Description                                                             |
| ------------ | ------ | ----------------------------------------------------------------------- |
| origin       | string | Sets the localStorage's origin.                                         |
| localStorage | Array  | A list of name and value pair objects where name and value are strings. |

### Example

<!-- eslint-skip -->

```javascript
import launcher from 'k6/x/browser';
import { check } from 'k6';

export default function() {
  const browser = launcher.launch('chromium');

  // creates a new page in default BrowserContext.
  const page = browser.newPage();

  page.goto('https://test.k6.io/');

  page.close();
  browser.close();
}
```