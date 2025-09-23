---
title: 'API CRUD Operations'
description: 'This example covers the usage of k6 to test a REST API CRUD operations.'
weight: 10
---

# API CRUD Operations

The examples showcase the testing of CRUD operations on a REST API.

CRUD refers to the basic operations in a database: Create, Read, Update, and Delete. We can map these operations to HTTP methods in REST APIs:

- _Create_: HTTP `POST` operation to create a new resource.
- _Read_: HTTP `GET` to retrieve a resource.
- _Update_: HTTP `PUT`or `PATCH` to change an existing resource.
- _Delete_: HTTP `DELETE` to remove a resource.

This document has two examples, one that uses the core k6 APIs (`k6/http` and `checks`) and another to show the more recent APIs [`httpx`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx) and [`k6chaijs`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs)).

## Test steps

In the [setup() stage](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle#setup-and-teardown-stages) we create a user for [QuickPizza](https://quickpizza.grafana.com). We then retrieve and return a bearer token to authenticate the next CRUD requests.

The steps implemented in the [VU stage](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle#the-vu-stage) are as follows:

1. _Create_ a new resource, a pizza rating.
2. _Read_ the list of ratings.
3. _Update_ the rating's stars (e.g. to 5 stars) and _read_ the rating to confirm the update operation.
4. _Delete_ the rating resource.

## Core k6 APIs example

{{< code >}}

```javascript
import http from 'k6/http';
import { check, group, fail } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

// Create a random string of given length
function randomString(length, charset = '') {
  if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
  let res = '';
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
}

const USERNAME = `${randomString(10)}@example.com`; // Set your own email or `${randomString(10)}@example.com`;
const PASSWORD = 'secret';

const BASE_URL = 'https://quickpizza.grafana.com';

// Register a new user and retrieve authentication token for subsequent API requests
export function setup() {
  const res = http.post(
    `${BASE_URL}/api/users`,
    JSON.stringify({
      username: USERNAME,
      password: PASSWORD,
    })
  );

  check(res, { 'created user': (r) => r.status === 201 });

  const loginRes = http.post(
    `${BASE_URL}/api/users/token/login`,
    JSON.stringify({
      username: USERNAME,
      password: PASSWORD,
    })
  );

  const authToken = loginRes.json('token');
  check(authToken, { 'logged in successfully': () => authToken.length > 0 });

  return authToken;
}

export default function (authToken) {
  // set the authorization header on the session for the subsequent requests
  const requestConfigWithTag = (tag) => ({
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    tags: Object.assign(
      {},
      {
        name: 'PrivateRatings',
      },
      tag
    ),
  });

  let URL = `${BASE_URL}/api/ratings`;

  group('01. Create a new rating', () => {
    const payload = {
      stars: 2,
      pizza_id: 1, // Pizza ID 1 already exists in the database.
    };

    const res = http.post(URL, JSON.stringify(payload), requestConfigWithTag({ name: 'Create' }));

    if (check(res, { 'Rating created correctly': (r) => r.status === 201 })) {
      URL = `${URL}/${res.json('id')}`;
    } else {
      console.log(`Unable to create rating ${res.status} ${res.body}`);
      return;
    }
  });

  group('02. Fetch my ratings', () => {
    const res = http.get(`${BASE_URL}/api/ratings`, requestConfigWithTag({ name: 'Fetch' }));
    check(res, { 'retrieve ratings status': (r) => r.status === 200 });
    check(res.json(), { 'retrieved ratings list': (r) => r.ratings.length > 0 });
  });

  group('03. Update the rating', () => {
    const payload = { stars: 5 };
    const res = http.put(URL, JSON.stringify(payload), requestConfigWithTag({ name: 'Update' }));
    const isSuccessfulUpdate = check(res, {
      'Update worked': () => res.status === 200,
      'Updated stars number is correct': () => res.json('stars') === 5,
    });

    if (!isSuccessfulUpdate) {
      console.log(`Unable to update the rating ${res.status} ${res.body}`);
      return;
    }
  });

  group('04. Delete the rating', () => {
    const delRes = http.del(URL, null, requestConfigWithTag({ name: 'Delete' }));

    const isSuccessfulDelete = check(null, {
      'Rating was deleted correctly': () => delRes.status === 204,
    });

    if (!isSuccessfulDelete) {
      console.log('Rating was not deleted properly');
      return;
    }
  });
}
```

{{< /code >}}

## httpx and k6chaijs example

{{< code >}}

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';
import {
  randomIntBetween,
  randomItem,
  randomString,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  // for the example, let's run only 1 VU with 1 iteration
  vus: 1,
  iterations: 1,
};

const USERNAME = `user${randomIntBetween(1, 100000)}@example.com`; // Set your own email;
const PASSWORD = 'secret';

const session = new Httpx({ baseURL: 'https://quickpizza.grafana.com' });

// Register a new user and retrieve authentication token for subsequent API requests
export function setup() {
  let authToken = null;

  describe(`setup - create a test user ${USERNAME}`, () => {
    const resp = session.post(
      `/api/users`,
      JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
      })
    );

    expect(resp.status, 'User create status').to.equal(201);
    expect(resp, 'User create valid json response').to.have.validJsonBody();
  });

  describe(`setup - Authenticate the new user ${USERNAME}`, () => {
    const resp = session.post(
      `/api/users/token/login`,
      JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
      })
    );

    expect(resp.status, 'Authenticate status').to.equal(200);
    expect(resp, 'Authenticate valid json response').to.have.validJsonBody();
    authToken = resp.json('token');
    expect(authToken, 'Authentication token').to.be.a('string');
  });

  return authToken;
}

export default function (authToken) {
  // set the authorization header on the session for the subsequent requests
  session.addHeader('Authorization', `Bearer ${authToken}`);

  describe('01. Create a new rating', (t) => {
    const payload = {
      stars: 2,
      pizza_id: 1, // Pizza ID 1 already exists in the database
    };

    session.addTag('name', 'Create');
    const resp = session.post(`/api/ratings`, JSON.stringify(payload));

    expect(resp.status, 'Rating creation status').to.equal(201);
    expect(resp, 'Rating creation valid json response').to.have.validJsonBody();

    session.newRatingId = resp.json('id');
  });

  describe('02. Fetch my ratings', (t) => {
    session.clearTag('name');
    const resp = session.get('/api/ratings');

    expect(resp.status, 'Fetch ratings status').to.equal(200);
    expect(resp, 'Fetch ratings valid json response').to.have.validJsonBody();
    expect(resp.json('ratings').length, 'Number of ratings').to.be.above(0);
  });

  describe('03. Update the rating', (t) => {
    const payload = {
      stars: 5,
    };

    const resp = session.patch(`/api/ratings/${session.newRatingId}`, JSON.stringify(payload));

    expect(resp.status, 'Rating patch status').to.equal(200);
    expect(resp, 'Fetch rating valid json response').to.have.validJsonBody();
    expect(resp.json('stars'), 'Stars').to.equal(payload.stars);

    // read rating again to verify the update worked
    const resp1 = session.get(`/api/ratings/${session.newRatingId}`);

    expect(resp1.status, 'Fetch rating status').to.equal(200);
    expect(resp1, 'Fetch rating valid json response').to.have.validJsonBody();
    expect(resp1.json('stars'), 'Stars').to.equal(payload.stars);
  });

  describe('04. Delete the rating', (t) => {
    const resp = session.delete(`/api/ratings/${session.newRatingId}`);

    expect(resp.status, 'Rating delete status').to.equal(204);
  });
}
```

{{< /code >}}
