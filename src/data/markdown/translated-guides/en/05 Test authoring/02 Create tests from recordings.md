---
title: 'Create tests from recordings'
excerpt: 'In load testing, recording usually refers to the process of creating a load test from the recording of a user session.'
---

One way to create tests is to use a _recording_ of a user session to auto-generate the test script.

Recordings show the sequence of the session's requests and parameters. You can then use this recording to create the logic of your test.

k6 provides two tools that can directly convert a recording into k6 script:

- [Browser recorder](/test-authoring/recording-a-session/browser-recorder) generates a k6 script from a browser session. 
- [HAR converter](/test-authoring/recording-a-session/har-converter) generates a k6 script from the requests included in a HAR file.


## Recordings to facilitate script creation

Recorders allow you to avoid writing complex tests from scratch. 
Testers commonly use recordings while testing advanced scenarios on websites or mobile applications, such as end-to-end (E2E) tests with dozens or hundreds of requests.

The steps to create a load test from a recording are as follows:

1. Record a user or API session.
2. Convert the recorded session into a test.
3. Set up the load and test options.
4. Handle [correlation and dynamic data](/examples/correlation-and-dynamic-data/).

You can now debug or run the load test.

## Be sure to record realistically

If you record the session, consider the following dos and don'ts.

It's a good idea to:
- Browse as a user would.
- Take natural pauses that users would take to consume page content.
- Focus on the most common use cases, rather than all the possible use cases.
- Take note of pages where forms/logins occur. You will likely need to complete some scripting.

You probably _do not_ want to:
- Visit every page in one journey.
- Click every possible option.
- Navigate as fast as you can.
- Navigate out of your actual site or application.
