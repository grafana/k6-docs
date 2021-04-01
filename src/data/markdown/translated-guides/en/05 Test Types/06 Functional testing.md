---
title: 'Functional testing'
head_title: 'How to create a Functional Test in k6'
---

While k6 was primarily built for performance testing, it's perfectly suited to run functional tests as well. There are few different types of functional tests, but the two most common types are Unit tests and Integration tests. 

<!-- TODO: add "end-to-end browser tests". -->
 
# Unit testing in k6?

Unit-tests are [white-box tests](https://en.wikipedia.org/wiki/White-box_testing), and are usually written in the technology the service is written in. 
Unit-tests written in this manner have proven useful, and nowadays it's a universal standard that almost every developer follows. 

If your system is written in Python, you use py.test for unit-tests. If you have a Java app, you likely write your unit tests in Junit. It's useful to write unit tests in the same technology because the test framework needs to have access to the internal functions that often can't be called from the outside. 

While you can write _some_ unit tests in k6, it's not a good idea because k6 works from the outside ([black box](https://en.wikipedia.org/wiki/Black-box_testing)) and won't be able to call any internal functionality of your system.

Integration tests are a whole different matter.

# Integration testing in k6
While unit tests are focused on finding bugs in small code units, the purpose of integration tests is to find application-level issues. 
In other words, integration tests focus on the big picture - either a single service or multiple services working together.
Don't use integration tests to verify small code units. Use them to ensure the system components or microservices work well together.

Integration tests can uncover issues with incorrect API contracs, wrong assumptions about timing, database dead-locks, etc.

While Unit tests are ubiquitous, integration tests are much less common because they are harder to do well. If you have an automated integration test-suite you will surely agree that it's a wonderful tool with a great bang for the buck!

The intuitive approach for writing integration tests is to just extend the unit tests that you already have, using the framework you are already using! This is often how integration tests are written, and why the results some time end up being underwhelming. 

Nowadays, most complex systems are built using micro-service architecture. Integration testing using framework-dependent technology is considerably harder in a micro-service architecture where different components may be written in different languages and use different frameworks. 

Extending your unit tests to do integration-testing may not bear good results.

While unit-tests are always written in the technology the service is written, integration tests don't need to. Integration testing of a micro-service system could be done well in a framework-independent tool. This is where k6 can shine.

Integration tests in k6 are implemented in JavaScript. Incidentally, JavaScript is the language frontend developers use to build customer-facing applications.  
We may not think about frontend apps as integration tests, but from one perspective they are. Frontend applications call (integrate) backend components and expose the functionality to the user.  
Frontend developers often find backend integration errors when developing frontend applications. This is less than ideal.

# Types of defects k6 integration tests can help you surface
- regular functional bugs 
- integration errors between services
- flaky tests (errors that appear rarely)
- concurrency errors / race conditions
- violated API contracts

## Regular functional bugs

Simple integration tests are like unit-tests on a URL level. 
It can be as simple as to call one URL and inspect the response to find out if it worked according to expectations. 

## Integration between services
Integration tests are focused on assessing that your system works from end to end. Think about this as if you were implementing a very simple client application for your API. For example, you may want to register a new user, authenticate, retrieve protected resources, modify them and log out. 
A flow like this can be implemented in 50 lines of code in k6. See example in the [examples](#examples) section below.

## Flaky tests, concurrency errors and race conditions

k6 is particularly good at surfacing pesky bugs that appear only once in a blue moon when the stars align in just the right way ;-)

In all seriousness, it's easy in k6 to surface flaky behaviour caused by race conditions or edge cases because it's trivial to run the same test concurrently hundreds of times. 

Micro-service system can exhibit flaky behavior caused by a wide range of factors such as network issues, load balancer problems, unexpected service restarts, garbage-collection stalls, floppy network hardware, temporary DNS problems, cache invalidation, incorrect firewall configurations, etc. 

Once you have an integration test implemented, it's trivial to configure k6 to execute the test concurrently. 

Here's a sample configuration that could help surface race-conditions.
```javascript
export let options = {
  iterations: 100, // 100 executions in total
  vus: 10, // 10 executions at a time. 
};
```

> ## Debugging flaky behaviour in staging environment
>
> Sometimes flaky behaviour happens only under certain conditions that can't be reproduced on developer's machine.
> Staging and production infrastructures always differ in subtle ways. These subtle differences sometimes create conditions for [heisenbugs](https://en.wikipedia.org/wiki/Heisenbug) to appear. In those cases there's no other way than to get your hands dirty and try to reproduce it on the infrastructure where it happens. 
>
> Unlike other tools, k6 is a single executable that doesn't require installation. 
> This feature makes it easy to download k6 onto one of your staging servers to run ad-hoc debugging tests. 


## Verify API contracts

If you work with a micro-service system, you are probably producing APIs for other teams and consuming APIs others have built.  You may have some API format or stadard in the company or agreed with other teams on what APIs should return. 
The APIs you consume may follow these agreed upon standards when you receive them, but as times go, subtle changes may be introduced that could break the "contract".
With k6 you can validate schemas of the services you consume on an ongoing basis to reduce debugging time. Contract validation tests are great for regression testing.

See a script sample below.

## Defining your success criteria

k6 does not make any assumption about your success criteria. You will need to define what it means 
for your test suite to succeed of fail using [thresholds](/using-k6/thresholds). 
Typical expectation for an integration test is to succeed only when 100% of test cases have passed, and all http requests were successful.

Threshold with 0 tolerance will look like this:

```javascript
export let options = {
  thresholds: {
    checks: ['rate==1.00'],
    http_req_failed: ['rate == 0.00'],
  }
};
```

When any of the test cases fail, the threshold value will be below 1.00 (100%) and k6 will exit with a non-zero exit code.
Failed threshold makes k6 exit with code `99`. This is important to know because you will likely want to run your integration tests in some [automated fashion](https://k6.io/docs/testing-guides/automated-performance-testing) for example when a new Pull request is created. See the [CI guides](/testing-guides/automated-performance-testing) explaining how to do that. 

## Examples

### Most basic integration test
```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js';

export let options = {
  thresholds: {
    checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
    http_req_failed: [{ threshold: 'rate == 0.00', abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

let session = new Httpx({ baseURL: 'https://test-api.k6.io' });

export default function testSuite() {

  describe('Fetch a list of public crocodiles', (t) => {
    let response = session.get("/public/crocodiles")

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(4); 
  })
}
```

See more advanced example in the [examples section](/examples/functional-testing)

## Sample schema validation test

```javascript
import http from 'k6/http';
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';

// this schema is typically imported from a separate file such as ./contracts/CrocApiSchema.js
// For simplicity of the example, the contract object is pasted here.
let crocodileApiContract = {
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number",
      "minimum": 1,
      "maximum": 30
    },
    "date_of_birth": {
      "type": "string",
      "format": "date"
    }
  },
  "required": [
    "name",
    "age",
    "date_of_birth"
  ]
};

export default function() {
  describe('01. Fetch public crocs', (t) => {
    let response = http.get(`https://test-api.k6.io/public/crocodiles/1/`);

    t.expect(response.status).as("response status").toEqual(200)
    .and(response).toHaveValidJson()
    .and(response.json()).as("Croc API schema").toMatchAPISchema(crocodileApiContract);
  });
}
```



----------------------- 
> Note: we plan to add additional protocols to k6 such as SQL and Kafka to enable developers to make SQL queries and put messages on the queue. This functionality will make the integration testing functionality more powerful. 
























