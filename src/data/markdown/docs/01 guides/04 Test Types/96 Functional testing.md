---
title: 'Functional testing'
head_title: 'How to create a Functional Test in k6'
excerpt: 'TODO'
---

While k6 was primarily built for performance testing, it's perfectly suited to run functional tests as well. There are few different types of functional tests, but the two most common types are Unit tests and Integration tests. 

TODO: add "end-to-end browser tests".
 
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

Integration tests can uncover issues with API data formats, wrong assumptions about timing, database dead-locks, etc.

Integration tests are much less common because they are harder to do well. If you have an automated integration test-suite you will surely agree that it's a wonderful tool with a great bang for the buck!

The intuitive approach for writing integration tests is to just extend the unit tests that you already have, using the framework you are already using! This is often how integration tests are written, and why the results some time end up being underwhelming. 

//TODO: this is not true. Since integration testing is black-box, it should not matter.
Nowadays, most complex systems are built using micro-service architecture. Integration testing using framework-dependent technology is considerably harder in a micro-service architecture where different components may be written in different languages and use different frameworks. 


Extending your unit tests to do integration-testing may not bear good results.

While unit-tests are always written in the technology the service is written, integration tests don't need to. 

For the purpose of this document, we will simplify the definition of unit tests and integration tests to:
 - Unit tests are for testing isolated code units in a single service.
 - Integration tests are for testing multiple services at once. 

// Unit tests should live in the same repository as code. Integration tests should live outside of any single service.

Integration testing of a micro-service system could be done well in a framework-independent tool. This is where k6 can shine.

Integration tests in k6 are implemented in JavaScript. 
Incidentally, JavaScript is the language frontend developers use to build customer-facing applications. 
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

If you work with a micro-service system, you are probably producing APIs for other teams to consume while consuming APIs others have built.  You may have some API format or stadard in the company or agreed with other teams on what APIs should return. 
The APIs you consume may follow these agreed upon standards when you receive them, but as times go, subtle changes may be introduced that could break the "contract".
With k6 you can validate schemas of the services you consume on an ongoing basis to reduce debugging time.

See a script sample below.

// You can use k6 to verify API contracts. 
// https://pritibiyani.github.io/blog/using-json-schema-as-specification-contract-and-validate-your-api


## Defining your success criteria

k6 does not make any assumption about your success criteria. You will need to define what it means 
for your test suite to succeed of fail using [thresholds](/using-k6/thresholds). 
Typical expectation for an integration test is to succeed only when 100% of test cases have passed.

Threshold with 0 tolerance will look like this:

```javascript
export let options = {
  thresholds: {
    checks: [{threshold: 'rate==1.00', abortOnFail: false}], // change to "true" to stop on first failure
  }
};
```

