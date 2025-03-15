---
title: 'Run a test in Grafana Cloud k6'
description: 'Learn how to log in to your Grafana Cloud k6 account and run a test script directly from k6 Studio.'
weight: 450
---

# Run a test script in Grafana Cloud k6

After you finish creating and validating a test script in k6 Studio, you might want to run it with the scenarios you've configured in the set up phase to simulate a real-world performance test scenario.

To do so, you can use the [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/) integration directly inside of k6 Studio. Running your tests in Grafana Cloud k6 offers several advantages:

- **Advanced analytics**: Access comprehensive dashboards and visualization tools for test results.
- **Collaboration**: Share test results with your team members.
- **Scalability**: Run tests with any number of virtual users without worrying about local machine limitations.
- **Geographic distribution**: Test from multiple regions around the world.

## Before you begin

To run a test script in Grafana Cloud k6, you'll need:

- A [Grafana Cloud](https://grafana.com/auth/sign-up/create-user) account.
- A stack that has Grafana Cloud k6 initialized.

## Authenticate with Grafana Cloud

### Log in to Grafana Cloud

To log in to Grafana Cloud from k6 Studio:

1. Click on the profile icon on the bottom left.
1. Click **Sign in with Grafana Cloud**.
1. In your browser, log in to your Grafana Cloud account.
1. In the **Authorize Application** page, confirm that the code displayed on the page is the same code as the one displayed in k6 Studio.
1. Click **Grant**, and go back to k6 Studio.

### Select a Grafana Cloud stack

After you log in to your Grafana Cloud account, you'll be able to see the stacks from all organizations you're a part of. To run a test script in Grafana Cloud, you must select the stack that the test will run from.

To select a stack:

1. Click on the stack drop-down menu.
1. You can filter the list of stacks by typing on the drop-down field.
1. After you select a stack, click **Continue**.

{{< admonition type="note" >}}

You can sign in to multiple Grafana Cloud stacks at the same time by using the **Sign in to another stack** button. If you're signed in to multiple stacks, you can choose which one you want to run your Grafana Cloud tests in from the profile menu drop-down.

{{< /admonition >}}

### Sign out from Grafana Cloud

To sign out from Grafana Cloud:

1. Click on the profile icon on the bottom left.
1. Click **Sign out**.

## Run a test in Grafana Cloud

After you successfully sign in to Grafana Cloud and select a stack, you can run your tests scripts in Grafana Cloud k6 directly from k6 Studio.

To run a test script in Grafana Cloud k6:

1. Select a test script from the **Scripts** list.
   - If you don't have a test script, follow the [Record your first script](https://grafana.com/docs/k6-studio/record-your-first-script/) tutorial.
1. **Optional**: Click **Validate script** on the top right, to make sure your script is working correctly.
1. Click **Run in Grafana Cloud**.

A new browser window will open, showing the test being initialized in your Grafana Cloud account.

The test script uses the load profile configured in the **Generator** -> **Test options** -> **Load profile** section. If you'd like to update the stages, number of VUs or iterations, make changes to the **Load profile** section and export your script, or you can manually edit your test script file using a code editor.

Refer to [Scenarios](https://grafana.com/docs/k6/latest/using-k6/scenarios/) for more details.

## View and analyze test results

After your test starts running in Grafana Cloud k6, you can monitor its progress and analyze the results. The dashboard displays key performance metrics such as:

- Response time (p95)
- Total number of requests
- Request rate
- Error rate

Refer to [Analyze test results](https://grafana.com/docs/grafana-cloud/testing/k6/analyze-results/) for more details.
