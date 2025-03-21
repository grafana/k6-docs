---
title: 'Data Parameterization'
description: |
  Scripting examples on how to parameterize data in a test script. Parameterization is typically
  necessary when Virtual Users(VUs) will make a POST, PUT, or PATCH request in a test.

  Parameterization helps to prevent server-side caching from impacting your load test.
  This will, in turn, make your test more realistic.
weight: 05
---

# Data Parameterization

_Data parameterization_ is the process of turning test values into reusable parameters, for example, through variables and shared arrays.

This page gives some examples of how to parameterize data in a test script.
Parameterization is typically necessary when Virtual Users (VUs) will make a POST, PUT, or PATCH request in a test.
You can also use parameterization when you need to add test data from a separate file.

Parameterization helps to prevent server-side caching from impacting your load test.
This will, in turn, make your test more realistic.

## Performance implications of `SharedArray`

Each VU in k6 is a separate JS VM. To prevent multiple copies of the whole data file,
[SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) was added. It does have some CPU overhead in accessing elements compared to a normal non shared
array, but the difference is negligible compared to the time it takes to make requests. This becomes
even less of an issue compared to not using it with large files, as k6 would otherwise use too much memory to run, which might lead to your script not being able to run at all or aborting in the middle if the system resources are exhausted.

For example, the Cloud service allocates 8GB of memory for every 300 VUs. So if your files are large
enough and you are not using [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray), that might mean that your script will run out of memory at
some point. Additionally even if there is enough memory, k6 has a garbage collector (as it's written
in golang) and it will walk through all accessible objects (including JS ones) and figure out which
need to be garbage collected. For big JS arrays copied hundreds of times this adds quite a lot of
additional work.

A note on performance characteristics of `SharedArray` can be found within its [API documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray#performance-characteristics).

## From a JSON file

{{< code >}}

```json
{
  "users": [
    { "username": "test", "password": "qwerty" },
    { "username": "test", "password": "qwerty" }
  ]
}
```

{{< /code >}}

{{< code >}}

```javascript
import { SharedArray } from 'k6/data';
// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the json) will be executed per each VU which also means that there will be a complete copy
// per each VU
const data = new SharedArray('some data name', function () {
  return JSON.parse(open('./data.json')).users;
});

export default function () {
  const user = data[0];
  console.log(data[0].username);
}
```

{{< /code >}}

## From a CSV file

k6 doesn't parse CSV files natively, but you can use an external library, [Papa Parse](https://www.papaparse.com/).

You can download the library and import it locally like this:

{{< code >}}

```javascript
import papaparse from './papaparse.js';
import { SharedArray } from 'k6/data';
// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default function () {
  // ...
}
```

{{< /code >}}

Or you can grab it directly from [jslib.k6.io](https://jslib.k6.io/) like this.

{{< code >}}

```javascript
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';

// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default function () {
  // ...
}
```

{{< /code >}}

Here's an example using Papa Parse to parse a CSV file of username/password pairs and using that
data to login to the test.k6.io test site:

{{< code >}}

```javascript
/*  Where contents of data.csv is:
username,password
admin,123
test_user,1234
*/
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default function () {
  // Now you can use the CSV data in your test logic below.
  // Below are some examples of how you can access the CSV data.

  // Loop through all username/password pairs
  for (const userPwdPair of csvData) {
    console.log(JSON.stringify(userPwdPair));
  }

  // Pick a random username/password pair
  const randomUser = csvData[Math.floor(Math.random() * csvData.length)];
  console.log('Random user: ', JSON.stringify(randomUser));

  const params = {
    login: randomUser.username,
    password: randomUser.password,
  };
  console.log('Random user: ', JSON.stringify(params));

  const res = http.post('https://test.k6.io/login.php', params);
  check(res, {
    'login succeeded': (r) => r.status === 200 && r.body.indexOf('successfully authorized') !== -1,
  });

  sleep(1);
}
```

{{< /code >}}

## Retrieving unique data

It is often a requirement not to use the same data more than once in a test. With the help of [k6/execution](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution), which includes a property `scenario.iterationInTest`, you can retrieve unique rows from your data set.

> ### ⚠️ Multiple scenarios
>
> `scenario.iterationInTest` property is unique **per scenario**, not the overall test.
> That means if you have multiple scenarios in your test you might need to split your data per scenario.

{{< code >}}

```javascript
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';

const data = new SharedArray('users', function () {
  return JSON.parse(open('./data.json')).users;
});

export const options = {
  scenarios: {
    'use-all-the-data': {
      executor: 'shared-iterations',
      vus: 10,
      iterations: data.length,
      maxDuration: '1h',
    },
  },
};

export default function () {
  // this is unique even in the cloud
  const user = data[scenario.iterationInTest];
  console.log(`user: ${JSON.stringify(user)}`);
}
```

{{< /code >}}

Alternatively, if your use case requires using a unique data set per VU, you could leverage a property called `vu.idInTest`.

In the following example we're going to be using `per-vu-iterations` executor to ensure that every VU completes
a fixed amount of iterations.

{{< code >}}

```javascript
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

const users = new SharedArray('users', function () {
  return JSON.parse(open('./data.json')).users;
});

export const options = {
  scenarios: {
    login: {
      executor: 'per-vu-iterations',
      vus: users.length,
      iterations: 20,
      maxDuration: '1h30m',
    },
  },
};

export default function () {
  // VU identifiers are one-based and arrays are zero-based, thus we need - 1
  console.log(`Users name: ${users[vu.idInTest - 1].username}`);
  sleep(1);
}
```

{{< /code >}}

## Generating data using faker.js

The following articles show how to use faker.js in k6 to generate realistic data during the test execution:

- [Performance Testing with Generated Data using k6 and Faker](https://dev.to/k6/performance-testing-with-generated-data-using-k6-and-faker-2e)
- [Load Testing Made Easy with K6: Using Faker Library and CSV Files](https://farhan-labib.medium.com/load-testing-made-easy-with-k6-using-faker-library-and-csv-files-c997d48fb6e2)
