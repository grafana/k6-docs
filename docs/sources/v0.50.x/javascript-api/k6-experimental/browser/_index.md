---
title: 'browser'
description: 'An overview of the browser-level APIs from browser module.'
weight: 01
---

# browser

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

The browser module APIs aim for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright).

Note that because k6 does not run in NodeJS, the browser module APIs will slightly differ from their Playwright counterparts.

You can find examples of using [the browser module API](#browser-module-api) in our [getting started guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser).

{{% admonition type="note" %}}

To work with the browser module, make sure you are using the latest [k6 version](https://github.com/grafana/k6/releases).

{{% /admonition %}}

## Properties

The table below lists the properties you can import from the browser module (`'k6/experimental/browser'`).

| Property | Description                                                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| browser  | The browser module API is the entry point for all your tests. See the [example](#example) and the [API](#browser-module-api) below.                                                  |
| devices  | Returns predefined emulation settings for many end-user devices that can be used to simulate browser behavior on a mobile device. See the [devices example](#devices-example) below. |

## Browser Module API

The browser module is the entry point for all your tests, and it is what interacts with the actual web browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:

- [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page) which is where your rendered site is displayed.

| Method                                                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [browser.context()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/context)                                   | Returns the current [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext).                                                                                                                                                                                                                                                                                                                                                                   |
| [browser.closeContext()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/closecontext)                         | Closes the current [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext).                                                                                                                                                                                                                                                                                                                                                                    |
| [browser.isConnected](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/isconnected) <BWIPT id="453"/>           | Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.                                                                                                                                                                                                                                                                                                                                                                    |
| [browser.newContext([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/newcontext/) <BWIPT id="455"/> | Creates and returns a new [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext).                                                                                                                                                                                                                                                                                                                                                             |
| [browser.newPage([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/newpage) <BWIPT id="455"/>        | Creates a new [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page) in a new [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) and returns the page. Pages that have been opened ought to be closed using [`Page.close`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/close). Pages left open could potentially distort the results of Web Vital metrics. |
| [browser.version()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/version)                                   | Returns the browser application's version.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### Example

{{< code >}}

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
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}
```

{{< /code >}}

Then, you can run the test with this command. Also, see the [browser module options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser#browser-module-options) for customizing the browser module's behavior using environment variables.

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

## Browser-level APIs

| k6 Class                                                                                                                   | Description                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) <BWIPT /> | Enables independent browser sessions with separate [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page)s, cache, and cookies. |
| [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle) <BWIPT />   | Represents an in-page DOM element.                                                                                                                                    |
| [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame) <BWIPT />                   | Access and interact with the [`Page`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page).'s `Frame`s.                              |
| [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle)                       | Represents an in-page JavaScript object.                                                                                                                              |
| [Keyboard](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/keyboard)                       | Used to simulate the keyboard interactions with the associated [`Page`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page).        |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator)                         | The Locator API makes it easier to work with dynamically changing elements.                                                                                           |
| [Mouse](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse)                             | Used to simulate the mouse interactions with the associated [`Page`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page).           |
| [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page) <BWIPT />                     | Provides methods to interact with a single tab in a browser.                                                                                                          |
| [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request) <BWIPT />               | Used to keep track of the request the [`Page`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page) makes.                           |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/response) <BWIPT />             | Represents the response received by the [`Page`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page).                               |
| [Touchscreen](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/touchscreen)                 | Used to simulate touch interactions with the associated [`Page`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page).               |
| [Worker](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/worker)                           | Represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).                                                                           |

## Browser Module Options

You can customize the behavior of the browser module by providing browser options as environment variables.

| Environment Variable           | Description                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| K6_BROWSER_ARGS                | Extra command line arguments to include when launching browser process. See [this link](https://peter.sh/experiments/chromium-command-line-switches/) for a list of Chromium arguments. Note that arguments should not start with `--` (see the [example](#example)).                                                                                                    |
| K6_BROWSER_DEBUG               | All CDP messages and internal fine grained logs will be logged if set to `true`.                                                                                                                                                                                                                                                                                         |
| K6_BROWSER_EXECUTABLE_PATH     | Override search for browser executable in favor of specified absolute path.                                                                                                                                                                                                                                                                                              |
| K6_BROWSER_HEADLESS            | Show browser GUI or not. `true` by default.                                                                                                                                                                                                                                                                                                                              |
| K6_BROWSER_IGNORE_DEFAULT_ARGS | Ignore any of the [default arguments](#default-arguments) included when launching a browser process.                                                                                                                                                                                                                                                                     |
| K6_BROWSER_TIMEOUT             | Default timeout to use for various actions and navigation. `'30s'` if not set.                                                                                                                                                                                                                                                                                           |
| K6_BROWSER_TRACES_METADATA     | Sets additional _key-value_ metadata that is included as attributes in every span generated from browser module traces. Example: `K6_BROWSER_TRACES_METADATA=attr1=val1,attr2=val2`. This only applies if traces generation is enabled, refer to [Traces output](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#traces-output) for more details. |

The following command passes the [browser module options](#browser-module-options) as environment variables to launch a headful browser with custom arguments.

{{< code >}}

```bash
$ K6_BROWSER_HEADLESS=false K6_BROWSER_ARGS='show-property-changed-rects' k6 run script.js
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
docker run --rm -i -e K6_BROWSER_HEADLESS=false -e K6_BROWSER_ARGS='show-property-changed-rects' grafana/k6:master-with-browser run - <script.js
```

```windows
C:\k6> set "K6_BROWSER_HEADLESS=false" && set "K6_BROWSER_ARGS='show-property-changed-rects' " && k6 run script.js
```

```windows-powershell
PS C:\k6> $env:K6_BROWSER_HEADLESS="false" ; $env:K6_BROWSER_ARGS='show-property-changed-rects' ; k6 run script.js
```

{{< /code >}}

## Default arguments

List of default arguments included when launching the browser process. You can pass one or more of the arguments to the `K6_BROWSER_IGNORE_DEFAULT_ARGS` environment variable when starting a test for the ones you want to ignore.

{{% admonition type="note" %}}

The starting '--' have been omitted from the argument names in these lists.

{{% /admonition %}}

| Argument                                                 | Value                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| disable-background-networking                            | `true`                                                                                                                                           | Disables several subsystems which run network requests in the background. This is used during network performance testing to avoid measurement noise.                                                                                                                                                                                                                                                              |
| enable-features                                          | NetworkService,<br />NetworkServiceInProcess                                                                                                     | Comma-separated list of feature names to enable.                                                                                                                                                                                                                                                                                                                                                                   |
| disable-background-timer-throttling                      | `true`                                                                                                                                           | Disables task throttling of timer tasks from background pages.                                                                                                                                                                                                                                                                                                                                                     |
| disable-backgrounding-occluded-windows                   | `true`                                                                                                                                           | Disables backgrounding renders for occluded windows. Done for tests to avoid nondeterministic behavior.                                                                                                                                                                                                                                                                                                            |
| disable-breakpad                                         | `true`                                                                                                                                           | Disables the crash reporting.                                                                                                                                                                                                                                                                                                                                                                                      |
| disable-component-extensions<br />-with-background-pages | `true`                                                                                                                                           | Disables default component extensions with background pages. Useful for performance tests where these pages may interfere with results.                                                                                                                                                                                                                                                                            |
| disable-default-apps                                     | `true`                                                                                                                                           | Disables the installation of default apps on the first run. This is used during automated testing.                                                                                                                                                                                                                                                                                                                 |
| disable-dev-shm-usage                                    | `true`                                                                                                                                           | The /dev/shm partition is too small in certain VM environments, causing Chrome to fail or crash. This flag provides a work-around for this issue (a temporary directory will always be used to create anonymous shared memory files).                                                                                                                                                                              |
| disable-extensions                                       | `true`                                                                                                                                           | Disables extensions.                                                                                                                                                                                                                                                                                                                                                                                               |
| disable-features                                         | ImprovedCookieControls,<br />LazyFrameLoading,<br />GlobalMediaControls,<br />DestroyProfileOnBrowserClose,<br />MediaRouter,<br />AcceptCHFrame | Comma-separated list of feature names to disable.                                                                                                                                                                                                                                                                                                                                                                  |
| disable-hang-monitor                                     | `true`                                                                                                                                           | Suppresses hang monitor dialogs in renderer processes. This may allow slow unload handlers on a page to prevent the tab from closing, but the Task Manager can be used to terminate the offending process in this case.                                                                                                                                                                                            |
| disable-ipc-flooding-protection                          | `true`                                                                                                                                           | Disables the IPC flooding protection. It is activated by default. Some javascript functions can be used to flood the browser process with IPC. This protection limits the rate at which they can be used.                                                                                                                                                                                                          |
| disable-popup-blocking                                   | `true`                                                                                                                                           | Disables pop-up blocking.                                                                                                                                                                                                                                                                                                                                                                                          |
| disable-prompt-on-repost                                 | `true`                                                                                                                                           | Usually, when the user attempts to navigate to a page that was the result of a post request, the browser prompts to make sure that's the intention of the user. This switch may be used to disable that check during automated testing.                                                                                                                                                                            |
| disable-renderer-backgrounding                           | `true`                                                                                                                                           | Prevents renderer process backgrounding when set.                                                                                                                                                                                                                                                                                                                                                                  |
| force-color-profile                                      | `srgb`                                                                                                                                           | Forces all monitors to be treated as though they have the specified color profile. Accepted values are "srgb" and "generic-rgb" (currently used by Mac layout tests) and "color-spin-gamma24" (used by layout tests).                                                                                                                                                                                              |
| metrics-recording-only                                   | `true`                                                                                                                                           | Enables the recording of metrics reports but disables reporting. This executes all the code that a normal client would use for reporting, except the report is dropped rather than sent to the server. This is useful for finding issues in the metrics code during UI and performance tests.                                                                                                                      |
| no-first-run                                             | `true`                                                                                                                                           | Skips the "First Run" tasks, whether or not it's the first run, and the "What's New" page. This does not drop the "First Run" sentinel and thus doesn't prevent "First Run" from occurring the next time Chromium is launched without this flag. It also does not update the last "What's New" milestone, so it does not prevent "What's New" from occurring the next time Chromium is launched without this flag. |
| enable-automation                                        | `true`                                                                                                                                           | Enables indication that the browser is controlled by automation.                                                                                                                                                                                                                                                                                                                                                   |
| password-store                                           | `basic`                                                                                                                                          | Specifies which encryption storage backend to use. The possible values are kwallet, kwallet5, gnome, gnome-keyring, gnome-libsecret, and basic. Any other value will lead to Chromium detecting the best backend automatically.                                                                                                                                                                                    |
| use-mock-keychain                                        | `true`                                                                                                                                           | Uses mock keychain on Mac to prevent the blocking permissions dialog about: "Chrome wants to use your confidential information stored in your keychain."                                                                                                                                                                                                                                                           |
| no-service-autorun                                       | `true`                                                                                                                                           | Disables the service process from adding itself as an autorun process. This does not delete existing autorun registrations, it just prevents the service from registering a new one.                                                                                                                                                                                                                               |
| no-startup-window                                        | `true`                                                                                                                                           | Does not automatically open a browser window on startup (used when launching Chrome for the purpose of hosting background apps).                                                                                                                                                                                                                                                                                   |
| no-default-browser-check                                 | `true`                                                                                                                                           | Disables the default browser check. Useful for UI/browser tests where we want to avoid having the default browser info-bar displayed.                                                                                                                                                                                                                                                                              |
| headless                                                 | `true`/`false`                                                                                                                                   | Run in headless mode, i.e., without a UI or display server dependencies. Set by `K6_BROWSER_HEADLESS` environment variable (default true).                                                                                                                                                                                                                                                                         |
| window-size                                              | `800,600`                                                                                                                                        | Sets the initial window size. Provided as string in the format "800,600".                                                                                                                                                                                                                                                                                                                                          |

Additionally if headless mode is set to `true` in [browser options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser#browser_options), the following arguments are also set:

| Argument        | Value                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hide-scrollbars | `true`                                                                                      | Prevents creating scrollbars for web content. Useful for taking consistent screenshots.                                                                                                                                                                                                                                                                                                       |
| mute-audio      | `true`                                                                                      | Mutes audio sent to the audio device so it is not audible during automated testing.                                                                                                                                                                                                                                                                                                           |
| blink-settings  | primaryHoverType=2,availableHoverTypes=2,<br />primaryPointerType=4,availablePointerTypes=4 | Sets blink settings. Format is <name\>[=<value\>],<name\>[=<value\>],... The names are declared in [settings.json5](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/settings.json5) from chromium project. For boolean type, use "true", "false", or omit '=<value\>' part to set to true. For enum type, use the int value of the enum value. |

## Devices Example

To emulate the browser behaviour on a mobile device and approximately measure the browser performance, you can import `devices` from `k6/experimental/browser`.

{{< code >}}

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
    checks: ['rate==1.0'],
  },
};

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

{{< /code >}}
