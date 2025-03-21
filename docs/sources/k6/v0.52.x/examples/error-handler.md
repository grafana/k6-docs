---
title: 'Error handler'
description: Using a custom error handler to store errors in custom metrics or logs.
weight: 25
---

# Error handler

When encountering errors from an application's backend, gathering additional error information, such as error messages, tracing data, or request and response bodies, is often necessary. The initial suggestion is to leverage your observability solution to find these errors. However, capturing error details directly in k6 can also be useful for troubleshooting.

In k6, there are two common approaches to store additional error information:

- Console logs and output [k6 logs to Loki](https://k6.io/blog/using-loki-to-store-and-query-k6-logs/), a file, or use [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/k6/analyze-results/inspect-test-results/inspect-logs/).
- Using [Tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups/) in a [custom counter metric](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/create-custom-metrics) to track error data.

When deciding what error data to store, consider whether it's a general or specific error, and be aware that high-load tests may generate a substantial volume of error data.

Below is an example using an `ErrorHandler` class to log error information. It accepts a callback that instructs how to log errors. The example provides instructions for both previously mentioned options: console logs and custom metrics.

```javascript
import http from 'k6/http';
import { check } from 'k6';

// General error handler to log error details.
class ErrorHandler {
  // Instruct the error handler how to log errors
  constructor(logErrorDetails) {
    this.logErrorDetails = logErrorDetails;
  }

  // Logs response error details if isError is true.
  logError(isError, res, tags = {}) {
    if (!isError) return;

    // the Traceparent header is a W3C Trace Context
    const traceparentHeader = res.request.headers['Traceparent'];

    // Add any other useful information
    const errorData = Object.assign(
      {
        url: res.url,
        status: res.status,
        error_code: res.error_code,
        traceparent: traceparentHeader && traceparentHeader.toString(),
      },
      tags
    );
    this.logErrorDetails(errorData);
  }
}

// Set up the error handler to log errors to the console
const errorHandler = new ErrorHandler((error) => {
  console.error(error);
});

/* Alternatively, you may log errors using a custom metric or any other option.
const errors = new CounterMetric('errors');
const errorHandler = new ErrorHandler((error) => {errors.add(1, error);});
*/

// Basic example to demonstrate the error handler
export default function () {
  let res, checkStatus;

  res = http.get('https://httpbin.org/status/200');
  checkStatus = check(res, { 'status is 200': (res) => res.status === 200 });
  errorHandler.logError(!checkStatus, res);

  res = http.get('https://httpbin.org/status/300');
  checkStatus = check(res, { 'status is 200': (res) => res.status === 200 });
  errorHandler.logError(!checkStatus, res);
}
```
