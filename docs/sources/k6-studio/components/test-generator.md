---
title: 'Test Generator'
description: 'Understand how the k6 Studio Test Generator works'
weight: 200
---

# Test Generator

The Test Generator takes the output of a test recording and gives you options to customize the test with a visual interface and generate a test script from it, without having to manually write JavaScript code.

You can use it to define a list of hosts to allow or remove from your script, tweak the load profile for your test, include variables in your script, and configure rules to extract values, parameterize requests, and more.

{{< figure src="/media/docs/k6-studio/screenshot-k6-studio-test-generator-panels-2.png" alt="k6 Studio Test Generator window, showing a test generator with three test rules, the requests panel open on the right side with several requests, and the correlation rule panel open and configured to search for a CSRF token" >}}

The Test Generator window is composed of:

1. **Test generator name**: The name of the test generator. This is automatically generated, but you can rename it to help keep your files organized.
2. **Test Generator actions**: On the top-right you can see the action buttons for the Test Recorder. From here you can click **Save Generator** to save changes to your test generator file, or click the menu icon to:
   - **Validate script**: Opens the [Test Validator](https://grafana.com/docs/k6-studio/components/test-validator/) and starts a one iteration run of the test script.
   - **Export script**: Opens the export script dialog box. You can enter a name for your script, and also select whether you want to overwrite a script if one with the same name already exists.
   - **Delete generator**: Deletes the selected test generator.
3. **Test Generator options**: Below the test generator name, you can see:
   - **Add rule**: Opens a list of rule types that you can add to the generator.
   - **Test options**: Configure the load executor, think time, and test variables.
   - **Allowed hosts**: Shows a list of hosts for the recording, and lets you select which ones to include or remove from the script.
4. **Test rules list**: The list of test rules applied to this particular generator. The rules can be reordered, and you can see some details about how they're configured.
5. **Request, response, script, and rule inspector**: When you click on a request from the requests list, a panel opens on the right side which shows the request and response details for that request. You can use it to inspect the headers, payload, cookies, and content of the requests.

## Test options

The test options tab lets you configure three separate parts of your test script:

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

The think time option lets you configure a fixed or random delay, between groups or iterations, to simulate a more realistic test. This isn't required, but it's a best practice when creating and running performance tests.

### Test data

The test data option lets you define two types of data for use in your test scripts: **variables** and **data files**.

#### Variables

In the **Variables** tab, you can define a name and a value, as a string. You can then use the variables in your [custom code](#custom-code-rule) and [parameterization](#parameterization-rule) rules.

After you define a variable, you can refer to them in your custom code rules by using: `VARS["VARIABLE_NAME"]`.

#### Data files

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
- **Replace with**: Configure how you want to replace the values when a match is found.
  - **Text value**: Define a text value.
  - **Variables**: Use a variable from the drop-down list. Make sure that you configure the variable value to be used under **Test data** -> **Variables**.
  - **Data file**: Select a data file from the drop-down list. After you select a data file, you can select any properties from the **Property name** list. The test script will use a different value for each iteration of the test run. Refer to [Data files](#data-files) for more details.

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

When clicking on validate script, the Test Validator opens and runs one iteration of your test script. You can click on each request to inspect the request and response, and view the logs, checks, and script tab to review the output of the test generator.

After validating your script, you can export it so you can run it using the k6 CLI, or using Grafana Cloud k6.
