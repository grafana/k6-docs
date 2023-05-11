---
title: 'API CRUD Operations'
excerpt: 'This example covers the usage of k6 to test a REST API CRUD operations.'
---

The example showcases the testing of CRUD operations on a REST API. 

CRUD refers to the basic operations in a database: Create, Read, Update, and Delete. We can map these operations to HTTP methods in REST APIs:

- _Create_: HTTP `POST` operation to create a new resource.
- _Read_: HTTP `GET` to retrieve a resource.
- _Update_: HTTP `PUT`or `PATCH` to change an existing resource.
- _Delete_: HTTP `DELETE` to remove a resource.

## Test steps

In the [setup() stage](/using-k6/test-lifecycle/#setup-and-teardown-stages) we create a user for the [k6 HTTP REST API](https://test-api.k6.io/). We then retrieve and return a bearer token to authenticate the next CRUD requests.

The steps implemented in the [VU stage](/using-k6/test-lifecycle/#the-vu-stage) are as follows:

1. _Create_ a new resource, a "croc".
2. _Read_ the list of "crocs".
3. _Update_ the name of the "croc" and _read_ the "croc" to confirm the update operation.
4. _Delete_ the "croc" resource.

<CodeGroup labels={["api-crud-operations.js"]} lineNumbers={[true]}>

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export let options = {
    thresholds: {
        checks: [{
            threshold: 'rate == 1.00', abortOnFail: true,
        }],
        'http_req_duration': ['p(90)<25000', 'p(95)<30000'],
        'http_req_duration{name:Create}': ['avg<15000', 'max<25000'],
    },
    // for the example, let's run only 1 VU with 1 iteration
    vus: 1,
    iterations: 1
};

const USERNAME = `user${randomIntBetween(1, 100000)}@example.com`;  // Set your own email;
const PASSWORD = 'superCroc2019';

let session = new Httpx({ baseURL: 'https://test-api.k6.io' });

// Create a random string of given length
function randomString(length, charset = '') {
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (length--) res += charset[(Math.random() * charset.length) | 0];
    return res;
}

// Authenticate user and retrieve authentication token for the API requests
export function setup() {

    let authToken = null;

    describe(`setup - create a test user ${USERNAME}`, () => {
        let resp = session.post(`/user/register/`, {
            first_name: 'Crocodile',
            last_name: 'Owner',
            username: USERNAME,
            password: PASSWORD,
        });

        expect(resp.status, 'User create status').to.equal(201);
        expect(resp).to.have.validJsonBody();
    });

    describe(`setup - Authenticate the new user ${USERNAME}`, () => {
        let resp = session.post(`/auth/token/login/`, {
            username: USERNAME,
            password: PASSWORD
        });

        expect(resp.status, 'Auth status').to.equal(200);
        expect(resp).to.have.validJsonBody();
        authToken = resp.json('access');
        expect(authToken, 'auth token').to.not.be.null;
    });

    return authToken;
}

export default function (authToken) {

    // set the authorization header on the session for the subsequent requests.
    session.addHeader('Authorization', `Bearer ${authToken}`);

    describe('01. Create a new crocodile', (t) => {
        let payload = {
            name: `Croc name ${randomString(10)}`,
            sex: randomItem(["M", "F"]),
            date_of_birth: '2023-05-11',
        };

        session.addTag('name', 'Create');
        let resp = session.post(`/my/crocodiles/`, payload);

        expect(resp.status, 'Croc creation status').to.equal(201);
        expect(resp).to.have.validJsonBody();

        session.newCrocId = resp.json('id');
    })

    describe('02. Fetch private crocs', (t) => {

        session.clearTag('name');
        let resp = session.get('/my/crocodiles/');

        expect(resp.status, 'Fetch croc status').to.equal(200);
        expect(resp).to.have.validJsonBody();
        expect(resp.json().length, 'number of crocs').to.be.above(0);
    })

    describe('03. Update the croc', (t) => {
        let payload = {
            name: `New croc name ${randomString(10)}`,
        };

        let resp = session.patch(`/my/crocodiles/${session.newCrocId}/`, payload);

        expect(resp.status, 'Croc patch status').to.equal(200);
        expect(resp).to.have.validJsonBody();
        expect(resp.json('name')).to.equal(payload.name);

        // read "croc" again to verify the update worked
        let resp1 = session.get(`/my/crocodiles/${session.newCrocId}/`);

        expect(resp1.status, 'Croc fetch status').to.equal(200);
        expect(resp1).to.have.validJsonBody();
        expect(resp1.json('name')).to.equal(payload.name);

    })

    describe('04. Delete the croc', (t) => {

        let resp = session.delete(`/my/crocodiles/${session.newCrocId}/`);

        expect(resp.status, 'Croc delete status').to.equal(204);
    });
}
```

</CodeGroup>
