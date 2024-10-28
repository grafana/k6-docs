---
title: 'Test Generator'
description: 'Understand how the k6 Studio Test Generator works'
weight: 200
---

# Test Generator

The Test Generator takes the output of a test recording and gives you options to customize the test with a visual interface and generate a test script from it, without having to manually write JavaScript code.

You can use it to define a list of hosts to allow or remove from your script, tweak the load profile for your test, include variables in your script, and configure rules to extract values, parameterize requests, and more.

![k6 Studio Test Generator window, showing a test generator with three test rules, the requests panel open on the right side with several requests, and the correlation rule panel open and configured to search for a CSRF token](/media/docs/k6-studio/screenshot-k6-studio-test-generator-panels.png)

The Test Recorder window is composed of:

1. **Test generator name**: The name of the test generator. This is automatically generated, but you can rename it to help keep your files organized.
2. **Test Generator actions**: On the top-right you can see the action buttons for the Test Recorder. From here you can click **Save Generator** to save changes to your test generator file, or click the menu icon to:
   - **Validate script**: Opens the [Test Validator](https://grafana.com/docs/k6-studio/components/test-validator/) and starts a one iteration run of the test script.
   - **Export script**: Opens the export script dialog box. You can enter a name for your script, and also select whether you want to overwrite a script if one with the same name already exists.
   - **Delete generator**: Deletes the selected test generator.
3. **Test Generator options**: Below the test recording name, you can see:
   - **Requests**: The total number of requests in the recording
   - **Show static assets**: A toggle that controls whether you can see all static assets requests in the Requests list. The static assets requests are hidden by default.
   - **Filter**: A search box that allows you to filter the list of requests by URL, method (such as GET or POST), and status code.
4. **Test rules list**: The list of requests, and groups if any, in the HAR file. The requests are organized by time, and you can see the method, status code, host, and path for each one. You can also collapse and expand groups to inspect them more easily.
5. **Request, response, script, and rule inspector**: When you click on a request from the requests list, a panel opens on the right side which shows the request and response details for that request. You can use it to inspect the headers, payload, cookies, and content of the requests.

## Test options

The test options tab allows you to configure three separate parts of your test script:

- Load profile
- Think time
- Test data

### Load profile

The load profile controls how k6 schedules VUs and iterations to run your performance test.

There are two executors available under load profiles:

- **Ramping VUs**: A variable number of VUs execute as many iterations as possible for a specified amount of time.
- **Shared iterations**: A fixed number of iterations are shared between a number of VUs, and the test ends once all iterations have been executed.

Each executor has different variables you can configure. For more details, refer to [Executors](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/).

### Think time

The think time option allows you to configure a fixed or random delay, between groups or iterations, to simulate a more realistic test. This isn't required, but it's a best practice when creating and running performance tests.

### Test data

The test data option allows you to define variables, which you can then use in your [custom code](#custom-code-rule) and [parameterization](#parameterization-rule) rules.

After you define a variable, you can refer to them in your custom code rules by using: `VARS["VARIABLE_NAME"]`.

## Allowed hosts

The **Allowed hosts** option lets you configure which hosts you want to include in your test script. It shows all the hosts that are identified from your HAR recording file, and you can choose to select which ones you want to include or remove from your test script.

For performance testing, it's common to not include static assets, or remove hosts from 3rd-party services from your tests, but you can include them depending on your use case.

## Rules

Test rules are rules you can add and configure to your test generator, that allow you to customize the generated test script. These rules can use the information from a test recording, to then generate code changes to help make your test scripts more reliable, and reusable.

The available rules are:

- Verification rule
- Correlation rule
- Parameterization rule
- Custom code rule

You can add multiple correlation and custom code rules to your test generator.

### Verification rule

The verification rule is a default rule that's created for every test generator. It adds a [check](https://grafana.com/docs/k6/latest/using-k6/checks/) statement after every request that validates if the response status code is the same as the one from the test recording.

The verification rule is useful for making sure that your systems are performing as expected. Failed checks do not cause a test to abort, or interrupt a test run. Checks generate a metric that you can inspect after a test run is completed to understand how your system performed.

For more details about checks, refer to [Checks](https://grafana.com/docs/k6/latest/using-k6/checks/).

### Correlation rule

The correlation rule allows you to extract data from your test recording, and reuse it across your test script. This is a common use case when working with applications that have unique IDs that are generated for a request, and then are passed to every subsequent request, for example.

The correlation rule includes an Extractor and a Replacer. They both have the same configuration options, but the Extractor can be used to find and extract the value you want to use across the script, and the Replacer can be used to find the places where you want to replace and use the extracted value.

The configuration fields are:

- **Filter**: Define a request path that this filter applies to. Plain text and regular expression are supported.
- **Target**: Select the headers, body, or URL path as the target for the extractor or replacer.
- **Type**: Select Begin-End, Regex, or JSON as the way to search for the value to be extracted or replaced.
  - **Begin-End**: Define the Begin and End values as the strings immediately before and after the value to be extracted or replaced.
  - **Regex**: Define the regular expression to match the value to be extracted or replaced.
  - **JSON**: Define the JSON path to match the value to be extracted or replaced.

When creating or editing a correlation rule, you can use the **Rule preview** panel to check that your configuration options are working as intended, and being applied to the correct requests and values in your test script.

### Parameterization rule

### Custom code rule

The custom code rule allows you to insert a custom JavaScript code snippet in your test script.

The custom code rule has two options:

- **Filter**: Define a request path that this filter applies to. Plain text and regular expression are supported.
- **Placement**: Select between **Before matched requests** or **After matched requests**.

## Validate and export script

After you're done configuring the test options and rules for your test generator, you can click the menu icon on the top-right to validate and export your script.

When clicking on validate script, the Test Validator opens and runs one iteration of your test script. You can click on each request to inspect the request and response, and view the logs, checks, and script tab to review the output of the test generator.

After validating your script, you can export it so you can run it using the k6 CLI, or using Grafana Cloud k6.
