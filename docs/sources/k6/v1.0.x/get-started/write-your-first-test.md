---
title: 'Write your first test'
description: 'Learn how to write your first k6 test script.'
weight: 02
---

# Write your first test

k6 is a reliability testing tool. It helps developers simulate realistic user behavior and test how their systems behave as a result. Writing tests in k6 allows you to identify potential issues, such as slow response times or system failures, before they occur in production.

The goal of your test can vary. You might want to check performance, reliability, or scalability. Depending on your goal, your script may need different configurations, such as simulating many users, or running tests for a long time.

k6 tests are written using the JavaScript or TypeScript programming language, making it accessible to developers, and easy to integrate in existing codebases and projects. By writing k6 test scripts, you control what the k6 does, the action it performs, and how it behaves.

Follow along and learn how to write your first test script, and start testing the reliability of your application.

## Before you start

To write k6 scripts, you'll need:

- A basic knowledge of JavaScript or TypeScript.
  - If you're unfamiliar with these languages, check out [k6 Studio](https://grafana.com/docs/k6/<K6_VERSION>/k6-studio/), which helps users generate tests without writing code. Alternatively, explore our [test authoring methods](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/).
- [Install k6](https://grafana.com/docs/k6/<K6_VERSION>/set-up/) in your machine.
- A code editor to write your scripts, such as [Visual Studio Code](https://code.visualstudio.com/) or [JetBrains editors](https://www.jetbrains.com/).
  - Refer to [Configure your code editor](https://grafana.com/docs/k6/<K6_VERSION>/set-up/configure-your-code-editor/) to learn how to enable auto-completion and other features.

## Basic structure of a k6 test

For k6 to be able to interpret and execute your test, every k6 script follows a common structure, revolving around a few core components:

1. **Default function**: This is where the test logic resides. It defines what your test will do and how it will behave during execution. It should be exported as the default function in your script.
2. **Imports**: You can import additional [k6 modules](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/) or [JavaScript libraries (jslibs)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/) to extend your script’s functionality, such as making HTTP requests or simulating browser interactions. Note that k6 is not built upon Node.js, and instead uses its own JavaScript runtime. Compatibility with some npm modules may vary.
3. **Options (optional)**: Enable you to configure the execution of the test, such as defining the number of virtual users, the test duration, or setting performance thresholds. Refer to [Options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/) for more details.
4. **Lifecycle operations (optional)**: Because your test might need to run code before and/or after the execution of the test logic, such as parsing data from a file, or download an object from Amazon S3, [lifecycle operations](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/) allow you to write code, either as predefined functions or within specific code scopes, that will be executed at different stages of the test execution.

### Writing your first test script

Let’s walk through creating a simple test which performs 10 `GET` HTTP requests to a URL and waits for 1 second between requests. This script will help you understand the basic structure of a k6 test script.

1. **Create a test file**: A test file can be named anything you like, and live wherever you see fit in your project, but it should have a `.js` or `.ts` extension. In this example, create a JavaScript file named `my-first-test.js`. Open your terminal and run the following command:

   ```bash
   touch my-first-test.js
   ```

2. **Import k6 modules**: As the end goal here is to perform HTTP requests, import the k6 `http` module at the top of the file. To help simulate a real-world scenario, import the `sleep` function from the `k6` module as well.

<!-- md-k6:skip -->

```javascript
// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from 'k6/http';

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { sleep } from 'k6';
```

3. **Define options**: To perform 10 HTTP requests, define an options block to configure the test execution. In this case, set the number of iterations to 10 to instruct k6 to execute the default function 10 times. Right beneath the imports, add the following code:

<!-- md-k6:skip -->

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Define the number of iterations for the test
  iterations: 10,
};
```

4. **Define a default function**: The default exported function is the entry point for the test script. It will be executed repeatedly the number of times you define with the `iterations` option. In this function, make a `GET` request to a URL and introduce a 1-second delay between requests. Add the following code to your script:

   ```javascript
   import http from 'k6/http';
   import { sleep } from 'k6';

   export const options = {
     iterations: 10,
   };

   // The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
   export default function () {
     // Make a GET request to the target URL
     http.get('https://quickpizza.grafana.com');

     // Sleep for 1 second to simulate real-world usage
     sleep(1);
   }
   ```

### Extending your script

After you're comfortable with this basic script, you can extend its functionality in many ways. Here are a few ideas to get you started:

1. **Multiple requests**: You can add more `http.get()` or `http.post()` requests to simulate complex user flows.
2. **Using TypeScript**: If you prefer TypeScript, k6 also supports it. You can learn more in our [TypeScript guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-typescript-compatibility-mode/#typescript-support).
3. **Thresholds, checks, and metrics**: You can add conditions to monitor performance. For example, you can set thresholds to ensure the response time doesn’t exceed a certain limit. Refer to [Thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds/) and [Checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks/) for more details.
4. **Browser tests**: Use the browser module to simulate user interactions like clicking buttons or filling out forms. This is useful for testing web applications. Refer to [Using k6 browser](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/) for more details.

You can also use the `k6 new` command to speed up the process of putting together a k6 test script when you're testing a new service or application. Try it out!

## Next steps

Now that you’ve written your first k6 test script, it’s time to run it. Refer to [Running k6](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6/) to learn how to execute your script and analyze the results.
