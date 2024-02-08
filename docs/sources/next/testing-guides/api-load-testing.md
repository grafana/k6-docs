---
title: 'API load testing'
head_title: 'Intro to API Load Testing: The k6 Guide'
description: 'Load testing APIs has many facets. This guide introduces you to performance testing and provides best practices to load test your APIs with k6.'
weight: 01
noindex: true
---

# API load testing

An API load test generally starts with small loads on isolated components.
As your testing matures, your strategy can consider how to test the API more completely.
In this process, you'll test your API with more requests, longer durations, and on a wider test scope&mdash;from isolated components to complete end-to-end workflows.

When you design your API tests, first consider _why_ you want to test the API at all:

- What flows or components do you want to test?
- How will you run the test?
- What criteria determine acceptable performance?

Once you can answer these questions, your API testing strategy will likely follow something like this procedure:

1. **Script the test.** Write user flows, parameterize test data, and group URLs.
1. **Assert performance and correctness.** Use Checks to assert system responses and use Thresholds to ensure that the system performs within your SLOs.
1. **Model and generate load.** Choose the executors to correctly model the workload that's appropriate to your test goals. Make sure the load generators are located where they should be.
1. **Iterate over your test suite.** Over time, you'll be able to reuse script logic (e.g., a user log-in flow or a throughput configuration). You'll also be able to run tests with a wider scope or as a part of your automated testing suite.

The following sections provide specific explanations and examples of the steps in this process.

## Identify the components to test

Before you start testing, identify the components you want to test.
Do you want to test a single endpoint or an entire flow?

The following script uses the [k6 HTTP module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/) to test a single endpoint.

```javascript
import http from 'k6/http';

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  http.post('https://httpbin.test.k6.io/post', payload, { headers });
}
```

This is a minimal test, with one call to one component.
Generally, your test suite will progress from scripts like this to more complex and complete workflows.
In this process, your test suite will advance through the [testing pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) as follows:

