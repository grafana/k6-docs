---
title: 'newContext([options])'
excerpt: 'xk6-browser: Browser.newContext method'
---

Creates and returns a new browser context.

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### Returns

| Type   | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| object | [BrowserContext](/javascript-api/xk6-browser/browsercontext/) object |

### options

You can customize the creation of a new browser context using the following options.

<!-- vale off -->

| State | Option                                                              | Type    | Description                                                                                                                                                                                                                                                                                                                                                                              |
| - | ------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span title="Not implemented">[❌](https://github.com/grafana/xk6-browser/issues/98)</span>  | acceptDownloads             | boolean | Whether to automatically download files. Defaults to `true`. |
| <span title="Not implemented">[❌](https://github.com/grafana/xk6-browser/issues/432)</span> | baseURL                     | string  | The base URL to use for all relative URLs. For example: `/open-source/` will be converted to `https://k6.io/open-source/` if `baseURL` is set to `https://k6.io`. |
| <span title="Implemented">✅</span> | bypassCSP                                                           | boolean | Whether to bypass a page's Content-Security-Policy. |
| <span title="Implemented">✅</span> | colorScheme                                                         | string  | Whether to display a page in dark or light mode by emulating the 'prefers-colors-scheme' media feature. It can be one of `'light'`, `'dark'`, `'no-preference'`. See [page.emulateMedia](/javascript-api/xk6-browser/page#page-emulatemedia-options) for the options and the [example](https://github.com/grafana/xk6-browser/blob/main/examples/colorscheme.js). Defaults to `'light'`. |
| <span title="Work in progress">[🚧](https://github.com/grafana/xk6-browser/issues/433)</span> | deviceScaleFactor          | number  | Sets the resolution ratio in physical pixels to the resolution in CSS pixels. See the [link](https://github.com/grafana/xk6-browser/blob/main/examples/device_emulation.js) as an example. Defaults to `1`. |
| <span title="Implemented">✅</span> | extraHTTPHeaders                                                    | object  | Contains additional HTTP headers to be sent with every request, where the keys are HTTP headers and values are HTTP header values. |
| <span title="Not implemented">❌</span> | forcedColors                | string  | Enforces a limited color palette on the page by emulating `forced-colors` media feature. It can be one of `'active'` or `'none'`. Defaults to `'none'`.                                                                                                                                                                                                                                  |
| <span title="Work in progress">[🚧](https://github.com/grafana/xk6-browser/issues/435)</span> | geolocation                | object  | Sets the user's geographical location. See [geolocation](#geolocation-options) for the options. |
| <span title="Work in progress">[🚧](https://github.com/grafana/xk6-browser/issues/436)</span> | hasTouch                   | boolean | Whether to simulate a device with touch events. Defaults to `false`. |
| <span title="Implemented">✅</span> | httpCredentials                                                     | object  | Sets the credentials for HTTP authentication using Basic Auth. See: [httpCredentials](#httpcredentials-options).                                                                                                                                                                                                                                                                                          |
| <span title="Implemented">✅</span> | ignoreHTTPSErrors                                                   | boolean | Whether to ignore HTTPS errors that may be caused by invalid certificates. Defaults to `false`.                                                                                                                                                                                                                                                                                          |
| <span title="Implemented">✅</span> | isMobile                                                            | boolean | Whether to simulate a mobile device. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                |
| <span title="Implemented">✅</span> | javaScriptEnabled                                                   | boolean | Whether to activate JavaScript support for the context. Defaults to `true`.                                                                                                                                                                                                                                                                                                              |
| <span title="Implemented">✅</span> | locale                                                              | string  | Specifies the user's locale, such as `en-US`, `tr-TR`, etc.                                                                                                                                                                                                                                                                                                                              |
| <span title="Not implemented">❌</span> | logger                      | object  | Specifies the logger to use in xk6-browser.                                                                                                                                                                                                                                                                                                                                              |
| <span title="Implemented">✅</span> | offline                                                             | boolean | Whether to emulate an offline network. Defaults to `false`.                                                                                                                                                                                                                                                                                                                              |
| <span title="Implemented">✅</span> | permissions                                                         | Array   | Permissions to grant for the context's pages. See [browserContext.grantPermissions()](/javascript-api/xk6-browser/browsercontext#browsercontext-grantpermissions-permissions-options) for the options.                                                                                                                                                                                   |
| <span title="Not implemented">❌</span> | proxy                       | object  | Sets the network proxy settings for the context.                                                                                                                                                                                                                                                                                                                                         |
| <span title="Not implemented">❌</span> | recordHar                   | object  | Activates HAR recording for the context's pages.                                                                                                                                                                                                                                                                                                                                         |
| <span title="Not implemented">[❌](https://github.com/grafana/xk6-browser/issues/103)</span> | recordVideo | object  | Activates video recording for the context's pages.                                                                                                                                                                                                                                                                                                                                       |
| <span title="Implemented">✅</span> | reducedMotion                                                       | string  | Minimizes the amount of motion by emulating the 'prefers-reduced-motion' media feature. It can be one of `'reduce'` and `'no-preference'`. See [page.emulateMedia()](/javascript-api/xk6-browser/page#page-emulatemedia-options) for the options. Defaults to `'no-preference'`.                                                                                                         |
| <span title="Implemented">✅</span> | screen                                                              | object  | Sets a window screen size for all pages in the context. It can only be used when the viewport is set. See: [screen](#screen-options) for the options.                                                                                                                                                                                                                                    |
| <span title="Not implemented">❌</span> | strictSelectors             | bool    | Whether to activate the strict selectors mode.                                                                                                                                                                                                                                                                                                                                           |
| <span title="Implemented">✅</span> | timezoneID                                                          | string  | Changes the context's timezone. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.                                                                                                                                                        |
| <span title="Implemented">✅</span> | userAgent                                                           | string  | Specifies the user agent to use in the context.                                                                                                                                                                                                                                                                                                                                          |
| <span title="Implemented">✅</span> | viewport                                                            | object  | Sets a viewport size for all pages in the context. `null` disables the default viewport. See: [viewport](#viewport-options) for the options. Defaults to `1280x720`.                                                                                                                                                                                                                     |

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