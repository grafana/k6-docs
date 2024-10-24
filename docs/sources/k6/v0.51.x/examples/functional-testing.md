---
title: 'Functional testing'
description: |
  Use Chaijs library for functional and integration testing.
weight: 19
---

# Functional testing

### Most basic integration test

{{< code >}}

<!-- eslint-skip -->

```javascript
import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export const options = {
  thresholds: {
    checks: ['rate == 1.00'],
  },
};

export default function () {
  describe('Hello world!', () => {
    const response = http.get('https://test-api.k6.io/public/crocodiles/');

    expect(response.status, 'response status').to.equal(200);
    expect(response).to.have.validJsonBody();
    expect(response.json(), 'croc list').to.be.an('array');
  });
}
```

{{< /code >}}

### Sample integration test

This test goes through several steps. It creates a new user account, authenticates, and interacts with protected resources.

{{< code >}}

<!-- eslint-skip -->

```javascript
import chai, { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { Httpx, Get } from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';

chai.config.logFailures = true;

export let options = {
  thresholds: {
    // fail the test if any checks fail or any requests fail
    checks: ['rate == 1.00'],
    http_req_failed: ['rate == 0.00'],
  },
  vus: 1,
  iterations: 1,
};

let session = new Httpx({ baseURL: 'https://test-api.k6.io' });

function retrieveIndividualCrocodilesInABatch() {
  describe('[Crocs service] Fetch public crocs one by one', () => {
    let responses = session.batch([
      new Get('/public/crocodiles/1/'),
      new Get('/public/crocodiles/2/'),
      new Get('/public/crocodiles/3/'),
    ]);

    expect(responses, 'responses').to.be.an('array');

    responses.forEach((response) => {
      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json(), 'crocodile').to.be.an('object');
      expect(response.json(), 'crocodile').to.include.keys('age', 'name', 'id', 'sex');
      expect(response.json(), 'crocodile').to.not.have.a.property('outfit');
    });
  });
}

function retrieveAllPublicCrocodiles() {
  describe('[Crocs service] Fetch a list of crocs', () => {
    let response = session.get('/public/crocodiles');

    expect(response.status, 'response status').to.equal(200);
    expect(response).to.have.validJsonBody();
    expect(response.json(), 'croc list').to.be.an('array').lengthOf.above(5);
  });
}

function validateAuthService() {
  const USERNAME = `${randomString(10)}@example.com`;
  const PASSWORD = 'superCroc2021';

  describe('[Registration service] user registration', () => {
    let sampleUser = {
      username: USERNAME,
      password: PASSWORD,
      email: USERNAME,
      first_name: 'John',
      last_name: 'Smith',
    };

    let response = session.post(`/user/register/`, sampleUser);

    expect(response.status, 'registration status').to.equal(201);
    expect(response).to.have.validJsonBody();
  });

  describe('[Auth service] user authentication', () => {
    let authData = {
      username: USERNAME,
      password: PASSWORD,
    };

    let resp = session.post(`/auth/token/login/`, authData);

    expect(resp.status, 'Auth status').to.be.within(200, 204);
    expect(resp).to.have.validJsonBody();
    expect(resp.json()).to.have.a.property('access');
    expect(resp.json('access'), 'auth token').to.be.a('string');

    let authToken = resp.json('access');
    // set the authorization header on the session for the subsequent requests.
    session.addHeader('Authorization', `Bearer ${authToken}`);
  });
}

function validateCrocodileCreation() {
  // authentication happened before this call.

  describe('[Croc service] Create a new crocodile', () => {
    let payload = {
      name: `Croc Name`,
      sex: 'M',
      date_of_birth: '2019-01-01',
    };

    let resp = session.post(`/my/crocodiles/`, payload);

    expect(resp.status, 'Croc creation status').to.equal(201);
    expect(resp).to.have.validJsonBody();

    session.newCrocId = resp.json('id'); // caching croc ID for the future.
  });

  describe('[Croc service] Fetch private crocs', () => {
    let response = session.get('/my/crocodiles/');

    expect(response.status, 'response status').to.equal(200);
    expect(response, 'private crocs').to.have.validJsonBody();
    expect(response.json(), 'private crocs').to.not.be.empty;
  });
}

export default function testSuite() {
  retrieveIndividualCrocodilesInABatch();
  retrieveAllPublicCrocodiles();
  validateAuthService();
  validateCrocodileCreation();
}
```

{{< /code >}}

### Full example showcasing all functionality

Here's an auto-generated k6 test script showcasing all examples from the [Chaijs API documentation](https://www.chaijs.com/api/bdd/).

{{< code >}}

<!-- eslint-skip -->

