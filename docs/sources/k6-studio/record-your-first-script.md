---
title: 'Record your first script'
description: 'Learn the basics of k6 Studio. Create a test recording, configure a test generator, and run a test script'
weight: 300
---

# Record your first script

This tutorial shows how to create a recording, set up custom rules, and generate a test script using k6 Studio.

In this tutorial, you will:

- Create a test recording using the https://quickpizza.grafana.com/ service.
- Learn how to create groups to organize your test recordings.
- View the request and response data from a test recording.
- Use the Generator to create a correlation and a custom code rule.
- Validate your test script from the Generator.
- Export your test script.

## Before you begin

To complete this tutorial, you'll need to:

- Have a Windows, macOS, or Linux machine.
- [Install k6 Studio](https://grafana.com/docs/k6-studio/set-up/install/).
- [Install Google Chrome](https://www.google.com/chrome/).

{{< admonition type="note" >}}

This tutorial uses the `quickpizza.grafana.com` service, which is a public shared environment. You can use it and follow along this tutorial, or you can use a service that you own. The `quickpizza.grafana.com` service is also [open source](https://github.com/grafana/quickpizza) if you'd like to deploy a private instance.

{{< /admonition >}}

## Create a test recording

To create a test recording:

1. Open the k6 Studio desktop application.
1. Click **Record Flow**.
1. Type "quickpizza.grafana.com" under **Starting URL**.
1. Click **Start recording**. You should see a Google Chrome window open after a few seconds, and the **Requests** header in the k6 Studio application.

   {{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-1-test-recorder-3.png" >}}

1. In k6 Studio, click the edit button next to **Default group**, rename it to "Homepage", and press **Enter**.
1. Next click **Create group**, name it "Generate pizza", and press **Enter**. Groups can help organize your test scripts so they're easier to edit and maintain in the future, and give you timing metrics for each group in your test script.
1. In the browser window, press the **Pizza, Please!** button. You should see a generated recommendation.
1. Under the recommendation, press the **Love it!** button. A message saying, "Please log in first." will appear.

This will complete the requests for the "Generate pizza" group.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-2-test-api-service-3.png" >}}

### Log in to the service

In this next step, you'll log in to the service to be able to rate a pizza:

1. In the k6 Studio application, click **Create group**, name it "Login", and press **Enter**.
1. In the browser, in the top-right of the screen press the **Login/Profile** link. You should see an authentication dialog box.
1. For username, enter "studio-user". For password, enter "k6studiorocks".

You'll be logged in to the test service, and this will complete the requests for the "Login" group.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-3-test-api-service-login.png" >}}

### Generate and rate a named pizza

In this next step, you'll generate and rate a pizza again, this time with a custom name.

1. In k6 Studio, click **Create group**, name it "Generate and rate custom pizza", and press **Enter**.
1. In the browser, press the **Back to main page** link. You should see the homepage again.
1. In the top-right of the page, toggle the `Advanced` input, a form will appear on the page to customize the generated pizza.
1. In the form, insert "testedpizza" as a name in the **Custom Pizza Name** input, and press the **Pizza, Please!** button. You should see a generated recommendation with the same name.

   {{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-4-test-api-service-generate-pizza.png" >}}

1. Under the recommendation, press the **Love it!** button, a message with "Rated!" will appear.
1. In k6 Studio, click **Stop recording**.

After you click **Stop recording**, k6 Studio saves the recording as a HAR file.

### Rename the recording

In the sidebar, you can change the name of the recording after it's created. To do that:

1. In k6 Studio, right click on the recording you just created in the left sidebar.
1. Rename the recording to `generate pizza`.
1. Press **Enter** to confirm the changes.

### Inspect response and request data

After you finish a recording, you can visualize the request and response data for each request included in your test recording.

To view the request and response data for a request, click on the request you would like to inspect from the **Requests** list.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-5-test-recording-inspector-3.png" >}}

The Request and Response panels have tabs where you can view the headers, payload, or cookies for a request, and the headers, content, and cookies for a response. For the response content tab, you can also view it in different formats, such as the raw data, or a preview.

## Generate a script from a test recording

To generate a script from a test recording:

- If you still have the test recording open from the last step, click **Create test generator** on the top-right.
- You can also click **+** next to Generator on the left side, and then select your recording on the top-right.

A dialog box shows up that lets you select the hosts to use from the recording for generating the script. Select `quickpizza.grafana.com` and press **Continue**.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-6-test-generator-allowed-hosts-3.png" >}}

The Generator lets you generate and modify a k6 test script via the user interface, without having to write JavaScript code.

On the top, you can inspect the recording from this view, similar to the Recorder. On the bottom, you can see the list of **Test rules**, with a **Verification rule** already added.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-7-test-generator-3.png" >}}

**Test rules** are objects that you can add to your generator file to modify the script generated from the recording. The **Verification rule** that's created by default modifies the script to add [Checks](https://grafana.com/docs/k6/latest/using-k6/checks/). These checks verify that when you run your script, the status codes you receive from responses are the same as the one you previously recorded. That can be a good starting point to verify your application is working as expected.

You can also inspect the script that would be generated by selecting the **Script** tab in the top panel.

## Validate a test script

In this next step, you can validate the test script that was created from the recording to check if your script is working correctly. To validate a test script:

1. In k6 Studio, click on the **Script** tab next to **Requests**.
1. Click **Validate** on the top-right.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-8-test-generator-validate.png" >}}

The Validator runs your script in a single iteration and lets you inspect the requests and responses sent, and see any logs and checks from k6.

For this tutorial, running the script that was created by the previous steps will result in a couple of requests that should be returning a 200 status code, returning a 401 status code instead.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-9-test-validator-failed-request.png" >}}

That happens because of two reasons:

1. The log in endpoints use a CSRF token to validate the request.
2. The pizza rating endpoint uses a `pizza.id` property to rate the pizza that was randomly generated.

For both cases, these are common scenarios where APIs or services require information to be retrieved from an endpoint, and then used in subsequent requests.

In the next steps, you'll learn how to use rules to customize your script and make it work correctly.

## Correlate dynamic data

If you inspect the data of the **POST** request `/api/csrf-token`, you can see that it generates a `csrf` token.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-10-form-csrf-token.png" >}}

That's an example of a dynamic value that you can't predict when generating the script because that value is generated by the server when you reach the log in form, and the server expects it back when you submit the form.

You'll need a way to customize the script so that it knows to get this value at runtime and replace the value from the recording from this extraction. You can do that by using the **Correlation Rule**.

To add a correlation rule:

1. In k6 Studio, click **+ Add rule** and select **Correlation** from the entries.
1. Under **Extractor**, set the **Target** field to **Headers**.
1. In the **Begin** field, type `csrf_token=`.
1. In the **End** field, type `;`.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-11-correlation-rule.png" >}}

On the request list, you'll see that a `Value extracted` and `match` label appears next to a couple of requests. These are the requests that this particular rule is either extracting or replacing a value from.
At the bottom of the rule editor, you can see the value that got extracted.

k6 Studio updates the labels in real-time as you edit your rule. It's useful to see when you actually have a match and where you are actually replacing values. When replacing the value, by default the rule will try to find occurrences of that value and automatically replace those. If you need more control over it you can open the toggle to customize the replacer selector.

With this rule in place, you have added dynamic data correlation to your script without having to touch any code.

If you run the validation step again, you can see that one of the failing requests returns a 201 status code.

There's still one failing request related to the generated ID for the pizza not being extracted and used in the next request. To fix that:

1. In k6 Studio, click **+ Add rule** and select **Correlation** from the entries.
1. Under **Extractor**, set the **Target** field to **Body**, set the **Type** field to **JSON**.
1. In the **JSON path** field, type `pizza.id`.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-12-correlation-rule-pizza-id.png" >}}

This correlates the generated pizza ID in both the `Generate pizza` and `Generate and rate custom pizza` groups.

You can validate the test script again, and all the requests should be returning the correct status code, and the k6 checks should be passing.

## Parameterize a value

You can make use of the [parameterization rule](https://grafana.com/docs/k6-studio/components/test-generator/#parameterization-rule) to modify a value from some text, and replace it with a variable or even data from a CSV or JSON file.

To add a parameterization rule:

1. Under **Test rules**, click **+ Add rule** and select **Parameterization**.
1. Change the **Type** field to `Text`.
1. In the **Text** input, insert the name you used earlier when generating the custom pizza.
1. On the right-side, insert the new value you want to replace with under **Value**. For example `Grotpizza`.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-13-parameterization-rule.png" >}}

You'll see that the **POST** request from the recording now has the `match` label next to it. If you inspect the **Payload** you can see that it's now using the newly defined name.

## Insert a custom JavaScript snippet

You can make use of the **Custom Code** rule to insert a custom JavaScript snippet in your script.

1. In k6 Studio, click **+ Add rule** and select **Custom Code** from the entries.
1. In the **Snippet** input, type `console.log('hello k6')`.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-14-custom-code-rule.png" >}}

If you open the **Script** tab, you can see the script getting updated in real-time with the snippet being inserted before every request.

## Export a test script

To export a test script:

1. In k6 Studio, click on the `Script` tab next to `Requests`.
1. Click **Export** on the top-right.
1. Enter a name for the script.
1. Click **Export**.

After you save the script, it'll show up under **Scripts** on the left side. You can right click on the script and click **Open containing folder** to find it in your system, and then use `k6` to run it.

## Summary

To summarize:

- You created a test recording using the https://quickpizza.grafana.com/ service.
- You created groups to organize a test recording into logical steps.
- You learned how to view request and response data from a test recording.
- You created a Generator from a test recording, and learned how to use the correlation, parameterization, and custom code rules.
- You learned how to validate a test script after setting up rules in the Generator.
- You exported a test script from your test recording and rules setup.

Now you can use the same steps to create a test recording for an application or service that you own and generate test scripts. You can then use those scripts to run performance tests by using the k6 CLI, or Grafana Cloud k6.

## Next steps

Now that you learned the basics of how to use k6 Studio, you can:

- Learn how to [install and run a test using the k6 CLI](https://grafana.com/docs/k6/latest/get-started/running-k6/).
- Learn how to [run your test using Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/get-started/run-cloud-tests-from-the-cli/).
