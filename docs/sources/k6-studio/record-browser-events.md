---
title: 'Record browser events'
description: 'Learn how to use k6 Studio to record browser events, create text assertions, and export browser test scripts.'
weight: 350
---

# Record browser events

{{< docs/public-preview product="Browser recording" >}}

When creating k6 test scripts, there are two main types of tests:

- **Protocol-level tests**: test your application and services by making requests to different protocols such as HTTP, WebSockets, etc.
- **Browser tests**: test your browser-based application by interacting with browser-level APIs. Interact with elements on the page, such as clicking buttons, navigating links, or validating text elements.

Grafana k6 Studio automatically records both protocol requests and browser events when you start a recording. On this page, you'll learn how to inspect browser events, create assertions, and export a browser script.

## Start a browser recording

Browser events are recorded automatically during a recording. To start a recording:

- Open Grafana k6 Studio.
- Click **Record flow**.
- Type a URL and make sure that the **Capture browser events** checkbox is selected.
- Click **Start recording**

A browser window opens, and Grafana k6 Studio starts recording the requests and events. In the browser, you can see a set of controls in the top center. The controls are:

- Inspect elements
- Add assertions
- Toggle event list

## View browser events

There are two ways to view browser events:

- During a recording, click **Toggle event list** at the top of the page. A tab appears on the right side of the browser with a list of all events that Grafana k6 Studio has recorded in the session.
- During or after a recording, go to Grafana k6 Studio and click the **Browser events** tab at the top. This list is automatically updated with any browser events if the recording is still active. After you finish a recording, you can view all the browser events recorded for that session.

## Create text assertions

Assertions are a way to validate that the content displayed on the page is what you expect it to be. Grafana k6 Studio supports creating text assertions for content on a page.

To create a text assertion:

- Start a recording.
- Click the **Add text assertions** button in the controls at the top of the browser.
- Highlight any text on the page.
- In the **Add text assertion** dialog box:
  - The **Element** and **Contains** fields are automatically filled with the text you selected. You can edit this manually or click outside the dialog box to - dismiss it.
- Click **Add** to create the text assertion.

After you create the assertion, an event is added to the browser events list.

## Export a browser event test script

Browser events generate a separate test script from the default protocol-level test created by Grafana k6 Studio, as they test different aspects of an application.

To export a browser event test script:

- Open a test recording.
- Click the **Browser events** tab at the top.
- Click **Export script** on the top right.
- In the **Export script** dialog box:
  - Type in a name for your script.
  - Click **Export**.

After you save your script, you can view it under the **Scripts** section.

## Disable browser events

To disable browser events from being recorded:

- Open Grafana k6 Studio.
- Click **Record flow**.
- On the **Record your user flow** page, clear the **Capture browser events** checkbox.

When you disable browser events, the browser events control at the top of the page isn't displayed.

## Supported browser events

- Navigating via the address bar.
- Reloading a page.
- Clicking an element.
- Typing into a text input.
- Selecting or clearing a checkbox.
- Selecting an option in a radio group.
- Selecting one or more items in a drop-down or list.
- Submitting a form.
