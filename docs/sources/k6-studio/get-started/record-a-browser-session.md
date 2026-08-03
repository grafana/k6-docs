---
title: 'Record a browser session'
description: 'Learn how to record a browser session with k6 Studio, organize it into groups, and inspect the request and response data'
weight: 100
aliases:
  - ../record-your-first-script # docs/k6-studio/record-your-first-script
---

# Record a browser session

This guide shows how to record a browser session using k6 Studio. A recording captures both the protocol-level requests and the browser interactions from your session, which you can then turn into an HTTP test or a browser test.

In this guide, you will:

- Create a test recording using the https://quickpizza.grafana.com/ service.
- Learn how to create groups to organize your test recording.
- View the request and response data from a test recording.

## Before you begin

To complete this guide, you'll need to:

- Have a Windows, macOS, or Linux machine.
- [Install k6 Studio](https://grafana.com/docs/k6-studio/set-up/install/).
- [Install Google Chrome](https://www.google.com/chrome/).

{{< admonition type="note" >}}

This guide uses the `quickpizza.grafana.com` service, which is a public shared environment. You can use it and follow along, or you can use a service that you own. The `quickpizza.grafana.com` service is also [open source](https://github.com/grafana/quickpizza) if you'd like to deploy a private instance.

{{< /admonition >}}

## Create a test recording

To create a test recording:

1. Open the k6 Studio desktop application.
1. Click **Record flow**.
1. Type "quickpizza.grafana.com" under **Starting URL**.
1. Click **Start recording**. You should see a Google Chrome window open after a few seconds, and the **Requests** header in the k6 Studio application.

   {{< figure src="/media/docs/k6-studio/screenshot-k6-studio-2.0-get-started-record-session-1-start-recording.png" >}}

1. In k6 Studio, click the edit button next to **Default group**, rename it to "Homepage", and press **Enter**.
1. Next click **Create group**, name it "Generate pizza", and press **Enter**. Groups can help organize your test scripts so they're easier to edit and maintain in the future, and give you timing metrics for each group in your test script.
1. In the browser window, press the **Pizza, Please!** button. You should see a generated recommendation.
1. Under the recommendation, press the **Love it!** button. A message saying, "Please log in first." will appear.

This will complete the requests for the "Generate pizza" group.

{{< figure src="/media/docs/k6-studio/screenshot-k6-studio-2.0-get-started-record-session-2-generate-pizza.png" >}}

### Log in to the service

In this next step, you'll log in to the service to be able to rate a pizza:

1. In the k6 Studio application, click **Create group**, name it "Log in", and press **Enter**.
1. In the browser, in the top-right of the screen press the **Login/Profile** link. You should see an authentication dialog box.
1. For username, enter "studio-user". For password, enter "k6studiorocks".

You'll be logged in to the test service, and this will complete the requests for the "Log in" group.

{{< figure src="/media/docs/k6-studio/screenshot-k6-studio-2.0-get-started-record-session-3-login.png" >}}

### Generate and rate a named pizza

In this next step, you'll generate and rate a pizza again, this time with a custom name.

1. In k6 Studio, click **Create group**, name it "Generate and rate custom pizza", and press **Enter**.
1. In the browser, press the **Back to main page** link. You should see the homepage again.
1. In the top-right of the page, toggle the `Advanced` input, a form will appear on the page to customize the generated pizza.
1. In the form, insert "testedpizza" as a name in the **Custom Pizza Name** input, and press the **Pizza, Please!** button. You should see a generated recommendation with the same name.

   {{< figure src="/media/docs/k6-studio/screenshot-k6-studio-2.0-get-started-record-session-4-custom-pizza.png" >}}

1. Under the recommendation, press the **Love it!** button, a message with "Rated!" will appear.
1. In k6 Studio, click **Stop recording**.

After you click **Stop recording**, k6 Studio saves the recording as a HAR file, together with the browser events captured during the session.

### Rename the recording

In the sidebar, you can change the name of the recording after it's created. To do that:

1. In k6 Studio, right click on the recording you just created in the left sidebar.
1. Rename the recording to `generate pizza`.
1. Press **Enter** to confirm the changes.

### Inspect response and request data

After you finish a recording, you can visualize the request and response data for each request included in your test recording.

To view the request and response data for a request, click on the request you would like to inspect from the **Requests** list.

{{< figure src="/media/docs/k6-studio/screenshot-k6-studio-2.0-get-started-record-session-step-5.png" >}}

The Request and Response panels have tabs where you can view the headers, payload, or cookies for a request, and the headers, content, and cookies for a response. For the response content tab, you can also view it in different formats, such as the raw data, or a preview.

## Next steps

Now that you have a recording, you can use it to generate a test script:

- [Create an HTTP test](../create-an-http-test/) to generate a script from the protocol-level requests in your recording.
- [Create a browser test](../create-a-browser-test/) to generate a script from the browser interactions in your recording.
