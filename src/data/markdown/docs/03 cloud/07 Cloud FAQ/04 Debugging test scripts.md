---
title: 'What is the best way to debug my load test scripts'
excerpt: 'Tips and tricks to help debug your load test scripts efficiently'
---

Debugging helps to ensure your code produces the expected results.  While there is a code editor built into the k6 web application, it has limited debugging abilities. 

Using k6 locally, you can actually execute your test scripts on a small scale to quickly see how the script executes. Debugging locally is beneficial for two reasons:

1. A cloud test counts against any subscription limits you may have.
2. Execution is slower when streaming or executing in the cloud. We want debugging to be a fast iterative process.

<CodeGroup labels={[""]}>

```bash
k6 run test.js
```

</CodeGroup>

If you've configured Virtual Users or duration in your script, adding the flags `-i 1 -u 1` instructs k6 to execute 1 iteration with 1 Virtual User, making the debugging sometimes easier.

<CodeGroup labels={[""]}>

```bash
k6 run test.js -i 1 -u 1
```

</CodeGroup>


> To develop and debug your load tests, we recommend, in most cases, running your tests locally - using the **`k6 run`** command.
>
> When your script is ready, execute the test on the k6 Cloud with the `k6 cloud` command.


For debugging, k6 also provides a few builtin options:

- `--http-debug`
- `console logging methods`

[--http-debug](/using-k6/options#http-debug) prints all the requests and responses to the console. Read more [here](/using-k6/http-debugging).

<CodeGroup labels={[""]}>

```bash
k6 run test.js --http-debug="full"
```

</CodeGroup>


`logging methods` print any message to the console. In the cloud, the console logs are shown on the [Logs Tab](/cloud/analyzing-results/logs).

<CodeGroup labels={[""]}>

```javascript
let res = http.get('http://httpbin.test.k6.io/json');
console.log(JSON.stringify(res));
```

</CodeGroup>

