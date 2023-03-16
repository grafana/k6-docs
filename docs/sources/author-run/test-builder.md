---
title: Use the test builder
description: With the Test builder, you can script tests directly from the Cloud UI.
weight: 100
aliases:
  - /docs/k6/author-run/test-builder
---

# Use the test builder

The _Test Builder_ is a graphical tool to author k6 test scripts.
You can use it to learn the k6 API or to make or prototype tests without needing to write a script.

To use the test builder, go to the k6 app in your Grafana instance.
Then, follow these steps:

1. From k6, select **Create new test**.
1. Select the Test Builder.

From here, you have a single interface to configure different aspects of a load test:

- Make scenarios to model user behavior and real-world load.
  For some conceptual background, read [About scenarios]({{< relref "about-scenarios" >}}).
- Use thresholds to assert that the test meets its performance goals.
- Distribute load across global geographical locations.

## Make requests and check values

To add HTTP requests to your tests, find the scenario, then select **Requests**.
As you build a test, the application creates a script file.
To view the script file, use the toggle at any time.

### Add a request

1. Select **Request**.
1. Select the HTTP method you want to use.
1. Name the request and enter the target URL.
1. Fill in the relevant query params and bodies.

<!--- This is an in-page shortcode to link docs to relevant OSS pages.
After the first instance, use the first argument to declare the subject, and the second to declare the URI path (usually the same).
If URLs change, adjust template. -->

{{< message.inline "HTTP requests" "http-requests" >}}

<em>
To learn about using {{ .Get 0 }} in your scripts,
refer to <a href="https://k6.io/docs/using-k6/{{ .Get 1}}">{{ .Get 0 }}</a>
in the k6 OSS docs.
<br>
<br>
</em>

{{< /message.inline >}}

### Evaluate response values

As a load test runs, systems start to return unexpected responses.
You can add _checks_ to your requests to evaluate responses.

To add a check, follow these steps:

1. From the request, select **Checks**.
1. Choose the check type, then **Add new check**.
1. Write in the expressions that k6 evaluates for in the response.

{{< message.inline "Checks" "checks" />}}

### Pass data from responses to requests

With _variables_, you can take a value from a response and pass it to a new request.
For example, you could select a JSON value that the system returns, then add the value in the body of a subsequent POST request.

To use variables, follow these steps:

1. In the request, select **Variables**.
1. **Add variable**. Choose the variable type and enter its expression.
1. Make a new request, and then drag it under the request where you declared a variable.
1. Use the variable in your request. For example, it could be in a query param or request body. The syntax is as follows:

    `${variable_name}`

### Group requests

Each request has unique tags, which increase the cardinality of your data.
If your test makes requests to many URLs, it may be impractical to have so many unique URLs.

With _groups_, you can organize your requests in categories.
This makes filtering easier, and it can be a way to organize requests in categories that correspond to the application's business logic.

To group requests, follow these steps:

1. Select **Group**. This creates a new Group.
1. Give the Group a name and description.
1. Drag your requests under the group. Order them in the sequence that they should run.

The app displays how many requests and how much sleep is in the group.
You can use this to confirm that the group is correctly populated.

{{< message.inline "Groups" "tags-and-groups" />}}

## Model load patterns

Along with modeling user behavior, you can also model traffic patterns for each scenario:

1. In the scenario, select **Options**.
1. Choose the executor and enter values.

In short, you con model traffic in the following paradigms:
  
  - Whether traffic is dynamic or changing (`constant` or `ramping`).
  - Whether virtual users  execute one after another, or at a simultaneous rate (as with the `arrival-rate` executors).

{{< message.inline "Scenarios" "scenarios" />}}

## Set load zones

Real-world traffic comes from different locations.
To simulate this, you can choose the _load zones_ where the test runs (tests can run from one or many regions).

To configure load zones, follow these steps:
1. Under **Options**, go to **Load zones**.
1. Choose the load zone you want.
1. Optionally add more load zones.

If you want to distribute load non-uniformly, use the **Manual** switch and enter percentages.


## Assert for performance goals

Before you test, you should have a goal for how the system behaves under load.
To set criteria for your system, you can use the threshold option.

1. Under **Options**, go to **Thresholds**.
1. Choose the metrics and conditions. Enter a value.
1. Choose whether a crossed threshold should abort execution with **Stop Test**.

{{< message.inline "Thresholds" "thresholds" />}}