When any of the test cases fail, the threshold value will be below 1.00 (100%) and k6 will exit with a non-zero exit code.
Failed threshold makes k6 exit with code `99`. This is important to know because you will likely want to run your integration tests in some [automated fashion](https://k6.io/docs/testing-guides/automated-performance-testing) for example when a new Pull request is created. See the [CI guides](/testing-guides/automated-performance-testing) explaining how to do that. 

## Examples

### Most basic integration test
```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.1/index.js';
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.1/index.js';

export let options = {
  thresholds: {
    checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

let session = new Httpx({ baseURL: 'https://test-api.k6.io' });

export default function testSuite() {

  test('Fetch a list of public crocodiles', (t) => {
    let response = session.get("/public/crocodiles")

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(4); 
  })

}
```

### Sample integration test

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.1/index.js';
import { Httpx, Request, Get, Post } from 'https://jslib.k6.io/httpx/0.0.1/index.js';

import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { crocodileAPIcontract, crocodileListAPIcontract } from './contracts/my_contracts/contracts.js'

export let options = {
  thresholds: {
    'http_req_duration{name:PublicCrocs}': ['p(90)<200'],
    checks: [{threshold: 'rate == 1.00', abortOnFail: true}],
  },
  vus: 1,
  iterations: 1,
  ext: {
    loadimpact: {
      distribution: {
        Dublin: { loadZone: 'amazon:ie:dublin', percent: 100 },
      },
    },
  },
};

const USERNAME = `user${randomIntBetween(1, 100000)}@example.com`;  // Set your own email;
const PASSWORD = 'superCroc2019';

let session = new Httpx({baseURL: 'https://test-api.k6.io'});

export default function testSuite() {

  test('01. Fetch public crocs', (t) => {
    let responses = session.batch([
      new Get('/public/crocodiles/1/'),
      new Get('/public/crocodiles/2/'),
      new Get('/public/crocodiles/3/'),
      new Get('/public/crocodiles/4/'),
    ], {
      tags: {name: 'PublicCrocs'},
    });

    responses.forEach(response => {
      t.expect(response.status).as("response status").toEqual(200)
        .and(response).toHaveValidJson()
        .and(response.json()).as("Croc API schema").toMatchAPISchema(crocodileAPIcontract)
        .and(response.json('age')).as('croc age').toBeGreaterThan(7);
    });
  })

  &&

  test(`02. Create a test user ${USERNAME}`, (t) => {

    let resp = session.post(`/user/register/`, {
      first_name: 'Crocodile',
      last_name: 'Owner',
      username: USERNAME,
      password: PASSWORD,
    });

    t.expect(resp.status).as("status").toEqual(201)
      .and(resp).toHaveValidJson();
  })

  &&

  test(`03. Authenticate the new user ${USERNAME}`, (t) => {

    let resp = session.post(`/auth/token/login/`, {
      username: USERNAME,
      password: PASSWORD
    });

    t.expect(resp.status).as("Auth status").toBeBetween(200, 204)
      .and(resp).toHaveValidJson()
      .and(resp.json('access')).as("auth token").toBeTruthy();

    let authToken = resp.json('access');
    // set the authorization header on the session for the subsequent requests.
    session.addHeader('Authorization', `Bearer ${authToken}`);

  })

  &&

  test('04. Create a new crocodile', (t) => {
    let payload = {
      name: `Croc Name`,
      sex: randomItem(["M", "F"]),
      date_of_birth: '2019-01-01',
    };

    let resp = session.post(`/my/crocodiles/`, payload);

    t.expect(resp.status).as("Croc creation status").toEqual(201)
      .and(resp).toHaveValidJson();

    session.newCrocId=resp.json('id');
  })

  &&

  test('05. Fetch private crocs', (t) => {

    let response = session.get('/my/crocodiles/');

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toEqual(1)
      .and(response.json()).toMatchAPISchema(crocodileListAPIcontract);
  })

  &&

  test('06. Update the croc', (t) => {
    let payload = {
      name: `New name`,
    };

    let resp = session.patch(`/my/crocodiles/${session.newCrocId}/`, payload);

    t.expect(resp.status).as("Croc patch status").toEqual(200)
      .and(resp).toHaveValidJson()
      .and(resp.json('name')).as('name').toEqual('New name');

    let resp1 = session.get(`/my/crocodiles/${session.newCrocId}/`);

  })

  &&

  test('07. Delete the croc', (t) => {

    let resp = session.delete(`/my/crocodiles/${session.newCrocId}/`);

    t.expect(resp.status).as("Croc delete status").toEqual(204);
  });

}

```


### Sample integration test
    
Here's a sample integration test with 3 test cases.

```javascript
import http from 'k6/http'
import {Counter} from 'k6/metrics'
import {sleep, check as loadTestingCheck, group} from "k6";
import {randomIntBetween} from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

let assert = function (result, name) {
  loadTestingCheck(null, {[name]: result}); // to record a check
  failedTestCases.add(!result);
  return result;
};

let failedTestCases = new Counter('failedTestCases');

export let options = {
  thresholds: {
    failedTestCases: [{threshold: 'count===0', abortOnFail: false}], 
  },
  vus: 1,
  iterations: 1,
};

const USERNAME = `${randomIntBetween(10000, 100000)}@example.com`;
const PASSWORD = 'superCroc2019';
const BASE_URL = 'https://test-api.k6.io';

function simpleFunctionalTest() {
  group("Simple smoke test", ()=> {
    let res = http.get(`${BASE_URL}/public/crocodiles/`);
    
    let api_ok = assert(res.status === 200, "API is working");
    let crocs_ok = assert(api_ok && res.json("#") === 8, "got 8 crocodiles");
    let bert_ok = assert(crocs_ok && res.json("0.name") === "Bert", "First crocodile is Bert");
    let pepe_ok = assert(crocs_ok && res.json("1.name") === "Pepe", "Second crocodile is Pepe");
  });
}

function createUserTest() {
  group("User creation", ()=> {
    let res = http.post(`${BASE_URL}/user/register/`, {
      first_name: 'Crocodile',
      last_name: 'Owner',
      username: USERNAME,
      password: PASSWORD,
    });

    assert(res.status === 201, 'created user') &&
    assert(res.json('username') === USERNAME, 'created user has correct email');
  });
}

function authenticationTest() {
  group("Authentication", ()=> {
    let loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
      username: USERNAME,
      password: PASSWORD
    });

    assert(loginRes.status === 200, 'logged in successfully') &&
    assert(loginRes.json('access'), 'got access token');
  });
}

