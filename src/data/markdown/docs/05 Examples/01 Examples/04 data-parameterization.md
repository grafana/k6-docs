---
title: 'Data Parameterization'
excerpt: |
  Scripting examples on how to parameterize data in a test script. Parameterization is typically
  necessary when Virtual Users(VUs) will make a POST, PUT, or PATCH request in a test.

  Parameterization helps to prevent server-side caching from impacting your load test.
  This will, in turn, make your test more realistic.
---

Scripting examples on how to parameterize data in a test script. Parameterization is typically
necessary when Virtual Users(VUs) will make a POST, PUT, or PATCH request in a test.

Parameterization helps to prevent server-side caching from impacting your load test.
This will, in turn, make your test more realistic.

## From a JSON file

<div class="code-group" data-props='{ "labels": ["data.json"], "lineNumbers": [true] }'>

```json
{
  "users": [
    { "username": "test", "password": "qwerty" },
    { "username": "test", "password": "qwerty" }
  ]
}
```

</div>

<div class="code-group" data-props='{ "labels": ["parse-json.js"], "lineNumbers": [true] }'>

```javascript
const data = JSON.parse(open('./data.json'));

export default function () {
  let user = data.users[0];
  console.log(data.users[0].username);
}
```

</div>

## From a CSV file

As k6 doesn't support parsing CSV files natively, we'll have to resort to using a
library called [Papa Parse](https://www.papaparse.com/).

You can download the library and and import it locally like this:

<div class="code-group" data-props='{ "labels": ["papaparse-local-import.js"], "lineNumbers": [true] }'>

```javascript
import papaparse from './papaparse.js';

const csvData = papaparse.parse(open('./data.csv'), { header: true });

export default function () {
  // ...
}
```

</div>

Or you can grab it directly from [jslib.k6.io](https://jslib.k6.io/) like this.

<div class="code-group" data-props='{ "labels": ["papaparse-remote-import.js"], "lineNumbers": [true] }'>

```javascript
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Load CSV file and parse it using Papa Parse
const csvData = papaparse.parse(open('./data.csv'), { header: true });

export default function () {
  // ...
}
```

</div>

Here's an example using Papa Parse to parse a CSV file of username/password pairs and using that
data to login to the test.k6.io test site:

<div class="code-group" data-props='{ "labels": ["parse-csv.js"], "lineNumbers": [true] }'>

```javascript
/*  Where contents of data.csv is:

    username,password
    admin,123
    test_user,1234
*/
import http from 'k6/http';
import { check, sleep } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Load CSV file and parse it using Papa Parse
const csvData = papaparse.parse(open('./data.csv'), { header: true }).data;

export default function () {
  // Now you can use the CSV data in your test logic below.
  // Below are some examples of how you can access the CSV data.

  // Loop through all username/password pairs
  csvData.forEach((userPwdPair) => {
    console.log(JSON.stringify(userPwdPair));
  });

  // Pick a random username/password pair
  let randomUser = csvData[Math.floor(Math.random() * csvData.length)];
  console.log('Random user: ', JSON.stringify(randomUser));

  const params = {
    login: randomUser.username,
    password: randomUser.password,
  };

  let res = http.post('https://test.k6.io/login.php', params);
  check(res, {
    'login succeeded': (r) =>
      r.status === 200 && r.body.indexOf('successfully authorized') !== -1,
  });

  sleep(1);
}
```

</div>

<br/>

<div class="doc-blockquote" data-props='{"mod": "warning"}'>

> ### ⚠️ Strive to keep the data files small
>
> Each VU in k6 will have its separate copy of the data file.
> If your script uses 300 VUs, there will be 300 copies of the data file in memory.
> Cloud service allots 8GB of memory for every 300VUs.
> When executing cloud tests, make sure your data files aren't exceeding this limit or your test run may get aborted.

</div>

## Generating data

See [this example project on GitHub](https://github.com/k6io/example-data-generation) showing how to use faker.js to generate realistic data at runtime.
