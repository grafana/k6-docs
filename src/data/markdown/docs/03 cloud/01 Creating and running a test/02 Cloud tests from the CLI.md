---
title: 'Cloud tests from the CLI'
excerpt: 'How to run cloud tests from the k6 CLI.'
---

While the Test Builder can help you learn k6 or build a proofs of concept,
for ongoing use, most testers prefer to run cloud tests from the command line.
Some reasons you might prefer to run tests from the CLI:
- To store tests in version control
- To modularize scripts for collaboration and easier maintenance.
- To work in the local environment.
- To test intranet services and [stream the results to the Cloud](/results-output/real-time/cloud/).
- To integrate testing in CI/CD pipelines.

| On this page...           | Read about...                                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| [Run tests](./run-tests)            | How to use the k6 CLI to run tests on k6 Cloud servers, or how to stream the results of local tests to visualize on the cloud. |
| [Cloud execution reference](./cloud-execution-reference) | Cloud specific options, load zones, tags, and environment variables                                                                        |

## Differences between local and cloud execution

While the cloud and local execution modes are almost completely compatible, the two modes have a few particularities.

### Cloud logs print to terminal

When a cloud tests runs from the CLI, cloud log outputs to the terminal.
To disable cloud logs, you can:
- Pass `--show-logs=false` as an option to `k6`
- Set an environment variable `K6_SHOW_CLOUD_LOGS=false`.

### setup and teardown might run from different servers

With one exception, [setup and teardown lifecycle functions](/using-k6/test-lifecycle) run as normal when running cloud tests.

Depending on the test size, the test might run from one or more cloud servers.
Setup and teardown execute only once, and each will execute from only one server.
However, the cloud server that runs `setup()` might differ from the one that runs `teardown()`.

### System environment variables

With cloud execution, you must use the CLI flags (`-e`/`--env`) to set environment variables like `-e KEY=VALUE` or `--env KEY=VALUE`.
For details, refer to the [environment variables](/using-k6/environment-variables) document.

If you set environment variables in the local terminal before you run your k6 script, k6 _does not_ forwarded these variables to k6 Cloud service.
Thus they won't be available to your script when executing in the cloud.

