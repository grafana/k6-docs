---
title: "Set options with the --config flag"
excerpt: "You can also set options using the --config flag. This is a niche case, though, and you should strongly consider setting options in the script file."
hideFromSidebar: true
---

You can also define the same options through a config file, then use a CLI flag to specify the config.
If you use it, the options take the _second lowest order of precedence_ (after defaults).
If you set options anywhere else, they will override the `--config` flag options.  

Because it can add unnecessary complication, we recommend that you use a [standard way to set options](/using-k6/k6-options/how-to).
The only recommended use of `--config` is to [authenticate tests on k6 Cloud](/using-k6/k6-options/reference/#config).

## This method is discouraged

k6 now discourages using the `--config` flag to set options, for the following reasons:
- It can create confusing behavior with the order of precedence.
- It requires using a command-line flag, which can be inconvenient for repeated uses. 
- It's mostly redundant. You can just as easily separate configuration from logic with the `JSON.parse()` method:

  ```javascript
  // load test config, used to populate exported options object:
  const testConfig = JSON.parse(open('./config/test.json'));

  // combine the above with options set directly:
  export const options = testConfig;
  ```

## Set options with --config

Use the `--config` flag to declare the file path to your options.

```bash
k6 run --config options.json script.js
```

This command would set test options according to the values in the `options.json` file.

<CodeGroup labels={["options.json"]} lineNumbers={[true]}>

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