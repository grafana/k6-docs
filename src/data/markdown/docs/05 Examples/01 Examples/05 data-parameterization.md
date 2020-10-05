---
title: 'Data Parameterization'
excerpt: |
  Scripting examples on how to parameterize data in a test script. Parameterization is typically
  necessary when Virtual Users(VUs) will make a POST, PUT, or PATCH request in a test.

  Parameterization helps to prevent server-side caching from impacting your load test.
  This will, in turn, make your test more realistic.
---

Scripting examples on how to parameterize data in a test script. Parameterization is typically
necessary when Virtual Users (VUs) will make a POST, PUT, or PATCH request in a test.

Parameterization helps to prevent server-side caching from impacting your load test.
This will, in turn, make your test more realistic.

<Blockquote mod="warning">

> #### ⚠️ Strive to keep the data files small
>
> Each VU in k6 will have its separate copy of the data file.
> If your script uses 300 VUs, there will be 300 copies of the data file in memory.
> Cloud service allots 8GB of memory for every 300VUs.
> When executing cloud tests, make sure your data files aren't exceeding this limit or your test run may get aborted.
>
> Starting with k6 v0.27.0, there are some [tricks that can be used to better handle bigger data files](#handling-bigger-data-files).

</Blockquote>

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

You can download the library and import it locally like this:

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

## Handling bigger data files

In k6 version v0.27.0, while there is still no way
to share memory between VUs, the `__VU` variable is now defined during the init
context which means that we can split the data between the VUs during initialization
and not have multiple copies of it during the test run.

<div class="code-group" data-props='{ "labels": ["parse-json-big.js"], "lineNumbers": [true] }'>

```javascript
var splits = 100; // in how many parts are we going to split the data

if (__VU == 0) {
  open('./data.json'); // we just open it so it is available in the cloud or if we do k6 archive
} else {
  var data = (function () {
    // separate function in order to not leak all the data in the main scope
    var all_data = JSON.parse(open('./data.json')); // we load and parse the data in one go, no need for temp variables
    var part_size = all_data.length / splits;
    var index = part_size * (__VU % splits);
    return all_data.slice(index, index + part_size);
  })();
}

export default function () {
  console.log(`VU=${__VU} has ${data.length} data`);
}
```

</div>

With 100k lines like:

```json
{ "username": "test", "password": "qwerty" },
```

and a total of 4.8MB the script uses 3.5GB to start 300 VUs, while without it for 100 VUs (with all the data for each VU) it requires nearly 10GB.
For direct comparison 100VUs used near 2GB of memory.

Playing with the value for `splits` will give a different balance between memory used and the amount of data each VU has.

A second approach using another technique will be to pre-split the data in different files and load and parse only the one for each VU.

<div class="code-group" data-props='{ "labels": ["parse-csv-many.js"], "lineNumbers": [true] }'>

```javascript
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { sleep } from 'k6';

let dataFiles = [
  './data1.csv',
  './data2.csv',
  './data3.csv',
  './data4.csv',
  './data5.csv',
  './data6.csv',
  './data7.csv',
  './data8.csv',
  './data9.csv',
  './data10.csv',
];
var csvData;
if (__VU == 0) {
  // workaround to collect all files for the cloud execution
  for (let i = 0; i < dataFiles.length; i++) {
    open(dataFiles[i]);
  }
} else {
  csvData = papaparse.parse(open(dataFiles[__VU % dataFiles.length]), {
    header: true,
  }).data;
}
export default function () {
  sleep(10);
}
```

</div>

The files have 10k lines and are in total 128kb. Running 100VUs with this script takes around 2GB, while running the same with a single file takes upwards of 15GBs.

Either approach works for both JSON and CSV files and they can be combined, as that will probably reduce the memory pressure during the initialization even further.

## Generating data

See [this example project on GitHub](https://github.com/k6io/example-data-generation) showing how to use faker.js to generate realistic data at runtime.
