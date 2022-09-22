---
title: 'Environment variable'
excerpt: 'How to use environment variable in the cloud'
---

Environment Variables are key-value pairs configured at the organization level and can be used to store information that you want to reference in your cloud test-scripts across all projects of this organization. All values are encrypted at rest and their plain value can only be visible to the owner and admins of the organization. All members of the organization can reference the environment variables in their test scripts. 

> Changes to Environment Variables are not applied to already started Test Runs, they only apply to new upcoming Test Runs.

## Manage environment variable

Environment Variables can be managed in Organization Settings: Select your profile icon, then **Manage > Environment variable**. Permission to create, reveal, modify and delete environment variables is restricted to Owners and Admins of the organization. 

![k6 Environment Variable](./images/envvars/environment-variables.png)


### Declare new environment variable

Enter the Name for your Environment Variable. Then, enter the respective Value. Optionally, you can also add a brief description then click **submit**. 

![k6 Environment Variable](./images/envvars/create-environment-variable.png)

The cloud Environment Variable can be referenced in the [script-editor](https://k6.io/docs/cloud/creating-and-running-a-test/script-editor/) through the global `__ENV` variable, the same way as in [k6 CLI Environment Variable](https://k6.io/docs/using-k6/environment-variables/#passing-environment-variables-to-the-k6-script)

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const params = {
    headers: { Authorization: __ENV.AUTH_TOKEN },
  };
  const res = http.get(__ENV.SERVICE_URL, params);
  sleep(1);
}
```

## Running tests with k6 cloud command

Environment variables set up on the cloud can be referenced on test runs run with `k6 cloud` command. 

### Limitations

Referencing environment variables set in the cloud app in local scripts is possible, but it doesn't work in all cases. If the code in the [init context](https://k6.io/docs/getting-started/running-k6#the-init-context-and-the-default-function) depends on the value of the environment variable, the test run may fail.

In this case, the value should contain a valid JSON. Unless the `MY_HEADERS` is set through CLI flag `--env`,
the test run will fail locally and throw an exception:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

const headers = JSON.parse(__ENV.MY_HEADERS); // throws an exception

export default function () {
  headers['Authorization'] = `Token ${__ENV.AUTH_TOKEN}`;
  const res = http.get(__ENV.SERVICE_URL, { headers });
  sleep(1);
}
```

If the value of environment is first accessed in the default function, the test run will be successfully sent to the cloud and if the value is correctly set in the cloud, the test run will succeed. (This also valid for the `setup()` and `teardown()` functions):

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const headers = JSON.parse(__ENV.MY_HEADERS);
  headers['Authorization'] = `Token ${__ENV.AUTH_TOKEN}`;
  const res = http.get(__ENV.SERVICE_URL, { headers });
  sleep(1);
}
```

### Order of precedence

When starting tests with `k6 cloud`, environment variables set via CLI flag `--env` and environment variables set in the cloud are combined and used together to run the test. If an environment variable is both set via CLI and declared in the cloud, the value set via the CLI will be applied instead of the value set in the cloud.

<Blockquote mod="warning">
Environment variables set via CLI flag will still be stored in the archive as plain data.
</Blockquote>
