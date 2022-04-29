---
title: 'startTracing()'
excerpt: 'xk6-browser: Browser.startTracing method'
---

<BrowserCompatibility/>

<Blockquote mod="warning">❌ Not yet implemented.</Blockquote>

Starts [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) for debugging a [Page](/javascript-api/xk6-browser/page).

Use [browser.stopTracing()](/javascript-api/xk6-browser/browser/browser-stoptracing) after calling `browser.startTracing` to create a trace file. Then you can open the file in Chrome DevTools' performance panel or the [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

| Parameter | Type   | Description                                                                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| page      | object | A [Page](/javascript-api/xk6-browser/page) object. The tracing will include screenshots of the page if this option is specified. |
| options   | object | See [options](#options) for more details.                                                                                        |

### options

| Option      | Type    | Description                                                |
| ----------- | ------- | ---------------------------------------------------------- |
| categories  | Array   | A list of custom categories to use.                        |
| path        | string  | The filesystem path to write the trace file.               |
| screenshots | boolean | Whether to capture and save screenshots in the trace file. |
