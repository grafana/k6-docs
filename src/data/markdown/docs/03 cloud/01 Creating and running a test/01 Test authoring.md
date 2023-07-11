---
title: 'Test authoring'
head_title: 'Test authoring in k6 Cloud'
excerpt: 'The k6 ecosystem provides a set of no-code tools to speed up test creation and facilitate collaboration across different roles.'
---

In testing, *authoring* is the process of creating a test. 

At its core, k6 is a code-based testing tool.
However, the k6 ecosystem provides a set of no-code tools to speed up test creation and facilitate collaboration across different roles.

Besides writing a test in your text editor or IDE, you can also use a k6-supported tool to create a test script:

- The [Test builder](/test-authoring/test-builder) is a graphical test builder.
- The [Script editor](/cloud/creating-and-running-a-test/script-editor) is a web-based editor in k6 cloud.
- [Browser recorders](/test-authoring/create-tests-from-recordings/using-the-browser-recorder/) create scripts from recorded sessions.
- [Converters](/integrations#converters) create tests from HAR, Postman, and OpenAPI files

## Running a cloud test

Cloud tests run on k6 Cloud infrastructure from the geographic locations that you select.

You can start cloud tests from two places:

- In the **k6 Cloud web app**, using the [script editor](/cloud/creating-and-running-a-test/script-editor), [test builder](/test-authoring/test-builder), or by re-running a listed test.
- [From the CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli), running the `k6 cloud` command.
