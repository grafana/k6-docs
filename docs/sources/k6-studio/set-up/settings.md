---
title: 'Settings'
description: 'Learn how to configure k6 Studio settings'
weight: 200
---

# Settings

k6 Studio includes a few settings you can configure by clicking on **Settings** on the bottom-left side of the application.

## Recorder settings

### Automatically detect browser

When this setting is enabled, k6 Studio looks for Google Chrome in the default installation path in your system.

You can turn off this setting and provide a custom path to a Google Chrome executable file.

## Proxy settings

### Port number

The port number that the proxy recorder should listen to. By default, it's set to `6000`. You can customize this value and turn on or off the option to allow k6 Studio to find a different port if the one that's specified is in use.

### Proxy mode

There are two configuration options for proxy mode:

- **Regular**: The default mode where k6 Studio proxies requests.
- **Upstream**: k6 Studio forwards requests to a server you specify. This mode is useful when your system is already behind another proxy, and you need k6 Studio to forward requests to it instead.

If you choose the **Upstream** mode, you have to configure a **Server URL** value, and you can optionally provide authentication credentials and a certificate file.

## Telemetry

### Send anonymous usage data

k6 Studio sends anonymous usage data of the k6 Studio application to Grafana. This is enabled by default, and you can turn it off if you'd like not to send any data. Refer to [Usage collection](https://grafana.com/docs/k6-studio/set-up/usage-collection/) for more details.

### Send crash reports and error data

k6 Studio sends anonymous crash reports and error data of the k6 Studio application to Grafana. This is enabled by default, and you can turn it off if you'd like not to send any data. Refer to [Usage collection](https://grafana.com/docs/k6-studio/set-up/usage-collection/) for more details.

## Appearance

### Theme

Customize the overall theme of the application. The options are: **Light**, **Dark**, and **System**.

## Logs

Shows logs from the application in real time. This can help users view if there are any errors affecting k6 Studio, and share that information if necessary when [reporting issues](https://github.com/grafana/k6-studio/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen).
