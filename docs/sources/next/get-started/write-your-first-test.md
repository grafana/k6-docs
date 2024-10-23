---
title: 'Write your first test'
description: 'Follow along to learn how to write your first k6 test script.'
weight: 02
---

# Write your first test

k6 is a reliability testing tool. It helps developers simulate realistic user behavior and test how their systems behaves as a result. Writing tests in k6 allows you to identify issues such as slow response times or system failures before they occur in production.

The goal of your test can vary. You might want to check performance, reliability, or scalability. Depending on your goal, your script may need different configurations, such as simulating many users, or running tests for a long time. (For more details, see our documentation on [reliability testing types](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/)).

k6 uses JavaScript (or [TypeScript](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-typescript-compatibility-mode/#experimental-enhanced-mode)) to define the test's behavior. This makes it accessible to many developers. By writing scripts, you control what the test does and how it behaves.

Follow along your first test script, and start testing the reliability of your application.

## Before you start

To write k6 scripts, basic knowledge of JavaScript or TypeScript is recommended. If you’re not familiar with these languages, you can use [k6 Studio](https://grafana.com/docs/k6/<K6_VERSION>/k6-studio/) to automatically generate tests without writing code, or any of our [test authoring methods](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/).

Make sure k6 is installed on your system. If it’s not, follow our [set up guide](https://grafana.com/docs/k6/<K6_VERSION>/set-up/).

Finally, you’ll also need a code editor to write your scripts. We recommend using VS Code or any other editor you’re comfortable with. See our [guide for setting up your editor](https://grafana.com/docs/k6/<K6_VERSION>/set-up/configure-your-code-editor/) for more details.

## Basic structure of a k6 test

Every k6 test script follows a basic structure, revolving around a few core components:

1. **Default function**: This is where the test logic resides. It defines what your test will do and how it will behave during execution.
2. **Imports**: You can import additional [k6 modules](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/) or [JavaScript libraries (jslibs)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/) to extend your script’s functionality, such as making HTTP requests or simulating browser interactions. Note that k6 is not built upon NodeJS, and uses instead its own JavaScript runtime, and although it might be compatible with some npm modules, we do not guarantee it.
3. **Options (optional)**: Enable you to configure the test conditions, like defining the number of virtual users, test duration, or setting performance thresholds. See our [options documentation](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/) for more details.
4. **Lifecycle functions (optional)**: These allow you to write code that will be run before and after the test, such as setting up test data or processing results.

### Writing your first test script

Let’s walk through creating a simple test:

1. **Create the test file**: Open your code editor and create a new file named `test.js`.
2. **Write a basic test**: Here’s a simple script that makes a GET request to a URL and simulates waiting between requests.

   ```javascript
   // Import k6 modules exposing additional functionality such as performing
   // HTTP requests and introducing delays.
   import http from 'k6/http';
   import { sleep } from 'k6';

   // The default exported function is gonna be picked up by k6 as the entry point
   // for the test script. It will be executed repeated in "iterations" for the whole
   // duration of the test.
   export default function () {
     // Make a GET request to the target URL
     http.get('https://test-api.k6.io');

     // Sleep for 1 second to simulate real-world usage
     sleep(1);
   }
   ```

3. **Explanation**:
   - The http module is used to make HTTP requests, in this case, a simple GET request to `https://test-api.k6.io`. You can replace this with your own API or website URL.
   - The `sleep(1)` function pauses for 1 second after each request, mimicking real-world user behavior where not every action happens instantly.

### Going a bit further

Once you’re comfortable with this basic script, there are many ways to extend its functionality:

1. _Multiple requests_: You can add more `http.get()` or `http.post()` requests to simulate more complex user flows.
2. _Using TypeScript_: If you prefer TypeScript, k6 supports it too. You can learn more in our [TypeScript guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-typescript-compatibility-mode/#experimental-enhanced-mode).
3. _Thresholds, checks, and metrics_: You can add conditions to monitor performance. For example, you can set thresholds to ensure the response time doesn’t exceed a certain limit. Learn more about thresholds and checks in our documentation.
4. _Browser tests_: You can use the browser module to simulate user interactions like clicking buttons or filling out forms. This is useful for testing web applications. Learn more about browser tests in our [documentation](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/).

## Next Steps

Now that you’ve written your first k6 test script, it’s time to run it. Head over to the [Running k6](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6/) page to learn how to execute your script and view the results.
