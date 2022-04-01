---
title: 'Functional testing'
excerpt: |
  Use functional.js library for functional testing.
---

k6 is well suited for functional testing


### Most basic integration test
```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.5/index.js';
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.4/index.js';
export const options = {
  thresholds: {
    checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};
const session = new Httpx({ baseURL: 'https://test-api.k6.io' });
export default function testSuite() {
  describe('Fetch a list of public crocodiles', (t) => {
    const response = session.get('/public/crocodiles');
    t.expect(response.status)
      .as('response status')
      .toEqual(200)
      .and(response)
      .toHaveValidJson()
      .and(response.json().length)
      .as('number of crocs')
      .toBeGreaterThan(4);
  });
}
```

### Sample integration test

This test goes through several steps. It creates a new user account, authenticates, and interacts with protected resources.


<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.5/index.js';
import { Httpx, Request, Get, Post } from 'https://jslib.k6.io/httpx/0.0.4/index.js';
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export let options = {
  thresholds: {
    checks: [{threshold: 'rate == 1.00', abortOnFail: true}],
  },
  vus: 1,
  iterations: 1
};

const USERNAME = `user${randomIntBetween(1, 100000)}@example.com`;  // Set your own email;
const PASSWORD = 'superCroc2019';

let session = new Httpx({baseURL: 'https://test-api.k6.io'});

export default function testSuite() {

  describe('01. Fetch public crocs', (t) => {
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
        .and(response.json('age')).as('croc age').toBeGreaterThan(7);
    });
  })

  &&

  describe(`02. Create a test user ${USERNAME}`, (t) => {

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

  describe(`03. Authenticate the new user ${USERNAME}`, (t) => {

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

  describe('04. Create a new crocodile', (t) => {
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

  describe('05. Fetch private crocs', (t) => {

    let response = session.get('/my/crocodiles/');

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toEqual(1);
  })

  &&

  describe('06. Update the croc', (t) => {
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

  describe('07. Delete the croc', (t) => {

    let resp = session.delete(`/my/crocodiles/${session.newCrocId}/`);

    t.expect(resp.status).as("Croc delete status").toEqual(204);
  });

}
```

</CodeGroup>


Discussion about functional testing can be found on the [community forum](https://community.k6.io/t/report-for-functional-test/574/2)
