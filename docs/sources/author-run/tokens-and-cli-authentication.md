---
title: Authenticate on the CLI
description: How to authenticate with a k6 Cloud App token
weight: 501
aliases:
  - /docs/k6/author-run/tokens-and-cli-authentication/
  - /docs/k6/references/tokens-and-cli-authentication
---

# Authenticate on the CLI

To run [cloud tests from the CLI]({{< relref "../get-started/run-cloud-tests-from-the-cli" >}}), you need to authenticate your account.
Authentication is required both for tests that run on the cloud service and for results that stream to the cloud service.
To authenticate accounts, k6 provides an API token, which you can pass on the CLI or through the REST API.

You can generate two types of API tokens for k6 Cloud, depending on how you want to authenticate:
- [Personal level API tokens](#get-a-personal-API-token) grant access through your account with the Grafana Cloud k6 App.
- [Stack level API tokens](#get-a-grafana-stack-api-token) grant access for actions not tied to a user but to the Grafana Cloud Stack.

To generate API tokens, follow these steps.

## Get a personal API token

A personal API token provides API access to your account with k6.

In Grafana Cloud, go to **k6 Cloud App > Settings > Personal API token**. 

On this section, you can copy, see, and regenerate your personal API token.

## Get a Grafana Stack API token

> Only [admins]({{< relref "../projects-and-users/manage-project-members/" >}}) can access and manage these tokens.

A Stack API token provides access to all projects within the Grafana Cloud Stack.
You can use it to run tests without linking the run to a specific user, e.g. when running tests from a CI platform.
To generate a token, follow these steps:

1. In Grafana Cloud, go to **k6 Cloud App > Settings > Grafana Stack API token**.
2. Select **Set up Grafana Stack API token**.
   
	> This view is currently not available in Grafana Cloud. We are working on it.
	> 
	> Meanwhile, this option redirects you to [k6 Cloud (app.k6.io)](https://app.k6.io/) to manage your tokens. 

   On this page, you can create, see, and regenerate the tokens.

   By default, organizations can create a maximum of 5 tokens.

Note that you must specify the project where the test runs will be created when using a non-personal token. Check out [how to set the `projectID`]({{< relref "../author-run/cloud-scripting-extras/cloud-options" >}}).

## Authenticate with the `login` command

To authenticate with an API token in the CLI, enter the following command:

```bash
k6 login cloud --token $TOKEN
```

`k6 login` stores your API Token in a local config file to authenticate when running cloud commands. Unless your token changes or you run tests on multiple cloud accounts, you need to run `k6 login` only once

## Authenticate with an environment variable

You can also authenticate with your k6 Cloud API authentication token via [environment variables](https://k6.io/docs/using-k6/environment-variables/).
Make sure you have set the `K6_CLOUD_TOKEN` as your authentication token, and k6 will pick it up when running.

```bash
## run a cloud test
K6_CLOUD_TOKEN=$TOKEN k6 cloud script.js

## run locally and stream to the cloud
K6_CLOUD_TOKEN=$TOKEN k6 run -o cloud script.js
```

## Authenticate with a config file

You can also directly add your authentication token to a configuration file:

- On Linux: 

  ```bash
  ${HOME}/.config/loadimpact/k6/config.json
  ```

- On Mac

  ```bash
  ${HOME}/Library/Application Support/loadimpact/k6/config.json
  ```

- On Windows

  ```bash
  C:\Users\<User>\AppData\Roaming\loadimpact\k6\config.json
  ```

Or, set the config path with the `-c/--config PATH/TO/CONFIG_FILE` CLI flag.

After your token has been added to the config file, it should look something like this (removing any other config options from the file):

```json
{
    "collectors": {
        "cloud": {
            "token": "YOUR_API_AUTH_TOKEN"
        }
    }
}
```

### Authenticate in Docker

If you're running k6 in a Docker container, the `-c/--config` CLI flag is the recommended approach.
This ensures that the k6 config file where the API authentication information is stored is persisted via a Docker volume to the host machine.

  ```bash
  docker run --rm -i -v /path/on-host:/path/in-container/ grafana/k6 \
  login cloud -c /path/in-container/config.json
  ```

