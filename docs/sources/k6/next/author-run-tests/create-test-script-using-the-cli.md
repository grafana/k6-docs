---
title: Create a test script using the CLI
description: Learn how to create a test using the k6 CLI and the k6 new command.
weight: 100
---

# Create a test script using the CLI

Writing a k6 test script from scratch can seem challenging if you're just getting started with k6, or repetitive if you're already familiar with the tool. The k6 `new` command can help both new and experienced users quickly generate a test script, which they can use to try out k6, or use as a starting point to test out their applications and services.

## Before you begin

To use the k6 `new` command, you'll need:

- [k6 v0.57 or higher](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6/) installed on your machine.

## Use the k6 new command

To create a script with the k6 `new` command, run the following in your terminal:

```bash
k6 new
```

The command creates a k6 test script file named `script.js` in the current directory.

You can customize the script filename by passing the name as an argument. For example, to create a script named `test.js`:

```bash
k6 new test.js
```

## Options

You can customize the generated script using the following options: `--template` and `--project-id`.

### --template

The `--template` flag allows you to specify a template that best fits your use case.

The options are:

- `minimal`: Creates a minimal test script with a short options configuration, and a single request and check example. This is the default option.
- `protocol`: Creates a script that includes environment variables, stages with different durations and VUs, thresholds, and a setup function. This is ideal for learning, and as a good starting point for real-world scenarios.
- `browser`: Creates a browser script that checks if a websites successfully loaded, looks for elements on the screen, and takes a screenshot. Similar to the `protocol` option, this is ideal for learning, and a good starting point for creating browser tests.

To use the template flag, run:

```bash
k6 new --template protocol
```

### --project-id

The `--project-id` allows you to specify a Grafana Cloud k6 project ID. The generated script is then configured to run in that project.

To use the project ID flag, run:

```bash
k6 new --project-id 12345
```

{{< admonition type="note" >}}

To run your test in a specific Grafana Cloud k6 project, you need a Grafana Cloud account with access to that project.

To learn more about Grafana Cloud k6, refer to [Grafana Cloud k6 documentation](https://grafana.com/docs/grafana-cloud/testing/k6/).

{{< /admonition >}}