- **Testing an isolated API**. Hammering an API endpoint like [ab](https://httpd.apache.org/docs/2.4/programs/ab.html) to test the baseline performance, breaking point, or availability. If a component doesn’t meet performance requirements, it is a bottleneck. Generally, the load is set in requests per second.
- **Testing integrated APIs**. Testing one or multiple APIs that interact with other internal or external APIs. Your focus might be on testing one system or various.
- **Testing end-to-end API flows**. Simulating realistic interactions between APIs to test the system as a whole. The focus is often on frequent and critical user scenarios.

Your load test suite should include a wide range of tests.
But, when you start, start small and simple,
testing individual APIs and uncomplicated integration tests.

## Determined the reason for the test

Before you configure test load, you should know what traffic patterns you want to test the API for.
A load test typically aims to do one of two things:

- Validate reliability under expected traffic
- Discover problems and system limits under unusual traffic.

For example, your team might create one set of tests for frequent user flows on average traffic, and another set to find breaking points in the API.
Even if the test logic stays the same, its load might change.

The test goal determines the test type, which in turn determines the test load.
Consider the following test types, which correspond to different goals load profiles:

- [Smoke test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/smoke-testing). Verify the system functions with minimal load.
- [“Average” load test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/load-testing). Discover how the system functions with typical traffic.
- [Stress test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/stress-testing). Discover how the system functions with the load of peak traffic.
- [Spike test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/spike-testing). Discover how the system functions with sudden and massive increases in traffic.
- [Breakpoint test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/breakpoint-testing). Progressively ramp traffic to discover system breaking points.
- [Soak test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/soak-testing). Discover whether or when the system degrades under loads of longer duration.

The test types that you choose inform how you plan and structure your test.
But each application, organization, and testing project differs.
Our recommendation is always:

> **"Start simple and test frequently. Iterate and grow the test suite".**

Once you've decided on the load profile, you can schedule it with k6 options.

## Model the workload

To configure the workload, use [test options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/).
The test load configures the traffic generated by the test. k6 provides two broad ways to model load:

- Through _virtual users_ (VUs), to simulate concurrent users
- Through _requests per second_, to simulate raw, real-world throughput

{{% admonition type="note" %}}

Generally, your load tests should add [sleep time](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/sleep).
Sleep time helps control the load generator and better simulates the traffic patterns of human users.

However, when it comes to API load tests, these recommendations about sleep come with a few qualifications.
If testing an isolated component, you might care only about performance under a pre-determined throughput.
But, even in this case, sleep can help you avoid overworking the load generator, and including a few randomized milliseconds of sleep can avoid accidental concurrency.

When testing the API against normal, human-run workflows, add sleep as in a normal test.

{{% /admonition %}}

### Virtual users

When you model load according to VUs, the basic load options are:

- [`vus`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference/#vus)
- [`duration`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference/#duration)
- [`iterations`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference/#iterations)

You can define these options in the test script. In the following test, 50 concurrent users continuously run the `default` flow for 30 seconds.

```javascript
import http from 'k6/http';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  http.post('https://httpbin.test.k6.io/post', payload, { headers });
}
```

### Request rate

When analyzing API endpoint performance, the load is generally reported by request rate&mdash;either requests per second or per minute.

To configure workloads according to a target request rate, use the [constant arrival rate executor](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/constant-arrival-rate).

`constant-arrival-rate` sets a constant rate of iterations that execute the script function.
Each iteration can generate one or multiple requests.

To reach a request-rate target (`RequestsRate`), follow this approach:

1. Set the rate frequency to the time unit of the target. Per second or per minute.
1. Get the number of requests per iteration (`RequestsPerIteration`).
1. Set the iteration rate to the requests per second target divided by the number of requests per iteration.  
   `rate` = `RequestsRate ÷ RequestsPerIteration`.

To reach target of 50 reqs/s with the previous example:

1. Set the `timeUnit` options to `1s`.
1. The number of requests per iteration is 1.
1. Set the `rate` option to 50/1 (so it equals 50).

```javascript
import http from 'k6/http';

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources     preAll

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  http.post('https://httpbin.test.k6.io/post', payload, { headers });
}
```

This test outputs the total number of HTTP requests and RPS on the `http_reqs` metric:

```bash
# the reported value is close to the 50 RPS target
 http_reqs......................: 1501   49.84156/s

# the iteration rate is the same as rps, because each iteration runs only one request
iterations.....................: 1501   49.84156/s
```

For a more extensive example, refer to this post about [generating a constant request rate](https://k6.io/blog/how-to-generate-a-constant-request-rate-with-the-new-scenarios-api/)

With the `constant-arrival-rate` executor, load is constant through the test.
To ramp the request rate up or down, use the [`ramping-arrival-rate`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/ramping-arrival-rate) executor instead.

For all ways to model the load in k6, refer to [Scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios).

## Verify functionality with Checks

Traditionally, performance tests care most about:

- _Latency_, how fast the system responds
- _Availability_, how often the system returns errors.

The `http_req_duration` metric reports the latency,
and `http_req_failed` reports the error rate for HTTP requests.
The previous test run provided the following results:

```bash
http_req_duration..............: avg=106.14ms min=102.54ms med=104.66ms max=198.93ms p(90)=113.78ms p(95)=114.58ms
    { expected_response:true }...: avg=106.14ms min=102.54ms med=104.66ms max=198.93ms p(90)=113.78ms p(95)=114.58ms
http_req_failed................: 0.00% ✓ 0    ✗ 1501
```

Your test analysis might need to go beyond what's available with default metrics.
For more meaningful results analysis, you might also want to validate functionalities and report errors.

Some application failures happen only under certain load conditions, such as high traffic.
These errors are hard to find.
To find the cause of failures more quickly, instrument your APIs and verify that requests get the expected responses.
To verify application logic in k6, you can use _Checks_.

[Checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks) validate conditions during the test execution.
For example, you can use checks verify and track API responses.
With checks, you can confirm expected API responses, such as the HTTP status or any returned data.

Our script now verifies the HTTP response status, headers, and payload.

```javascript
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, { headers });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === 'lorem',
  });
}
```

In this snippet, all checks succeeded:

```bash
my_scenario1 ✓ [======================================] 00/50 VUs  30s  50.00 iters/s
     ✓ Post status is 200
     ✓ Post Content-Type header
     ✓ Post response name
```

After the load increased to 300 requests per second, the results returned 8811 successful requests and 7 failures:

```bash
my_scenario1 ✓ [======================================] 000/300 VUs  30s  300.00 iters/s
     ✗ Post status is 200
      ↳  99% — ✓ 8811 / ✗ 7
     ✗ Post Content-Type header
      ↳  99% — ✓ 8811 / ✗ 7
     ✗ Post response name
      ↳  99% — ✓ 8811 / ✗ 7
```

By default, a failed check doesn't fail or abort the test.
In this regard, a check differs from how assertions work for other types of testing.
A load test can run thousands or millions of script iterations, each with dozens of assertions.

**Some rate of failure is acceptable**, as determined by your SLO's "number of nines" or your organization's error budget.

## Test your reliability goals with Thresholds

Every test should have a goal.
Engineering organizations set their reliability goals using [Service Level Objectives](https://en.wikipedia.org/wiki/Service-level_objective) (SLOs) to validate availability, performance, or any performance requirements.

SLOs maybe defined at distinct scopes, such as on the level of an infrastructure component, of an API, or of the entire application.
Some example SLOs could be:

- That 99% of APIs returning product information respond in less than 600ms.
- That 99.99% of failed log-in requests respond in less than 1000ms.

**Design your load tests with pass/fail criteria to validate SLOs**, reliability goals, or other important metrics.
To ensure your system achieves its SLOs, test them frequently, both in pre-production and production environments.

In k6, you can use [Thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) to set the test pass/fail criteria.
This script codifies two SLOs in the `thresholds` object, one about error rate (availability) and one about request duration (latency).

```javascript
export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};
```

When k6 runs a test, the test output indicates whether the metrics were within the thresholds, ✅, or whether they crossed them, ❌.
In this output, the test met both thresholds.

```bash
✓ http_req_duration..............: avg=104.7ms  min=101.87ms med=103.92ms max=120.68ms p(90)=107.2ms  p(95)=111.38ms
    { expected_response:true }...: avg=104.7ms  min=101.87ms med=103.92ms max=120.68ms p(90)=107.2ms  p(95)=111.38ms
✓ http_req_failed................: 0.00%   ✓ 0         ✗ 1501
```

When the test fails, the k6 CLI returns a non-zero exit code—a necessary condition for test automation.
As an example of a failed test, here's the output for a test with a threshold that 95 percent of requests finish in under 50ms, `http_req_duration:["p(95)<50"]`:

```bash
running (0m30.1s), 00/50 VUs, 1501 complete and 0 interrupted iterations
my_scenario1 ✓ [======================================] 00/50 VUs  30s  50.00 iters/s

     ✓ Post status is 200
     ✓ Post Content-Type header
     ✓ Post response name

     checks.........................: 100.00% ✓ 4503      ✗ 0
     data_received..................: 1.3 MB  45 kB/s
     data_sent......................: 313 kB  10 kB/s
     http_req_blocked...............: avg=9.26ms   min=2µs      med=14µs     max=557.32ms p(90)=25µs     p(95)=46µs
     http_req_connecting............: avg=3.5ms    min=0s       med=0s       max=113.46ms p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=105.14ms min=102.01ms med=103.86ms max=171.56ms p(90)=112.4ms  p(95)=113.18ms
       { expected_response:true }...: avg=105.14ms min=102.01ms med=103.86ms max=171.56ms p(90)=112.4ms  p(95)=113.18ms
   ✓ http_req_failed................: 0.00%   ✓ 0         ✗ 1501
     http_req_receiving.............: avg=202.86µs min=17µs     med=170µs    max=4.69ms   p(90)=264µs    p(95)=341µs
     http_req_sending...............: avg=97.56µs  min=11µs     med=63µs     max=5.56ms   p(90)=98µs     p(95)=133µs
     http_req_tls_handshaking.......: avg=4.14ms   min=0s       med=0s       max=169.35ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=104.84ms min=101.88ms med=103.6ms  max=171.52ms p(90)=112.18ms p(95)=112.85ms
     http_reqs......................: 1501    49.834813/s
     iteration_duration.............: avg=115.18ms min=102.51ms med=104.66ms max=704.99ms p(90)=113.68ms p(95)=115.54ms
     iterations.....................: 1501    49.834813/s
     vus............................: 50      min=50      max=50
     vus_max........................: 50      min=50      max=50

ERRO[0030] some thresholds have failed
```

## Scripting considerations

If you have scripted tests before, implementing k6 scripts should seem familiar.
k6 tests are written in JavaScript, and the design of the k6 API has similarities with other testing frameworks.

But, unlike other tests, load tests run their scripts hundreds, thousands, or millions of times.
The presence of load creates a few specific concerns.
When you load test APIs with k6, consider the following aspects of your script design.

### Data parameterization

_Data parameterization_ happens when you replace hard-coded test data with dynamic values.
Parameterization makes it easier to manage a load test with varied users and API calls.
A common case for parameterization happens when you want to use different `userID` and `password` values for each virtual user or iteration.

For example, consider a JSON file with a list of user info such as:

{{< code >}}

```json
{
  "users": [
    { "username": "lorem", "surname": "ipsum" },
    { "username": "dolorem", "surname": "ipsum" }
  ]
}
```

{{< /code >}}

You can parameterize the users with the [`SharedArray`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) object as follows:

```javascript
import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users.json', function () {
  return JSON.parse(open('./users.json')).users;
});

export const options = {};

export default function () {
  // now, user data is not the same for all the iterations
  const user = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    name: user.username,
    surname: user.surname,
  });

  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, {
    headers,
  });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === user.username,
  });
}
```

To read more about data parameterization, check out the [parameterization examples](https://grafana.com/docs/k6/<K6_VERSION>/examples/data-parameterization) and [Execution context variables](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/execution-context-variables).

### Error handling and acceptance of failures

**Remember to implement error handling in the test logic**.
Under sufficiently heavy load, the SUT fails and starts to respond with errors.
Though a test might be designed to induce failures, sometimes we focus on only the best-case scenario and forget the importance of accounting for errors.

The test script must handle API errors to avoid runtime exceptions and to ensure that it tests how the SUT behaves under saturation according to the test goals.
For example, we could extend our script to do some operation that depends on the result of the previous request:

```javascript
import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users.json', function () {
  return JSON.parse(open('./users.json')).users;
});

export const options = {};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    name: user.username,
    surname: user.surname,
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, {
    headers,
  });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === user.username,
  });

  if (res.status === 200) {
    // enters only successful responses
    // otherwise, it triggers an exception
    const delPayload = JSON.stringify({ name: res.json().json.name });
    http.patch('https://httpbin.test.k6.io/patch', delPayload, { headers });
  }
}
```

### Test reuse and modularization

Load testing can be vast in scope, and it may involve different types of tests.
Generally, teams start with simple or critical load tests and continue adding tests for new use cases, user flows, traffic patterns, features, systems, etc.

In this process, load testing suites grow over time.
To minimize repetitive work, try to **reuse test scripts early** and to **modularize test functions and logic.**
If you script common scenarios in reusable modules, it's easier to create different types of load tests.
The process of creating a new load test goes like this:

1. Create a new test file.
1. Configure the specific load and other options.
1. Import the scenario.

As your testing matures, consider creating tests that [combine multiple scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/advanced-examples/#combine-scenarios) to simulate more diverse traffic.

### Dynamic URLs for one endpoint

By default, when you access the same API endpoint with different URLs―for example, `http://example.com/posts/${id}`―k6 reports the endpoint results separately.
This may create an unnecessary amount of metrics.

To group the results of the endpoint, use [URL grouping](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/http-requests/#url-grouping).

## Load generator locations

When you plan the test, consider the locations of your _load generators_, the machines that run the test.
Sometimes, running the test from a specific location is a test requirement.
Other times, you might just choose the location based on convenience or practicality.
Either way, when you set the location of the load generator, keep the following in mind:

- **Required locations.** To compare performance or ensure accurate results, some load tests need to measure the latency from specific locations. These tests launch the load generators from locations that match their user's region.
- **Optional locations.** Other tests try to measure against a performance baseline—how the system performance changes from a particular performance status or time. To avoid skewed latency results, ensure that the location of the load generator is constant across test tuns, and avoid running the tests from locations that are too close to the SUT.

### Internal APIs

End-to-end API tests try to replicate real-world user flows, which access public APIs from external systems.
Other APIs are internal and unreachable from outside.
The need to run internal tests is common when testing API integrations and isolated endpoints.

If the API is in an internal or restricted environment, you can use k6 to test it in a few different ways:

- Run the test from your private network using the k6 run command or the [Kubernetes operator](https://github.com/grafana/k6-operator). Optionally, store the test results in [k6 Cloud](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/cloud) or other [external services](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/).
- For cloud tests:
  - [Open your firewall](https://grafana.com/docs/grafana-cloud/k6/reference/cloud-ips/) for cloud test traffic.
  - Run the cloud test from your [Kubernetes clusters](https://grafana.com/docs/grafana-cloud/k6/author-run/private-load-zone-v2/).

## Supplementary tools

You might want to use k6 in conjunction with other API tools.

### Integrate with API tools

The tooling around REST APIs is vast, but there's not much focus on performance testing.
k6 provides a few converters to
help you incorporate the wider API tooling ecosystem into your load tests:

- [Postman-to-k6 converter](https://github.com/apideck-libraries/postman-to-k6): to create a k6 test from a Postman collection.

  ```bash
  postman-to-k6 collection.json -o k6-script.js
  ```

- [OpenAPI k6 generator](https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6/#api-load-testing-with-swaggeropenapi-specification): to create a k6 test from an Open API (formerly Swagger) definition.

  ```bash
  openapi-generator-cli generate -i my-api-spec.json -g k6
  ```

These tools generate a k6 test that you can edit and run as usual:

```bash
k6 run k6-script.js
```

Depending on the test type, the converters could help you quickly create your first tests or help onboard new users to k6.
Even so, we recommend you get familiar with the [k6 Javascript API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api) and script your own tests.

### Using proxy recorders

Another option is to auto-generate a k6 test from a recorded session. These scripts might help you start building more complex end-to-end and integration tests.

The [har-to-k6 converter](https://github.com/grafana/har-to-k6) creates the k6 test from a recorded session in HAR format which collects HTTP traffic.

```bash
har-to-k6 archive.tar -o k6-script.js
```

The generated k6 test can be edited and run as usual:

```bash
k6 run k6-script.js
```

To export a recorded session to HAR format, use a proxy recorder such as [Fiddler proxy](https://www.telerik.com/fiddler/fiddler-everywhere) or [GitLab HAR recorder](https://gitlab.com/gitlab-org/security-products/har-recorder/).

As with the previous converters, the recorder can help prototype tests.
Again, we recommend learning to write your test scripts.

## Beyond HTTP APIs

Due to the popularity of the web and REST APIs, this guide has used the term focused on HTTP APIs. But APIs are not restricted to the HTTP protocol.

By default, k6 supports testing the following protocols:

- [HTTP/1.1, HTTP/2](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/)
- [WebSockets](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/)
- [Redis (experimental)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis/)
- [gRPC](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/)

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('grpcbin.test.k6.io:9001');

  const data = { greeting: 'Bert' };
  const response = client.invoke('hello.HelloService/SayHello', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  client.close();
  sleep(1);
};
```

But modern software is not built only based on these protocols. Modern infrastructure and applications rely on other API protocols to provide new capabilities or improve their performance, throughput, and reliability.

To test the performance and capacity of these systems, the testing tool should be able to generate protocol-specific requests against their APIs.

If k6 doesn't support a protocol you need, you can use (or create) [extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions).
The list of extensions is long:

- Avro
- ZeroMQ
- Ethereum
- STOMP
- MLLP
- NATS
- and [more](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore).
