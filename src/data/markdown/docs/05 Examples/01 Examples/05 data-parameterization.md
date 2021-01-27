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

Each VU in k6 is a separate JS VM so in order to not have multiple copies of the whole data file
[SharedArray](/javascript-api/k6-data/sharedarray) was added. It does have overhead in accessing elements compared to a normal non shared
array, but the difference is negligible compared to the time it takes to make requests. And is
especially not comparable as not using it with big files basically means k6 will be using too much
memory to run. Which might lead to your script not being able to run at all or aborting in the
middle.

For example, the Cloud service allots 8GB of memory for every 300VUs. So if you are files are big
enough and you are not using [SharedArray](/javascript-api/k6-data/sharedarray), that might mean that your script will run out of memory at
some point. Additionally even if there is enough memory, k6 has a garbage collector(as it's written
in golang) and it will walk through all accessible objects (including JS ones) and figure out which
need to be garbage collected. For big JS arrays copied hundreds of times this adds quite a lot of
additional work.

A note on performance characteristics of `SharedArray` can be found within it's [API documentation](/javascript-api/k6/data/sharedarray#performance-characteristics).

</Blockquote>

## From a JSON file

<CodeGroup labels={["data.json"]} lineNumbers={[true]}>

```json
{
  "users": [
    { "username": "test", "password": "qwerty" },
    { "username": "test", "password": "qwerty" }
  ]
}
```

</CodeGroup>

<CodeGroup labels={["parse-json.js"]} lineNumbers={[true]}>

```javascript
import { SharedArray } from "k6/data";
// not using ShareArray here will mean that the code in the function call (that is what loads and
// parses the json) will be executed per each VU which also means that there will be a complete copy
// per each VU
const data = new SharedArray("some data name", function() { return JSON.parse(open('./data.json')); });

export default function () {
  let user = data.users[0];
  console.log(data.users[0].username);
}
```

</CodeGroup>

## From a CSV file

As k6 doesn't support parsing CSV files natively, we'll have to resort to using a
library called [Papa Parse](https://www.papaparse.com/).

You can download the library and import it locally like this:

<CodeGroup labels={["papaparse-local-import.js"]} lineNumbers={[true]}>

```javascript
import papaparse from './papaparse.js';
import { SharedArray } from "k6/data";
// not using ShareArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray("another data name", function() {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default function () {
  // ...
}
```

</CodeGroup>

Or you can grab it directly from [jslib.k6.io](https://jslib.k6.io/) like this.

<CodeGroup labels={["papaparse-remote-import.js"]} lineNumbers={[true]}>

```javascript
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from "k6/data";

// not using ShareArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray("another data name", function() {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default function () {
  // ...
}
```

</CodeGroup>

Here's an example using Papa Parse to parse a CSV file of username/password pairs and using that
data to login to the test.k6.io test site:

<CodeGroup labels={["parse-csv.js"]} lineNumbers={[true]}>

```javascript
/*  Where contents of data.csv is:
username,password
admin,123
test_user,1234
*/
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// not using ShareArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
const csvData = new SharedArray("another data name", function() {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default function () {
  // Now you can use the CSV data in your test logic below.
  // Below are some examples of how you can access the CSV data.

  // Loop through all username/password pairs
  for (var userPwdPair of csvData) {
    console.log(JSON.stringify(userPwdPair));
  }

  // Pick a random username/password pair
  let randomUser = csvData[Math.floor(Math.random() * csvData.length)];
  console.log('Random user: ', JSON.stringify(randomUser));

  const params = {
    login: randomUser.username,
    password: randomUser.password,
  };
  console.log('Random user: ', JSON.stringify(params));

  let res = http.post('https://test.k6.io/login.php', params);
  check(res, {
    'login succeeded': (r) =>
      r.status === 200 && r.body.indexOf('successfully authorized') !== -1,
  });

  sleep(1);
}
```

</CodeGroup>

<br/>

## Generating data

See [this example project on GitHub](https://github.com/k6io/example-data-generation) showing how to use faker.js to generate realistic data at runtime.

## Old hacks

The following section is here for historical reasons as it was the only way to lower the memory
usage of k6 prior to v0.30.0 but after v0.27.0, but still have access to a lot of parameterization data
with some caveats. All of the below should probably not be used as [SharedArray](/javascript-api/k6-data/sharedarray) should be sufficient.

After k6 version v0.27.0, while there was still no way
to share memory between VUs, the `__VU` variable was now defined during the init
context which means that we could split the data between the VUs during initialization
and not have multiple copies of it during the test run. This is not useful now that [SharedArray](/javascript-api/k6-data/sharedarray)
exists. Combining both will likely not bring any more performance benefit then using just the
[SharedArray](/javascript-api/k6-data/sharedarray).

<CodeGroup labels={["parse-json-big.js"]} lineNumbers={[true]}>

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

</CodeGroup>

With 100k lines like:

```json
{ "username": "test", "password": "qwerty" },
```

and a total of 4.8MB the script uses 3.5GB to start 300 VUs, while without it for 100 VUs (with all the data for each VU) it requires nearly 10GB.
For direct comparison 100VUs used near 2GB of memory.

Playing with the value for `splits` will give a different balance between memory used and the amount of data each VU has.

A second approach using another technique will be to pre-split the data in different files and load and parse only the one for each VU.

<CodeGroup labels={["parse-csv-many.js"]} lineNumbers={[true]}>

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

</CodeGroup>

The files have 10k lines and are in total 128kb. Running 100VUs with this script takes around 2GB, while running the same with a single file takes upwards of 15GBs.

Either approach works for both JSON and CSV files and they can be combined, as that will probably reduce the memory pressure during the initialization even further.
