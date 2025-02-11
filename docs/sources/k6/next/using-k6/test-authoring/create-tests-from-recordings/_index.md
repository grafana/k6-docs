---
title: 'Create tests from recordings'
description: 'In load testing, recording usually refers to the process of creating a load test from the recording of a user session.'
weight: 300
---

# Create tests from recordings

A recording stores the sequence of requests and parameters of a user session or API interaction.
You can use this recording to auto-generate your test logic.

Testers commonly use recordings to avoid writing complex tests from scratch.
For example, testing advanced scenarios on websites or mobile applications, such as end-to-end (E2E) tests with dozens or hundreds of requests.

k6 provides three tools that can directly convert a recording into k6 script:

- [Browser recorder](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/using-the-browser-recorder) generates a k6 script from a browser session.
- [HAR converter](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/using-the-har-converter) generates a k6 script from the requests included in a HAR file.

## Steps

The steps to create a load test from a recording are as follows:

1. Record a user or API session.
2. Convert the recorded session into a test.
3. Set up the load and test options.
4. Handle [correlation and dynamic data](https://grafana.com/docs/k6/<K6_VERSION>/examples/correlation-and-dynamic-data).

You can then debug or run the load test.

## Be sure to record realistically

If you use a browser to simulate a user session and generate its recording, consider the following dos and don'ts.

It's a good idea to:

- Browse as a user would.
- Take natural pauses that users would take to consume page content.
- Focus on the most common use cases, rather than all the possible use cases.
- Take note of pages where forms/logins occur. You will need to edit the script to [handle correlation](https://grafana.com/docs/k6/<K6_VERSION>/examples/correlation-and-dynamic-data).

You probably _do not_ want to:

- Visit every page in one journey.
- Click every possible option.
- Navigate as fast as you can.
- Navigate out of your actual site or application.

## Consider hybrid approach for load testing websites

When you start the recording and navigate as a user, the recorder captures every HTTP(s) request loaded into the browser as you click. This includes all the requests for third-party services, ads, images, documents, etc.

When you finish the recording, the converter generates the k6 script from all the recorded requests and assets.
The script could include **dozens or hundreds of requests for each page visit or interaction**.

These types of recorded tests are difficult to maintain. As the website changes, these tests must be updated to reflect assets and API changes.

An alternative approach to load test websites is to run a [hybrid load test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/load-testing-websites/#hybrid-load-testing) which:

- Runs a [browser test](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/running-browser-tests) to validate the frontend.
- While simultaneously running API tests to inject load to the backend.

As the browser test automatically handles website assets, these tests require fewer updates.

To learn more about this approach, check out the [example mixing browser-level and protocol-level tests](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/running-browser-tests#run-both-browser-level-and-protocol-level-tests-in-a-single-script).
