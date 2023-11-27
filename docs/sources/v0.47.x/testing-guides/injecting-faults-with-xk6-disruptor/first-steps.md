---
title: 'xk6-disruptor first steps'
excerpt: 'xk6-disruptor is a k6 extension providing fault injection capabilities to k6.'
weight: 01
aliases:
  - /docs/k6/latest/javascript-api/xk6-disruptor/get-started/ 
---

# First steps

This document will guide you through running your first fault injection test using xk6-disruptor, while providing pointers to the more detailed documentation sections along the way. We will cover the following sections:

1. [Checking requirements](#checking-requirements)
1. [Installing xk6-disruptor](#installing-xk6-disruptor)
1. [Creating a simple k6 test](#creating-a-simple-k6-test)
1. [Add fault injeciton capabilities](#add-fault-injection-capabilities)

# Checking requirements

xk6-disruptor focuses on injecting faults on applications running in Kubernetes. If you already have your application deployed to a development Kubernetes cluster, you are all set! If you don't, we will guide you through deploying a demo application on a local `minikube` cluster.

In order to follow this guide, you will need

- A microservice-based application that communicates over HTTP or GRPC.
- The ability to reach at least one service exposed by the application from the machine where you will run the tests.
- Privileged access to the Kubernetes cluster where your application is running from the machine where you will run the tests.

## Use our demo application

If you don't have an application and/or a testing Kubernetes cluster set up, you can deploy the QuickPizza demo application. It will only take two commands and we have made it a perfect fit to demo Grafana tools, including xk6-disruptor. You can check the instructions to create a local cluster and deploy QuickPizza [here](https://github.com/grafana/quickpizza/blob/main/docs/kubernetes-setup.md).

# Installing xk6-disruptor

xk6-disruptor is distributed as a statically-compiled, dependency-free binary for Linux, MacOS, and Windows. For Linux and MacOS, both x86 and arm64 architectures are supported.

You can download the latest release for your architecture and platfrom from https://github.com/grafana/xk6-disruptor/releases. Look for the files named `xk6-disruptor-v*`, not `xk6-disruptor-agent-v*`: The latter are for advanced users and developers only.

The xk6-disruptor binary includes the core k6 functionality. If you want to use xk6-disruptor together with other k6 extensions, you will need to follow a different procedure detailed in the [Installation](/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/installation/) page.

# Creating a simple k6 test

k6 was born and is often referred to as a load testing tool. However, with the flexibility that testing as code provides, and the large amount of extensions (such as xk6-disruptor) it has, a better way to think about k6 is as a reliability testing tool. We will now write a k6 test that checks if an API is behaving correctly, without putting enough load on it to significantly alter its behavior.

This is a key part of the xk6-disruptor design philosophy: We want to test how our application behaves in adverse conditions, by carefully injecting those conditions into the application, rather than attempting to produce them as a side effect of stressing the application. This allows us to produce reliable and reproducible tests that are minimally dependent on the environment and transient state of the application.

A simple k6 test that checks an API works as expected without stressing it could be written as follows:

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = 'http://localhost:3333'; // <- Your reachable endpoint goes here.

export const options = {
  scenarios: {
    // Our test scenario: Runs 10 parallel virtual users, each executes the function 'test' 10 times.
    test: {
      exec: 'test',
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 10,
    }
  }
};

export function test() {
  // Make a POST request to our API endpoint.
  let res = http.post(`${BASE_URL}/api/pizza`, "{}", {
    headers: {
      'X-User-ID': 23423,
    },
  });

  // Check our API returns 200.
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
```

You can run this test with `xk6-disruptor` and you should get an output similar to the following. Note that some lines have been elided for brevity.

```console
$ xk6-disruptor run first-steps-1.js
# ...
     ✓ status is 200
# ...
running (00m10.6s), 00/10 VUs, 100 complete and 0 interrupted iterations
test ✓ [======================================] 10 VUs  00m10.6s/10m0s  100/100 iters, 10 per VU
```

This barely scratches the surface of what k6 can do. To learn more about what different types of requests, checks, thresholds, and more things you can do you can check the [API load testing](/docs/k6/<K6_VERSION>/testing-guides/api-load-testing/) page.

# Add fault injection capabilities

At this point we are ready to inject some faults into the application and see how it behaves. xk6-disruptor injects faults into your destination by altering how some pods or services respond to requests. A first approach could be to inject a fault causing the endpoint we are testing, `/api/pizza`, to return [503 Service Unavailable](https://http.cat/503) for 10% of the calls.

![Diagram consisting of three horizontal elements connected that arrows that point from one to the one on their right. The first element is an image of a female-presenting drawing of a crocodile, Bertha, which represents the user performing the test. An arrow points to the right to a service labeled Recommendations, but the arrow is interrupted by another cartoon crocodile snapping a cable, the xk6-disruptor project logo. Finally, from the Recommendations service, another arrow points to the Right to a service labeled Catalog](https://grafana.com/media/docs/k6-oss/xk6-disruptor-get-started-naive.png)

While this can be an interesting test in some cases, this is not the real power of xk6-disruptor, as the results are pretty much predictable: We know our test results will report a 10% of failures.

A more interesting way of using xk6-disruptor is to check how faults propagate across a distributed application. For the QuickPizza example, we know the Recommendations service, which provides the `/api/pizza` endpoint we were hitting earlier, has to make several calls to another service named Catalog. We can keep our test as above, testing for failures in the Recommendation service, but inject faults in the Catalog service to see how Recommendations reacts to that:

![A very similar diagram as above, with the three components connected by right-facing arrows. This time, the xk6-disruptor logo is located between the Recommendations and the Catalog services, instead of between the user and the Recommendations service](https://grafana.com/media/docs/k6-oss/xk6-disruptor-get-started-real.png)

We can use a [`ServiceDisruptor`](/docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/servicedisruptor/) to inject faults into the Catalog service that recommendations uses:

```javascript
export function disrupt() {
    const disruptor = new ServiceDisruptor("quickpizza-catalog", "default");
    disruptor.injectHTTPFaults({errorRate: 0.1, errorCode: 503}, "10s");
}
```

The function above will create a disruption in the Kubernetes service called `quickpizza-catalog` in the `default` namespace, causing 10% of the requests to return [503 Service Unavailable](https://http.cat/503).

We can now integrate this disruption into the simple test we wrote earlier:

```javascript
import http from "k6/http";
import { check, sleep } from "k6";
import {ServiceDisruptor} from "k6/x/disruptor";

const BASE_URL = 'http://localhost:3333'; // <- Your reachable endpoint goes here.

export const options = {
  scenarios: {
    // Our test scenario: Runs 10 parallel virtual users, each executes the function 'test' 10 times.
    test: {
      exec: 'test',
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 10,
      startTime: "10s", // Disruption may take a bit to kick off, so we wait 10s before start testing.
    },
    disrupt: {
      exec: 'disrupt',
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1
    }
  }
};

export function test() {
  // Make a POST request to our API endpoint.
  let res = http.post(`${BASE_URL}/api/pizza`, "{}", {
    headers: {
      'X-User-ID': 23423,
    },
  });

  // Check our API returns 200.
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}

export function disrupt() {
    const disruptor = new ServiceDisruptor("quickpizza-catalog", "default");
    disruptor.injectHTTPFaults({errorRate: 0.1, errorCode: 503}, "20s");
}
```

And observe the output:
```console
$ xk6-disruptor run first-steps-2.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: first-steps-2.js
     output: -

  scenarios: (100.00%) 2 scenarios, 11 max VUs, 10m40s max duration (incl. graceful stop):
           * disrupt: 1 iterations shared among 1 VUs (maxDuration: 10m0s, exec: disrupt, gracefulStop: 30s)
           * test: 10 iterations for each of 10 VUs (maxDuration: 10m0s, exec: test, startTime: 10s, gracefulStop: 30s)


     ✗ status is 200
      ↳  48% — ✓ 48 / ✗ 52

     checks.........................: 48.00% ✓ 48       ✗ 52
     data_received..................: 43 kB  1.8 kB/s
     data_sent......................: 13 kB  541 B/s
     http_req_blocked...............: avg=16.75µs min=1.07µs   med=1.94µs  max=157.83µs p(90)=66.74µs p(95)=141.84µs
     http_req_connecting............: avg=4.51µs  min=0s       med=0s      max=52.44µs  p(90)=3.89µs  p(95)=45.7µs
     http_req_duration..............: avg=28.43ms min=474.51µs med=8.36ms  max=102.8ms  p(90)=75.93ms p(95)=93.84ms
       { expected_response:true }...: avg=57.2ms  min=20.37ms  med=56.99ms max=102.8ms  p(90)=94.76ms p(95)=100.65ms
     http_req_failed................: 52.00% ✓ 52       ✗ 48
     http_req_receiving.............: avg=21.63µs min=10.14µs  med=19.36µs max=70.34µs  p(90)=30.96µs p(95)=32.96µs
     http_req_sending...............: avg=12.64µs min=6.42µs   med=11.04µs max=39.91µs  p(90)=21.64µs p(95)=28.52µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=28.4ms  min=457µs    med=8.31ms  max=102.75ms p(90)=75.89ms p(95)=93.8ms
     http_reqs......................: 100    4.189952/s
     iteration_duration.............: avg=1.25s   min=1s       med=1s      max=23.86s   p(90)=1.07s   p(95)=1.09s
     iterations.....................: 101    4.231852/s
     vus............................: 1      min=1      max=11
     vus_max........................: 11     min=11     max=11


running (00m23.9s), 00/11 VUs, 101 complete and 0 interrupted iterations
disrupt ✓ [======================================] 1 VUs   00m23.9s/10m0s  1/1 shared iters
test    ✓ [======================================] 10 VUs  00m10.6s/10m0s  100/100 iters, 10 per VU
```

In this case, we can see that around 50% of requests failed, which is significantly more than the 10% failure rate we specified. The reason for this is that for each request that the Recommendations service receives, it will actually make several requests to the Catalog service. If any of those requests fail, the original request also fails, creating a failure amplification effect.

## Next steps

Explore the fault injection [API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/)

See [step-by-step examples](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/examples).

Visit the [interactive demo environment](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda).

Learn the basics of using the disruptor in your test project:

- [Requirements](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/requirements)

- [Installation](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/installation)
