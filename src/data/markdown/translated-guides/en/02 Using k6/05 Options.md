---
title: 'Options'
excerpt: 'Options allow you to configure how k6 will behave during test execution.'
---

Options let you configure how k6 behaves during test execution.


## Where to set options?

You can specify options with command-line flags, environment variables, or via a config file.
You can also specify them in the script code, making the options version-controlled.

## Order of precedence

If you set options in multiple places, k6 follows an _order of precedence_.

1. First, k6 looks in the config file.
2. Then, it looks in the `options` object in the script.
3. Then, it looks at the environment variables.
4. Finally, it looks at the command-line flags.

This is to say that _command-line flags override all other options_.


For example, these are all valid ways to set the test duration.
Note that each time is different!

- Set the `duration: "10s"` option in the config file
- Set the `duration: "15s"` option in the script
- Define `K6_DURATION=20s` as an environment variable
- Use the `--duration 30s` command-line flag

Even though the preceding example has four different `duration` values, the test would run with a duration of 30s.
That's because _command-line options have the highest order of precedence:_


![The options order of precedence. First, k6 looks at options in the config. Then, in the script file. Then, in the environmental variables. Finally, in the command-line flags. Options passed as command-line flags override all other options.](./images/Options/k6-order-of-precedence.png)
  
## Examples of setting options

The following JS snippets shows some examples of different ways to set options.

### Options in the script

<CodeGroup labels={["example.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  hosts: { 'test.k6.io': '1.2.3.4' },
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 0 },
  ],
  thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
  noConnectionReuse: true,
  userAgent: 'MyK6UserAgentString/1.0',
};

export default function () {
  http.get('http://test.k6.io/');
}
```

</CodeGroup>

### Options in a config file

<div id="config-json-example">
You can also define the same options through a config file:
</div>

<CodeGroup labels={["config.json"]} lineNumbers={[true]}>

```json
{
  "hosts": {
    "test.k6.io": "1.2.3.4"
  },
  "stages": [
    {
      "duration": "1m",
      "target": 10
    },
    {
      "duration": "1m",
      "target": 30
    },
    {
      "duration": "1m",
      "target": 0
    }
  ],
  "thresholds": {
    "http_req_duration": ["avg<100", "p(95)<200"]
  },
  "noConnectionReuse": true,
  "userAgent": "MyK6UserAgentString/1.0"
}
```

</CodeGroup>

### Options with environment variables

Or set some of the previous options via environment variables and command-line flags:

<CodeGroup labels={["Bash", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ K6_NO_CONNECTION_REUSE=true K6_USER_AGENT="MyK6UserAgentString/1.0" k6 run script.js

$ k6 run --no-connection-reuse --user-agent "MyK6UserAgentString/1.0" script.js
```

```bash
C:\k6> set "K6_NO_CONNECTION_REUSE=true" && set "K6_USER_AGENT=MyK6UserAgentString/1.0" && k6 run script.js

C:\k6> k6 run --no-connection-reuse --user-agent "MyK6UserAgentString/1.0" script.js
```

```bash
PS C:\k6> $env:K6_NO_CONNECTION_REUSE=true; $env:K6_USER_AGENT="MyK6UserAgentString/1.0"; k6 run script.js

PS C:\k6> k6 run --no-connection-reuse --user-agent "MyK6UserAgentString/1.0" script.js
```

</CodeGroup>

### Get options' value from the script

The `k6/execution` API provides a [test.options](/javascript-api/k6-execution/#test) object for accessing the final consolidated and derived options.

<CodeGroup>

```javascript
import exec from 'k6/execution';

export const options = {
  stages: [
    { duration: '5s', target: 100 },
    { duration: '5s', target: 50 },
  ],
};

export default function () {
  console.log(exec.test.options.scenarios.default.stages[0].target); // 100
}
```

</CodeGroup>

<br/>

