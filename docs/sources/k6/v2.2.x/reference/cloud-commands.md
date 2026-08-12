---
title: 'Cloud commands'
description: 'The k6 cloud command and its subcommands run and manage Grafana Cloud k6 tests, projects, and load zones from the command line.'
weight: 06
---

# Cloud commands

The `k6 cloud` command and its subcommands run and manage tests in Grafana Cloud k6 from the command line. Use them to authenticate, run or upload tests, and inspect the projects, tests, and load zones available in your stack.

## Authentication

Every `k6 cloud` subcommand requires an API token and a configured stack. Authenticate once with [`k6 cloud login`](#k6-cloud-login), or set the `K6_CLOUD_TOKEN` and `K6_CLOUD_STACK_ID` environment variables:

```bash
K6_CLOUD_TOKEN=<YOUR_API_TOKEN> K6_CLOUD_STACK_ID=<YOUR_STACK_ID> k6 cloud run script.js
```

For instructions on how to generate a token, refer to [Tokens and CLI authentication](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/tokens-and-cli-authentication).

## k6 cloud login

Authenticate with Grafana Cloud k6 and save the token and stack to the k6 configuration file so that later `k6 cloud` commands can reuse them. Run it without flags to be prompted interactively for your token and stack:

```bash
k6 cloud login
```

You can also pass the values directly, where the stack is a full URL or a slug:

```bash
k6 cloud login --token <YOUR_API_TOKEN> --stack <YOUR_STACK_URL_OR_SLUG>
```

| Option | Description |
|--------|-------------|
| `-t`, `--token` | The API token to authenticate with. |
| `--stack` | The stack (URL or slug) where commands run by default. |
| `-s`, `--show` | Display the saved token and stack information, then exit. |
| `-r`, `--reset` | Reset the stored token and stack information. |

For the full cloud testing workflow, refer to [Run a k6 test script](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/run-k6-test-script#run-a-test-using-grafana-cloud-k6).

## k6 cloud run

Run a test in Grafana Cloud k6. k6 builds an [archive](https://grafana.com/docs/k6/<K6_VERSION>/reference/archive) from your script and its resources, uploads it, and runs the test on cloud infrastructure while streaming status to your terminal:

```bash
k6 cloud run script.js
```

To run the test locally and stream only the results to Grafana Cloud, use `--local-execution`:

```bash
k6 cloud run --local-execution script.js
```

`k6 cloud run` accepts the same options as [`k6 run`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference), plus cloud-specific flags such as `--exit-on-running` and `--show-logs`. For local execution and result streaming, refer to [Cloud output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/cloud).

## k6 cloud upload

Upload a test to Grafana Cloud k6 without running it. This uploads the [archive](https://grafana.com/docs/k6/<K6_VERSION>/reference/archive) k6 produces from your script and its resources:

```bash
k6 cloud upload script.js
```

## k6 cloud project list

List all projects in the configured stack.

### Usage

```bash
k6 cloud project list [flags]
```

### Options

| Option | Description |
|--------|-------------|
| `--json` | Output the project list as a JSON array. Without this flag, the output is a human-readable table. |

### Output

The default output is a table with the project `ID`, `NAME`, and whether it's the stack's `DEFAULT` project:

```text
Projects for https://my-team.grafana.net:

ID       NAME               DEFAULT
123456   default            yes
234567   Checkout service   no
```

## k6 cloud test list

List the load tests of a Grafana Cloud k6 project.

The project to list tests for is resolved in the following order:

1. The `--project-id` flag.
2. The `K6_CLOUD_PROJECT_ID` environment variable (cloud config `projectID`).
3. The default project of the configured stack, populated by `k6 cloud login`.

If none of these resolve to a project, the command returns an error.

### Usage

```bash
k6 cloud test list [flags]
```

### Options

| Option | Description |
|--------|-------------|
| `--project-id` | ID of the project to list tests for. Defaults to the configured project. |
| `--json` | Output the test list as a JSON array. Without this flag, the output is a human-readable table. |

### Output

The default output is a table with each test's `ID`, `NAME`, and `CREATED` and `UPDATED` timestamps (in UTC):

```text
Tests in project 123456:

ID       NAME              CREATED            UPDATED
789012   Checkout flow     2026-01-15 09:30   2026-02-01 14:22
789013   Homepage load     2026-01-20 11:05   2026-01-28 08:47
```

## k6 cloud load-zone list

List all load zones available in the configured stack, including the public (Grafana-managed) zones and any [private load zones](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/private-load-zone-v2/) you've set up. Use it to confirm a zone's identifier and whether it's currently usable before you reference it from a script.

### Usage

```bash
k6 cloud load-zone list [flags]
```

### Options

| Option | Description |
|--------|-------------|
| `--json` | Output the load zone list as a JSON array. Without this flag, the output is a human-readable table. |

### Output

The default output is a table with each zone's `ID` (the identifier you reference from a script, such as `amazon:us:ashburn`), `NAME`, `TYPE` (`public` or `private`), and whether it's currently `AVAILABLE`:

```text
Load zones for https://my-team.grafana.net:

ID                    NAME                     TYPE      AVAILABLE
amazon:us:ashburn     Ashburn, US (Amazon)     public    yes
amazon:sa:cape town   Cape Town, SA (Amazon)   public    yes
my-cluster            My private cluster       private   no
```

With `--json`, the same data is emitted as a JSON array:

```json
[
  {
    "id": 1,
    "k6_load_zone_id": "amazon:us:ashburn",
    "name": "Ashburn, US (Amazon)",
    "public": true,
    "available": true
  },
  {
    "id": 2,
    "k6_load_zone_id": "my-cluster",
    "name": "My private cluster",
    "public": false,
    "available": false
  }
]
```

To learn how to reference load zones from a test, refer to [Declare load zones from the CLI](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-load-zones/).
