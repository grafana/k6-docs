---
title: 'Recording a test script'
excerpt: 'A guide on how to use the k6 Cloud Chrome extension to record user behavior to quickly create load test scripts.'
---

## Background


The k6 Cloud Test Script Recorder Chrome extension allows you to generate the bulk of your test scripts simply by browsing like a user would on your site or web app.  The script created gives you a foundation which you can further edit, as required.

The k6 Cloud Chrome extension will capture everything – every single HTTP(s) request being loaded into the browser as you click – including ads, images, documents, etc., so you get a far more accurate read of what’s going on. Just press “record”, start browsing and when complete, the script will automatically upload to your k6 Cloud account.

>### Consider this:
> The Chrome extension will not record other tabs or pop up windows. If you need to capture this information, you should check out [converting from a HAR file](/using-k6/session-recording-har-support).

*Note:* Before you begin, please be sure to force refresh the k6 Cloud app to ensure you are on the most recent version of the k6 Cloud app.

## Here's how to start:

  1. Download and install the <a href="https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda">k6 Browser Recorder</a>.

  2. **Start a recording**
    Open the extension by clicking the k6 logo, and press "Start recording" to begin recording the current browser tab. Now browse like a user would or how you want our Virtual Users to execute. We suggest basing this on _real user behavior_ - don't try to visit every single page on your site or app. Focus on common journeys.
![Step 2](images/03 Recording a test script/Step 2.png)

  3. **Stop recording**
    When done, press "Stop recording", you'll be taken to the app to review the recorded test script
![Step 3](images/03 Recording a test script/Step 3.png)

  4. **Save your test scripts**
    Save the recorded script in any of your projects.  
    If any _third party requests_ or requests to download assets were made during the recording those requests will be filtered out by default.
    Would you want to include some of the requests in the _third party list_ simply deselect the ones you want to include then hit save.
![Step 4](images/03 Recording a test script/Step 4.png)

  5. **You can now edit your script as necessary.**  k6 Cloud's in app IDE will update in real time to alert you of any syntax errors. You may need to edit your script to deal with CSRF tokens, adding advanced business logic, creating custom metrics, etc.

  6. **Once done, press run to start your test**


> ## Important things to note
>
> - The default configuration will be a 12 minute test that ramps to 10 Virtual Users over 1 minute, stays at 10 for 10 minutes, then ramps back to 0 over 1 minute. You can change this in the stages section of the script. Refer to [this article](/test-types/introduction) for more information on ramping configurations.
> - No load zone is specified and it will run out of Ashburn by default. You can specify different load zones by adding a `ext.loadimpact.distribution` option. See [this article](/using-k6/options) for more information
> - We have set `discardResponseBodies: true`.  This will discard all response bodies by default.
