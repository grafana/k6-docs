---
title: 'newPage()'
excerpt: 'xk6-browser: Browser.newPage method'
---

<BrowserCompatibility/>

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
| acceptDownloads                                                     | boolean | Whether to automatically download files. Defaults to `true`.                                                                                                                                                                                                                                                                                                                             |
| <span title="Not implemented">❌</span> baseURL                     | string  | The base URL to use for all relative URLs. For example: `/open-source/` will be converted to `https://k6.io/open-source/` if `baseURL` is set to `https://k6.io`.                                                                                                                                                                                                                        |
| bypassCSP                                                           | boolean | Whether to bypass a page's Content-Security-Policy.                                                                                                                                                                                                                                                                                                                                      |
| colorScheme                                                         | string  | Whether to display a page in dark or light mode by emulating the 'prefers-colors-scheme' media feature. It can be one of `'light'`, `'dark'`, `'no-preference'`. See [page.emulateMedia](/javascript-api/xk6-browser/page#page-emulatemedia-options) for the options and the [example](https://github.com/grafana/xk6-browser/blob/main/examples/colorscheme.js). Defaults to `'light'`. |
| deviceScaleFactor                                                   | number  | Sets the resolution ratio in physical pixels to the resolution in CSS pixels. See the [link](https://github.com/grafana/xk6-browser/blob/main/examples/device_emulation.js) as an example. Defaults to `1`.                                                                                                                                                                              |
| extraHTTPHeaders                                                    | object  | Contains additional HTTP headers to be sent with every request, where the keys are HTTP headers and values are HTTP header values.                                                                                                                                                                                                                                                       |
| <span title="Not implemented">❌</span> forcedColors                | string  | Enforces a limited color palette on the page by emulating `forced-colors` media feature. It can be one of `'active'` or `'none'`. Defaults to `'none'`.                                                                                                                                                                                                                                  |
| geolocation                                                         | object  | Sets the user's geographical location. See [geolocation](#geolocation-options) for the options.                                                                                                                                                                                                                                                                                          |
| hasTouch                                                            | boolean | Whether to simulate a device with touch events. Defaults to `false`.                                                                                                                                                                                                                                                                                                                     |
| httpCredentials                                                     | object  | Sets the credentials for HTTP authentication. See: [httpCredentials](#httpcredentials-options).                                                                                                                                                                                                                                                                                          |
| ignoreHTTPSErrors                                                   | boolean | Whether to ignore HTTPS errors that may be caused by invalid certificates. Defaults to `false`.                                                                                                                                                                                                                                                                                          |
| isMobile                                                            | boolean | Whether to simulate a mobile device. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                |
| javaScriptEnabled                                                   | boolean | Whether to activate JavaScript support for the context. Defaults to `true`.                                                                                                                                                                                                                                                                                                              |
| locale                                                              | string  | Specifies the user's locale, such as `en-US`, `tr-TR`, etc.                                                                                                                                                                                                                                                                                                                              |
| <span title="Not implemented">❌</span> logger                      | object  | Specifies the logger to use in xk6-browser.                                                                                                                                                                                                                                                                                                                                              |
| offline                                                             | boolean | Whether to emulate an offline network. Defaults to `false`.                                                                                                                                                                                                                                                                                                                              |
| permissions                                                         | Array   | Permissions to grant for the context's pages. See [browserContext.grantPermissions()](/javascript-api/xk6-browser/browsercontext#browsercontext-grantpermissions-permissions-options) for the options.                                                                                                                                                                                   |
| <span title="Not implemented">❌</span> proxy                       | object  | Sets the network proxy settings for the context.                                                                                                                                                                                                                                                                                                                                         |
| <span title="Not implemented">❌</span> recordHar                   | object  | Activates HAR recording for the context's pages.                                                                                                                                                                                                                                                                                                                                         |
| [❌](https://github.com/grafana/xk6-browser/issues/103) recordVideo | object  | Activates video recording for the context's pages.                                                                                                                                                                                                                                                                                                                                       |
| reducedMotion                                                       | string  | Minimizes the amount of motion by emulating the 'prefers-reduced-motion' media feature. It can be one of `'reduce'` and `'no-preference'`. See [page.emulateMedia()](/javascript-api/xk6-browser/page#page-emulatemedia-options) for the options. Defaults to `'no-preference'`.                                                                                                         |
| screen                                                              | object  | Sets a window screen size for all pages in the context. It can only be used when the viewport is set. See: [screen](#screen-options) for the options.                                                                                                                                                                                                                                    |
| <span title="Not implemented">❌</span> storageSpace                | object  | Saves the given data in the default browser context. See [storageSpace options](#storagespace-options) for more details.                                                                                                                                                                                                                                                                 |
| <span title="Not implemented">❌</span> strictSelectors             | bool    | Whether to activate the strict selectors mode.                                                                                                                                                                                                                                                                                                                                           |
| timezoneID                                                          | string  | Changes the context's timezone. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.                                                                                                                                                        |
| userAgent                                                           | string  | Specifies the user agent to use in the context.                                                                                                                                                                                                                                                                                                                                          |
| viewport                                                            | object  | Sets a viewport size for all pages in the context. `null` disables the default viewport. See: [viewport](#viewport-options) for the options. Defaults to `1280x720`.                                                                                                                                                                                                                     |


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