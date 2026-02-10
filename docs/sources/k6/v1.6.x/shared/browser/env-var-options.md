---
title: browser/options
---

| Environment Variable           | Description                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| K6_BROWSER_ARGS                | Extra command line arguments to include when launching browser process. See [this link](https://peter.sh/experiments/chromium-command-line-switches/) for a list of Chromium arguments. Note that arguments should not start with `--` (see the command example below).                                                                                                  |
| K6_BROWSER_DEBUG               | All CDP messages and internal fine grained logs will be logged if set to `true`.                                                                                                                                                                                                                                                                                         |
| K6_BROWSER_EXECUTABLE_PATH     | Override search for browser executable in favor of specified absolute path.                                                                                                                                                                                                                                                                                              |
| K6_BROWSER_HEADLESS            | Show browser GUI or not. `true` by default.                                                                                                                                                                                                                                                                                                                              |
| K6_BROWSER_IGNORE_DEFAULT_ARGS | Ignore any of the [default arguments](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/options/#default-arguments) included when launching a browser process.                                                                                                                                                                                                   |
| K6_BROWSER_TIMEOUT             | Default timeout for initializing the connection to the browser instance. `'30s'` if not set.                                                                                                                                                                                                                                                                             |
| K6_BROWSER_TRACES_METADATA     | Sets additional _key-value_ metadata that is included as attributes in every span generated from browser module traces. Example: `K6_BROWSER_TRACES_METADATA=attr1=val1,attr2=val2`. This only applies if traces generation is enabled, refer to [Traces output](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#traces-output) for more details. |

The following command passes the browser options as environment variables to launch a headful browser with custom arguments.

{{< code >}}

```bash
K6_BROWSER_HEADLESS=false K6_BROWSER_ARGS='show-property-changed-rects' k6 run script.js
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
set "K6_BROWSER_HEADLESS=false" && set "K6_BROWSER_ARGS='show-property-changed-rects' " && k6 run script.js
```

```windows-powershell
$env:K6_BROWSER_HEADLESS="false" ; $env:K6_BROWSER_ARGS='show-property-changed-rects' ; k6 run script.js
```

{{< /code >}}
