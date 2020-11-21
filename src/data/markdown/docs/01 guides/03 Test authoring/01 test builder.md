---
title: 'Test builder'
excerpt: ''
---

The k6 Test Builder allows you to utilize a graphical interface to create a k6 test.

Based on your input, the test builder will automatically generate the k6 script for you. Once done, you can copy the script and [run the test from the CLI](/getting-started/running-k6).

> **Note**: you need a [k6 Cloud](/cloud) account to use the test builder. However, it is **free to use**, and you do not need an active paid subscription to utilize this feature.

Although we strongly believe that scriptable/code-based tools will help you get the most out of your performance testing efforts, a GUI-based tool like the test builder could benefit you in:

- Speeding up the test creation.
- Instructing with the [k6 API](/javascript-api).
- Collaborating with non-coders in test creation.

![k6 Test Builder](images/test-builder.png)

## Instructions

1 - [Login](https://app.k6.io/account/login) into the k6 Cloud.

2 - On the sidebar menu, click the [Create New Test](https://app.k6.io/tests/new) button.

3 - Select `Test builder`.

![k6 Test Builder](images/k6-create-new-test.png)

4 - Now, you can start building your k6 test using the graphical interface.

![k6 Test Builder](images/test-builder.png)


## Test builder features

We are continuously improving and adding new capabilities to the test builder. A few of the most prominent features are:

**Test configuration**

- Configure ramping (aka [stages](/using-k6/options#stages)) using VUs and duration.
- Configure [load zones](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli#list-of-supported-load-zones) to run from the k6 Cloud.

**HTTP Requests**

- Add a request and name it for better description.
- Change the URL/Endpoint.
- Change the `HTTP METHOD` using the drop down menu.
- Specify Headers.
- Specify Query Parameters.
- Specify a request body (JSON, Text, or File Content) for POST/PUT/PATCH requests.
- Reorganize requests by clicking and dragging.
- Duplicate or delete requests when hovering over a specific request.

**k6 API**

- Define the [thresholds](/using-k6/thresholds) of your test.
- Add a [check](/javascript-api/k6/check-val-sets-tags) on a request response.
- Add [sleep](/javascript-api/k6/sleep-t) time between requests.
- Add a [group](/javascript-api/k6/group-name-fn) to the test.

**And more**

- Populate the test builder with the recorded requests using the [browser recorder](/test-authoring/recording-a-session/browser-recorder).
- Populate the test builder with the requests included in a [HAR file](https://en.wikipedia.org/wiki/HAR_(file_format)).
- Capture a variable when dealing with dynamic data, such as authentication tokens.
- Show examples for better onboarding.
- Toggle the view mode to see or copy the generated k6 script.
- Run the test on the k6 Cloud.
