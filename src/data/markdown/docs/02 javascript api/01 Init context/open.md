---
head_title: 'JavaScript API: open'
title: 'open( filePath, [mode] )'
description: 'Opens a file and reads all the contents into memory.'
excerpt: 'Opens a file and reads all the contents into memory.'
---

This section contains test content for the code highlighting demonstration

## Example 1

<CodeGroup labels={["users.json"]}>

```json
[
  {
    "username": "user1",
    "password": "password1"
  },
  {
    "username": "user2",
    "password": "password2"
  },
  {
    "username": "user3",
    "password": "password3"
  }
]
```

</CodeGroup>

## Example 2

<CodeGroup labels={["Loading JSON data with SharedArray to parameterize test"]}>

```javascript
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';

const data = new SharedArray('users', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const f = JSON.parse(open('./users.json'));
  return f; // f must be an array[]
});

export default () => {
  const randomUser = data[Math.floor(Math.random() * data.length)];
  console.log(`${randomUser.username}, ${randomUser.password}`);
  sleep(3);
};
```

</CodeGroup>

## Example 3

<CodeGroup labels={["Loading JSON data without SharedArray"]}>

```javascript
import { sleep } from 'k6';

const users = JSON.parse(open('./users.json')); // consider using SharedArray for large files

export default function () {
  const user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

## Example 4

<CodeGroup labels={["Loading a binary file and POSTing it as a multipart request"]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

const binFile = open('/path/to/file.bin', 'b');

export default function () {
  const data = {
    field: 'this is a standard form field',
    file: http.file(binFile, 'test.bin'),
  };
  const res = http.post('https://example.com/upload', data);
  sleep(3);
}
```

</CodeGroup>

## Example 5

<CodeGroup labels={["Loading a binary file and POSTing it as a multipart request"]}>

```javascript
import { sleep } from "k6";
import http from "k6/http";

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 34 },
        "amazon:gb:london": { loadZone: "amazon:gb:london", percent: 33 },
        "amazon:au:sydney": { loadZone: "amazon:au:sydney", percent: 33 },
      },
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 20, duration: "1m" },
        { target: 20, duration: "3m30s" },
        { target: 0, duration: "1m" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};
```

</CodeGroup>

## Example 6

<CodeGroup labels={["Loading a binary file and POSTing it as a multipart request"]}>

```yaml
logs:
 configs:
   - name: default
     clients:
       - basic_auth:
           password: <Grafana.com API Key>
           username: <Logs User ID>
         url:  https://<Loki URL>/loki/api/v1/push
     positions:
       filename: /tmp/positions.yaml
     target_config:
       sync_period: 10s
     scrape_configs:
       - job_name: varlogs
         static_configs:
           - targets: [localhost]
             labels:
               instance: ${HOSTNAME:-default}
               job: varlogs
               __path__: /var/log/*log

metrics:
 configs:
   - name: integrations
     remote_write:
       - basic_auth:
           password: <Grafana.com API Key>
           username: <metrics User ID>
         url: https://<Prometheus URL>/api/prom/push
 global:
   scrape_interval: 60s
 wal_directory: /tmp/grafana-agent-wal

integrations:
 node_exporter:
     enabled: true
     instance: ${HOSTNAME:-default}
 prometheus_remote_write:
   - basic_auth:
       password: <Grafana.com API Key>
       username: <metrics User ID>
     url: https://<Prometheus URL>/api/prom/push
```

</CodeGroup>

______________________
________________________
_____________________

Opens a file, reading all its contents into memory for use in the script.

> #### Use [SharedArray](/javascript-api/k6-data/sharedarray/) for CSV and JSON files
> `open()` often consumes a large amount of memory because every VU keeps a separate copy of the file in memory.
> To reduce the memory consumption, we strongly advise the usage of [SharedArray](/javascript-api/k6-data/sharedarray/) for CSV, JSON and other files intended for script parametrization.

<blockquote mod='attention' title='Function available only in init context'>

This function can only be called from the init context (aka _init code_), code in the global context that is, outside of the main export default function { ... }.

By restricting it to the init context, we can easily determine what local files are needed to run the test and thus what we need to bundle up when distributing the test to multiple nodes in a clustered/distributed test.

See the example further down on this page. For a more in-depth description, see [Test lifecycle](/using-k6/test-lifecycle).

</blockquote>

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| filePath  | string | The path to the file, absolute or relative, that will be read into memory. The file will only be loaded once, even when running with several VUs. |
| mode      | string | By default, the contents of the file are read as text, but if you specify `b`, the file will be read as binary data instead.   |

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| string / ArrayBuffer | The contents of the file, returned as string or ArrayBuffer (if `b` was specified as the mode). |


<CodeGroup labels={["users.json"]}>

```json
[
  {
    "username": "user1",
    "password": "password1"
  },
  {
    "username": "user2",
    "password": "password2"
  },
  {
    "username": "user3",
    "password": "password3"
  }
]
```

</CodeGroup>

<CodeGroup labels={["Loading JSON data with SharedArray to parameterize test"]}>

```javascript
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';

const data = new SharedArray('users', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const f = JSON.parse(open('./users.json'));
  return f; // f must be an array[]
});

export default () => {
  const randomUser = data[Math.floor(Math.random() * data.length)];
  console.log(`${randomUser.username}, ${randomUser.password}`);
  sleep(3);
};
```

</CodeGroup>

<CodeGroup labels={["Loading JSON data without SharedArray"]}>

```javascript
import { sleep } from 'k6';

const users = JSON.parse(open('./users.json')); // consider using SharedArray for large files

export default function () {
  const user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

<CodeGroup labels={["Loading a binary file and POSTing it as a multipart request"]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

const binFile = open('/path/to/file.bin', 'b');

export default function () {
  const data = {
    field: 'this is a standard form field',
    file: http.file(binFile, 'test.bin'),
  };
  const res = http.post('https://example.com/upload', data);
  sleep(3);
}
```

</CodeGroup>
