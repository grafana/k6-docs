---
title: 'Using the DevTools recorder'
description: 'The DevTools recorder allows exporting k6 browser scripts from the recorder panel in Chrome DevTools.'
weight: 01
---

# Using the DevTools recorder

The DevTools recorder lets you record user journeys using Chrome DevTools and then export them as a k6 script.

## Before you begin

To ensure you have a useful test output:

- Review the [Be sure to record realistically](/test-authoring/create-tests-from-recordings/#be-sure-to-record-realistically) and [Consider hybrid approach for load testing websites](/test-authoring/create-tests-from-recordings/#consider-hybrid-approach-for-load-testing-websites) sections on [Create tests from recordings](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/).

{{< admonition type="note" >}}

Note that the DevTools recorder **does not require a cloud account**.

{{< /admonition >}}

## How to record

1. Install the [Chrome](https://chrome.google.com/webstore/detail/grafana-k6-browser-record/fbanjfonbcedhifbgikmjelkkckhhidl) extension.
1. Record a session using the [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder).
1. Choose k6 Browser when [exporting the user flow](https://developer.chrome.com/docs/devtools/recorder/reference#export-flows).
1. Edit your script as necessary. Depending on the [type of test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/), you might need to change different aspects of the script.
   Typical changes are for [load options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options) and to handle [correlation and dynamic data](https://grafana.com/docs/k6/<K6_VERSION>/examples/correlation-and-dynamic-data).
1. Run the test from the CLI or Grafana Cloud k6. Refer to [Running k6](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6) for more details.
