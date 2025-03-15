---
title: 'Record your first script'
description: 'Learn the basics of k6 Studio. Create a test recording, configure a test generator, and run a test script'
weight: 300
---

# Record your first script

This tutorial shows how to create a recording, set up custom rules, and generate a test script using k6 Studio.

In this tutorial, you will:

- Create a test recording using the https://test-api.k6.io/ service.
- Learn how to create groups to organize your test recordings.
- View the request and response data from a test recording.
- Use the Test Generator to create a correlation and a custom code rule.
- Validate your test script from the Test Generator.
- Export your test script.

## Before you begin

To complete this tutorial, you'll need to:

- Have a Windows or macOS machine.
- [Install k6 Studio](https://grafana.com/docs/k6-studio/set-up/install/).
- [Install Google Chrome](https://www.google.com/chrome/).

{{< admonition type="note" >}}

This tutorial uses the `test-api.k6.io` service, which is a public shared environment. You can use it and follow along this tutorial, or you can use a service that you own. The `test-api.k6.io` service is also [open source](https://github.com/grafana/test-api.k6.io) if you’d like to deploy a private instance.

{{< /admonition >}}

## Create a test recording

To create a test recording:

1. Open the k6 Studio desktop application.
1. Click **Record Flow**.
1. Type "test-api.k6.io" under **Starting URL**.
1. Click **Start recording**. You should see a Google Chrome window open after a few seconds, and the **Requests** header in the k6 Studio application.

   {{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-1-test-recorder.png" >}}

1. In k6 Studio, click the edit button next to **Default group**, rename it to "Homepage", and press **Enter**.
1. Next click **Create group**, name it “Go to Create Crocs”, and press **Enter**. Groups can help organize your test scripts so they're easier to edit and maintain in the future, and give you timing metrics for each group in your test script.
1. In the browser window, under **Private APIs**, click on **/my/crocodiles** next to the **POST** method. You should see an authentication dialog box in the next screen.
1. For username, enter "studio-user". For password, enter "password".

You'll be logged in to the test service, and this will complete the requests for the "Go to Create Crocs" group.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-2-test-api-service.png" >}}

### Create a crocodile

In this next step, you'll use the form for the test service to create a crocodile.

To create a crocodile:

1. In k6 Studio, click **Create group**, name it "Create Croc", and press **Enter**.
1. In the browser window, you should have successfully authenticated in the previous step and be able to see the **My Crocodiles** page. Fill out the **Name**, **Sex**, and **Date of birth** fields of the HTML form section.

   {{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-3-create-crocodile.png" >}}

1. Click **POST** to submit the API request.
1. In k6 Studio, click **Stop recording**.

After you click **Stop recording**, k6 Studio saves the recording as a HAR file.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-4-save-test-recording.png" >}}

### Rename the recording

In the sidebar, you can change the name of the recording after it's created. To do that:

1. In k6 Studio, right click on the recording you just created in the left sidebar.
1. Rename the recording to `createc crocs`.
1. Press **Enter** to confirm the changes.

### Inspect response and request data

After you finish a recording, you can visualize the request and response data for each request included in your test recording.

To view the request and response data for a request, click on the request you would like to inspect from the **Requests** list.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-5-test-recording-inspector.png" >}}

The Request and Response panels have tabs where you can view the headers, payload, or cookies for a request, and the headers, content, and cookies for a response. For the response content tab, you can also view it in different formats, such as the raw data, or a preview.

## Generate a script from a test recording

To generate a script from a test recording:

- If you still have the test recording open from the last step, click **Create test generator** on the top-right.
- You can also click **+** next to Test Generator on the left side, and then select your recording on the right side under **Requests**.

A dialog box shows up that lets you select the hosts to use from the recording for generating the script. Select `test-api.k6.io` and press **Continue**.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-6-test-generator-allowed-hosts.png" >}}

The Test Generator lets you generate and modify a k6 test script via the user interface, without having to write JavaScript code.

On the top, you can inspect the recording from this view, similar to the Test Recorder. On the bottom, you can see the list of **Test rules**, with a **Verification rule** already added.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-7-test-generator.png" >}}

**Test rules** are objects that you can add to your generator file to modify the script generated from the recording. The **Verification rule** that's created by default modifies the script to add [Checks](https://grafana.com/docs/k6/latest/using-k6/checks/). These checks verify that when you run your script, the status codes you receive from responses are the same as the one you previously recorded. That's a nice safety measure for your system that you get by default.

You can also inspect the script that would be generated by selecting the **Script** tab in the top panel where you can see the requests.

## Correlate dynamic data

If you inspect the data of the **POST** request, you can see that it makes use of a `csrf` token.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-8-form-csrf-token-2.png" >}}

This is a token that was generated from a previous request and that was present in the form for security reasons. That's an example of a dynamic value that you can't possibly know when generating the script because that value is generated by the server when you reach the form, and the server expects it back when you submit the form.

You'll need a way to generate the script so that it knows to get this value at runtime and replace the value from the recording from this extraction. You can do that by using the **Correlation Rule**.

To add a correlation rule:

1. In k6 Studio, press **+ Add rule** and select **Correlation** from the entries.
1. Under **Extractor**, in the **Begin** field, type `csrfmiddlewaretoken" value="`.
1. In the **End** field, type `"`.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-9-correlation-rule.png" >}}

In the request list you will see that a label appears to a couple of requests with `match`. These are the requests that this particular rule is either extracting or replacing a value from.
On the bottom side of the rule editor you can see the actual value that got extracted.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-10-rule-preview.png" >}}

Everything updates in real-time as you edit your rule. It's useful to see when you actually have a match and where you are actually replacing values. For replacing the value, by default the rule will try to find occurrences of that value and automatically replace those. If you need more control over it you can open the toggle to customize the replacer selector.

With this rule in place, you have added dynamic data correlation to your script without having to touch any code.

## Parameterize a value

You can make use of the **Parameterization** rule to modify a value from some text, a variable or even data files!

1. In k6 Studio, press **+ Add rule** and select **Parameterization** from the entries.
1. For the **Target** leave `Body` and for **Type** select `Text`.
1. In the **Text** input, insert the name you used before when creating a crocodile, for us is `Bert`.
1. Make sure **Replace with** has `Text value` selected and for the **Value** input insert the new value you want to replace with, for example `Johnathan`.

You will see that the **POST** request from the recording now has the `match` label and if you inspect the **Payload** you can see that is now using the newly defined name.

## Insert a custom JavaScript snippet

You can make use of the **Custom Code** rule to insert a custom JavaScript snippet in your script.

1. In k6 Studio, press **+ Add rule** and select **Custom Code** from the entries.
1. In the **Snippet** input, type `console.log('hello k6')`.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-11-custom-code-rule.png" >}}

If you have the script panel open, you can see the script getting updated in real-time with the snippet inserted.

## Validate a test script

To validate a test script:

1. In k6 Studio, switch to the `Script` tab of the Generator.
1. Click the **Validate** button.

The Test Validator runs your script in a single iteration and lets you inspect the requests and responses sent, and see any logs and checks from k6.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-12-test-validator.png" >}}

The checks generated by the default **Verification rule** that can give you a quick glimpse if the script is working as expected.

{{< figure src="/media/docs/k6-studio/tutorial/screenshot-k6-studio-tutorial-13-test-validator-checks.png" >}}

In the Test Validator, you can also inspect requests details similar to the Test Recorder and Generator, giving you a powerful tool to debug your script.

## Export a test script

To export a test script:

1. In k6 Studio, switch to the `Script` tab of the Generator.
1. Click the **Export** button.
1. Enter a name for the script.
1. Click **Export**.

After you save the script, it'll show up under **Scripts** on the left side. You can right click on the script and click **Open containing folder** to find it in your system, and then use `k6` to run it.

## Summary

To summarize:

- You created a test recording using the https://test-api.k6.io/ service.
- You created groups to organize a test recording into logical steps.
- You learned how to view request and response data from a test recording.
- You created a Test Generator from a test recording, and learned how to use the correlation, parameterization and custom code rules.
- You learned how to validate a test script after setting up rules in the Test Generator.
- You exported a test script from your test recording and rules setup.

Now you can use the same steps to create a test recording for an application or service that you own and generate test scripts. You can then use those scripts to run performance tests by using the k6 CLI, or Grafana Cloud k6.

## Next steps

Now that you learned the basics of how to use k6 Studio, you can:

- Learn how to [install and run a test using the k6 CLI](https://grafana.com/docs/k6/latest/get-started/running-k6/).
- Learn how to [run your test using Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/get-started/run-cloud-tests-from-the-cli/).
