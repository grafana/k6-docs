---
title: 'Token'
excerpt: 'How to authenticate with k6 Cloud token'
---

Before you can interact with the k6 Cloud service, whether it's for streaming results or running tests in the cloud, you'll need to authenticate. Your Auth Token is what enables this and  allows you to interact with the k6 Cloud using the k6 CLI or through the REST API. To get your Auth Token, please visit this [page](https://app.k6.io/account/token).

Below are some examples on how to utilize the token to authenticate.


<div class="doc-blockquote" data-props='{"mod": "warning"}'>

> ### Google/Github Single Sign-On Users
For Single Sign-On (SSO) users, `k6 login cloud` requires a k6 cloud account email and password. You will need to create a password by using [Forgot Password](), or you'll instead need to <a href="https://app.k6.io/account/token"> get your API authentication token from the app</a> and supply that explicitly: `k6 login cloud --token YOUR_API_AUTH_TOKEN`.
<a href="#authenticating-with-api-token">See below</a> for more information.

</div>

<div class="doc-blockquote" data-props='{"mod": "warning"}'>

> ### Docker Users
If you're running k6 in a Docker container you'll need to make sure that the k6 config file where the k6 cloud API authentication information (an API authentication token) will be stored to is persisted via a Docker volume to the host machine using the `-c/--config PATH/TO/CONFIG_FILE` CLI flag, e.g. `docker run -i -v /path/on-host:/path/in-container/ loadimpact/k6 login cloud -c /path/in-container/config.json`.

</div>

<div class="doc-blockquote" data-props='{"mod": "warning"}'>

> ### Integrating with CI
If you are integrating k6 into your CI pipeline, we recommend using one of the token methods to authenticate and not exposing your username/password within your CI configuration files or as variables.

</div>



## Authenticate with email/password

You can forego using a token and use your k6 cloud email/password credentials by entering the following command into your terminal:

<div class="code-group" data-props='{ "labels": ["Authenticate with email/password"] }'>

```shell
k6 login cloud
```

</div>



This will login to your account, fetch (and create of necessary) your k6 cloud API authentication token, and save it to a [k6 configuration file](#using-config-file).

## Authenticating with API token

If you're a Google/Github Single Sign-On (SSO) user or if you have a use case where using your k6 cloud account credentials is not appropriate you can choose to enter your k6 cloud API authentication token directly by entering the following command into your terminal:

<div class="code-group" data-props='{"labels": ["Using API token"]}'>

```C
k6 login cloud --token YOUR_API_AUTH_TOKEN
```

</div>


## API Token as an environment variables

You can also authenticate with your k6 cloud API authentication token via environment variables. If you make sure the `K6_CLOUD_TOKEN` has been set to your k6 cloud API authentication token k6 will pick it up when executing.

## Authentication with a config file

You can also directly add your k6 cloud API authentication token to a configuration file. Either in the default path that k6 will look for it by default:

<div class="code-group" data-props='{"labels": ["Linux", "MacOS", "Windows"], "lineNumbers": [true, true, true]}'>

```
${HOME}/.config/loadimpact/k6/config.json
```

```
${HOME}/Library/Application Support/LoadImpact/k6/config.json
```

```
C:\Users\&lt;User&gt;\AppData\Roaming\loadimpact\k6\config.json
```


</div>


or by specifying the `-c/--config PATH/TO/CONFIG_FILE` CLI flag.

When your k6 cloud API authentication token has been added to the config file, it should look something like this (removing any other config options from the file):

<div class="code-group" data-props='{"labels": ["API token in JSON"]}'>

```json
{
    "collectors" {
        "cloud": {
            "token": "YOUR_API_AUTH_TOKEN"
        }
    }
}
```

</div>
