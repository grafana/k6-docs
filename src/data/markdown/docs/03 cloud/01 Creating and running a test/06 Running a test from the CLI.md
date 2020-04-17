---
title: 'Cloud tests from the CLI'
excerpt: 'How to run cloud tests from the k6 CLI.'
---

## Background

Running tests within the web app is helpful when getting a feel for the tool or
building a proof of concept. However, many users will find great flexibility
when using k6 to trigger tests from the command line.

Reasons for triggering cloud tests from the command line include:

- Integrating testing in CI/CD pipelines
- Storing test scripts in local version control
- Modularization of scripts for collaboration and easier maintenance
- Preference to work in your local environment


## Quick Start to using the CLI for cloud tests

Assuming you have k6 installed and a script saved locally, the first step would
be to authenticate against the k6 Cloud, like so:

<div class="code-group" data-props='{"labels": []}'>

```shell
k6 login cloud
```

</div>

Alternatively, you could also get your token from the [API token
page](https://app.k6.io/account/api-token) and set the
environment variable `K6_CLOUD_TOKEN` or use `k6 login cloud --token YOUR_TOKEN`.

Once authenticated, you can trigger a test by using the `cloud` command:

<div class="code-group" data-props='{"labels": ["Mac / prebuilt binary", "Docker image"]}'>

```shell
k6 cloud nameOfYourScript.js
```
</div>

For more in depth instructions, please refer to our full article on
[cloud execution](/using-k6/cloud-execution#getting-started)
