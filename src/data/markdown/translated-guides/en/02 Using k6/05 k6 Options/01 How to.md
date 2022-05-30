---
title: 'How to use options'
slug: '/using-k6/k6-options/how-to'
excerpt: 'Examples of different ways to set options. Options in command-line flags have the highest precedence. You can also access option values as the test runs.'
---

k6 provides multiple places to set most options:

- In CLI flags
- In environment variables
- In the script `options` object

Your use case will likely determine how you want to set options.
You can also access option values as your test runs.

## Order of precedence

![Diagram of the options order of precedence. Options passed as command-line flags override all other options: defaults > script options > environment variables > command-line flags](./images/order-of-precedence.png)

You can set options in multiple places.
If the same option is set in multiple places, k6 uses the option from the place with the highest _order of precedence_.

For example, here are three ways set a test duration.
Note that each time is different!

- Set the `duration: "15s"` option in the script
- Define `K6_DURATION=20s` as an environment variable
- Use the `--duration 30s` command-line flag

If you passed all of these options to the same test, the duration would be 30 seconds.
That's because **command-line flags have the highest order of precedence**.
They override all other options.

## Where to set options

Sometimes, how you set options is a matter of personal preference.
Other times, your situation will dictate the best place to put your options.

*Options in the script or config file let you version control and keep tests tidy*.

The script `options` object is generally the best place to put your options.
This provides automatic version control, allows for easy reuse, and lets you modularize your script.

*CLI options are good for setting options on the fly.*

When you want to run a quick test, command-line flags are convenient.
You can also use command-line flags to override files in your script (according to the [order of precedence](#order-of-precedence).
For example, your script may set the test duration at 100s.
You could use CLI flags to run a one-time, longer test.

*Environment variables often work well when you need to set your options from some other part of your DevOps build chain*.

For example, you could derive the option from a variable in your Docker container definition, CI UI, vault&mdash;wherever you declare environment variables.
The [block hostnames](#block-hostnames) option is an option that works well with environment variables.


## Examples of setting options

The following JS snippets show some examples of how you can set options.

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

Set some of the previous options via environment variables and command-line flags:

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


## Get an option value from the script

The `k6/execution` API provides a [test.options](/javascript-api/k6-execution/#test) object.
With `test.options`, you can access the final, consolidated, and derived options of your script as the test runs.

A common use is to grab the value of a tag.
It also can be handy to get stage values.

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
