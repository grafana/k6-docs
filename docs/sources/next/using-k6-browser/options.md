---
title: 'Browser options'
description: 'An overview of the different options to customize the behaviour when running browser tests.'
weight: 04
---

# Browser options

To enable browser testing, add the `browser` configuration within the `options` property of the [Scenario options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/#options).

{{< code >}}

```shared-iterations
export const options = {
  scenarios: {
    foo: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};
```

```constant-vus
export const options = {
  scenarios: {
    foo: {
      executor: 'constant-vus',
      vus: 10,
      duration: '5m',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};
```

{{< /code >}}

## Script options

| Option                    | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| type<sup>(required)</sup> | Name of the browser running the test. Options include `'chromium'`. |

## Environment variable options

You can customize the behavior of the browser module by passing environment variables.

{{% admonition type="note" %}}

Customizing browser options via environment variables is unsupported when [running browser tests in Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/get-started/run-your-first-browser-tests/).

{{% /admonition %}}

{{< docs/shared source="k6" lookup="browser/env-var-options.md" version="<K6_VERSION>" >}}

### Default arguments

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

Additionally, the following arguments are set in headless mode (when `K6_BROWSER_HEADLESS` is `true`, which is the default option):

| Argument        | Value                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hide-scrollbars | `true`                                                                                      | Prevents creating scrollbars for web content. Useful for taking consistent screenshots.                                                                                                                                                                                                                                                                                                       |
| mute-audio      | `true`                                                                                      | Mutes audio sent to the audio device so it is not audible during automated testing.                                                                                                                                                                                                                                                                                                           |
| blink-settings  | primaryHoverType=2,availableHoverTypes=2,<br />primaryPointerType=4,availablePointerTypes=4 | Sets blink settings. Format is <name\>[=<value\>],<name\>[=<value\>],... The names are declared in [settings.json5](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/settings.json5) from chromium project. For boolean type, use "true", "false", or omit '=<value\>' part to set to true. For enum type, use the int value of the enum value. |
