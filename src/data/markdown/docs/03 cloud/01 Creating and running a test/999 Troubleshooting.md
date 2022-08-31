---
title: "Troubleshooting"
excerpt: "Common issues that come up with k6 Cloud and their solutions."
---

### What is the best way to debug my load test scripts?

Debugging helps to ensure your code produces the expected results.  While there is a [script editor](/cloud/creating-and-running-a-test/script-editor) built into the k6 web application, it has limited debugging abilities. 

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


- [`--http-debug`](/using-k6/k6-options/reference#http-debug) prints all the requests and responses to the console. Read more [HTTP debugging](/using-k6/http-debugging).

  <CodeGroup labels={[""]}>

  ```bash
  k6 run test.js --http-debug="full"
  ```

  </CodeGroup>


- `Console logging methods` can print any message to the console. In the cloud, the console logs are shown on the [Logs Tab](/cloud/analyzing-results/logs).

  <CodeGroup labels={[""]}>

  ```javascript
  import http from 'k6/http';

  const res = http.get('http://httpbin.test.k6.io/json');
  console.log(JSON.stringify(res));
  ```

  </CodeGroup>

  Note that you can also use the [`--console-output`](/using-k6/k6-options/reference#console-output) option to redirect console logs to an output file.

    <CodeGroup labels={[""]}>

  ```bash
  k6 run --console-output "loadtest.log" script.js
  ```

  </CodeGroup>

----

### I was invited to an organization and I cannot run tests

> I was invited to an organization with a subscription. However, When I try to run tests, I get an error that my subscription doesn't have enough Virtual Users/exceeds the duration/uses too many load zones. Our subscription allows for the test I want to run. What is wrong and how do I fix this?

If you encounter a similar situation, probably, the problem is that you run the test from a different organization with another subscription.

This situation often happens because when you register your account, the k6 Cloud automatically creates a "personal" default organization for you. In this case, you might have two organizations; your "personal" organization and the invited organization. 

By default, tests run from your "personal" organization.

**How do I change the organization to fix this?**

If you run tests from the web interface, you will need to use the User menu - on the top of the left sidebar- to select a project within the desired organization.

![Select a project](images/05-team-member-org-id/project-dashboard.png)

If you run tests from the k6 CLI, you will need to set the `projectID` in the test script. 

To do this, copy the project ID from the top left corner of the project dashboard (see image above) and set the `projectID` as a [cloud execution option](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli#cloud-execution-options).

<CodeGroup labels={["Example:"]}>

```javascript
export const options = {
  ext: {
    loadimpact: {
      projectID: 123456,
    },
  },
};
```

</CodeGroup>

Read more about managing [Organizations](/cloud/project-and-team-management/organizations) and [Projects](/cloud/project-and-team-management/projects).

----

### How to open a firewall to k6 Cloud service for cloud tests?

If you are running a `k6 cloud` test, you will be utilizing k6's cloud infrastructure. These are dynamically allocated from our cloud providers and we do not know the source IP until the test is running.

To open your firewall to k6 cloud traffic, you have multiple options.

1 - Open up your firewall to the whole range of AWS IP addresses used by the load zones where you want to run your load test from. We list [here](/cloud/cloud-faq/general-questions#what-ip-addresses-are-used-by-the-k6-cloud) the full range of IP addresses.

2 - Use HTTP headers, URL query parameters, or unique data that identifies the traffic as belonging to your load test, This requires that your firewall has support for scanning application payload data and apply rules based on what it finds. Here is some examples:


2.1 - You can add custom HTTP headers to any request in your script. You'll need to add the header to every single request.

<CodeGroup labels={["Custom headers"]}>

```javascript
import http from 'k6/http';

export default function () {
  const url = 'http://test.k6.io/login';
  const payload = JSON.stringify({ email: 'aaa', password: 'bbb' });
  const params = {
    headers: { 'Content-Type': 'application/json', 'Myheader': 'TOKEN_STRING' },
  };
  http.post(url, payload, params);
}
```

</CodeGroup>

2.2 - If you're not dependent on having the simulated users in your load test to be a certain user agent, you can also use the `userAgent` option to set the "User-Agent" header for all subsequent requests. That header could then contain your token value and you would not have to modify every single HTTP request in your script. In the below example the user agent is set to `MyK6UserAgentString/1.0`

<CodeGroup labels={["User agent option"]}>

```javascript
// Set a custom User Agent globally in your test options.
export const options = {
  userAgent: 'MyK6UserAgentString/1.0',
};
```

</CodeGroup>

2.3 - You might also use query parameters, if it doesn't interfere with the functionality of your application:

<CodeGroup labels={["Query parameters"]}>

```javascript
import http from 'k6/http';

// Add query parameters to your requests with a unique piece of data
export default function () {
  http.get('http://test.k6.io/?firewall_token=TOKEN_STRING');
}
```

</CodeGroup>

3 - Another option would be to request content from a certain hostname that is not in the DNS, but your site would of course need to be configured to respond to requests for that hostname. This is how you do it on the k6 cloud's side:

<CodeGroup labels={["Query parameters"]}>

```javascript
import http from 'k6/http';

// In your options, map your a unique/unused/secret hostname to the IP of the server.
export const options = {
  hosts: {
    'https://very_difficult.to.guess.hostname.com': '1.2.3.4',
  },
};
// Make your requests to that hostname
export default function () {
  http.get('https://very_difficult.to.guess.hostname.com/');
}
```

</CodeGroup>

This last solution requires that your firewall terminates SSL traffic, otherwise it will not see the Host header in unencrypted form. You could also use unencrypted HTTP, but get a bit less security.

----

### Max concurrency reached error message

> **What is concurrency?**  In the context of the k6 Cloud, concurrency is the ability to execute more than one test run simultaneously. Your k6 Cloud subscription defines the maximum number of concurrent test runs. If you need to increase this limit, please contact our support team.

Additionally, you can change the concurrency limit policy that defines how the k6 Cloud acts when the organization reaches the limit and a new test run is triggered.  Two options are available:

- `Abort test`: the new test run will be automatically aborted. This is the default option. 
- `Queue test`: the new test run will be queued for execution and started once a slot is opened. A queued test will timeout if no slot is available in 6 hours.

Note that to change the concurrency limit policy, you must be the organization owner. You can change the policy navigating your user menu (top-left side of the screen) > Organization settings > Settings:

![Concurrency limit policy](./images/01-concurrency-limit-policy.png)

---

### Data uploads with k6 Cloud

The [test builder](/test-authoring/test-builder) and [script editor](/cloud/creating-and-running-a-test/script-editor) in the k6 Cloud do not allow to upload a data file in your test.

If you want to execute a cloud test that will upload a data file, you have to [run the cloud tests from the CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli) and follow the steps described on the [data uploads example](/examples/data-uploads).
