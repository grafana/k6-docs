---
title: 'browser'
excerpt: 'An overview of the browser-level APIs from browser module.'
---

<ExperimentalBlockquote />

The browser module APIs aim for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright).

Note that because k6 does not run in NodeJS, the browser module APIs will slightly differ from their Playwright counterparts.

You can find examples of using [the browser module API](#browser-module-api) in our [getting started guide](/using-k6-browser).

<Blockquote mod="note" title="">

To work with the browser module, make sure you are using the latest [k6 version](https://github.com/grafana/k6/releases).

</Blockquote>

## Importable Properties

The table below lists the importable properties from the top level module (`'k6/experimental/browser'`).

| Property | Description                                                                                                                                                                          |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| browser | The browser module API is the entry point for all your tests. See the [example](#example) and the [API](#browser-module-api) below. |
| devices  | Returns predefined emulation settings for many end-user devices that can be used to simulate browser behavior on a mobile device. See the [devices example](#devices-example) below. |


## Browser Module API

The browser module is the entry point for all your tests, and it is what interacts with the actual web browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:
- [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](/javascript-api/k6-experimental/browser/page/) which is where your rendered site is displayed.

| Method                                                                                    | Description                                                                                                                                           |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [browser.contexts()](/javascript-api/k6-experimental/browser/contexts)                        | Lets you access all open [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)s.                                                        |
| [browser.isConnected](/javascript-api/k6-experimental/browser/isconnected) <BWIPT id="453"/>  | Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.                  |
| [browser.newContext([options])](/javascript-api/k6-experimental/browser/newcontext/) <BWIPT id="455"/> | Creates and returns a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/).                                                             |
| [browser.newPage([options])](/javascript-api/k6-experimental/browser/newpage)  <BWIPT id="455"/>       | Creates a new [Page](/javascript-api/k6-experimental/browser/page/) in a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) and returns the page. |
| [browser.version()](/javascript-api/k6-experimental/browser/version/)                          | Returns the browser application's version.                                                                                                            |

### Example

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/experimental/browser';

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
    checks: ["rate==1.0"]
  }
}

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}
```

</CodeGroup>


## Browser-level APIs

| k6 Class                                                                | Description                                                                                                                                                     |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) <BWIPT /> | Enables independent browser sessions with separate [Page](/javascript-api/k6-experimental/browser/page/)s, cache, and cookies.                                              |
| [ElementHandle](/javascript-api/k6-experimental/browser/elementhandle/) <BWIPT />   | Represents an in-page DOM element.                                                                                                                              |
| [Frame](/javascript-api/k6-experimental/browser/frame/) <BWIPT />                   | Access and interact with the [`Page`](/javascript-api/k6-experimental/browser/page/).'s `Frame`s.                                                                           |
| [JSHandle](/javascript-api/k6-experimental/browser/jshandle)                        | Represents an in-page JavaScript object.                                                                                                                        |
| [Keyboard](/javascript-api/k6-experimental/browser/keyboard/)                       | Used to simulate the keyboard interactions with the associated [`Page`](/javascript-api/k6-experimental/browser/page/).                                                     |
| [Locator](/javascript-api/k6-experimental/browser/locator/)                         | The Locator API makes it easier to work with dynamically changing elements.                                                                                     |
| [Mouse](/javascript-api/k6-experimental/browser/mouse/)                             | Used to simulate the mouse interactions with the associated [`Page`](/javascript-api/k6-experimental/browser/page/).                                                        |
| [Page](/javascript-api/k6-experimental/browser/page/) <BWIPT />                     | Provides methods to interact with a single tab in a [`Browser`](/javascript-api/k6-experimental/browser/browser-class/).                                                          |
| [Request](/javascript-api/k6-experimental/browser/request/) <BWIPT />               | Used to keep track of the request the [`Page`](/javascript-api/k6-experimental/browser/page/) makes.                                                                        |
| [Response](/javascript-api/k6-experimental/browser/response/) <BWIPT />             | Represents the response received by the [`Page`](/javascript-api/k6-experimental/browser/page/).                                                                            |
| [Touchscreen](/javascript-api/k6-experimental/browser/touchscreen/)                 | Used to simulate touch interactions with the associated [`Page`](/javascript-api/k6-experimental/browser/page/).                                                            |
| [Worker](/javascript-api/k6-experimental/browser/worker/)                           | Represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).                                                            |


## Browser Module Options

You can customize the behavior of the browser module by providing browser options as environment variables.

| Environment Variable | Description |
| -------------------- | ----------- |
| K6_BROWSER_ARGS | Extra command line arguments to include when launching browser process. See [this link](https://peter.sh/experiments/chromium-command-line-switches/) for a list of Chromium arguments. Note that arguments should not start with `--` (see the [example](#example)). |
| K6_BROWSER_DEBUG | All CDP messages and internal fine grained logs will be logged if set to `true`. |
| K6_BROWSER_EXECUTABLE_PATH | Override search for browser executable in favor of specified absolute path. |
| K6_BROWSER_HEADLESS | Show browser GUI or not. `true` by default. |
| K6_BROWSER_IGNORE_DEFAULT_ARGS | Ignore any of the [default arguments](#default-arguments) included when launching a browser process. |
| K6_BROWSER_TIMEOUT | Default timeout to use for various actions and navigation. `'30s'` if not set. |

### Example

<CodeGroup labels={["Bash", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ K6_BROWSER_ARGS='show-property-changed-rects' k6 run script.js
```