```javascript
import { describe, expect, chai } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

chai.config.aggregateChecks = false;
chai.config.logFailures = true;

export default function testSuite() {
  describe('docs example 0', () => {
    expect(function () {}).to.not.throw();
    expect({ a: 1 }).to.not.have.property('b');
    expect([1, 2]).to.be.an('array').that.does.not.include(3);
  });

  describe('docs example 1', () => {
    expect(2).to.equal(2); // Recommended
    expect(2).to.not.equal(1); // Not recommended
  });

  describe('docs example 2', () => {
    // Target object deeply (but not strictly) equals `{a: 1}`
    expect({ a: 1 }).to.deep.equal({ a: 1 });
    expect({ a: 1 }).to.not.equal({ a: 1 });

    // Target array deeply (but not strictly) includes `{a: 1}`
    expect([{ a: 1 }]).to.deep.include({ a: 1 });
    expect([{ a: 1 }]).to.not.include({ a: 1 });

    // Target object deeply (but not strictly) includes `x: {a: 1}`
    expect({ x: { a: 1 } }).to.deep.include({ x: { a: 1 } });
    expect({ x: { a: 1 } }).to.not.include({ x: { a: 1 } });

    // Target array deeply (but not strictly) has member `{a: 1}`
    expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }]);
    expect([{ a: 1 }]).to.not.have.members([{ a: 1 }]);

    // Target set deeply (but not strictly) has key `{a: 1}`
    expect(new Set([{ a: 1 }])).to.have.deep.keys([{ a: 1 }]);
    expect(new Set([{ a: 1 }])).to.not.have.keys([{ a: 1 }]);

    // Target object deeply (but not strictly) has property `x: {a: 1}`
    expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 });
    expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 });
  });

  describe('docs example 3', () => {
    expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]');
    expect({ a: { b: ['x', 'y'] } }).to.nested.include({ 'a.b[1]': 'y' });
  });

  describe('docs example 4', () => {
    expect({ '.a': { '[b]': 'x' } }).to.have.nested.property('\\.a.\\[b\\]');
    expect({ '.a': { '[b]': 'x' } }).to.nested.include({ '\\.a.\\[b\\]': 'x' });
  });

  describe('docs example 5', () => {
    Object.prototype.b = 2;

    expect({ a: 1 }).to.have.own.property('a');
    expect({ a: 1 }).to.have.property('b');
    expect({ a: 1 }).to.not.have.own.property('b');

    expect({ a: 1 }).to.own.include({ a: 1 });
    expect({ a: 1 }).to.include({ b: 2 }).but.not.own.include({ b: 2 });
  });

  describe('docs example 6', () => {
    expect([1, 2]).to.have.ordered.members([1, 2]).but.not.have.ordered.members([2, 1]);
  });

  describe('docs example 7', () => {
    expect([1, 2, 3]).to.include.ordered.members([1, 2]).but.not.include.ordered.members([2, 3]);
  });

  describe('docs example 8', () => {
    expect({ a: 1, b: 2 }).to.not.have.any.keys('c', 'd');
  });

  describe('docs example 9', () => {
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');
  });

  describe('docs example 10', () => {
    expect('foo').to.be.a('string');
    expect({ a: 1 }).to.be.an('object');
    expect(null).to.be.a('null');
    expect(undefined).to.be.an('undefined');
    expect(new Error()).to.be.an('error');
    expect(Promise.resolve()).to.be.a('promise');
    expect(new Float32Array()).to.be.a('float32array');
    expect(Symbol()).to.be.a('symbol');
  });

  describe('docs example 11', () => {
    var myObj = {
      [Symbol.toStringTag]: 'myCustomType',
    };

    expect(myObj).to.be.a('myCustomType').but.not.an('object');
  });

  describe('docs example 12', () => {
    expect([1, 2, 3]).to.be.an('array').that.includes(2);
    expect([]).to.be.an('array').that.is.empty;
  });

  describe('docs example 13', () => {
    expect('foo').to.be.a('string'); // Recommended
    expect('foo').to.not.be.an('array'); // Not recommended
  });

  describe('docs example 14', () => {
    expect(1).to.be.a('string', 'nooo why fail??');
    expect(1, 'nooo why fail??').to.be.a('string');
  });

  describe('docs example 15', () => {
    expect({ b: 2 }).to.have.a.property('b');
  });

  describe('docs example 16', () => {
    expect('foobar').to.include('foo');
  });

  describe('docs example 17', () => {
    expect([1, 2, 3]).to.include(2);
  });

  describe('docs example 18', () => {
    expect({ a: 1, b: 2, c: 3 }).to.include({ a: 1, b: 2 });
  });

  describe('docs example 19', () => {
    expect(new Set([1, 2])).to.include(2);
  });

  describe('docs example 20', () => {
    expect(
      new Map([
        ['a', 1],
        ['b', 2],
      ])
    ).to.include(2);
  });

  describe('docs example 21', () => {
    expect([1, 2, 3]).to.be.an('array').that.includes(2);
  });

  describe('docs example 22', () => {
    // Target array deeply (but not strictly) includes `{a: 1}`
    expect([{ a: 1 }]).to.deep.include({ a: 1 });
    expect([{ a: 1 }]).to.not.include({ a: 1 });

    // Target object deeply (but not strictly) includes `x: {a: 1}`
    expect({ x: { a: 1 } }).to.deep.include({ x: { a: 1 } });
    expect({ x: { a: 1 } }).to.not.include({ x: { a: 1 } });
  });

  describe('docs example 23', () => {
    Object.prototype.b = 2;

    expect({ a: 1 }).to.own.include({ a: 1 });
    expect({ a: 1 }).to.include({ b: 2 }).but.not.own.include({ b: 2 });
  });

  describe('docs example 24', () => {
    expect({ a: { b: 2 } }).to.deep.own.include({ a: { b: 2 } });
  });

  describe('docs example 25', () => {
    expect({ a: { b: ['x', 'y'] } }).to.nested.include({ 'a.b[1]': 'y' });
  });

  describe('docs example 26', () => {
    expect({ '.a': { '[b]': 2 } }).to.nested.include({ '\\.a.\\[b\\]': 2 });
  });

  describe('docs example 27', () => {
    expect({ a: { b: [{ c: 3 }] } }).to.deep.nested.include({ 'a.b[0]': { c: 3 } });
  });

  describe('docs example 28', () => {
    expect('foobar').to.not.include('taco');
    expect([1, 2, 3]).to.not.include(4);
  });

  describe('docs example 29', () => {
    expect({ c: 3 }).to.not.have.any.keys('a', 'b'); // Recommended
    expect({ c: 3 }).to.not.include({ a: 1, b: 2 }); // Not recommended
  });

  describe('docs example 30', () => {
    expect({ a: 3, b: 4 }).to.include({ a: 3, b: 4 }); // Recommended
    expect({ a: 3, b: 4 }).to.not.include({ a: 1, b: 2 }); // Not recommended
  });

  describe('docs example 31', () => {
    expect([1, 2, 3]).to.include(4, 'nooo why fail??');
    expect([1, 2, 3], 'nooo why fail??').to.include(4);
  });

  describe('docs example 32', () => {
    // Target object's keys are a superset of ['a', 'b'] but not identical
    expect({ a: 1, b: 2, c: 3 }).to.include.all.keys('a', 'b');
    expect({ a: 1, b: 2, c: 3 }).to.not.have.all.keys('a', 'b');

    // Target array is a superset of [1, 2] but not identical
    expect([1, 2, 3]).to.include.members([1, 2]);
    expect([1, 2, 3]).to.not.have.members([1, 2]);

    // Duplicates in the subset are ignored
    expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
  });

  describe('docs example 33', () => {
    // Both assertions are identical
    expect({ a: 1 }).to.include.any.keys('a', 'b');
    expect({ a: 1 }).to.have.any.keys('a', 'b');
  });

  describe('docs example 34', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.be.ok; // Not recommended

    expect(true).to.be.true; // Recommended
    expect(true).to.be.ok; // Not recommended
  });

  describe('docs example 35', () => {
    expect(0).to.equal(0); // Recommended
    expect(0).to.not.be.ok; // Not recommended

    expect(false).to.be.false; // Recommended
    expect(false).to.not.be.ok; // Not recommended

    expect(null).to.be.null; // Recommended
    expect(null).to.not.be.ok; // Not recommended

    expect(undefined).to.be.undefined; // Recommended
    expect(undefined).to.not.be.ok; // Not recommended
  });

  describe('docs example 36', () => {
    expect(false, 'nooo why fail??').to.be.ok;
  });

  describe('docs example 37', () => {
    expect(true).to.be.true;
  });

  describe('docs example 38', () => {
    expect(false).to.be.false; // Recommended
    expect(false).to.not.be.true; // Not recommended

    expect(1).to.equal(1); // Recommended
    expect(1).to.not.be.true; // Not recommended
  });

  describe('docs example 39', () => {
    expect(false, 'nooo why fail??').to.be.true;
  });

  describe('docs example 40', () => {
    expect(false).to.be.false;
  });

  describe('docs example 41', () => {
    expect(true).to.be.true; // Recommended
    expect(true).to.not.be.false; // Not recommended

    expect(1).to.equal(1); // Recommended
    expect(1).to.not.be.false; // Not recommended
  });

  describe('docs example 42', () => {
    expect(true, 'nooo why fail??').to.be.false;
  });

  describe('docs example 43', () => {
    expect(null).to.be.null;
  });

  describe('docs example 44', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.not.be.null; // Not recommended
  });

  describe('docs example 45', () => {
    expect(42, 'nooo why fail??').to.be.null;
  });

  describe('docs example 46', () => {
    expect(undefined).to.be.undefined;
  });

  describe('docs example 47', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.not.be.undefined; // Not recommended
  });

  describe('docs example 48', () => {
    expect(42, 'nooo why fail??').to.be.undefined;
  });

  describe('docs example 49', () => {
    expect(NaN).to.be.NaN;
  });

  describe('docs example 50', () => {
    expect('foo').to.equal('foo'); // Recommended
    expect('foo').to.not.be.NaN; // Not recommended
  });

  describe('docs example 51', () => {
    expect(42, 'nooo why fail??').to.be.NaN;
  });

  describe('docs example 52', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.exist; // Not recommended

    expect(0).to.equal(0); // Recommended
    expect(0).to.exist; // Not recommended
  });

  describe('docs example 53', () => {
    expect(null).to.be.null; // Recommended
    expect(null).to.not.exist; // Not recommended

    expect(undefined).to.be.undefined; // Recommended
    expect(undefined).to.not.exist; // Not recommended
  });

  describe('docs example 54', () => {
    expect(null, 'nooo why fail??').to.exist;
  });

  describe('docs example 55', () => {
    expect([]).to.be.empty;
    expect('').to.be.empty;
  });

  describe('docs example 56', () => {
    expect(new Set()).to.be.empty;
    expect(new Map()).to.be.empty;
  });

  describe('docs example 57', () => {
    expect({}).to.be.empty;
  });

  describe('docs example 58', () => {
    expect([]).to.be.an('array').that.is.empty;
  });

  describe('docs example 59', () => {
    expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
    expect([1, 2, 3]).to.not.be.empty; // Not recommended

    expect(new Set([1, 2, 3])).to.have.property('size', 3); // Recommended
    expect(new Set([1, 2, 3])).to.not.be.empty; // Not recommended

    expect(Object.keys({ a: 1 })).to.have.lengthOf(1); // Recommended
    expect({ a: 1 }).to.not.be.empty; // Not recommended
  });

  describe('docs example 60', () => {
    expect([1, 2, 3], 'nooo why fail??').to.be.empty;
  });

  describe('docs example 61', () => {
    function test() {
      expect(arguments).to.be.arguments;
    }

    test();
  });

  describe('docs example 62', () => {
    expect('foo').to.be.a('string'); // Recommended
    expect('foo').to.not.be.arguments; // Not recommended
  });

  describe('docs example 63', () => {
    expect({}, 'nooo why fail??').to.be.arguments;
  });

  describe('docs example 64', () => {
    expect(1).to.equal(1);
    expect('foo').to.equal('foo');
  });

  describe('docs example 65', () => {
    // Target object deeply (but not strictly) equals `{a: 1}`
    expect({ a: 1 }).to.deep.equal({ a: 1 });
    expect({ a: 1 }).to.not.equal({ a: 1 });

    // Target array deeply (but not strictly) equals `[1, 2]`
    expect([1, 2]).to.deep.equal([1, 2]);
    expect([1, 2]).to.not.equal([1, 2]);
  });

  describe('docs example 66', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.not.equal(2); // Not recommended
  });

  describe('docs example 67', () => {
    expect(1).to.equal(2, 'nooo why fail??');
    expect(1, 'nooo why fail??').to.equal(2);
  });

  describe('docs example 68', () => {
    // Target object is deeply (but not strictly) equal to {a: 1}
    expect({ a: 1 }).to.eql({ a: 1 }).but.not.equal({ a: 1 });

    // Target array is deeply (but not strictly) equal to [1, 2]
    expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
  });

  describe('docs example 69', () => {
    expect({ a: 1 }).to.eql({ a: 1 }); // Recommended
    expect({ a: 1 }).to.not.eql({ b: 2 }); // Not recommended
  });

  describe('docs example 70', () => {
    expect({ a: 1 }).to.eql({ b: 2 }, 'nooo why fail??');
    expect({ a: 1 }, 'nooo why fail??').to.eql({ b: 2 });
  });

  describe('docs example 71', () => {
    expect(2).to.equal(2); // Recommended
    expect(2).to.be.above(1); // Not recommended
  });

  describe('docs example 72', () => {
    expect('foo').to.have.lengthOf(3); // Recommended
    expect('foo').to.have.lengthOf.above(2); // Not recommended

    expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
    expect([1, 2, 3]).to.have.lengthOf.above(2); // Not recommended
  });

  describe('docs example 73', () => {
    expect(2).to.equal(2); // Recommended
    expect(1).to.not.be.above(2); // Not recommended
  });

  describe('docs example 74', () => {
    expect(1).to.be.above(2, 'nooo why fail??');
    expect(1, 'nooo why fail??').to.be.above(2);
  });

  describe('docs example 75', () => {
    expect(2).to.equal(2); // Recommended
    expect(2).to.be.at.least(1); // Not recommended
    expect(2).to.be.at.least(2); // Not recommended
  });

  describe('docs example 76', () => {
    expect('foo').to.have.lengthOf(3); // Recommended
    expect('foo').to.have.lengthOf.at.least(2); // Not recommended

    expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
    expect([1, 2, 3]).to.have.lengthOf.at.least(2); // Not recommended
  });

  describe('docs example 77', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.not.be.at.least(2); // Not recommended
  });

  describe('docs example 78', () => {
    expect(1).to.be.at.least(2, 'nooo why fail??');
    expect(1, 'nooo why fail??').to.be.at.least(2);
  });

  describe('docs example 79', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.be.below(2); // Not recommended
  });

  describe('docs example 80', () => {
    expect('foo').to.have.lengthOf(3); // Recommended
    expect('foo').to.have.lengthOf.below(4); // Not recommended

    expect([1, 2, 3]).to.have.length(3); // Recommended
    expect([1, 2, 3]).to.have.lengthOf.below(4); // Not recommended
  });

  describe('docs example 81', () => {
    expect(2).to.equal(2); // Recommended
    expect(2).to.not.be.below(1); // Not recommended
  });

  describe('docs example 82', () => {
    expect(2).to.be.below(1, 'nooo why fail??');
    expect(2, 'nooo why fail??').to.be.below(1);
  });

  describe('docs example 83', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.be.at.most(2); // Not recommended
    expect(1).to.be.at.most(1); // Not recommended
  });

  describe('docs example 84', () => {
    expect('foo').to.have.lengthOf(3); // Recommended
    expect('foo').to.have.lengthOf.at.most(4); // Not recommended

    expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
    expect([1, 2, 3]).to.have.lengthOf.at.most(4); // Not recommended
  });

  describe('docs example 85', () => {
    expect(2).to.equal(2); // Recommended
    expect(2).to.not.be.at.most(1); // Not recommended
  });

  describe('docs example 86', () => {
    expect(2).to.be.at.most(1, 'nooo why fail??');
    expect(2, 'nooo why fail??').to.be.at.most(1);
  });

  describe('docs example 87', () => {
    expect(2).to.equal(2); // Recommended
    expect(2).to.be.within(1, 3); // Not recommended
    expect(2).to.be.within(2, 3); // Not recommended
    expect(2).to.be.within(1, 2); // Not recommended
  });

  describe('docs example 88', () => {
    expect('foo').to.have.lengthOf.within(2, 4); // Not recommended

    expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
    expect([1, 2, 3]).to.have.lengthOf.within(2, 4); // Not recommended
  });

  describe('docs example 89', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.not.be.within(2, 4); // Not recommended
  });

  describe('docs example 90', () => {
    expect(4).to.be.within(1, 3, 'nooo why fail??');
    expect(4, 'nooo why fail??').to.be.within(1, 3);
  });

  describe('docs example 91', () => {
    function Cat() {}

    expect(new Cat()).to.be.an.instanceof(Cat);
    expect([1, 2]).to.be.an.instanceof(Array);
  });

  describe('docs example 92', () => {
    expect({ a: 1 }).to.not.be.an.instanceof(Array);
  });

  describe('docs example 93', () => {
    expect(1).to.be.an.instanceof(Array, 'nooo why fail??');
    expect(1, 'nooo why fail??').to.be.an.instanceof(Array);
  });

  describe('docs example 94', () => {
    expect({ a: 1 }).to.have.property('a');
  });

  describe('docs example 95', () => {
    expect({ a: 1 }).to.have.property('a', 1);
  });

  describe('docs example 96', () => {
    // Target object deeply (but not strictly) has property `x: {a: 1}`
    expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 });
    expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 });
  });

  describe('docs example 97', () => {
    Object.prototype.b = 2;

    expect({ a: 1 }).to.have.own.property('a');
    expect({ a: 1 }).to.have.own.property('a', 1);
    expect({ a: 1 }).to.have.property('b');
    expect({ a: 1 }).to.not.have.own.property('b');
  });

  describe('docs example 98', () => {
    expect({ x: { a: 1 } }).to.have.deep.own.property('x', { a: 1 });
  });

  describe('docs example 99', () => {
    expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]');
    expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]', 'y');
  });

  describe('docs example 100', () => {
    expect({ '.a': { '[b]': 'x' } }).to.have.nested.property('\\.a.\\[b\\]');
  });

  describe('docs example 101', () => {
    expect({ a: { b: [{ c: 3 }] } }).to.have.deep.nested.property('a.b[0]', { c: 3 });
  });

  describe('docs example 102', () => {
    expect({ a: 1 }).to.not.have.property('b');
  });

  describe('docs example 103', () => {
    expect({ b: 2 }).to.not.have.property('a'); // Recommended
    expect({ b: 2 }).to.not.have.property('a', 1); // Not recommended
  });

  describe('docs example 104', () => {
    expect({ a: 3 }).to.have.property('a', 3); // Recommended
    expect({ a: 3 }).to.not.have.property('a', 1); // Not recommended
  });

  describe('docs example 105', () => {
    expect({ a: 1 }).to.have.property('a').that.is.a('number');
  });

  describe('docs example 106', () => {
    // Recommended
    expect({ a: 1 }).to.have.property('a', 2, 'nooo why fail??');
    expect({ a: 1 }, 'nooo why fail??').to.have.property('a', 2);
    expect({ a: 1 }, 'nooo why fail??').to.have.property('b');

    // Not recommended
    expect({ a: 1 }).to.have.property('b', undefined, 'nooo why fail??');
  });

  describe('docs example 107', () => {
    expect({ a: 1 }).to.have.ownPropertyDescriptor('a');
  });

  describe('docs example 108', () => {
    expect({ a: 1 }).to.have.ownPropertyDescriptor('a', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1,
    });
  });

  describe('docs example 109', () => {
    expect({ a: 1 }).to.not.have.ownPropertyDescriptor('b');
  });

  describe('docs example 110', () => {
    // Recommended
    expect({ b: 2 }).to.not.have.ownPropertyDescriptor('a');

    // Not recommended
    expect({ b: 2 }).to.not.have.ownPropertyDescriptor('a', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1,
    });
  });

  describe('docs example 111', () => {
    // Recommended
    expect({ a: 3 }).to.have.ownPropertyDescriptor('a', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 3,
    });

    // Not recommended
    expect({ a: 3 }).to.not.have.ownPropertyDescriptor('a', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1,
    });
  });

  describe('docs example 112', () => {
    expect({ a: 1 }).to.have.ownPropertyDescriptor('a').that.has.property('enumerable', true);
  });

  describe('docs example 113', () => {
    // Recommended
    expect({ a: 1 }).to.have.ownPropertyDescriptor(
      'a',
      {
        configurable: true,
        enumerable: true,
        writable: true,
        value: 2,
      },
      'nooo why fail??'
    );

    // Recommended
    expect({ a: 1 }, 'nooo why fail??').to.have.ownPropertyDescriptor('a', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 2,
    });

    // Recommended
    expect({ a: 1 }, 'nooo why fail??').to.have.ownPropertyDescriptor('b');

    // Not recommended
    expect({ a: 1 }).to.have.ownPropertyDescriptor('b', undefined, 'nooo why fail??');
  });

  describe('docs example 114', () => {
    expect([1, 2, 3]).to.have.lengthOf(3);
    expect('foo').to.have.lengthOf(3);
    expect(new Set([1, 2, 3])).to.have.lengthOf(3);
    expect(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    ).to.have.lengthOf(3);
  });

  describe('docs example 115', () => {
    expect('foo').to.have.lengthOf(3); // Recommended
    expect('foo').to.not.have.lengthOf(4); // Not recommended
  });

  describe('docs example 116', () => {
    expect([1, 2, 3]).to.have.lengthOf(2, 'nooo why fail??');
    expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(2);
  });

  describe('docs example 117', () => {
    // Recommended
    expect([1, 2, 3]).to.have.lengthOf(3);

    // Not recommended
    expect([1, 2, 3]).to.have.lengthOf.above(2);
    expect([1, 2, 3]).to.have.lengthOf.below(4);
    expect([1, 2, 3]).to.have.lengthOf.at.least(3);
    expect([1, 2, 3]).to.have.lengthOf.at.most(3);
    expect([1, 2, 3]).to.have.lengthOf.within(2, 4);
  });

  describe('docs example 118', () => {
    expect([1, 2, 3]).to.have.a.length(3); // incompatible; throws error
    expect([1, 2, 3]).to.have.a.lengthOf(3); // passes as expected
  });

  describe('docs example 119', () => {
    expect('foobar').to.match(/^foo/);
  });

  describe('docs example 120', () => {
    expect('foobar').to.not.match(/taco/);
  });

  describe('docs example 121', () => {
    expect('foobar').to.match(/taco/, 'nooo why fail??');
    expect('foobar', 'nooo why fail??').to.match(/taco/);
  });

  describe('docs example 122', () => {
    expect('foobar').to.have.string('bar');
  });

  describe('docs example 123', () => {
    expect('foobar').to.not.have.string('taco');
  });

  describe('docs example 124', () => {
    expect('foobar').to.have.string('taco', 'nooo why fail??');
    expect('foobar', 'nooo why fail??').to.have.string('taco');
  });

  describe('docs example 125', () => {
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');
    expect(['x', 'y']).to.have.all.keys(0, 1);

    expect({ a: 1, b: 2 }).to.have.all.keys(['a', 'b']);
    expect(['x', 'y']).to.have.all.keys([0, 1]);

    expect({ a: 1, b: 2 }).to.have.all.keys({ a: 4, b: 5 }); // ignore 4 and 5
    expect(['x', 'y']).to.have.all.keys({ 0: 4, 1: 5 }); // ignore 4 and 5
  });

  describe('docs example 126', () => {
    expect(
      new Map([
        ['a', 1],
        ['b', 2],
      ])
    ).to.have.all.keys('a', 'b');
    expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
  });

  describe('docs example 127', () => {
    expect({ a: 1, b: 2 }).to.be.an('object').that.has.all.keys('a', 'b');
  });

  describe('docs example 128', () => {
    // Target set deeply (but not strictly) has key `{a: 1}`
    expect(new Set([{ a: 1 }])).to.have.all.deep.keys([{ a: 1 }]);
    expect(new Set([{ a: 1 }])).to.not.have.all.keys([{ a: 1 }]);
  });

  describe('docs example 129', () => {
    // Recommended; asserts that target doesn't have any of the given keys
    expect({ a: 1, b: 2 }).to.not.have.any.keys('c', 'd');

    // Not recommended; asserts that target doesn't have all of the given
    // keys but may or may not have some of them
    expect({ a: 1, b: 2 }).to.not.have.all.keys('c', 'd');
  });

  describe('docs example 130', () => {
    // Recommended; asserts that target has all the given keys
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');

    // Not recommended; asserts that target has at least one of the given
    // keys but may or may not have more of them
    expect({ a: 1, b: 2 }).to.have.any.keys('a', 'b');
  });

  describe('docs example 131', () => {
    // Both assertions are identical
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b'); // Recommended
    expect({ a: 1, b: 2 }).to.have.keys('a', 'b'); // Not recommended
  });

  describe('docs example 132', () => {
    // Target object's keys are a superset of ['a', 'b'] but not identical
    expect({ a: 1, b: 2, c: 3 }).to.include.all.keys('a', 'b');
    expect({ a: 1, b: 2, c: 3 }).to.not.have.all.keys('a', 'b');
  });

  describe('docs example 133', () => {
    // Both assertions are identical
    expect({ a: 1 }).to.have.any.keys('a', 'b');
    expect({ a: 1 }).to.include.any.keys('a', 'b');
  });

  describe('docs example 134', () => {
    expect({ a: 1 }, 'nooo why fail??').to.have.key('b');
  });

  describe('docs example 135', () => {
    var badFn = function () {
      throw new TypeError('Illegal salmon!');
    };

    expect(badFn).to.throw();
  });

  describe('docs example 136', () => {
    var badFn = function () {
      throw new TypeError('Illegal salmon!');
    };

    expect(badFn).to.throw(TypeError);
  });

  describe('docs example 137', () => {
    var err = new TypeError('Illegal salmon!');
    var badFn = function () {
      throw err;
    };

    expect(badFn).to.throw(err);
  });

  describe('docs example 138', () => {
    var badFn = function () {
      throw new TypeError('Illegal salmon!');
    };

    expect(badFn).to.throw('salmon');
  });

  describe('docs example 139', () => {
    var badFn = function () {
      throw new TypeError('Illegal salmon!');
    };

    expect(badFn).to.throw(/salmon/);
  });

  describe('docs example 140', () => {
    var err = new TypeError('Illegal salmon!');
    var badFn = function () {
      throw err;
    };

    expect(badFn).to.throw(TypeError, 'salmon');
    expect(badFn).to.throw(TypeError, /salmon/);
    expect(badFn).to.throw(err, 'salmon');
    expect(badFn).to.throw(err, /salmon/);
  });

  describe('docs example 141', () => {
    var goodFn = function () {};

    expect(goodFn).to.not.throw();
  });

  describe('docs example 142', () => {
    var goodFn = function () {};

    expect(goodFn).to.not.throw(); // Recommended
    expect(goodFn).to.not.throw(ReferenceError, 'x'); // Not recommended
  });

  describe('docs example 143', () => {
    var badFn = function () {
      throw new TypeError('Illegal salmon!');
    };

    expect(badFn).to.throw(TypeError, 'salmon'); // Recommended
    expect(badFn).to.not.throw(ReferenceError, 'x'); // Not recommended
  });

  describe('docs example 144', () => {
    var err = new TypeError('Illegal salmon!');
    err.code = 42;
    var badFn = function () {
      throw err;
    };

    expect(badFn).to.throw(TypeError).with.property('code', 42);
  });

  describe('docs example 145', () => {
    var goodFn = function () {};

    expect(goodFn).to.throw(TypeError, 'x', 'nooo why fail??');
    expect(goodFn, 'nooo why fail??').to.throw();
  });

  describe('docs example 146', () => {
    var fn = function () {
      throw new TypeError('Illegal salmon!');
    };

    expect(fn).to.throw(); // Good! Tests `fn` as desired
    expect(fn()).to.throw(); // Bad! Tests result of `fn()`, not `fn`
  });

  describe('docs example 147', () => {
    expect(function () {
      fn(42);
    }).to.throw(); // Function expression
    expect(() => fn(42)).to.throw(); // ES6 arrow function
  });

  describe('docs example 148', () => {
    expect(function () {
      cat.meow();
    }).to.throw(); // Function expression
    expect(() => cat.meow()).to.throw(); // ES6 arrow function
    expect(cat.meow.bind(cat)).to.throw(); // Bind
  });

  describe('docs example 149', () => {
    function Cat() {}
    Cat.prototype.meow = function () {};

    expect(new Cat()).to.respondTo('meow');
  });

  describe('docs example 150', () => {
    function Cat() {}
    Cat.prototype.meow = function () {};

    expect(Cat).to.respondTo('meow');
  });

  describe('docs example 151', () => {
    function Cat() {}
    Cat.prototype.meow = function () {};
    Cat.hiss = function () {};

    expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
  });

  describe('docs example 152', () => {
    function Cat() {}
    Cat.prototype.meow = function () {};

    expect(new Cat()).to.be.an('object').that.respondsTo('meow');
  });

  describe('docs example 153', () => {
    function Dog() {}
    Dog.prototype.bark = function () {};

    expect(new Dog()).to.not.respondTo('meow');
  });

  describe('docs example 154', () => {
    expect({}).to.respondTo('meow', 'nooo why fail??');
    expect({}, 'nooo why fail??').to.respondTo('meow');
  });

  describe('docs example 155', () => {
    function Cat() {}
    Cat.prototype.meow = function () {};
    Cat.hiss = function () {};

    expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
  });

  describe('docs example 156', () => {
    expect(1).to.satisfy(function (num) {
      return num > 0;
    });
  });

  describe('docs example 157', () => {
    expect(1).to.not.satisfy(function (num) {
      return num > 2;
    });
  });

  describe('docs example 158', () => {
    expect(1).to.satisfy(function (num) {
      return num > 2;
    }, 'nooo why fail??');

    expect(1, 'nooo why fail??').to.satisfy(function (num) {
      return num > 2;
    });
  });

  describe('docs example 159', () => {
    // Recommended
    expect(1.5).to.equal(1.5);

    // Not recommended
    expect(1.5).to.be.closeTo(1, 0.5);
    expect(1.5).to.be.closeTo(2, 0.5);
    expect(1.5).to.be.closeTo(1, 1);
  });

  describe('docs example 160', () => {
    expect(1.5).to.equal(1.5); // Recommended
    expect(1.5).to.not.be.closeTo(3, 1); // Not recommended
  });

  describe('docs example 161', () => {
    expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
    expect(1.5, 'nooo why fail??').to.be.closeTo(3, 1);
  });

  describe('docs example 162', () => {
    expect([1, 2, 3]).to.have.members([2, 1, 3]);
    expect([1, 2, 2]).to.have.members([2, 1, 2]);
  });

  describe('docs example 163', () => {
    // Target array deeply (but not strictly) has member `{a: 1}`
    expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }]);
    expect([{ a: 1 }]).to.not.have.members([{ a: 1 }]);
  });

  describe('docs example 164', () => {
    expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
    expect([1, 2, 3]).to.have.members([2, 1, 3]).but.not.ordered.members([2, 1, 3]);
  });

  describe('docs example 165', () => {
    // Target array is a superset of [1, 2] but not identical
    expect([1, 2, 3]).to.include.members([1, 2]);
    expect([1, 2, 3]).to.not.have.members([1, 2]);

    // Duplicates in the subset are ignored
    expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
  });

  describe('docs example 166', () => {
    expect([{ a: 1 }, { b: 2 }, { c: 3 }])
      .to.include.deep.ordered.members([{ a: 1 }, { b: 2 }])
      .but.not.include.deep.ordered.members([{ b: 2 }, { c: 3 }]);
  });

  describe('docs example 167', () => {
    expect([1, 2]).to.not.include(3).and.not.include(4); // Recommended
    expect([1, 2]).to.not.have.members([3, 4]); // Not recommended
  });

  describe('docs example 168', () => {
    expect([1, 2]).to.have.members([1, 2, 3], 'nooo why fail??');
    expect([1, 2], 'nooo why fail??').to.have.members([1, 2, 3]);
  });

  describe('docs example 169', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.be.oneOf([1, 2, 3]); // Not recommended
  });

  describe('docs example 170', () => {
    expect(1).to.equal(1); // Recommended
    expect(1).to.not.be.oneOf([2, 3, 4]); // Not recommended
  });

  describe('docs example 171', () => {
    expect('Today is sunny').to.contain.oneOf(['sunny', 'cloudy']);
    expect('Today is rainy').to.not.contain.oneOf(['sunny', 'cloudy']);
    expect([1, 2, 3]).to.contain.oneOf([3, 4, 5]);
    expect([1, 2, 3]).to.not.contain.oneOf([4, 5, 6]);
  });

  describe('docs example 172', () => {
    expect(1).to.be.oneOf([2, 3, 4], 'nooo why fail??');
    expect(1, 'nooo why fail??').to.be.oneOf([2, 3, 4]);
  });

  describe('docs example 173', () => {
    var dots = '',
      addDot = function () {
        dots += '.';
      },
      getDots = function () {
        return dots;
      };

    // Recommended
    expect(getDots()).to.equal('');
    addDot();
    expect(getDots()).to.equal('.');

    // Not recommended
    expect(addDot).to.change(getDots);
  });

  describe('docs example 174', () => {
    var myObj = { dots: '' },
      addDot = function () {
        myObj.dots += '.';
      };

    // Recommended
    expect(myObj).to.have.property('dots', '');
    addDot();
    expect(myObj).to.have.property('dots', '.');

    // Not recommended
    expect(addDot).to.change(myObj, 'dots');
  });

  describe('docs example 175', () => {
    var dots = '',
      noop = function () {},
      getDots = function () {
        return dots;
      };

    expect(noop).to.not.change(getDots);

    var myObj = { dots: '' },
      noop = function () {};

    expect(noop).to.not.change(myObj, 'dots');
  });

  describe('docs example 176', () => {
    var myObj = { dots: '' },
      addDot = function () {
        myObj.dots += '.';
      };

    expect(addDot).to.not.change(myObj, 'dots', 'nooo why fail??');

    var dots = '',
      addDot = function () {
        dots += '.';
      },
      getDots = function () {
        return dots;
      };

    expect(addDot, 'nooo why fail??').to.not.change(getDots);
  });

  describe('docs example 177', () => {
    var myObj = { val: 1 },
      addTwo = function () {
        myObj.val += 2;
      },
      subtractTwo = function () {
        myObj.val -= 2;
      };

    expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
    expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended

    expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
    expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
  });

  describe('docs example 178', () => {
    var val = 1,
      addTwo = function () {
        val += 2;
      },
      getVal = function () {
        return val;
      };

    expect(addTwo).to.increase(getVal).by(2); // Recommended
    expect(addTwo).to.increase(getVal); // Not recommended
  });

  describe('docs example 179', () => {
    var myObj = { val: 1 },
      addTwo = function () {
        myObj.val += 2;
      };

    expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
    expect(addTwo).to.increase(myObj, 'val'); // Not recommended
  });

  describe('docs example 180', () => {
    var myObj = { val: 1 },
      subtractTwo = function () {
        myObj.val -= 2;
      };

    expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
    expect(subtractTwo).to.not.increase(myObj, 'val'); // Not recommended
  });

  describe('docs example 181', () => {
    var myObj = { val: 1 },
      noop = function () {};

    expect(noop).to.not.change(myObj, 'val'); // Recommended
    expect(noop).to.not.increase(myObj, 'val'); // Not recommended
  });

  describe('docs example 182', () => {
    var myObj = { val: 1 },
      noop = function () {};

    expect(noop).to.increase(myObj, 'val', 'nooo why fail??');

    var val = 1,
      noop = function () {},
      getVal = function () {
        return val;
      };

    expect(noop, 'nooo why fail??').to.increase(getVal);
  });

  describe('docs example 183', () => {
    var val = 1,
      subtractTwo = function () {
        val -= 2;
      },
      getVal = function () {
        return val;
      };

    expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
    expect(subtractTwo).to.decrease(getVal); // Not recommended
  });

  describe('docs example 184', () => {
    var myObj = { val: 1 },
      subtractTwo = function () {
        myObj.val -= 2;
      };

    expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
    expect(subtractTwo).to.decrease(myObj, 'val'); // Not recommended
  });

  describe('docs example 185', () => {
    var myObj = { val: 1 },
      addTwo = function () {
        myObj.val += 2;
      };

    expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
    expect(addTwo).to.not.decrease(myObj, 'val'); // Not recommended
  });

  describe('docs example 186', () => {
    var myObj = { val: 1 },
      noop = function () {};

    expect(noop).to.not.change(myObj, 'val'); // Recommended
    expect(noop).to.not.decrease(myObj, 'val'); // Not recommended
  });

  describe('docs example 187', () => {
    var myObj = { val: 1 },
      noop = function () {};

    expect(noop).to.decrease(myObj, 'val', 'nooo why fail??');

    var val = 1,
      noop = function () {},
      getVal = function () {
        return val;
      };

    expect(noop, 'nooo why fail??').to.decrease(getVal);
  });

  describe('docs example 188', () => {
    var myObj = { val: 1 },
      addTwo = function () {
        myObj.val += 2;
      };

    expect(addTwo).to.increase(myObj, 'val').by(2);
  });

  describe('docs example 189', () => {
    var myObj = { val: 1 },
      subtractTwo = function () {
        myObj.val -= 2;
      };

    expect(subtractTwo).to.decrease(myObj, 'val').by(2);
  });

  describe('docs example 190', () => {
    var myObj = { val: 1 },
      addTwo = function () {
        myObj.val += 2;
      },
      subtractTwo = function () {
        myObj.val -= 2;
      };

    expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
    expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended

    expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
    expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
  });

  describe('docs example 191', () => {
    var myObj = { val: 1 },
      addTwo = function () {
        myObj.val += 2;
      };

    // Recommended
    expect(addTwo).to.increase(myObj, 'val').by(2);

    // Not recommended
    expect(addTwo).to.increase(myObj, 'val').but.not.by(3);
  });

  describe('docs example 192', () => {
    var myObj = { val: 1 },
      addTwo = function () {
        myObj.val += 2;
      };

    expect(addTwo).to.increase(myObj, 'val').by(3, 'nooo why fail??');
    expect(addTwo, 'nooo why fail??').to.increase(myObj, 'val').by(3);
  });

  describe('docs example 193', () => {
    expect({ a: 1 }).to.be.extensible;
  });

  describe('docs example 194', () => {
    var nonExtensibleObject = Object.preventExtensions({}),
      sealedObject = Object.seal({}),
      frozenObject = Object.freeze({});

    expect(nonExtensibleObject).to.not.be.extensible;
    expect(sealedObject).to.not.be.extensible;
    expect(frozenObject).to.not.be.extensible;
    expect(1).to.not.be.extensible;
  });

  describe('docs example 195', () => {
    expect(1, 'nooo why fail??').to.be.extensible;
  });

  describe('docs example 196', () => {
    var sealedObject = Object.seal({});
    var frozenObject = Object.freeze({});

    expect(sealedObject).to.be.sealed;
    expect(frozenObject).to.be.sealed;
    expect(1).to.be.sealed;
  });

  describe('docs example 197', () => {
    expect({ a: 1 }).to.not.be.sealed;
  });

  describe('docs example 198', () => {
    expect({ a: 1 }, 'nooo why fail??').to.be.sealed;
  });

  describe('docs example 199', () => {
    var frozenObject = Object.freeze({});

    expect(frozenObject).to.be.frozen;
    expect(1).to.be.frozen;
  });

  describe('docs example 200', () => {
    expect({ a: 1 }).to.not.be.frozen;
  });

  describe('docs example 201', () => {
    expect({ a: 1 }, 'nooo why fail??').to.be.frozen;
  });

  describe('docs example 202', () => {
    expect(1).to.be.finite;
  });

  describe('docs example 203', () => {
    expect('foo').to.be.a('string'); // Recommended
    expect('foo').to.not.be.finite; // Not recommended
  });

  describe('docs example 204', () => {
    expect(NaN).to.be.NaN; // Recommended
    expect(NaN).to.not.be.finite; // Not recommended
  });

  describe('docs example 205', () => {
    expect(Infinity).to.equal(Infinity); // Recommended
    expect(Infinity).to.not.be.finite; // Not recommended
  });

  describe('docs example 206', () => {
    expect(-Infinity).to.equal(-Infinity); // Recommended
    expect(-Infinity).to.not.be.finite; // Not recommended
  });

  describe('docs example 207', () => {
    expect('foo', 'nooo why fail??').to.be.finite;
  });

  describe('docs example 208', () => {
    expect.fail();
    expect.fail('custom error message');
    expect.fail(1, 2);
    expect.fail(1, 2, 'custom error message');
    expect.fail(1, 2, 'custom error message', '>');
    expect.fail(1, 2, undefined, '>');
  });

  // describe('docs example 209', () => {
  //   should.fail();
  //   should.fail("custom error message");
  //   should.fail(1, 2);
  //   should.fail(1, 2, "custom error message");
  //   should.fail(1, 2, "custom error message", ">");
  //   should.fail(1, 2, undefined, ">");

  // });
}
```

{{< /code >}}
