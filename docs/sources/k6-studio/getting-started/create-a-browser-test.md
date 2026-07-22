---
title: 'Create a browser test'
description: 'Learn how to generate a browser test script from a recording, add an assertion, and debug it'
weight: 300
---

# Create a browser test

This guide shows how to generate a k6 browser test from the browser interactions in a recording, add an assertion using the browser test editor, and debug the resulting script.

In this guide, you will:

- Use the browser events from a recording to create a browser test.
- Debug the browser test.
- Add an assertion using the browser test editor's Preview tab.
- Save or export your browser test.

## Before you begin

- Complete [Record a browser session](../record-a-browser-session/) to create a test recording. This guide continues from the "generate pizza" recording created in that step.

## Create a browser test from a recording

k6 Studio automatically captures browser events, such as clicks and form inputs, alongside the protocol-level requests in every recording. To turn these into a browser test:

1. If you still have the test recording open, click **Create test** > **Browser test** on the top-right.
1. If your recording includes more than one browser tab, select the page you want to use for the browser test.

k6 Studio opens the [browser test editor](https://grafana.com/docs/k6-studio/components/browser-editor/) with an actions list already populated from the interactions in your recording, in the order they happened, for example, navigating to the page, clicking **Pizza, Please!**, and clicking **Love it!**.

## Debug the browser test

To debug the browser test:

1. Click **Validate** on the top-right.

k6 Studio runs the actions in order and shows the result in the **Preview** tab, as well as any console messages and requests in the **Console** and **Network** tabs at the bottom.

## Add an assertion

You can add an assertion for an element directly from the **Preview** tab:

1. After the **Pizza, Please!** action has run, the generated recommendation appears in the **Preview** tab.
1. Click the recommendation text.
1. From the context menu, select **Expect to be visible**.

k6 Studio adds a new assertion at the end of your actions list, using a locator for the element you clicked. Click **Validate** again to confirm the assertion passes.

## Save or export the browser test

- Click the save icon to save your changes to the browser test file.
- Click **Export script** to save the browser test as a standalone k6 test script.

## Summary

To summarize:

- You created a browser test from the browser events in a recording.
- You debugged the browser test and inspected the console and network output.
- You added an assertion by clicking an element in the Preview tab.
- You saved and exported your browser test.

## Next steps

- Continue to [Run in Grafana Cloud k6](../run-in-grafana-cloud-k6/) to run your exported script.
- Refer to the [browser test editor](https://grafana.com/docs/k6-studio/components/browser-editor/) reference to learn about all the available actions, assertions, and locators.
