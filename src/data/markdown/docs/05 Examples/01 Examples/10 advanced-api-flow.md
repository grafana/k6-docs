---
title: 'Advanced API flow'
excerpt: 'This example covers the usage of different k6 APIs for API load testing.'
---

<CodeGroup labels={["advanced-example.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  stages: [{ target: 70, duration: '30s' }],
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1500'],
    'http_req_duration{name:PublicCrocs}': ['avg<400'],
    'http_req_duration{name:Create}': ['avg<600', 'max<1000'],
  },
};

function randomString(length, charset = '') {
  if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
  let res = '';
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
}

const USERNAME = `${randomString(10)}@example.com`; // Set your own email or `${randomString(10)}@example.com`;
const PASSWORD = 'superCroc2019';
const BASE_URL = 'https://test-api.k6.io';

export function setup() {
  // register a new user and authenticate via a Bearer token.
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

  group('Public endpoints', () => {
    // call some public endpoints in a batch
    const responses = http.batch([
      ['GET', `${BASE_URL}/public/crocodiles/1/`, null, { tags: { name: 'PublicCrocs' } }],
      ['GET', `${BASE_URL}/public/crocodiles/2/`, null, { tags: { name: 'PublicCrocs' } }],
      ['GET', `${BASE_URL}/public/crocodiles/3/`, null, { tags: { name: 'PublicCrocs' } }],
      ['GET', `${BASE_URL}/public/crocodiles/4/`, null, { tags: { name: 'PublicCrocs' } }],
    ]);

    const ages = Object.values(responses).map((res) => res.json('age'));

    // Functional test: check that all the public crocodiles are older than 5
    check(ages, {
      'Crocs are older than 5 years of age': Math.min(...ages) > 5,
    });
  });

  group('Create and modify crocs', () => {
    let URL = `${BASE_URL}/my/crocodiles/`;

    group('Create crocs', () => {
      const payload = {
        name: `Name ${randomString(10)}`,
        sex: 'M',
        date_of_birth: '2001-01-01',
      };

      const res = http.post(URL, payload, requestConfigWithTag({ name: 'Create' }));

      if (check(res, { 'Croc created correctly': (r) => r.status === 201 })) {
        URL = `${URL}${res.json('id')}/`;
      } else {
        console.log(`Unable to create a Croc ${res.status} ${res.body}`);
        return;
      }
    });

    group('Update croc', () => {
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

    const delRes = http.del(URL, null, requestConfigWithTag({ name: 'Delete' }));

    const isSuccessfulDelete = check(null, {
      'Croc was deleted correctly': () => delRes.status === 204,
    });

    if (!isSuccessfulDelete) {
      console.log(`Croc was not deleted properly`);
      return;
    }
  });

  sleep(1);
};
```

</CodeGroup>
