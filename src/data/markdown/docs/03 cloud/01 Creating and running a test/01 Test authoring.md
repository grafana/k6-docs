---
title: 'Test authoring'
head_title: 'Test authoring in k6 Cloud'
excerpt: 'k6 ecosystem provides a set of codeless tools to speed up the test creation and facilitate collaboration across different roles.'
---

In testing, authoring refers to the test creation process. 

k6 is, at its core, a **code-based testing tool**. However, the k6 ecosystem provides a set of **no-code tools** to speed up the test creation and facilitate collaboration across different roles.

In k6, you can create a test in various ways, using:

- Your own text editor or IDE
- [Script editor in the k6 Cloud](/cloud/creating-and-running-a-test/script-editor)
- [Test builder](/test-authoring/test-builder)
- [Browser recorder](/test-authoring/recording-a-session/browser-recorder)
- [Converters](/integrations#converters): HAR, Postman and Swagger

## Running a cloud test

After creating your test, you might want to debug it locally or run it on the cloud. Cloud tests will be executed from the geographic location/s you've selected in your test, on the k6 Cloud infrastructure. 

You can start cloud tests from two places:

- In the **k6 Cloud web app**, using the [script editor](/cloud/creating-and-running-a-test/script-editor), [test builder](/test-authoring/test-builder), or re-running a listed test.
- In the [**k6 CLI**](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli), running the `k6 cloud` command.
