---
title: 'Using the k6 DevTools recorder'
description: 'The k6 DevTools recorder allows you to export k6 browser scripts from the recorder panel in Chrome DevTools.'
weight: 01
---

# Using the k6 DevTools recorder

{{< admonition type="caution" >}}

The k6 DevTools recorder extension is deprecated and will be removed in a future release.

{{< /admonition >}}

The k6 DevTools recorder lets you record user journeys using Chrome DevTools and then export them as a k6 script.

## Before you begin

To ensure you have a useful test output:

- Review the [Be sure to record realistically](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/#be-sure-to-record-realistically) and [Consider hybrid approach for load testing websites](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/#consider-hybrid-approach-for-load-testing-websites) sections on [Create tests from recordings](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/).
- Learn the basics of k6 browser tests with [Running browser tests](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/running-browser-tests/).

{{< admonition type="note" >}}

Using the DevTools recorder _doesn't require a Grafana Cloud account_.

{{< /admonition >}}

## Create a script from a recording

1. Install the [k6 DevTools Recorder Chrome extension](https://chromewebstore.google.com/detail/k6-devtools-recorder/fkajbajcclbdgaoanencnhpfnigfipgc).
1. Record a session using the [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder).
1. [Export the user flow](https://developer.chrome.com/docs/devtools/recorder/reference#export-flows) and choose the k6 Browser option.
1. Edit your script as necessary. Depending on the [type of test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/), you might need to change different aspects of the script.
   Typical changes are for [load options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options) and to handle [correlation and dynamic data](https://grafana.com/docs/k6/<K6_VERSION>/examples/correlation-and-dynamic-data).
1. Run the test from the CLI or Grafana Cloud k6. Refer to [Running k6](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6) for more details.
