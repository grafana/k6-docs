---
title: 'Test Recorder'
description: 'Understand how the k6 Studio Test Recorder works'
weight: 100
---

# Test Recorder

The Test Recorder is the first component of k6 Studio. With it, you can start a recording which opens a browser window, and then navigate through a website or application to record a user flow you want to test. k6 Studio collects every request and response, and once you stop the recording, it generates a HAR file. You can then inspect every request and response to see if your test recording accurately reflects a user flow, and can be used as the source for your test script.

![k6 Studio Test Recorder window, showing a completed test recording with eight requests, and numbers next to each section of the application](/media/docs/k6-studio/screenshot-k6-studio-test-recorder.png)

The Test Recorder window is composed of:

1. **Test recording name**: The name of the test recording and HAR file. This is automatically generated, but you can rename it to help keep your recordings organized.
2. **Test Recorder actions**: On the top-right you can see the action buttons for the Test Recorder. Depending on whether you're starting a recording or inspecting a recording, you might see:
   - **Start recording** or **New recording**: Starts a new recording.
   - **Stop recording**: Stops the existing recording.
   - **Discard and start over**: Discard the existing recording and starts a new one.
   - **Create test generator**: Creates a test generator from the selected test recording.
3. **Test Recorder options**: Below the test recording name, you can see:
   - **Requests**: The total number of requests in the recording
   - **Show static assets**: A toggle that controls whether you can see all static assets requests in the Requests list. The static assets requests are hidden by default.
   - **Filter**: A search box that allows you to filter the list of requests by URL, method (such as GET or POST), and status code.
4. **Requests and groups list**: The list of requests, and groups if any, in the HAR file. The requests are organized by time, and you can see the method, status code, host, and path for each one. You can also collapse and expand groups to inspect them more easily.
5. **Request and response inspector**: When you click on a request from the requests list, a panel opens on the right side which shows the request and response details for that request. You can use it to inspect the headers, payload, cookies, and content of the requests.

{{< admonition type="note" >}}

The recorder uses a proxy to catch requests from the specific browser window, which is powered by [mitmproxy](https://github.com/mitmproxy/mitmproxy).

{{< /admonition >}}
