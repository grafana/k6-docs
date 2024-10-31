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

In the [setup() stage](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle#setup-and-teardown-stages) we create a user for the [k6 HTTP REST API](https://test-api.k6.io/). We then retrieve and return a bearer token to authenticate the next CRUD requests.

The steps implemented in the [VU stage](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle#the-vu-stage) are as follows:

1. _Create_ a new resource, a "croc".
2. _Read_ the list of "crocs".
3. _Update_ the name of the "croc" and _read_ the "croc" to confirm the update operation.
4. _Delete_ the "croc" resource.

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
const PASSWORD = 'superCroc2019';

const BASE_URL = 'https://test-api.k6.io';

// Register a new user and retrieve authentication token for subsequent API requests
export function setup() {
  const res = http.post(`${BASE_URL}/user/register/`, {
    first_name: 'Crocodile',
    last_name: 'Owner',
    username: USERNAME,
    password: PASSWORD,
  });

  check(res, { 'created user': (r) => r.status === 201 });

  const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD,
  });

  const authToken = loginRes.json('access');
  check(authToken, { 'logged in successfully': () => authToken !== '' });

  return authToken;
}

export default (authToken) => {
  // set the authorization header on the session for the subsequent requests
  const requestConfigWithTag = (tag) => ({
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    tags: Object.assign(
      {},
      {
        name: 'PrivateCrocs',
      },
      tag
    ),
  });

  let URL = `${BASE_URL}/my/crocodiles/`;

  group('01. Create a new crocodile', () => {
    const payload = {
      name: `Name ${randomString(10)}`,
      sex: 'F',
      date_of_birth: '2023-05-11',
    };

    const res = http.post(URL, payload, requestConfigWithTag({ name: 'Create' }));

    if (check(res, { 'Croc created correctly': (r) => r.status === 201 })) {
      URL = `${URL}${res.json('id')}/`;
    } else {
      console.log(`Unable to create a Croc ${res.status} ${res.body}`);
      return;
    }
  });

  group('02. Fetch private crocs', () => {
    const res = http.get(`${BASE_URL}/my/crocodiles/`, requestConfigWithTag({ name: 'Fetch' }));
    check(res, { 'retrieved crocs status': (r) => r.status === 200 });
    check(res.json(), { 'retrieved crocs list': (r) => r.length > 0 });
  });

  group('03. Update the croc', () => {
    const payload = { name: 'New name' };
    const res = http.patch(URL, payload, requestConfigWithTag({ name: 'Update' }));
    const isSuccessfulUpdate = check(res, {
      'Update worked': () => res.status === 200,
      'Updated name is correct': () => res.json('name') === 'New name',
    });

    if (!isSuccessfulUpdate) {
      console.log(`Unable to update the croc ${res.status} ${res.body}`);
      return;
    }
  });

  group('04. Delete the croc', () => {
    const delRes = http.del(URL, null, requestConfigWithTag({ name: 'Delete' }));

    const isSuccessfulDelete = check(null, {
      'Croc was deleted correctly': () => delRes.status === 204,
    });

    if (!isSuccessfulDelete) {
      console.log(`Croc was not deleted properly`);
      return;
    }
  });
};
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
const PASSWORD = 'superCroc2019';

const session = new Httpx({ baseURL: 'https://test-api.k6.io' });

// Register a new user and retrieve authentication token for subsequent API requests
export function setup() {
  let authToken = null;

  describe(`setup - create a test user ${USERNAME}`, () => {
    const resp = session.post(`/user/register/`, {
      first_name: 'Crocodile',
      last_name: 'Owner',
      username: USERNAME,
      password: PASSWORD,
    });

    expect(resp.status, 'User create status').to.equal(201);
    expect(resp, 'User create valid json response').to.have.validJsonBody();
  });

  describe(`setup - Authenticate the new user ${USERNAME}`, () => {
    const resp = session.post(`/auth/token/login/`, {
      username: USERNAME,
      password: PASSWORD,
    });

    expect(resp.status, 'Authenticate status').to.equal(200);
    expect(resp, 'Authenticate valid json response').to.have.validJsonBody();
    authToken = resp.json('access');
    expect(authToken, 'Authentication token').to.be.a('string');
  });

  return authToken;
}

export default function (authToken) {
  // set the authorization header on the session for the subsequent requests
  session.addHeader('Authorization', `Bearer ${authToken}`);

  describe('01. Create a new crocodile', (t) => {
    const payload = {
      name: `Croc name ${randomString(10)}`,
      sex: randomItem(['M', 'F']),
      date_of_birth: '2023-05-11',
    };

    session.addTag('name', 'Create');
    const resp = session.post(`/my/crocodiles/`, payload);

    expect(resp.status, 'Croc creation status').to.equal(201);
    expect(resp, 'Croc creation valid json response').to.have.validJsonBody();

    session.newCrocId = resp.json('id');
  });

  describe('02. Fetch private crocs', (t) => {
    session.clearTag('name');
    const resp = session.get('/my/crocodiles/');

    expect(resp.status, 'Fetch croc status').to.equal(200);
    expect(resp, 'Fetch croc valid json response').to.have.validJsonBody();
    expect(resp.json().length, 'Number of crocs').to.be.above(0);
  });

  describe('03. Update the croc', (t) => {
    const payload = {
      name: `New croc name ${randomString(10)}`,
    };

    const resp = session.patch(`/my/crocodiles/${session.newCrocId}/`, payload);

    expect(resp.status, 'Croc patch status').to.equal(200);
    expect(resp, 'Fetch croc valid json response').to.have.validJsonBody();
    expect(resp.json('name'), 'Croc name').to.equal(payload.name);

    // read "croc" again to verify the update worked
    const resp1 = session.get(`/my/crocodiles/${session.newCrocId}/`);

    expect(resp1.status, 'Croc fetch status').to.equal(200);
    expect(resp1, 'Fetch croc valid json response').to.have.validJsonBody();
    expect(resp1.json('name'), 'Croc name').to.equal(payload.name);
  });

  describe('04. Delete the croc', (t) => {
    const resp = session.delete(`/my/crocodiles/${session.newCrocId}/`);

    expect(resp.status, 'Croc delete status').to.equal(204);
  });
}
```

{{< /code >}}
