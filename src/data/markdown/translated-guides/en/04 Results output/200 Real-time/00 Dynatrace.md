---
title: 'Dynatrace'
excerpt: Send k6 output to Dynatrace to visualize load test results and correlate performance testing metrics in Dynatrace.
---

With the [Dynatrace k6 extension](https://github.com/Dynatrace/xk6-output-dynatrace),
you can send visualize and correlate performance testing metrics with the other metrics that you monitor in Dynatrace.

## Build the k6 version

<InstallationInstructions extensionUrl="github.com/Dynatrace/xk6-output-dynatrace"/>

## Run the test

Create a Dynatrace API token to send the data.

<Blockquote mod="attention">
The Dynatrace API Token must have the scope name "metrics.ingest" (scope type `API v2`).
</Blockquote>

You can use the Dynatrace UI:

![Dynatrace API token](./images/Dynatrace/dynatrace-api-token.png)

Or a `curl` command (replace `<environment-id>` and the `Api-Token`):

```bash
curl -X POST "https://<environment-id>.live.dynatrace.com/api/v2/apiTokens" -H "accept: application/json; charset=utf-8" -H "Content-Type: application/json; charset=utf-8" -d "{\"name\":\"\",\"scopes\":[\"metrics.ingest\"]}" -H "Authorization: Api-Token XXXXXXXX"
```

Use the previously built k6 binary and run the test passing the Dynatrace URL and API token as follows:

```bash
# export dynatrace variables
export K6_DYNATRACE_URL=https://<environmentid>.live.dynatrace.com
export K6_DYNATRACE_APITOKEN=<Dynatrace API token>

# run the test
./k6 run script.js -o output-dynatrace
```

Check the metrics in your Dynatrace environment, filtering for `k6`:

![Dynatrace Test result](./images/Dynatrace/dynatrace-k6-metrics.png)

![Dynatrace Test result](./images/Dynatrace/dynatrace-k6-test-result.png)

### Options

When streaming the k6 results to Dynatrace, you can configure the following Dynatrace options:

| Name                                     | Value                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `K6_DYNATRACE_APITOKEN`                  | Dynatrace API token to write the metrics. The token must have the scope `metrics.ingest API v2`.  |
| `K6_DYNATRACE_FLUSH_PERIOD`              | Define how often metrics are sent to Dynatrace. The default value is 1 second.  |
| `K6_DYNATRACE_URL`                       | Dynatrace URL. The default value is `https://dynatrace.live.com`.  |
| `K6_DYNATRACE_INSECURE_SKIP_TLS_VERIFY`  | If `true`, the HTTP client kips TLS verification on the endpoint. The default value is `true`. |
| `K6_DYNATRACE_HEADER_<here-the-header-key>` | Additional headers to include in the HTTP requests. `K6_DYNATRACE_HEADER_COOL_HEADER="cool value of the header"` |
