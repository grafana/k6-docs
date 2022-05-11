(https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/) extension.
1. Open the extension by clicking the k6 logo.
1. Press "Start recording" to begin recording the current browser tab. 
![start recording](./images/Recording-a-test-script/step-2.png)
1. When done, press **Stop recording**. You'll be taken to the app to review the recorded test script.
   ![Step 3](./images/Recording-a-test-script/step-3.png)
1. Save the recorded script in any of your projects.
  To include some of the requests in the _third party list_,  deselect the ones you want to include.
  ![Step 4](./images/Recording-a-test-script/step-4.png)
1. Edit your script as necessary. Depending on the type of testing, you might need to change different aspects of the script. 
   Typical changes are for [load options](/using-k6/options) and to handle [correlation and dynamic data](/examples/correlation-and-dynamic-data).
1. Run the test locally or in k6 Cloud.

  - To run a test from the k6 Cloud UI, select **Run** to start the test.
  - To use the k6 CLI to run a local or cloud test, copy the generated script to your local text editor and execute the `k6 run` or `k6 cloud` command to start the test. 

For more about running k6, refer to the [Running k6 guide](/getting-started/running-k6).

## Having trouble? Try the HAR convertor

Under the hood, the browser recorder generates the script with the [HAR converter](./HAR-converter).
The HAR converter creates a k6 script from the HTTP requests included in a HAR file.

For certain edge cases, the HAR converter will catch some behavior that the browser recorder won't.
For example, the browser extension won't record other tabs or pop-up windows.

If you need to capture this information or are having a problem recording a request, try the HAR converter.
If the error persists with the HAR converter, please provide detailed information about the problem [in a new issue](https://github.com/k6io/har-to-k6/issues).
