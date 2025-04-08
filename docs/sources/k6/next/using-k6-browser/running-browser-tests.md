---
title: 'Running browser tests'
description: 'Follow along to learn how to run a browser test, interact with elements on the page, wait for page navigation, write assertions and run both browser-level and protocol-level tests in a single script.'
weight: 200
---

# Running browser tests

Follow along to learn how to:

1. Run a test
2. Interact with elements on your webpage
3. Wait for page navigation
4. Run both browser-level and protocol-level tests in a single script

## Run a test

To run a simple local script:

1. Copy the following code, paste it into your favorite editor, and save it as `script.js`.

   Note that providing an `executor` and setting the `browser` scenario option's `type` to `chromium` is mandatory. Please see the [options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options) and [scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios) documentation for more information.

   {{< code >}}

   ```javascript
   import { browser } from 'k6/browser';

   export const options = {
     scenarios: {
       ui: {
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
     const page = await browser.newPage();

     try {
       await page.goto('https://test.k6.io/');
       await page.screenshot({ path: 'screenshots/screenshot.png' });
     } finally {
       await page.close();
     }
   }
   ```

   {{< /code >}}

   The preceding code imports the `browser` [the browser module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser)), and uses its `newPage` method to open a new page.

   After getting the page, you can interact with it using the [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page) methods. This example visits a test URL and takes a screenshot of the page.

   Subsequently, the page is closed. This allows for the freeing up of allocated resources and enables the accurate calculation of [Web Vital metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/metrics).

   {{< admonition type="note" >}}

   Starting from v0.52.0 the browser module API has been converted to an asynchronous API. That means that most of the methods now return promises. Refer to the [migration guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/migrating-to-k6-v0-52/) to learn more about the changes and how to update your scripts.

   {{< /admonition >}}

1. Then, run the test on your terminal with this command:

   {{< code >}}

   ```bash
   k6 run script.js
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
   docker run --rm -i -v $(pwd):/home/k6/screenshots grafana/k6:master-with-browser run - <script.js
   ```

   ```windows
   k6 run script.js
   ```

   ```powershell
   k6 run script.js
   ```

   {{< /code >}}

   You can also use [the browser module options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/options) to customize the launching of a browser process. For instance, you can start a headful browser using the previous test script with this command.

   {{< code >}}

   ```bash
   K6_BROWSER_HEADLESS=false k6 run script.js
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
   docker run --rm -i -v $(pwd):/home/k6/screenshots -e K6_BROWSER_HEADLESS=false grafana/k6:master-with-browser run - <script.js
   ```

   ```windows
   set "K6_BROWSER_HEADLESS=false" && k6 run script.js
   ```

   ```powershell
   $env:K6_BROWSER_HEADLESS=false ; k6 run script.js
   ```

   {{< /code >}}

   {{< admonition type="note" >}}

   When using Docker to run k6 browser tests, make sure you have pulled the correct image with Chromium built-in. See [k6 Installation via Docker](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6#docker) for more information.

   {{< /admonition >}}

1. Optional step: running browser tests in Docker on Mac computers with Apple Silicon:

   1. Make sure you’re running [the latest Docker](https://docs.docker.com/engine/install/) version.

   2. Update [Rosetta](<https://en.wikipedia.org/wiki/Rosetta_(software)>) and export an environment variable with the following:

      ```bash
      softwareupdate --install-rosetta &&
        export DOCKER_DEFAULT_PLATFORM=linux/amd64
      ```

   3. Select VirtuoFS in **Settings** > **General** > **VirtuoFS**.

   4. Enable the Rosetta emulation in **Settings** > **Features in development** > **Use Rosetta for x86/amd64 emulation on Apple Silicon**.

   5. Restart Docker.

   6. Run the browser image with the following command (adds the `--platform` flag):

      ```bash
      docker run --rm -i --platform linux/amd64 -v $(pwd):/home/k6/screenshots -e K6_BROWSER_HEADLESS=false grafana/k6:master-with-browser run - <script.js
      ```
