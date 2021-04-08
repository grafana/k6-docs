---
title: 'Test authoring'
excerpt: 'k6 ecosystem provides a set of codeless tools to speed up the test creation and facilitate collaboration across different roles.'
---

In testing, authoring refers to the test creation process. 

k6 is, at its core, a **Code-based testing tool**. However, the k6 ecosystem provides a set of **codeless tools** to speed up the test creation and facilitate collaboration across different roles.

In k6, you could create a test using various tools:

- Your own text editor or IDE
- [Script editor in the k6 Cloud](/cloud/creating-and-running-a-test/script-editor)
- [Test builder](/test-authoring/test-builder)
- [Browser recorder](/test-authoring/recording-a-session/browser-recorder)
- [Converters](/integrations#converters): JMeter, Postman and Swagger

## Running a cloud test

After creating your test, you might want to debug it locally or run it on the cloud. Cloud tests will be executed from the geographic location/s you've selected in your test, on k6 Cloud infrastructure. 

If you want to run a cloud test, there are two main places where you could start it:

- In the **k6 Cloud web app**, using the [script editor](/cloud/creating-and-running-a-test/script-editor), [test builder](/test-authoring/test-builder), or re-running a listed test.
- In the **k6 CLI**, [running the k6 cloud command](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli).
