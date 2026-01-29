---
aliases:
  - ./test-generator # docs/k6-studio/components/test-generator
title: 'Generator'
description: 'Understand how the k6 Studio Generator works'
weight: 200
---

# Generator

The Generator takes the output of a test recording and gives you options to customize the test with a visual interface and generate a test script from it, without having to manually write JavaScript code.

You can use it to define a list of hosts to allow or remove from your script, tweak the load profile for your test, include variables in your script, and configure rules to extract values, parameterize requests, and more.

{{< figure src="/media/docs/k6-studio/screenshot-k6-studio-test-generator-panels-3.png" alt="k6 Studio Generator window, showing a test generator with three test rules, the requests panel open on the right side with several requests, and the correlation rule panel open and configured to search for a CSRF token" >}}

The Generator window is composed of:

1. **Generator name**: The name of the test generator. This is automatically generated, but you can rename it to help keep your files organized.
2. **Generator actions**: On the top-right you can see the action buttons for the Generator. From here you can select a recording, click **Save Generator** to save changes to your test generator file, or click the menu icon to:
   - **Validate script**: Opens the [Validator](https://grafana.com/docs/k6-studio/components/test-validator/) and starts a one iteration run of the test script.
   - **Export script**: Opens the export script dialog box. You can enter a name for your script, and also select whether you want to overwrite a script if one with the same name already exists.
   - **Delete generator**: Deletes the selected test generator.
3. **Requests and Script inspector**: The list of requests, and groups if any, from the selected recording. The requests are organized by time, and you can see the method, status code, host, and path for each one. You can also collapse and expand groups to inspect them more easily. Clicking on any request opens the request inspector, where you can view the request and response details.
4. **Generator options**: Below the test generator name, you can see:
   - **Add rule**: Opens a list of rule types that you can add to the generator.
   - **Test options**: Configure the load profile, thresholds, think time, and load zones.
   - **Test data**: Define variables, and configure data files that can be used in your test rules.
   - **Allowed hosts**: Shows a list of hosts for the recording, and lets you select which ones to include or remove from the script.
5. **Test rules list**: The list of test rules applied to this particular generator. The rules can be reordered, and you can see some details about how they're configured.

## Test options

The test options tab lets you configure three separate parts of your test script:

- Load profile
- Thresholds
- Think time
- Load zones

### Load profile

The load profile controls how k6 schedules VUs and iterations to run your performance test.

There are two executors available under load profiles:

- **Ramping VUs**: A variable number of VUs execute as many iterations as possible for a specified amount of time.
- **Shared iterations**: A fixed number of iterations are shared between a number of VUs, and the test ends once all iterations have been executed.

Each executor has different variables you can configure. For more details, refer to [Executors](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/).

### Thresholds

Thresholds are the pass/fail criteria that you define for your test metrics. If the performance of the system under test (SUT) doesn't meet the conditions of your threshold, the test finishes with a failed status.

Thresholds are commonly used to codify SLOs, for example, fail this test if an endpoint has a response time above 500ms. They can also be used as a way to set up alerts based on test failures.

In k6 Studio, you can click on **Add threshold** to add one or more thresholds to your test script. For each threshold, you can configure the metric, as well as the failure conditions, and if you want a failure to stop the test execution.

Refer to [Thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/) for more details.

### Think time

The think time option lets you configure a fixed or random delay, between groups or iterations, to simulate a more realistic test. This isn't required, but it's a best practice when creating and running performance tests.

### Load zones

{{< admonition type="note" >}}

Load zones only affects tests that are executed in [Grafana Cloud k6](https://grafana.com/docs/k6-studio/run-test-in-grafana-cloud/).

{{< /admonition >}}

Load zones represent different regions that you can use to run your tests from. You can use them to get a more accurate picture of what your users are seeing when they're accessing your application from different parts of the world.

In the **Load zones** tab, you can use the **Add new load zone** button to add one or more load zones to your test script. You can also use the **Distribution** toggle to manually choose the percentage of the load that runs from each zone, or to distribute them evenly.

When you add a load zone to your test script, you can see it reflected in the `options` object. For example:

```javascript
export const options = {
  cloud: {
    distribution: {
      'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 50 },
      'amazon:ie:dublin': { loadZone: 'amazon:ie:dublin', percent: 50 },
    },
  },
};
```

Refer to [Use load zones](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-load-zones/) for more details.

## Test data

The test data option lets you define two types of data for use in your test scripts: **variables** and **data files**.

### Variables

In the **Variables** tab, you can define a name and a value, as a string. You can then use the variables in your [custom code](#custom-code-rule) and [parameterization](#parameterization-rule) rules.

After you define a variable, you can refer to them in your custom code rules by using: `VARS["VARIABLE_NAME"]`.

### Data files

When running performance tests, it's common to use randomly generated data, or a specific set of data that's relevant to your application. In k6 Studio, you can import data files, either via the **Data files** section of the main menu, or via a **Generator** -> **Test data** -> **Data files** -> **Add data file +**, and then use them in [parameterization rules](#parameterization-rule).

The requirements for data files supported in k6 Studio are:

- The file format must be CSV or JSON.
- The maximum file size is 10 MB.
- For CSV files:
  - They must contain a header.
  - They must use `,` as the separator.
- For JSON files:
  - They should be flat arrays without nesting. Nested values are not supported, and won't show up in parameterization rules.

After you import a data file, you can add it to your Generator by:

1. Click on **Test data**.
1. Click on the **Data files** tab.
1. Click on **Add data file +**.
1. Select the data file from the drop-down list.

After that, you can use your data file in a [parameterization rule](#parameterization-rule), in the **Replace with** section. The generated k6 test script will use a unique item from the file per iteration to simulate user behavior.

## Allowed hosts

The **Allowed hosts** option lets you configure which hosts you want to include in your test script. It shows all the hosts that are identified from your HAR recording file, and you can choose to select which ones you want to include or remove from your test script.

For performance testing, it's common to not include static assets, or remove hosts from 3rd-party services from your tests, but you can include them depending on your use case.

## Autocorrelation

{{< admonition type="note" >}}

This feature is in public preview and subject to change.

{{< /admonition >}}

Autocorrelation is an AI-powered feature that automatically creates correlation rules for your test scripts. It detects dynamic values, such as session tokens, CSRF tokens, and resource IDs, that change between recording and playback, and creates rules to extract and reuse these values so your scripts work correctly.

When you record a user session, many applications include dynamic values in their requests and responses. These values, like authentication tokens or session IDs, are generated at runtime and differ each time the session is replayed. Without correlation, your test script fails because it uses the original recorded values instead of the new ones.

Autocorrelation uses AI to:

- Run validation to identify mismatches between your recording and a live test run
- Detect values that change between runs
- Create correlation rules to extract and reuse these values automatically

### Before you begin

Before using Autocorrelation, make sure you have:

- **An OpenAI API key configured.** Go to **Settings > AI** and add your API key. You can create one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys). Refer to [AI settings](https://grafana.com/docs/k6-studio/set-up/settings/#ai) for more details.
- **A recording with requests.** Open an existing recording in the Generator, or create a new recording first.
- **Proxy online.** The proxy must be running to validate your script.

{{< admonition type="note" >}}

Your API key is encrypted and stored locally using your operating system's secure storage. Data from your recording is sent to OpenAI for processing. Usage is subject to your OpenAI agreement and associated billing.

{{< /admonition >}}

### Use Autocorrelation

To automatically create correlation rules for your recording:

1. **Open the Generator** with your recording loaded.

2. In the **Test rules** section, click **Autocorrelate**.

    {{< figure src="/media/docs/k6-studio/screenshot-k6-studio-test-generator-autocorrelate-button.png" alt="k6 Studio Generator window, highlighting autocorrelation button" >}}

3. In the Autocorrelation dialog, click **Analyze recording** to start the process.

4. **Wait for analysis to complete.** The AI:
   - Validates your script to identify mismatches
   - Analyzes the recording to find dynamic values
   - Creates correlation rules to handle those values

5. **Review validation results.** The right panel shows the validation requests, so you can see how the script performed.

6. **Review the suggested rules.** The left panel shows the rules that were created. Each rule is selected by default. You can:
   - Clear the checkbox next to a rule to exclude it
   - Use **Select all** to toggle all rules at once

7. **Accept or discard the rules:**
   - Click **Accept** to add the selected rules to your generator
   - Click **Discard** to close the dialog without adding any rules
   - Click **Stop** to cancel the analysis while it's running

    {{< figure src="/media/docs/k6-studio/screenshot-k6-studio-correlation-results-2.png" alt="k6 Studio autocorrelation dialog with suggested rules" >}}

### Understand the results

After analysis completes, you'll see one of these outcomes:

| Status                      | Description                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| Correlation not needed      | The script validation passed without any rules. Your current configuration handles all requests correctly. |
| Autocorrelation completed   | The AI successfully created rules that resolve all mismatches.                                           |
| Partially correlated        | Some requests are still failing, but significant progress was made. You may need to add manual rules for edge cases. |
| Autocorrelation failed      | The AI couldn't create rules to fix the mismatches. Consider adding rules manually.                      |

The dialog footer displays token usage during analysis. Tokens are counted separately for input (data sent to the AI) and output (responses from the AI). This helps you monitor API usage costs.

### Troubleshoot Autocorrelation

| Issue                       | Error message                                           | Solution                                                                                                   |
| --------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Incorrect API key           | The OpenAI API key is incorrect or has been revoked.    | Go to **Settings > AI** and verify your API key. Generate a new key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys) if needed. |
| Token limit exceeded        | The recording exceeds the token limit.                  | Your recording is too large for the AI to process. Try reducing the number of allowed hosts, working with a smaller recording, or splitting your recording into multiple smaller sessions. |
| Rate limit                  | You have exceeded the API rate limit.                   | Wait a moment and click **Retry**. If the problem persists, check your OpenAI account for rate limit settings. |
| Proxy offline               | The Autocorrelate button is disabled.                   | Make sure the proxy is running. Check the proxy status indicator in the application.                       |

For unexpected errors, click **Retry** to attempt the analysis again. If the problem persists, click **Report issue** to submit a bug report.

### Considerations

- **Feature preview.** Autocorrelation is in [public preview](https://grafana.com/docs/release-life-cycle/#public-preview). Functionality may change in future releases.
- **Data processing.** Your recording data is sent to OpenAI for analysis. Review the disclaimer in **Settings > AI** for full terms.
- **Manual rules.** You can still create [correlation rules](#correlation-rule) manually using the **Add rule** menu. Autocorrelation complements manual rule creation; it doesn't replace it.
- **Cost.** Using Autocorrelation consumes OpenAI API tokens, which may incur costs based on your OpenAI pricing plan.
- **Large recordings.** Very large recordings may exceed token limits. Consider recording focused user flows rather than extended sessions.

## Rules

Test rules are rules you can add and configure to your test generator, that allow you to customize the generated test script. These rules can use the information from a test recording, to then generate code changes to help make your test scripts more reliable, and reusable.

The available rules are:

- Verification rule
- Correlation rule
- Parameterization rule
- Custom code rule

You can add multiple correlation and custom code rules to your test generator.

You can also use [Autocorrelation](#autocorrelation) to automatically create correlation rules using AI.

### Verification rule

The verification rule is a default rule that's created for every test generator. It adds a [check](https://grafana.com/docs/k6/latest/using-k6/checks/) statement after every request that validates if the response status code is the same as the one from the test recording.

The verification rule is useful for making sure that your systems are performing as expected. Failed checks do not cause a test to abort, or interrupt a test run. Checks generate a metric that you can inspect after a test run is completed to understand how your system performed.

For more details about checks, refer to [Checks](https://grafana.com/docs/k6/latest/using-k6/checks/).

### Correlation rule

The correlation rule lets you extract data from your test recording, and reuse it across your test script. This is a common use case when working with applications that have unique IDs that are generated for a request, and then are passed to every subsequent request, for example.

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

The parameterization rule lets you parameterize your requests to use a text value, or the value from a variable. For example, you can replace a `userId` value in all requests with a test user ID defined as a text value in the rule tab, or use a variable name or data file from the **Test data** option.

The configuration fields are:

- **Filter**: Define a request path that this filter applies to. Plain text and regular expression are supported.
- **Target**: Select the headers, body, or URL path as the target for the extractor or replacer.
- **Type**: Select Begin-End, Regex, or JSON as the way to search for the value to be replaced.
  - **Begin-End**: Define the Begin and End values as the strings immediately before and after the value to be replaced.
  - **Regex**: Define the regular expression to match the value to be replaced.
  - **JSON**: Define the JSON path to match the value to be replaced.
- **Replace with**: Configure how you want to replace the values when a match is found. You can use:
  - **Text value**: Define a text value.
  - **Variables**: Use a variable from the drop-down list. Make sure that you configure the variable value to be used under **Test data** -> **Variables**.
  - **Data file**: Select a data file from the drop-down list. After you select a data file, you can select any properties from the **Property name** list. The test script will use a different value for each iteration of the test run. Refer to [Data files](#data-files) for more details.
  - **Custom code**: Use a custom JavaScript code snippet to define a value. You must include a `return` statement with the value you'd like to use.

When creating or editing a parameterization rule, you can use the **Rule preview** panel to check that your configuration options are working as intended, and being applied to the correct requests and values in your test script.

### Custom code rule

The custom code rule lets you insert a custom JavaScript code snippet in your test script.

The custom code rule has two options:

- **Filter**: Define a request path that this filter applies to. Plain text and regular expression are supported.
- **Placement**: Select between **Before matched requests** or **After matched requests**.

### Rule selectors

For correlation and parameterization rules, you can use the following selectors:

- **Begin-end**: Match a value between two strings.
- **JSON**: Use dot notation to match a value in the JSON payload or response body.
- **Regex**: Use a regular expression to match a value.

#### Begin-end selector

This selector is useful when your target value is between two known strings. For example, to match a value in a URL:

```
https://example.com/products/1234/details
```

To replace `1234` with another value, use the following configuration:

```
Target: URL
Type: Begin-end
Begin: /products/
End: /details
```

#### JSON selector

This selector is ideal when your target value is in a JSON payload or response body. It uses dot notation to access nested properties. For example, in this JSON:

```json
{
  "name": "Product name",
  "details": {
    "id": 1234
  },
  "tags": ["electronics", "sale"],
  "variants": [
    {
      "color": "blue",
      "stock": 5
    },
    {
      "color": "red",
      "stock": 3
    }
  ]
}
```

You can replace values use the following configurations:

```
# Replace nested object value
Target: Body
Type: JSON
Path: details.id

# Replace array element
Target: Body
Type: JSON
Path: tags.0

# Replace nested array object value
Target: Body
Type: JSON
Path: variants.0.stock
```

### Regex selector

When the previous selectors don't meet your needs, you can use regular expressions for more granular matching. For example, to match an authorization token in a header:

```
Headers
Authorization: Bearer eyJhbGciOiJIUzI1NiI
```

To replace `eyJhbGciOiJIUzI1NiI` with another value, use the following configuration:

```
Target: Headers
Type: Regex
Regex: Bearer (.+)
```

{{< admonition type="note" >}}

The regular expression must include a capturing group `()` to specify the value you want to replace.

{{< /admonition >}}

## Validate and export script

After you're done configuring the test options and rules for your test generator, you can click the menu icon on the top-right to validate and export your script.

When clicking on validate script, the Validator opens and runs one iteration of your test script. You can click on each request to inspect the request and response, and view the logs, checks, and script tab to review the output of the test generator.

After validating your script, you can export it so you can run it using the k6 CLI, or using Grafana Cloud k6.
