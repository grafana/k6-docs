---
title: 'expect()'
description: 'BDD style to construct k6 assertions.'
weight: 34
---

# expect()

`expect` is a wrapper of [check](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) to provide BDD style of assertions in k6. It implements the [Chai Expect API](https://www.chaijs.com/api/bdd/):

<Glossary>

- [not](https://www.chaijs.com/api/bdd/#method_not)
- [deep](https://www.chaijs.com/api/bdd/#method_deep)
- [nested](https://www.chaijs.com/api/bdd/#method_nested)
- [own](https://www.chaijs.com/api/bdd/#method_own)
- [ordered](https://www.chaijs.com/api/bdd/#method_ordered)
- [any](https://www.chaijs.com/api/bdd/#method_any)
- [all](https://www.chaijs.com/api/bdd/#method_all)
- [a](https://www.chaijs.com/api/bdd/#method_a)
- [include](https://www.chaijs.com/api/bdd/#method_include)
- [ok](https://www.chaijs.com/api/bdd/#method_ok)
- [true](https://www.chaijs.com/api/bdd/#method_true)
- [false](https://www.chaijs.com/api/bdd/#method_false)
- [null](https://www.chaijs.com/api/bdd/#method_null)
- [undefined](https://www.chaijs.com/api/bdd/#method_undefined)
- [NaN](https://www.chaijs.com/api/bdd/#method_nan)
- [exist](https://www.chaijs.com/api/bdd/#method_exist)
- [empty](https://www.chaijs.com/api/bdd/#method_empty)
- [arguments](https://www.chaijs.com/api/bdd/#method_arguments)
- [equal](https://www.chaijs.com/api/bdd/#method_equal)
- [eql](https://www.chaijs.com/api/bdd/#method_eql)
- [above](https://www.chaijs.com/api/bdd/#method_above)
- [least](https://www.chaijs.com/api/bdd/#method_least)
- [below](https://www.chaijs.com/api/bdd/#method_below)
- [most](https://www.chaijs.com/api/bdd/#method_most)
- [within](https://www.chaijs.com/api/bdd/#method_within)
- [instanceof](https://www.chaijs.com/api/bdd/#method_instanceof)
- [property](https://www.chaijs.com/api/bdd/#method_property)
- [ownPropertyDescriptor](https://www.chaijs.com/api/bdd/#method_ownpropertydescriptor)
- [lengthOf](https://www.chaijs.com/api/bdd/#method_lengthOf)
- [match](https://www.chaijs.com/api/bdd/#method_match)
- [string](https://www.chaijs.com/api/bdd/#method_string)
- [keys](https://www.chaijs.com/api/bdd/#method_keys)
- [throw](https://www.chaijs.com/api/bdd/#method_throw)
- [respondTo](https://www.chaijs.com/api/bdd/#method_respondto)
- [itself](https://www.chaijs.com/api/bdd/#method_itself)
- [satisfy](https://www.chaijs.com/api/bdd/#method_satisfy)
- [closeTo](https://www.chaijs.com/api/bdd/#method_closeto)
- [members](https://www.chaijs.com/api/bdd/#method_members)
- [oneOf](https://www.chaijs.com/api/bdd/#method_oneOf)
- [change](https://www.chaijs.com/api/bdd/#method_change)
- [increase](https://www.chaijs.com/api/bdd/#method_increase)
- [decrease](https://www.chaijs.com/api/bdd/#method_decrease)
- [by](https://www.chaijs.com/api/bdd/#method_by)
- [extensible](https://www.chaijs.com/api/bdd/#method_extensible)
- [sealed](https://www.chaijs.com/api/bdd/#method_sealed)
- [frozen](https://www.chaijs.com/api/bdd/#method_frozen)
- [finite](https://www.chaijs.com/api/bdd/#method_finite)

</Glossary>

{{< code >}}

<!-- eslint-skip -->

```javascript
import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export default function () {
  describe('Basic test', () => {
    expect({ a: 1 }).to.not.have.property('b');
    expect(2).to.equal(2);
    expect({ a: 1 }).to.deep.equal({ a: 1 });
    expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]');
    expect({ a: 1 }).to.have.own.property('a');
    expect([1, 2]).to.have.ordered.members([1, 2]).but.not.have.ordered.members([2, 1]);
    expect({ a: 1, b: 2 }).to.not.have.any.keys('c', 'd');
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');
    expect('foo').to.be.a('string');
    expect([1, 2, 3]).to.be.an('array').that.includes(2);
    expect('foobar').to.include('foo');
    expect(1).to.equal(1);
    expect(true).to.be.true;
    expect(false).to.be.false;
    expect(null).to.be.null;
    expect(undefined).to.be.undefined;
    expect(NaN).to.be.NaN;
    expect(1).to.equal(1);
    expect([]).to.be.empty;
    expect({}).not.to.be.arguments;
    expect(1).to.equal(1);
    expect({ a: 1 }).to.eql({ a: 1 }).but.not.equal({ a: 1 });
    expect('foo').to.have.lengthOf(3);
    expect(2).to.equal(2);
    expect(1).to.equal(1);
    expect(2).to.be.at.most(3);
    expect(2).to.equal(2);
    expect({ a: 1 }).to.not.be.an.instanceof(Array);
    expect({ a: 1 }).to.have.property('a');
    expect([1, 2, 3]).to.have.lengthOf(3);
    expect('foobar').to.match(/^foo/);
    expect('foobar').to.have.string('bar');
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');
    const badFn = function () {
      throw new TypeError('Illegal salmon!');
    };
    expect(badFn).to.throw();
    expect(1).to.satisfy(function (num) {
      return num > 0;
    });
    expect(1.5).to.equal(1.5);
    expect([1, 2, 3]).to.have.members([2, 1, 3]);
    expect('Today is sunny').to.contain.oneOf(['sunny', 'cloudy']);
    expect({ a: 1 }).to.be.extensible;
    expect(1).to.be.finite;
  });
}
```

{{< /code >}}

When you run this test with `k6 run script.js`, the output at the end of the test shows:

```bash
default ✓ [======================================] 1 VUs  00m00.0s/10m0s  1/1 iters, 1 per VU

     █ Basic test

       ✓ expected ${this} to not have property 'b'
       ✓ expected ${this} to equal 2
       ✓ expected ${this} to deeply equal { a: 1 }
       ✓ expected ${this} to have nested property 'a.b[1]'
       ✓ expected ${this} to have own property 'a'
       ✓ expected ${this} to be an array
       ✓ expected ${this} to have the same ordered members as [ 1, 2 ]
       ✓ expected ${this} to not have the same ordered members as [ 2, 1 ]
       ✓ expected ${this} to not have keys 'c', or 'd'
       ✓ expected ${this} to have keys 'a', and 'b'
       ✓ expected ${this} to be a string
       ✓ expected ${this} to include 2
       ✓ expected ${this} to include 'foo'
       ✓ expected ${this} to equal 1
       ✓ expected ${this} to be true
       ✓ expected ${this} to be false
       ✓ expected ${this} to be null
       ✓ expected ${this} to be undefined
       ✓ expected ${this} to be NaN
       ✓ expected ${this} to be empty
       ✓ expected ${this} to not be arguments
       ✓ expected ${this} to not equal { a: 1 }
       ✓ expected ${this} to have property 'length'
       ✓ expected ${this} to have a length of 3 got ${actual}
       ✓ expected ${this} to be at most 3
       ✓ expected ${this} to not be an instance of Array
       ✓ expected ${this} to have property 'a'
       ✓ expected ${this} to match /^foo/
       ✓ expected ${this} to contain 'bar'
       ✓ expected ${this} to be a function
       ✓ expected ${this} to throw an error
       ✓ expected ${this} to satisfy [Function]
       ✓ expected ${this} to equal 1.5
       ✓ expected ${this} to have the same members as [ 2, 1, 3 ]
       ✓ expected ${this} to contain one of [ 'sunny', 'cloudy' ]
       ✓ expected ${this} to be extensible
       ✓ expected ${this} to be a finite number
```