```bash
C:\k6> set "K6_BROWSER_ARGS='show-property-changed-rects' " && k6 run script.js
```

```bash
PS C:\k6> $env:K6_BROWSER_ARGS='show-property-changed-rects' ; k6 run script.js
```

</CodeGroup>


## Default arguments

List of default arguments included when launching the browser process. You can pass one or more of the arguments to the `K6_BROWSER_IGNORE_DEFAULT_ARGS` environment variable when starting a test for the ones you want to ignore.

<Blockquote mod="note">

The starting '--' have been omitted from the argument names in these lists.

</Blockquote>

| Argument | Value  | Description                                            |
|----------|--------|--------------------------------------------------------|
| disable-background-networking | `true` | Disables several subsystems which run network requests in the background. This is used during network performance testing to avoid measurement noise. |
| enable-features | NetworkService,<br />NetworkServiceInProcess | Comma-separated list of feature names to enable. |
| disable-background-timer-throttling | `true` | Disables task throttling of timer tasks from background pages. |
| disable-backgrounding-occluded-windows | `true` | Disables backgrounding renders for occluded windows. Done for tests to avoid nondeterministic behavior. |
| disable-breakpad | `true` | Disables the crash reporting. |
| disable-component-extensions<br />-with-background-pages | `true` | Disables default component extensions with background pages. Useful for performance tests where these pages may interfere with results. |
| disable-default-apps | `true` | Disables the installation of default apps on the first run. This is used during automated testing. |
| disable-dev-shm-usage | `true` | The /dev/shm partition is too small in certain VM environments, causing Chrome to fail or crash. This flag provides a work-around for this issue (a temporary directory will always be used to create anonymous shared memory files). |
| disable-extensions | `true` | Disables extensions. |
| disable-features | ImprovedCookieControls,<br />LazyFrameLoading,<br />GlobalMediaControls,<br />DestroyProfileOnBrowserClose,<br />MediaRouter,<br />AcceptCHFrame | Comma-separated list of feature names to disable. |
| disable-hang-monitor | `true` | Suppresses hang monitor dialogs in renderer processes. This may allow slow unload handlers on a page to prevent the tab from closing, but the Task Manager can be used to terminate the offending process in this case. |
| disable-ipc-flooding-protection | `true` | Disables the IPC flooding protection. It is activated by default. Some javascript functions can be used to flood the browser process with IPC. This protection limits the rate at which they can be used. |
| disable-popup-blocking | `true` | Disables pop-up blocking. |
| disable-prompt-on-repost | `true` | Usually, when the user attempts to navigate to a page that was the result of a post request, the browser prompts to make sure that's the intention of the user. This switch may be used to disable that check during automated testing.  |
| disable-renderer-backgrounding | `true` | Prevents renderer process backgrounding when set. |
| force-color-profile | `srgb` | Forces all monitors to be treated as though they have the specified color profile. Accepted values are "srgb" and "generic-rgb" (currently used by Mac layout tests) and "color-spin-gamma24" (used by layout tests). |
| metrics-recording-only | `true` | Enables the recording of metrics reports but disables reporting. This executes all the code that a normal client would use for reporting, except the report is dropped rather than sent to the server. This is useful for finding issues in the metrics code during UI and performance tests. |
| no-first-run | `true` | Skips the "First Run" tasks, whether or not it's the first run, and the "What's New" page. This does not drop the "First Run" sentinel and thus doesn't prevent "First Run" from occurring the next time Chromium is launched without this flag. It also does not update the last "What's New" milestone, so it does not prevent "What's New" from occurring the next time Chromium is launched without this flag. |
| enable-automation | `true` | Enables indication that the browser is controlled by automation. |
| password-store | `basic` | Specifies which encryption storage backend to use. The possible values are kwallet, kwallet5, gnome, gnome-keyring, gnome-libsecret, and basic. Any other value will lead to Chromium detecting the best backend automatically. |
| use-mock-keychain | `true` | Uses mock keychain on Mac to prevent the blocking permissions dialog about: "Chrome wants to use your confidential information stored in your keychain." |
| no-service-autorun | `true` | Disables the service process from adding itself as an autorun process. This does not delete existing autorun registrations, it just prevents the service from registering a new one. |
| no-startup-window | `true` | Does not automatically open a browser window on startup (used when launching Chrome for the purpose of hosting background apps). |
| no-default-browser-check | `true` | Disables the default browser check. Useful for UI/browser tests where we want to avoid having the default browser info-bar displayed. |
| headless | `true`/`false` | Run in headless mode, i.e., without a UI or display server dependencies. Set by [launch options](/javascript-api/k6-experimental/browser/browsertype/launch/) (default true).  |
| auto-open-devtools-for-tabs | `true`/`false` | This flag makes Chrome auto-open the DevTools window for each tab. It is intended to be used by developers and automation, not to require user interaction for opening DevTools. Set by [launch options](/javascript-api/k6-experimental/browser/browsertype/launch/) (default false). |
| window-size | `800,600` | Sets the initial window size. Provided as string in the format "800,600". |

Additionally if headless mode is set to `true` in [browser options](/javascript-api/k6-experimental/browser#browser_options), the following arguments are also set:

| Argument   | Value  | Description                                            |
|------------|--------|--------------------------------------------------------|
| hide-scrollbars | `true` | Prevents creating scrollbars for web content. Useful for taking consistent screenshots. |
| mute-audio | `true` | Mutes audio sent to the audio device so it is not audible during automated testing. |
| blink-settings | primaryHoverType=2,availableHoverTypes=2,<br />primaryPointerType=4,availablePointerTypes=4 | Sets blink settings. Format is <name\>[=<value\>],<name\>[=<value\>],... The names are declared in [settings.json5](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/settings.json5) from chromium project. For boolean type, use "true", "false", or omit '=<value\>' part to set to true. For enum type, use the int value of the enum value. |

### Devices Example

To emulate the browser behaviour on a mobile device and approximately measure the browser performance, you can import `devices` from `k6/experimental/browser`.

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { browser, devices } from 'k6/experimental/browser';

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
    checks: ["rate==1.0"]
  }
}

export default async function () {
  const iphoneX = devices['iPhone X'];
  const context = browser.newContext(iphoneX);
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}
```

</CodeGroup>
