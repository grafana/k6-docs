---
title: Analyze results
description: Use k6 to write custom metrics and filter results.
weight: 300
---

# Analyze results

In this tutorial, learn how to:

- Apply tags to filter specific results
- Learn about k6 metrics
- Use [jq](https://jqlang.github.io/jq/) to filter JSON results
- Define groups to organize the test
- Create custom metrics

## Context: k6 result outputs

k6 provides many [result outputs](https://grafana.com/docs/k6/<K6_VERSION>/results-output/).
By default, the [end-of-test summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test) provides the aggregated results of the test metrics.

{{< code >}}

```bash
  █ THRESHOLDS

    http_req_duration
    ✓ 'p(95)<1500' p(95)=148.21ms
    ✓ 'p(90)<2000' p(90)=146.88ms

    http_req_failed
    ✓ 'rate<0.01' rate=0.00%


  █ TOTAL RESULTS

    checks_total.......................: 90      13.122179/s
    checks_succeeded...................: 100.00% 90 out of 90
    checks_failed......................: 0.00%   0 out of 90

    ✓ test-api.k6.io is up
    ✓ status is 200

    CUSTOM
    custom_waiting_time................: avg=152.355556 min=120      med=141      max=684      p(90)=147.2    p(95)=148.8

    HTTP
    http_req_duration..................: avg=140.36ms   min=119.08ms med=140.96ms max=154.63ms p(90)=146.88ms p(95)=148.21ms
      { expected_response:true }.......: avg=140.36ms   min=119.08ms med=140.96ms max=154.63ms p(90)=146.88ms p(95)=148.21ms
    http_req_failed....................: 0.00%  0 out of 45
    http_reqs..........................: 45     6.56109/s

    EXECUTION
    iteration_duration.................: avg=152.38ms   min=119.37ms med=141.27ms max=684.62ms p(90)=147.11ms p(95)=148.39ms
    iterations.........................: 45     6.56109/s
    vus................................: 1      min=1       max=1
    vus_max............................: 1      min=1       max=1

    NETWORK
    data_received......................: 519 kB 76 kB/s
    data_sent..........................: 4.9 kB 718 B/s
```

{{< /code >}}

For simplicity to learn about [k6 metric results](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference), this tutorial uses the [JSON output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/json) and [jq](https://jqlang.github.io/jq/) to filter results.

For other options to analyze test results such as storage and time-series visualizations in real-time, refer to:

- [Results output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/)

- [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/)

## Write time-series results to a JSON file

To output results to a JSON file, use the `--out` flag.

```bash
k6 run --out json=results.json api-test.js
```

Then run this `jq` command to filter the latency results; `http_req_duration` metric.

```bash
jq '. | select(.type == "Point" and .metric == "http_req_duration")' results.json
```

k6 results have a number of [built-in tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#system-tags). For example, filter results to only results where the status is 200.

```bash
jq '. | select(.type == "Point" and .data.tags.status == "200")' results.json
```

Or calculate the aggregated value of any metric with any particular tags.

{{< code >}}

```average
jq '. | select(.type == "Point" and .metric == "http_req_duration") | .data.value' results.json | jq -s 'add/length'
```

```min
jq '. | select(.type == "Point" and .metric == "http_req_duration") | .data.value' results.json | jq -s min
```

```max
jq '. | select(.type == "Point" and .metric == "http_req_duration") | .data.value' results.json | jq -s max
```

{{< /code >}}

## Apply custom tags

You can also apply [_Tags_](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#tags) to requests or code blocks. For example, this is how you can add a [`tags`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#tags) to the [request params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params).

<!-- md-k6:skip -->

```javascript
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
  tags: {
    'my-custom-tag': 'auth-api',
  },
};
```

Create a new script named "tagged-login.js", and add a custom tag to it.

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  const url = 'https://quickpizza.grafana.com';
  const payload = JSON.stringify({
    username: 'test_case',
    password: '12345678',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    //apply tags
    tags: {
      'my-custom-tag': 'auth-api',
    },
  };

  //Create user, with tags
  http.post(`${url}/api/users`, payload, params);
}
```

{{< /code >}}

Run the test:

```bash
k6 run --out json=results.json tagged-login.js
```

Filter the results for this custom tag:

```bash
jq '. | select(.type == "Point" and .metric == "http_req_duration" and .data.tags."my-custom-tag" == "auth-api")' results.json
```

## Organize requests in groups

You can also organize your test logic into [Groups](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#groups). Test logic inside a `group` tags all requests and metrics within its block.
Groups can help you organize the test as a series of logical transactions or blocks.

### Context: a new test to group test logic

Results filtering isn't very meaningful in a test that makes one request.
And the API test script is getting long.
To learn more about how to compare results and other k6 APIs, write a test for the following situation:

> **A dummy example**: your development team wants to evaluate the performance of two user-facing flows.
>
> - visit an endpoint, then another one
>   - A GET request to `https://test.k6.io/contacts.php`
>   - A GET to `https://test.k6.io/`
> - play the coinflip game:
>   - A POST request to `https://test.k6.io/flip_coin.php` with the query param `bet=heads`
>   - Another POST to `https://test.k6.io/flip_coin.php` with the query param `bet=tails`

Can you figure out how to [script the requests](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/http-requests)?
If not, use the following script. Since this example simulates a human user rather than an API call, it has a sleep between each request. Run with `k6 run multiple-flows.js`.

{{< code >}}

```javascript
import http from 'k6/http';
import { group, sleep } from 'k6';

//set URL as variable
const baseUrl = 'https://test.k6.io';

export default function () {
  // visit contacts
  http.get(`${baseUrl}/contacts.php`);
  sleep(1);
  // return to the home page
  http.get(`${baseUrl}/`);
  sleep(1);

  //play coinflip game
  http.get(`${baseUrl}/flip_coin.php?bet=heads`);
  sleep(1);
  http.get(`${baseUrl}/flip_coin.php?bet=tails`);
  sleep(1);
}
```

{{< /code >}}

### Add Group functions

Wrap the two endpoints in different groups.
Name one group `Contacts flow` and another `Coinflip game`.

{{< code >}}

```javascript
//import necessary modules
import http from 'k6/http';
import { group, sleep } from 'k6';

//set baseURL
const baseUrl = 'https://test.k6.io';

export default function () {
  // visit some endpoints in one group
  group('Contacts flow', function () {
    http.get(`${baseUrl}/contacts.php`);
    sleep(1);
    // return to the home page
    http.get(`${baseUrl}/`);
    sleep(1);
  });

  // Coinflip players in another group
  group('Coinflip game', function () {
    http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    sleep(1);
    http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    sleep(1);
  });
}
```

{{< /code >}}

### Run and filter

Inspect the results for only the `Coinflip game` group.
To do so:

1. Save the preceding script as `multiple-flows.js`.
1. Run the script with the command:

```bash
k6 run multiple-flows.js --out json=results.json --iterations 10
```

1. Inspect the results with `jq`. Group names have a `::` prefix.

```bash
jq '. | select(.data.tags.group == "::Coinflip game")' results.json
```

## Add a custom metric

As you have seen in the output, all k6 tests emit metrics.
However, if the built-in metrics aren't enough, you can [create custom metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/create-custom-metrics).
A common use case is to collect metrics of a particular scope of your test.

As an example, create a metric that collects latency results for each group:

1. Import [`Trend`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/trend) from the k6 metrics module.
1. Create two duration trend metric functions.
1. In each group, add the `duration` time to the trend for requests to `contacts` and the `coin_flip` endpoints.

{{< code >}}

```javascript
//import necessary modules
import http from 'k6/http';
import { group, sleep } from 'k6';
import { Trend } from 'k6/metrics';

//set baseURL
const baseUrl = 'https://test.k6.io';

// Create custom trend metrics
const contactsLatency = new Trend('contacts_duration');
const coinflipLatency = new Trend('coinflip_duration');

export default function () {
  // Put visits to contact page in one group
  let res;
  group('Contacts flow', function () {
    // save response as variable
    res = http.get(`${baseUrl}/contacts.php`);
    // add duration property to metric
    contactsLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/`);
    // add duration property to metric
    contactsLatency.add(res.timings.duration);
    sleep(1);
  });

  // Coinflip players in another group

  group('Coinflip game', function () {
    // save response as variable
    let res = http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);
  });
}
```

{{< /code >}}

Run the test with small number of iterations and output the results to `results.json`.

```bash
k6 run multiple-flows.js --out json=results.json --iterations 10
```

Look for the custom trend metrics in the end-of-test console summary.

```bash
coinflip_duration..............: avg=119.6438  min=116.481  med=118.4755 max=135.498  p(90)=121.8459 p(95)=123.89565
contacts_duration..............: avg=125.76985 min=116.973  med=120.6735 max=200.507  p(90)=127.9271 p(95)=153.87245
```

You can also query custom metric results from the JSON results. For example, to get the aggregated results as.

{{< code >}}

```avg
jq '. | select(.type == "Point" and .metric == "coinflip_duration") | .data.value' results.json | jq -s 'add/length'
```

```min
jq '. | select(.type == "Point" and .metric == "coinflip_duration") | .data.value' results.json | jq -s min
```

```max
jq '. | select(.type == "Point" and .metric == "coinflip_duration") | .data.value' results.json | jq -s max
```

{{< /code >}}

## Next steps

In this tutorial, you looked at granular output and filtered by built-in and custom tags.
Then you made a new script with groups.
Finally, you added a new metric for each group.
A next step would be to create a [Custom end-of-test summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test/custom-summary) or to [stream the results to a database](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time#service).

For ongoing operations, you can modularize your logic and configuration.
That's the subject of the [next step of this tutorial](https://grafana.com/docs/k6/<K6_VERSION>/examples/get-started-with-k6/reuse-and-re-run-tests).
