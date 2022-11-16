---
title: 'Cloud tests from the CLI'
excerpt: 'How to run cloud tests from the k6 CLI.'
---

While the Test Builder can help you learn k6 or build a proofs of concept,
for ongoing use, most testers prefer to run cloud tests from the command line.

Testers have many reasons they might prefer to run tests from the CLI:
- To store tests in version control
- To modularize scripts for collaboration and easier maintenance.
- To work in the local environment.
- To test intranet services and [stream the results to the Cloud](/results-output/real-time/cloud/).
- To integrate testing in CI/CD pipelines.

| On this page...           | Read about...                                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| [Run tests](./run-tests)            | How to use the k6 CLI to run tests on k6 Cloud servers, or how to stream the results of local tests to visualize on the cloud. |
| [Cloud execution reference](./cloud-execution-reference) | Cloud specific options, tags, and environment variables                                                                        |

## Differences between local and cloud execution

While the cloud and local execution modes are almost completely compatible, they differ in a few particularities.

### Iterations

Local execution supports iterations based on test length (`-i` or
`--iterations` on CLI, and `iterations` in script options), which is
not yet supported by the cloud-execution mode.

### Using setup/teardown life-cycle functions

Depending on the test size, the test might run from one or more cloud servers.

Setup and teardown, on the other hand, execute only once, and each will execute from only one server.
However, there's no guarantee that the cloud server that runs `setup()` will be the same one that runs `teardown()`.

Besides this quirk, your [setup and teardown life cycle functions](/using-k6/test-lifecycle) run as normal when running cloud tests.

### Cloud logs

When a cloud tests runs from the CLI,  cloud log output prints to the terminal.
To disable this, either pass `--show-logs=false` as an option to `k6`, or set an environment variable `K6_SHOW_CLOUD_LOGS=false`.

### System environment variables

Environment variables set in the local terminal before executing k6 won't be forwarded to the k6 cloud service.
Thus they won't be available to your script when executing in the cloud.
With cloud execution, you must use the CLI flags (`-e`/`--env`) to set environment variables like `-e KEY=VALUE` or `--env KEY=VALUE`.

For details, refer to the [environment variables](/using-k6/environment-variables) document.
