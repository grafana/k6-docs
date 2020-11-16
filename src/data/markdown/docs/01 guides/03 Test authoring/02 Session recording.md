---
title: 'Session recording'
excerpt: ''
---

In terms of load testing, recording usually refers to the process of creating a load test from the recording of a user session. The process looks like:

1. Record a user or API session.
2. Convert the recorded session into a test.
3. Run the test.

While not exclusive, it is common to use the recording when testing complex scenarios of websites or mobile applications. Recording allows seeing the sequence of requests and parameters of the session, helping testers identify the requests' format.

Suppose you have to create a performance test simulating a user journey with dozens or hundreds of requests. In that case, the recording avoids writing it from scratch - helping you be more productive in developing this type of test.

k6 provides two mechanism to generate a k6 script from a recorded user session:

- [Browser recorder](/test-authoring/session-recording/browser-recorder): to generate a k6 script from a browser session. Available on [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/).
- [HAR converter](/test-authoring/session-recording/har-converter): to generate a k6 script from the requests included on a HAR file.


