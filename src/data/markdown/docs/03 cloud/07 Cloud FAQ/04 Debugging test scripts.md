---
title: 'What is the best way to debug my load test scripts'
excerpt: 'Tips and tricks to help debug your load test scripts efficiently'
---

## Background

A common task to any development is debugging your code to make sure it's producing the expect output and results. k6 utilizes JavaScript as the scripting language for writing your load tests. Because tests are written in real code, you can and should debug your tests scripts before running them. Utilize the tips in this document to aid you in speeding up your script development.

## Tip 1: Use k6 locally to debug your scripts

While there is an code editor built into the k6 web application, it has limited debugging abilities. Using k6 locally, you can actually execute your test scripts on a small scale to quickly see how the script executes.

## Tip 2: Debug locally only.

Building on tip 1 above, you want to avoid streaming your results to our cloud using `-o cloud` and avoid running the test using the cloud service.
Debugging locally is beneficial for two reasons:

1. Tests that run in or stream to our cloud will count against any limits you may have
2. Execution is slower when streaming or executing in the cloud. We want debugging to be a fast iterative process.

<CodeGroup labels={["Example:"]}>

```C
k6 run myScript.js
```

</CodeGroup>

When debugging, you'll likely be making many changes as you work through your scripts to ensure they work as expected. The data sent or run from the cloud won't be of much value, so just keep it local until you need to run a larger test.

## Tip 3: Use flags to limit execution when debugging

It's likely that you've configured Virtual Users and/or duration in your script. adding the flags `-i 1 -u 1` will instruct k6 to execute 1 iteration with 1 Virtual User.

<CodeGroup labels={["Example:"]}>

```C
k6 run myScript.js -i 1 -u 1
```

</CodeGroup>

**Note**: 1 Virtual User and 1 iteration is also the default execution for k6. If you have not defined any VUs or iterations in your test, k6 will execute with 1.

## Tip 4: Use builtin debugging options

Sometimes you need to understand more details about the requests being sent and response received. Using `--http-debug` as a flag allows you to do just that. You can also print full response bodies by using `--http-debug="full"`

<CodeGroup labels={["Example:"]}>

```C
k6 run myScript.js --http-debug="full"
```

</CodeGroup>

**Note**: If your test script has a large number of HTTP requests, this will produce a large output.

## Tip 5: Print info to the terminal window with console.log(); when debugging

Sometimes it's just easier to print some information to the terminal window. Feel free to use `console.log();` to print useful information to the terminal window. Perhaps you want to examine some JSON returned in a response, a specific response body, or even just know if you've correctly entered/exited loops or IF statements.

To take the above a step further, consider the following snippet of code. We are making a GET request, saving the response to `res` and then logging the complete response object. Now we can examine it to find exactly what we may be looking for to adapt our test script.

<CodeGroup labels={["Example:"]}>

```JavaScript
let res = http.get("http://httpbin.test.k6.io/json");
 console.log(JSON.stringify(res));
```

</CodeGroup>
