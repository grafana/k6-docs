---
title: 'jslib'
excerpt: 'External JavaScript libraries for k6'
---

The [jslib.k6.io](https://jslib.k6.io/) is a collection of external JavaScript libraries that can be [directly imported](https://k6.io/docs/using-k6/modules#remote-http-s-modules) in k6 scripts.

| Library                                      | Description                                                  |
| -------------------------------------------- | ------------------------------------------------------------ |
| [utils](/v0.31/javascript-api/jslib/utils)   | Small utility functions useful in every day load testing     |
| [expect](/v0.31/javascript-api/jslib/expect) | Micro-framework for writing tests in a style of Jest or ava. |
| [httpx](/v0.31/javascript-api/jslib/httpx)   | Wrapper around the http that simplifies session handling     |
| -                                            | Documentation for other libraries will be added shortly.     |

### Example

<CodeGroup labels={[]}>

```javascript
import { check, sleep } from 'k6';
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js';
import {
  randomIntBetween,
  randomItem,
  uuidv4,
} from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

const testData = {
  user: {
    name: 'Batman',
  },
};

export default function () {
  check(testData, {
    'JSON path works': () => jsonpath.value(testData, 'user.name') === 'Batman',
  });

  console.log(uuidv4());
  console.log(randomItem([1, 2, 3, 4]));

  sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds
}
```

</CodeGroup>

The complete list of supported libraries can be viewed on [jslib.k6.io](https://jslib.k6.io).

## Versioning

```
https://jslib.k6.io/library-name/version/index.js
```

Libraries hosted on jslib have versions. For example "httpx.js" library currently has v0.0.1, v0.0.2 and v0.0.3.

We recommend that you use the last version available at the time of writing your k6 scripts. Older versions will continue to be hosted on jslib, so you don't have to worry about your scripts breaking.

This documentation is for the last version of these libraries. If the examples documented here don't work, please check that you are using the latest version.

If you don't want to depend on jslib or want to make modifications to the code, you can download the libraries and use them locally.
