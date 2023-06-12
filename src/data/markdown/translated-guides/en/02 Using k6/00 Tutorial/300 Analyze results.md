---
title: Analyze results
excerpt: Use k6 to write custom metrics and filter results.
---

The end-of-test summary provides only an overview of performance.
When testing, it helps to be able to analyze the test along data points and for specific requests.

In this tutorial, learn how to:
- Use tags to filter results
- Organize requests in groups
- Create custom metrics

<Blockquote mod="note" title="These examples use jq">

These examples use [`jq`](https://jqlang.github.io/jq/) to filter JSON results.
For other options, review [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/).

</Blockquote>

## Write data points to a file

k6 provides many [output structures](/results-output).
One of the most commonly used is [JSON](/results-output/real-time/json).

To output results as JSON lines, use the `--out` flag.

```bash
k6 run --out json=api-results.json api-test.js
```

Then filter the output with the tool of your choice.

k6 results have a number of built-in tags.
For example, run this `jq` command to filter results to only results where the status is 200:

```bash
jq '. | select(.data.tags.status >= "200")' api-results.json
```

## Apply custom tags

You can also apply tags to requests or code blocks.
To do so:
1. Add a `tags` object in the request params. Give the tag a key and value.

  ```json
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    tags: {
      function: "login",
    },
  };
  ```

2. Add the params in the function signature of the request.

  <CodeGroup labels={["tagged-login.js"]} lineNumbers={[true]} showCopyButton={[true]}
heightTogglers={[true]}>

   ```javascript
   import http from "k6/http";

   export default function () {
     const url = "https://test-api.k6.io";
     const payload = JSON.stringify({
       username: "test_case",
       password: "1234",
     });

     const params = {
       headers: {
         "Content-Type": "application/json",
       },
       //apply tags
       tags: {
         function: "login",
       },
     };

     //Login with tags
     http.post(`${url}/auth/basic/login`, payload, params);
   };

   ```
   </CodeGroup>

Now you can filter the results for this tag:

```bash
jq '. | select(.data.tags.function == "login")' results.json
```

## Organize requests in groups

You can also organize tags into [_Groups_](/using-k6/tags-and-groups#groups), functions that apply a `group` tag to all requests within its block.
Groups are very useful for designing tests as a series of logical transactions or blocks.


### Context: a new test for user flows

Results filtering isn't very meaningful in a test that makes one request.
And the API test script is getting long.
To simplify, write a new test for the following situation:

> Your development team wants to compare the performance of two user-facing components, the Contacts page and the Coinflip game.
> Write a script that makes it easy to compare the following:
> - A user who reads the contacts page, then returns home
>     - A GET request to `https://test.k6.io/contacts.php`
>     - A GET to `https://test.k6.io/`
> - A user who plays the coinflip game:
>     - A POST request to `https://test.k6.io/flip_coin.php` with the query param `?bet=heads`
>     - Another POST to `https://test.k6.io/flip_coin.php` with the query param `?bet=tails`


Can you figure out how to [script the requests](/using-k6/http-requests)?
If not, use the following script.

<Collapsible title="user flow example" isOpen="" tag="">

Since this example simulates a human user rather than an API call, it has sleep between each request.

<CodeGroup labels={["user-flow.js"]} lineNumbers={["true"]} showCopyButton={[true]}>

```javascript
import http from "k6/http";
import { check, group, sleep } from "k6";

//set URL as variable
const baseUrl = "https://test.k6.io";

export default function () {
  // visit contacts
  http.get(`${baseUrl}/contacts.php`);
  sleep(1);
  // return to the home page
  http.get(`${baseUrl}/`);
  sleep(1);

  //play coinflip game
  http.get(`${baseUrl}/flip_coin.php?bet=heads`);
  sleep(1);
  http.get(`${baseUrl}/flip_coin.php?bet=tails`);
  sleep(1);
}
```

</CodeGroup>

</Collapsible>

### Add Group functions

Wrap the two endpoints in different groups.
Name one group `User contacts page` and another `Coinflip` game.

<CodeGroup labels={["user-flow.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
//import necessary modules
import http from "k6/http";
import { check, group, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";

//set baseURL
const baseUrl = "https://test.k6.io";

export default function () {
  // User flow

// Put visits to contact page in one group
  group("User contacts page", function () {
    http.get(`${baseUrl}/contacts.php`);
    sleep(1);
    // return to the home page
    http.get(`${baseUrl}/`);
    sleep(1);
  });

// Coinflip players in another group

  group("Coinflip game", function () {
    http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    sleep(1);
    http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    sleep(1);
  });
}

```

</CodeGroup>

### Run and filter

Inspect the results for only the `Coinflip` group.
To do so:

1. Save the preceding script as `user-flow.js`.
1. Run the script with the command:

  ```bash
 x k6 run user-flow.js --out json=user-results.json --iterations 10
  ```

1. Inspect the results with `jq`. Group names have a `::` prefix.

  ```bash
  jq '. | select(.data.tags.group == "::Coinflip game")' user-results.json
  ```

## Add a custom metric

As you have seen in the output, all k6 tests emit metrics.
However, if the built-in metrics aren't enough, you can [create custom metrics](/using-k6/metrics/create-custom-metrics).
A common use case is to make metrics for an endpoint or group.

To create a trend for each group:
1. Import `Trend` from the k6 metrics module.
1. Create two duration trend metric functions.
1. In each group, add the `duration` time to the trend for requests to `contacts` and the `coin_flip` endpoints.

```javascript
//import necessary modules
import http from "k6/http";
import {  group, sleep } from "k6";
import { Trend } from "k6/metrics";

//set baseURL
const baseUrl = "https://test.k6.io";

// Create custom trends
const contactsLatency = new Trend("contacts duration");
const coinflipLatency = new Trend("coinflip duration");

// Function to test user flow
export default function () {
  // Put visits to contact page in one group
  group("User contacts page", function () {
    // save response as variable
    const res = http.get(`${baseUrl}/contacts.php`);
    // add duration property to metric
    contactsLatency.add(res.timings.duration);
    sleep(1);
    // return to the home page, no custom metric
    http.get(`${baseUrl}/`);
    sleep(1);
  });

  // Coinflip players in another group

  group("Coinflip game", function () {
    // save response as variable
    let res = http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);
    // mutate for new request
    res = http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);
  });
}
```

Run the test with small number of iterations.

```
k6 run user-flow.js --iterations 10
```

Look for the custom trend metrics in the end-of-test summary:

     coinflip duration..............: avg=222.022616 min=168.257618 med=228.015217 max=228.737309 p(90)=228.583013 p(95)=228.714225
     contacts duration..............: avg=224.638603 min=198.382977 med=227.412945 max=228.258872 p(90)=228.090845 p(95)=228.174858


## Next steps

In this tutorial, you looked at granular output and filtered by built-in and custom tags.
Then you made a new script with groups.
Finally, you added a new metric for each group.
A next step would be to create a [Custom end-of-test summary](results-output/end-of-test/) or to stream the results to a database.

For ongoing operations, you can modularize your logic and configuration.
That's the subject of the next tutorial.
Alternatively, if you want to practice your JavaScript, you could refactor the preceding script.
