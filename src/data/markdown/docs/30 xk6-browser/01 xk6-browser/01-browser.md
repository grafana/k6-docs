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
- 🚧 [browser.newBrowserCDPSession()](#browser-newbrowsercdpsession)
- [browser.newContext([options])](#browser-newcontext-options)
- [browser.newPage([options])](#browser-newpage-options)
- 🚧 [browser.on('disconnected')](#browser-on)
- ❌ [browser.startTracing()](#browser-starttracing)
- ❌ [browser.stopTracing()](#browser-stoptracing)
- [browser.version()](#browser-version)

## browser.close()

Closes the browser and all of its pages (if any were opened).

The [Browser](01-browser.md) object itself is considered to be disposed and cannot be used anymore.

## browser.contexts()

Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

### Returns

| Type  | Description                                           |
| ----- | ----------------------------------------------------- |
| Array | Array of [BrowserContext](../browsercontext/) objects |

<!-- eslint-skip -->

```javascript
const browser = launcher.launch('chromium');
console.log(browser.contexts().length); // prints `0`

const context = browser.newContext();
console.log(browser.contexts().length); // prints `1`
```

## browser.isConnected()

Indicates whether the WebSocket connection to the browser application is active or not.

### Returns

| Type    | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| boolean | Returns `true` if Browser is connected to the browser application. Otherwise, returns `false`. |

## browser.newContext([options])

Creates a new browser context. See [browser.newContext([options])](./browser-newcontext/) for more details.

## browser.newPage([options])

| Parameter | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| options   | object | See [options](#newpage-options) for more details. |

### Returns

| Type   | Description             |
| ------ | ----------------------- |
| object | [Page](../page/) object |

### newPage options

You can customize the creation of a new page using the following options.

| Option          | Type    | Description                                                                                                   |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| acceptDownloads | boolean | Whether to automatically download all the attachments. Defaults to true where all the downloads are accepted. |

TODO

## browser.on('disconnected')

Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:

* Browser application is closed or crashed.
* The [browser.close()](#browser-close) method was called.

| Parameter | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| event     | string | The only accepted event value is `'disconnected'`. |

### Returns

| Type    | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| promise | On returns a Promise that is resolved when the browser process is disconnected. |

TODO: @imiric, are these statements valid?

## browser.version()

### Returns

| Type   | Description                                |
| ------ | ------------------------------------------ |
| string | Returns the browser application's version. |
