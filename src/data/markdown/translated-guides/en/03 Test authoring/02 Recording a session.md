---
title: 'Recording a session'
excerpt: 'In load testing, recording usually refers to the process of creating a load test from the recording of a user session.'
---

Load tests should be realistic.
One way to create a realistic test is to use a _recording_ of a user session.
This process has three steps:

1. Record a user or API session.
2. Convert the recorded session into a test.
3. Run the test.

Recordings show the sequence of the session's requests and parameters, helping testers quickly build complex chains of requests.
For this reason, testers commonly use recordings while testing complex scenarios on websites or mobile applications.

Suppose you have to create a performance test that simulates a user journey with dozens or hundreds of requests.
In such a case, the recording lets you avoid writing the test from scratch.

k6 provides two mechanisms to generate scripts from recorded user sessions:

- [Browser recorder](/test-authoring/recording-a-session/browser-recorder) generates a k6 script from a browser session. Available on [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/).
- [HAR converter](/test-authoring/recording-a-session/har-converter) generates a k6 script from the requests included in a HAR file.

