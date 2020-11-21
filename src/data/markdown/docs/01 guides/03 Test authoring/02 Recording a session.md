---
title: 'Recording a session'
excerpt: ''
---

In load testing, _recording_ usually refers to the process of creating a load test from the recording of a user session. The process consists of three steps:

1. Record a user or API session.
2. Convert the recorded session into a test.
3. Run the test.

While not exclusive, it is common to use recordings while testing complex scenarios on websites or mobile applications. Recording allows seeing the sequence of requests and parameters of the session, helping testers quickly build out complex chains of requests.

Suppose you have to create a performance test simulating a user journey with dozens or hundreds of requests. In that case, the recording avoids writing it from scratch.

k6 provides two mechanism to generate a k6 script from a recorded user session:

- [Browser recorder](/test-authoring/recording-a-session/browser-recorder) generates a k6 script from a browser session. Available on [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/).
- [HAR converter](/test-authoring/recording-a-session/har-converter) generates a k6 script from the requests included in a HAR file.
