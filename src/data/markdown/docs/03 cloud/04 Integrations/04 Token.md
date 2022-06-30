---
title: 'Token'
excerpt: 'How to authenticate with k6 Cloud token'
---

You'll need to authenticate to use k6 Cloud, whether it's for streaming results or running tests in the cloud.
Your API token lets you interact with k6 Cloud using the k6 CLI or the REST API.

You can generate two types of API tokens for k6 Cloud, depending on how you want to authenticate:
- [Account-level API tokens](#account-api-token) grant access through your account with k6
- [Organization-level API tokens](#organization-api-token) grant organization-wide access for actions not tied to a user.

To generate API tokens, you can follow these steps or adapt these examples.

> #### Google/GitHub Single Sign-On Users
>
> For Single Sign-On (SSO) users, `k6 login cloud` requires a k6 Cloud account email and password. You will need to create a password using [Forgot Password](https://app.k6.io/account/forgot), or you can instead authenticate via API token. See [Authenticating with API token](#authenticating-with-api-token) for more information.

> #### Docker Users
>
> If you're running k6 in a Docker container, make sure that the k6 config file where the k6 Cloud API authentication information is stored is persisted via a Docker volume to the host machine, using the `-c/--config PATH/TO/CONFIG_FILE` CLI flag. Example:
```bash
docker run --rm -i -v /path/on-host:/path/in-container/ grafana/k6 login cloud -c /path/in-container/config.json
```

> #### Integrating with CI
>
> If you are integrating k6 into your CI pipeline, we recommend using an [organization level API token](#organization-api-token) to authenticate and not exposing your username/password within your CI configuration files or as variables. Alternatively you can use an [account level API token](#account-api-token) with a user created specially for the purpose of running CI tests.

## Account API token
An account-level API token provides API access to your account with k6.
To generate the token:
1. Select your profile in the top-right icon.
2. Under **Account settings**, select **API token**.

From there you can copy, see, and regenerate the token.

![account token view](./images/04-Token/account-api-token-view.png)

## Organization API token

> #### Access to organization settings
>
> Only [organization admins](/cloud/project-and-team-management/members/#admin) can access organization settings.

An organization API token provides organization-wide API access to k6.
You can use it to run tests without linking the run to a specific user, e.g. when running tests from a CI platform.
To generate a token, follow these steps:

1. Select your profile in the top-right icon.
2. Under **Organization settings**, select **API token**.
3. Select **New token**.

On this page, you can create, see, and regenerate the tokens.
The maximum amount of tokens that an organization can create is 5 by default.

Note that when using an organization API token, you must specify the project where the test runs will be created.
Read about [how to set the `Project ID`](https://k6.io/docs/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#running-tests-under-a-different-project-than-your-default-one).

![organization token view](./images/04-Token/organization-api-token-view.png)

## Authenticate with email and password

If you want to forego using a token, you can authenticate with your k6 Cloud email and password credentials.
To do so, enter the following command into your terminal:

<CodeGroup labels={["Authenticate with email/password"]}>

```bash
k6 login cloud
```

</CodeGroup>

This will log in to your account, fetch (and create if necessary) your k6 Cloud API authentication token, and save it to a [k6 configuration file](#using-config-file).

## Authenticating with API token

If you're a Google/GitHub Single Sign-On (SSO) user, or if you have a use case where using your k6 Cloud account credentials is not appropriate, you can choose to enter your k6 Cloud API authentication token directly.

To authenticate with an API token in the CLI, enter the following command:

<CodeGroup labels={["Using API token"]}>

```bash
k6 login cloud --token YOUR_API_AUTH_TOKEN
```

</CodeGroup>

## API Token as an environment variable

You can also authenticate with your k6 Cloud API authentication token via environment variables.
Make sure the `K6_CLOUD_TOKEN` has been set to your k6 Cloud API authentication token, and k6 will pick it up when running.

## Authentication with a config file

You can also directly add your k6 Cloud API authentication token to a configuration file:

<CodeGroup labels={["Linux", "MacOS", "Windows"]} lineNumbers={[true, true, true]}>

```bash
${HOME}/.config/loadimpact/k6/config.json
```

```
${HOME}/Library/Application Support/loadimpact/k6/config.json
```

```bash
C:\Users\&lt;User&gt;\AppData\Roaming\loadimpact\k6\config.json
```

</CodeGroup>

or by specifying the `-c/--config PATH/TO/CONFIG_FILE` CLI flag.

When your k6 Cloud API authentication token has been added to the config file, it should look something like this (removing any other config options from the file):

<CodeGroup labels={["API token in JSON"]}>

```json
{
    "collectors": {
        "cloud": {
            "token": "YOUR_API_AUTH_TOKEN"
        }
    }
}
```

</CodeGroup>
