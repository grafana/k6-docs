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

## Create a test recording

To create a test recording:

- Open the k6 Studio desktop application.
- Click **Record Now**.
- Click **Start recording**. You should see a Google Chrome window open after a few seconds, and the **Requests** header in the k6 Studio application.
- In the browser window, go to "https://test-api.k6.io/".
- In k6 Studio, click **Create group**, name it "Go to Create Crocs", and click **Accept**. Groups can help organize your test scripts so they're easier to edit and maintain in the future, as well as it gives you timing metrics for each group in your test script.
- In the browser window, under **Private APIs**, click on **/my/crocodiles** next to the **POST** method. You should see an authentication dialog box in the next screen.
- For username, enter "test-user". For password, enter "password".

### Create a crocodile

In this next step, we'll use the form for the test service to create a crocodile.

To create a crocodile:

- In k6 Studio, click **Create group**, name it "Create Croc", and click **Accept**.
- In the browser window, you should have successfully authenticated in the previous step and be able to see the **My Crocodiles** page. Fill out the HTML form section:
  - For **Name**, enter "Bert".
  - For **Sex**, enter "Male".
  - For **Date of birth**, enter "01/01/1970".
- Click **POST** to submit the API request.
- Close the browser window.
- In k6 Studio, click **Stop recording**.

After you click **Stop recording**, k6 Studio saves the recording as a HAR file.

### Inspect response and request data

After you finish a recording, you can visualize the request and response data for each request included in your test recording.

To view the request and response data for a request, click on the request you would like to inspect from the **Requests** list.

{{< figure src="/media/docs/k6-studio/screenshot-k6-studio-test-recorder-2.png" alt="k6 Studio Test Recorder" >}}

The Request and Response panels have tabs where you can view the headers, payload, or cookies for a request, and the headers, content, and cookies for a response. For the response content tab, you can also view it in different formats, such as the raw data, or a preview.

## Generate a script from a test recording

To generate a script from a test recording:

- If you still have the test recording open from the last step, click **Create test generator** on the top-right.
-

## Validate a test script

To validate a test script:

- A

## Export a test script

To export a test script:

- A

## Summary

To summarize:

- You created a test recording using the https://test-api.k6.io/ service.
- You created groups to organize a test recording into logical steps.
- You learned how to view request and response data from a test recording.
- You created a Test Generator from a test recording, and learned how to use the correlation and custom code rules.
- You learned how to validate a test script after setting up rules in the Test Generator.
- You exported a test script from your test recording and rules setup.

Now you can use the same steps to create a test recording for an application or service that you own and generate test scripts. You can then use those scripts to run performance tests by using the k6 CLI, or Grafana Cloud k6.

## Next steps

Now that you learned the basics of how to use k6 Studio, you can:

- Learn how to install and run a test using the k6 CLI.
- Learn how to run your test using Grafana Cloud k6.
