---
title: 'Data uploads with k6 Cloud'
excerpt: 'How to execute a k6 Cloud test that will upload a data file to the System Under Test(SUT)'
---

## Background

Executing tests in k6 Cloud which will upload a data file to the System Under Test (SUT).

## Installing k6 locally and authenticating against k6 cloud

In order to upload a file needed for your test to execute you will need to install k6 locally which will act as a CLI between your machine and the k6 Cloud.

For detailed instructions and the different options, read more on [running cloud tests from the CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli).

## Including a data file in your k6 test script

first option would be to **Use the open() scripting API to open a CSV/JSON/TXT file:**

more info here: [open](/javascript-api/init-context/open-filepath-mode)

<CodeGroup labels={["users.json"]} lineNumbers={[false]}>

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

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```JavaScript
import { sleep } from "k6";
const users = JSON.parse(open("./users.json"));
export default function() {
  let user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

another possibility is to **Put the data in a JS file and import it as a module:**

<CodeGroup labels={["userData.js"]} lineNumbers={[true]}>

```JavaScript
export let users = [
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
];
```

</CodeGroup>

**Main Script:**

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```JavaScript
import { sleep } from "k6";
import { users } from "./userData.js"
export default function() {
  let user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

For more information on data uploads in k6 read [data uploads](/examples/examples/data-uploads).