export default function testSuite() {
  // execute all test cases
  simpleFunctionalTest();
  createUserTest();
  authenticationTest();
}
```


## Sample schema validation test

```javascript
import http from 'k6/http'
import {Rate} from 'k6/metrics'
import {check} from "k6";
import Ajv from 'https://cdnjs.cloudflare.com/ajax/libs/ajv/6.12.5/ajv.min.js';

let ajv = new Ajv();

let testSuiteSuccessRate = new Rate('testSuiteSuccessRate');

export let options = {
  thresholds: {
    testSuiteSuccessRate: [{threshold: 'rate == 1.00', abortOnFail: false}], // change to "true" to stop on first failure
  },
  vus: 1,
  iterations: 1
};

let crocodile_schema = {
  type: "object",
  properties: {
    id: {
      type: "number"
    },
    name: {
      type: "string"
    },
    age: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    date_of_birth: {
      type: "string",
      format: "date"
    },
  },
  "required": [
    "name",
    "age",
    "date_of_birth",
  ]
};

function validate_schema(schema, data, name) {
  let validate = ajv.compile(schema);
  let is_valid = validate(data);
  console.log(JSON.stringify(data));

  testSuiteSuccessRate.add(is_valid);

  check(is_valid, {
    [`${name} schema validation`]: (is_valid) => is_valid
  });

  // optional. It records specific error messages as checks.
  if (!is_valid) {
    validate.errors.forEach(error => {
      check(is_valid, {
        [`${name} ${error.dataPath} ${error.message}`]: (is_valid) => is_valid
      });
    });
  }
}

export default function testSuite() {

  for(let i=1; i<5; i++){
    let url = `https://test-api.k6.io/public/crocodiles/${i}/`;
    let resp = http.get(url);

    validate_schema(crocodile_schema, resp.json(), "crocodile");
  }
}
```


### k6funk - the functional library for k6

k6funk has been inspired by jest - the leading JavaScript functional testing framework.
Users familiar with Jest should pick up `Jerks` quickly. 

A simple integration test with jerks looks like this

```javascript

import { test } from 'https://jslib.k6.io/functional/0.0.1/index.js';
import http from 'k6/http';

export let options = {
  thresholds: {
    checks: [{threshold: 'rate == 1.00', abortOnFail: true}], // fail test on any check failure
  }
};

export default function() {

  test('Public API is accessible', (t) => {
    let response = http.get('https://test-api.k6.io/public/crocodiles/1/');
    
      t.expect(response.status).as("response status").toEqual(200)
        .and(response).toHaveValidJson()
        .and(response.json('age')).as('croc age').toBeGreaterThan(7);
    });
}
```

The terminal output of this test should look similar to this
![basic functional test with k6](./images/functional-test-basic-1.png)

As can be seen on the screenshot, the code produced 3 k6 checks, all of t

#### k6funk usage


API reference

`test`




----------------------- 
> Near future of this product
Note: we plan to add additional protocols to k6 such as SQL and Kafka to enable developers to make SQL queries and put messages on the queue. This functionality will make the integration testing functionality more powerful. 


Functional monitoring. 

###### Product changes required (internal notes)

# Cloud support
1. The current app isn't suited for integration testing. 
2. Most of the performance alerts should be disabled https://trello.com/c/wNm2mT5f/3088-ability-to-disable-specific-performance-insights
15. ~Threshold for checks doesn't work in the cloud.~ Fixed.

# k6 support
3. [optional] The teardown race bug is problematic https://github.com/loadimpact/k6/issues/1606
16. [optional] exit(api) would be nice.
4. [optional] Scenarios running sequentially.
8. [optional] setup() function per scenario
9. [optional] share data between scenarios. (create user => authenticate user) 
10. [optional] nest check results within scenarios
    web test scenario
        ✓ login successful
        ✗ user retrieval 
    API test scenario
        ✗ login successful
        ✗ user retrieval 

5. ~Check API is weak.~ expect() solved that.
11. ~the standard performance metrics should not be displayed.~ solved by endOfTestSummary
12. ~ability to inspect DOM elements (testing SPAs) / browser testing.~ Solved by k6-browser
13. ~Check/groups are printed in random order.~

# future iteration
14. Mocking service.

























