---
title: 'API load testing'
head_title: 'Intro to API Load Testing: The k6 Guide'
excerpt: 'APIs are everywhere. Slow APIs impact user experience and business. This guide introduces you to performance testing and gives you the best practices on how to load test your APIs with k6.'
---

It is crucial to test your API with various testing methods and tools. From unit- to performance-testing, you need to have plans and execute them with great care. One type of testing the API is to put load on it to see how it performs, hence the load-testing.

In this guide, you'll learn how to do API load testing and what the best practices are. You'll also learn about our tools, which helps you generate or convert your existing API documentation or tests into k6 scripts.

## How to load test an API with k6

Our developer-friendly tool for load-testing is k6. You can write JavaScript code to load test your API. This is different from other tools, which are focused more on simple testing by hammering one or multiple endpoints via predefined requests, in that, you can write a user-flow scenarios in JavaScript to do all sorts of load testing. Using this tool will help you achieve more by giving you the possibility of:

1. writing your tests in this well-known scripting language, ES5.1(+).
2. using correlation to easily connect various requests together. (For example, you can log in to your API, extract the API key from the response, and use it to make other requests, with a unique API key dedicated to that specific session.)
3. having the option to set thresholds on your requests to achieve your SLOs.
4. automating your load testing in your CI tool.

k6 binaries are available for various platforms, so you don't need to install a language runtime anymore. It is really easy to use by providing a easy-to-use command line interface:

```bash
$ k6 run script.js
```

Using this command, you can run your load test script and put load on your API. Since you're already in the documentation, make sure to look around for specifics catered to your use case. To give you an example, have a look at the following script, taken from [HTTP Requests](/using-k6/http-requests) section of the docs. It uses the [k6/http API](/javascript-api/k6-http) to make a load test request call. You can easily play with the example to create your own script. The following sections describe how to do load testing, either by hammering an endpoint or testing the user flow (scenario).

### Hammering an endpoint

Suppose you want to load test your login endpoint to see how many requests it can handle concurrently. This is the type you write to achieve that.

```js
import http from 'k6/http';

export default function() {
  var url = 'http://api.yourplatform.com/login';
  var payload = JSON.stringify({
    email: 'johndoe@example.com',
    password: 'PASSWORD',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
```

It is a simple HTTP request, which runs once. By tweaking the command line arguments, you can adjust how many concurrent requests you want to make. This command would create 1000 concurrent sessions (virtual users), and would run this single requests 10 times for each virtual user, hence 10,000 iterations.

```bash
$ k6 run -vus 1000 --iterations 10000 script.js
```

While hammering is good in some cases, e.g. if you want to test endpoints in isolation, it is recommended that you take into account other endpoints and write a scenario-based load test script.

### User flow (scenarios) testing

In the following example, you see four consecutive [HTTP requests](/using-k6/http-requests) to your API to log in, fetch user profile, update user profile and finally log out. Each request has unique characteristics, accepts some parameters and finally returns a [response](/javascript-api/k6-http/response), which is [check](/using-k6/checks)ed against a set of rules. We also pause after each request and response, for the API to be able to keep up and not be flooded. There are also a set of options at the top, that defines load test [options](/using-k6/options) in your script.

The `iterations` is a number that specifies how many iterations (executions) of the script per VU should happen, which is divided by the number of virtual users. The `vus` is a number specifying the number of concurrent sessions (virtual users) to your API. So from `iterations` and `vus` you deduct that you'll likely run each VU around 10 iterations, depending on your API response time and network roundtrip.

As you can see, this is a fairly normal, yet simple, user flow that tries to mimic the user behavior while using our mobile App or website. For the sake of simplicity, only four requests has been shown, but you can easily add additional requests to be able to have a more realistic user experience. This way you can test the flow of your users' navigation in your application or platform. This is the point that distinguishes k6 from most of the currently available load testing tools, in that it can be used to test realistic user flows, instead of just relying on hammering a set of endpoints.<!-- The [open source load testing tool review 2020](https://blog.loadimpact.com/comparing-best-open-source-load-testing-tools) blog post goes into details of all the open source load testing tools available today, and tries to dig deep into their pros and cons, performance and developer experience. This is particularly important, because it gives you a more holistic view of the user experience and your system's performance under load, while hammering gives you a more narrow view of your system. -->

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

let options = {
  vus: 1000,
  duration: '600s',
};
const SLEEP_DURATION = 0.1;

