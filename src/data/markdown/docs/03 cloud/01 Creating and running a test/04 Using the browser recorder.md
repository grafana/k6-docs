---
title: 'Using the browser recorder'
excerpt: 'The browser recorder generates a k6 script based on a web session. It is available as extensions for Chrome and Firefox.'
robots: NOINDEX, FOLLOW
---

The browser recorder lets you generate a k6 script based on a browser session.


<Blockquote mod="attention" title="New Browser Recorder">

These [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/) extensions only work for existing k6 Cloud users.

For new users, check out the [latest browser recorder](https://grafana.com/docs/grafana-cloud/k6/author-run/browser-recorder/), which is also free and lets you auto-generate the k6 script.

</Blockquote>



## Before you start

Before you start, consider the following:

- [Be sure to record realistically](/test-authoring/create-tests-from-recordings/#be-sure-to-record-realistically)
- [A hybrid approach for load testing websites](/test-authoring/create-tests-from-recordings/#consider-hybrid-approach-for-load-testing-websites)


## How to record


1. Install the [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/) extension.
1. Open the extension by clicking the k6 logo.
1. Select **Start recording** to begin recording the current browser tab. 
![start recording](./images/Recording-a-test-script/step-2.png)
1. When done, select **Stop recording**. You'll be taken to the app to review the recorded test script.
   ![Step 3](./images/Recording-a-test-script/step-3.png)
1. Save the recorded script in any of your projects.
  To include some of the requests in the _third party list_,  deselect the ones you want to include.
  ![Step 4](./images/Recording-a-test-script/step-4.png)
1. Edit your script as necessary. Depending on the [type of load test](/test-types/load-test-types/), you might need to change different aspects of the script. 
   Typical changes are for [load options](/using-k6/options) and to handle [correlation and dynamic data](/examples/correlation-and-dynamic-data).
1. Run the test locally or in k6 Cloud.

  - To run a test from the k6 Cloud UI, select **Run** to start the test.
  - To use the k6 CLI to run a local or cloud test, copy the generated script to your local text editor and execute the `k6 run` or `k6 cloud` command to start the test. 

For more about running k6, refer to the [Running k6 guide](/get-started/running-k6).

## Trouble? Try the HAR converter

Some users have reported `413` errors when they try to upload long recordings.
In these cases, the easiest fix is to use the [HAR converter](/test-authoring/create-tests-from-recordings/using-the-har-converter/), which creates a k6 script from the HTTP requests included in a HAR file (it also powers the browser recorder).

Besides avoiding the `413` error,
the HAR converter catches some edge-case behavior that the browser recorder won't.
For example, the browser extension doesn't record other tabs or pop-up windows.

If you need to capture this information or are having a problem recording a request, try the HAR converter.
If the error persists with the HAR converter, please provide detailed information about the problem [in a new issue](https://github.com/k6io/har-to-k6/issues).