export default function() {
  let body = JSON.stringify({
    username: 'user_' + __ITER,
    password: 'PASSWORD',
  });
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'login', // first request
    },
  };

  group('simple user journey', _ => {
    // Login request
    let login_response = http.post(
      'http://api.yourplatform.com/v2/login',
      body,
      params,
    );
    check(login_response, {
      'is status 200': r => r.status === 200,
      'is api key present': r => r.json().hasOwnProperty('api_key'),
    });
    params.headers['api-key'] = login_response.json()['api_key'];
    sleep(SLEEP_DURATION);

    // Get user profile request
    params.tags.name = 'get-user-profile';
    let user_profile_response = http.get(
      'http://api.yourplatform.com/v2/users/user_' + __ITER + '/profile',
      params,
    );
    sleep(SLEEP_DURATION);

    // Update user profile request
    body = JSON.string({
      first_name: 'user_' + __ITER,
    });
    params.tags.name = 'update-user-profile';
    let update_profile_response = http.post(
      'http://api.yourplatform.com/v2/users/user_' + __ITER + '/profile',
      body,
      params,
    );
    sleep(SLEEP_DURATION);

    // Logout request
    params.tags.name = 'logout';
    let logout_response = http.get(
      'http://api.yourplatform.com/v2/logout',
      params,
    );
    sleep(SLEEP_DURATION);
  });
}
```

## Virtual Users vs. Constant Request Rate

Historically, there are two types of categories of load testing tools: scriptable and non-scriptable. Non-scriptable tools generate requests to one or multiple endpoints without any correlation between the requests providing the option to define a constant request rate to hit an endpoint. On the other hand, scriptable tools are usually designed to facilitate user flow testing, thus providing the option to configure the number of virtual users to set up the load of your test. k6 belongs to this category.

The k6 v0.27.0 release includes the [scenarios](/using-k6/scenarios) feature, where you can configure multiple scenarios and model different traffic patterns. The k6 execution engine was completely revamped and now includes  support for different [executors](/using-k6/scenarios#executors) in each scenario. Earlier k6 versions didn't have support for natively generating a constant request rate, which led to a [workaround solution](https://k6.io/blog/how-to-generate-a-constant-request-rate-in-k6). Now you can use the `constant-arrival-rate` executor to [generate a constant request rate](https://k6.io/blog/how-to-generate-a-constant-request-rate-with-the-new-scenarios-api) with no boilerplate code.

## Test creation

There are various ways to create a test and eventually run it using k6. You can write your tests in your favorite editor, convert your existing Postman collections and Swagger/OpenAPI specification documents to scripts or use proxy recording as HAR files and convert them to k6 scripts. The recommended way is definitely to write your own scripts. The other tools are available just to help you with onboarding to k6. There's a rich set of tools that can help you create load tests and run them to gain insight into your system.

![Our tools](./our-tools.png)

As is evident in the above diagram, there are four different tools to help onboard existing users into k6. The best way is to make your own custom script, but you can use our converters to help you with generating script out of your existing postman collections, swagger specification documents, fiddler and [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>) recordings.

### Write your own script

Writing your own script is the recommended way to create your load test script, since it is the easiest, yet the most flexible and customizable, way to create and run your load tests. With many examples for different use cases throughout the documentation, you can easily create load test scripts.

### Converters for API testing tools

We have developed two (actually more) converters for you to convert your existing Postman collections or Swagger/OpenAPI specification documents to k6 scripts. Although fairly easy to use, the output script is not 100 percent accurate, since they use wrapper APIs and limited functionality (postman-to-k6), or have limited support for all the features (openapi-to-k6). Use them to create the skeleton of your script, then modify or use it in your own script.

The postman-to-k6 converter produces non-idiomatic k6 scripts, because it uses a wrapper for various functionality inside Postman, and has its own limitations. On the other hand, the openapi-to-k6 converter produces idiomatic k6 scripts, yet not every single OpenAPI specification is supported.

**Postman-to-k6**

Postman is a good and easy to use tool for API testing. It can group requests into collections and you can export/import them easily. Yet, there is an easy way to create your own k6 script out of your existing Postman exported collections. We have a [postman-to-k6](https://github.com/loadimpact/postman-to-k6) tool that can convert your Postman exported collections. This tool also converts your Postman scripts written with the help of the [Postman Scripting API](https://learning.postman.com/docs/postman/scripts/postman-sandbox-api-reference/) and includes a wrapper for its API and related libraries. Read more at the article [Load Testing Your API with Postman](https://k6.io/blog/load-testing-with-postman-collections).

![Postman export collection](./postman-export.png)

**OpenAPI-Generator**

Swagger/OpenAPI is a good way to design, document and test your APIs. We have built a new OpenAPI generator in the [openapi-generator](https://github.com/loadimpact/openapi-generator) project, that takes in the Swagger/OpenAPI specification in JSON/YAML format and generates pure idiomatic k6 script. It is really easy to use, and there are various ways to [install](https://github.com/OpenAPITools/openapi-generator#1---installation) and use it. In order to get an idea of how it works, please have a look at our [Load Testing Your API with Swagger/OpenAPI and k6](https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6) blog post.

### Converters for proxy recorders

**HAR-to-k6**

HAR files are recorded browser logs that can be exported as an archive and later replayed. [HAR files specification](https://w3c.github.io/web-performance/specs/HAR/Overview.html) defines the format of the file, which is basically a JSON file with various objects containing requests to different resources. This file can be converted to k6 script using the [HAR-to-k6](https://github.com/loadimpact/har-to-k6) tool. Since HAR files contain requests to every single resource that the browser fetches, it is not recommended to use the converted script intact, rather revise it to remove extra unneeded requests to load test CDNs and other static files. Generally, recording users' sessions is not usually the best way to do API load testing, since it creates more noise than real requests and it is used more for [load testing a website](/testing-guides/load-testing-websites). Nevertheless, you can take advantage of it, but beware of what you are doing, since it could misguide you to test systems not related to your API.

**Fiddler-to-k6**

Originally called [FiddlerToLoadImpact](https://github.com/loadimpact/FiddlerToLoadImpact), it can be used to export your fiddler recordings into a k6 script. Obviously, you need to have Fiddler installed, for it to work. This tool also creates HAR recordings, so the same holds true for this, in that, it is not fit for API load testing, rather made for website load testing, so beware! For more information, refer to [session recording](/using-k6/session-recording-har-support) guide.

## Different types of API load testing

As said in the introduction, it is crucial to test your API in advance, rather than relying on the untested API, which may crash at any time and have unexpected consequences.

There are various ways to test your API, each pertaining to a particular test type and each producing a different type of load.

- [Smoke test](/test-types/smoke-testing)
- [Load test](/test-types/load-testing)
- [Stress  test](/test-types/stress-testing)
- [Spike  test](/test-types/stress-testing#spike-testing)
- [Soak test](/test-types/soak-testing)

## API load testing considerations

### Identify your goals

Having a clear goal is of utmost importance in running a load test on your APIs. As with the type of load testing you want to use, you also need to identify your goals to expect correct results. For example, you cannot expect your API to perform very well under heavy load, if you just test it with a simple smoke test. Therefore you need to set well-defined goals and tune your load test to meet your expectations. Usually your goals are to meet your [Service-Level Objectives (SLOs)](https://landing.google.com/sre/sre-book/chapters/service-level-objectives/), which might be defined in a Service-Level Agreement (SLA), formally or informally, between you and the other party, e.g. your users. You set some thresholds for your service and you make yourself responsible for any deviation from that standard.
Fortunately, these thresholds can be tested using k6, which has a rich set of [metrics](/using-k6/metrics), built-in and custom, that can be tested against a set of [thresholds](/using-k6/thresholds).
Before writing and eventually running your test, set aside some time to think about your SLOs and then try to design your test, so that it meets your requirements and your customers' expectations.

### Start small and build upon your script

It is important to have a predefined set of goals and expectations, but it's not good to try to meet them all at once. The bigger your list of goals, the less likely your ability to make things right the first time. So, start small, e.g. write and run a test for one or two API endpoints. Try to experiment with different settings and environments, then you can build upon that and execute large tests that span several hours and has thousands of virtual users and hundreds of thousands of requests per second.

The very simple examples in the [running k6](https://k6.io/docs/getting-started/running-k6) section would give you a head start.

### Correlation and data parameterization

Since REST APIs are HTTP-based, hence asynchronous, it is always the responsibility of the client to describe what resource it wants to CRUD on. The whole idea is to have a stateless API, which has a way to relate separate requests to related resources. Usually it is done via some sort of correlation. Correlation would help developers to easily track the relationship between the requests and the resources with a unique key or identifier.

While writing load test scripts, you may want to use this unique key to have your virtual users know which resources to work with in each request. In the above scenario script, you saw how we used the responses of the login request to extract the API key and later used it with subsequent requests to identify ourselves as a certain (virtual) user.

This can be easily taken advantage of by using the response data (in form of a JSON object or even a body of text) to provide unique keys (correlation IDs, API keys, etc.) to other requests down the flow.

There's also the possibility of loading data files from disk to help parameterize the load test. Imagine that you want to have 1000 users with separate credentials to be able to make multiple requests. This can be achieved by simply loading a JSON file and using its objects in your requests.

For more information, refer to [the post on the k6 community forum](https://community.k6.io/t/when-parameterizing-data-how-do-i-not-use-the-same-data-more-than-once-in-a-test/).

### URL grouping

By default, k6 will print runtime information and general results to standard output, `stdout`, while the test is running, and will also print a summary after the test has ended. It may output more granular result data using special output plugins, one of them being [JSON output](/getting-started/results-output/json). The contents of the records in output includes many pieces of useful information like various metrics and some of those metrics include the URL of the requests you made.

Sometimes you need to make lots of similar API requests to read or create many resources of the same type. As shown in the following example, a 100 posts will be fetched with unique requests. Each of these requests will create a metric and will have the full URL inside the metric. This poses a problem for data aggregation, either on our cloud platform or on your own API load testing stack. The problem is that all the metrics for each of these URLs will be separate and they'll be aggregated individually, because they are different in their `id` field. It also creates a lot of unnecessary records in the output.

```javascript
for (var id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`);
}

// tags.name="http://example.com/posts/1",
// tags.name="http://example.com/posts/2",
```

There's a way to prevent creating a lot of metrics for the same URL. It's called [URL grouping](/using-k6/http-requests#section-url-grouping), and by using it you'll avoid creating separate metrics for the same URL. It is just a matter of using a tag that you should add to your requests' [parameters](/javascript-api/k6-http/params).

```javascript
for (var id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`, {
    tags: { name: 'PostsItemURL' },
  });
}

// tags.name="PostsItemURL",
// tags.name="PostsItemURL",
```
