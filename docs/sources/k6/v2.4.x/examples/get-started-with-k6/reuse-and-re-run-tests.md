---
title: Reuse and re-run tests
description: Modularize your k6 test logic and workload configuration.
weight: 400
---

# Reuse and re-run tests

In the previous tutorials, you designed k6 scripts to assert performance and make comparing results easy.

In this tutorial, learn how to:

- Modularize test scripts into reusable components
- Dynamically configure scripts with environment variables

## Example script

For fun, let's combine the scripts from the previous tutorials.
Use the logic of the `multiple-flows.js` test with the thresholds and scenario of the `api-test.js` (feel free to add more checks, requests, groups, and so on).
Take note of the features of this script:

- The `default` function has two groups, `Contacts flow`, and `Coinflip game`
- The `options` object has two properties, `thresholds` and `scenarios`

In the following sections, learn how to split these components into separate files, and combine them dynamically at run time.

```javascript
import http from 'k6/http';
import { group, sleep } from 'k6';
import { Trend } from 'k6/metrics';

//define configuration
export const options = {
  scenarios: {
    //arbitrary name of scenario:
    breaking: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 20 },
        { duration: '50s', target: 20 },
        { duration: '50s', target: 40 },
        { duration: '50s', target: 60 },
        { duration: '50s', target: 80 },
        { duration: '50s', target: 100 },
        { duration: '50s', target: 120 },
        { duration: '50s', target: 140 },
        //....
      ],
    },
  },
  //define thresholds
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }], // availability threshold for error rate
    http_req_duration: ['p(99)<1000'], // Latency threshold for percentile
  },
};

//set baseURL
const baseUrl = 'https://test.k6.io';

// Create custom trends
const contactsLatency = new Trend('contacts_duration');
const coinflipLatency = new Trend('coinflip_duration');

export default function () {
  // Put visits to contact page in one group
  let res;
  group('Contacts flow', function () {
    // save response as variable
    res = http.get(`${baseUrl}/contacts.php`);
    // add duration property to metric
    contactsLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/`);
    // add duration property to metric
    contactsLatency.add(res.timings.duration);
    sleep(1);
  });

  // Coinflip players in another group

  group('Coinflip game', function () {
    // save response as variable
    let res = http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);
  });
}
```

## Modularize logic

With [modules](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules), you can use logic and variables from other files.
Use modules to extract the functions to their own files.

To do so, follow these steps:

1. Copy the previous script (`whole-tutorial.js`) and save it as `main.js`.
1. Extract the `Contacts flow` group function from `main.js` script file and paste it into a new file called `contacts.js`

   <!-- md-k6:skip -->

   <!-- eslint-disable no-undef  -->

   ```javascript
   export function contacts() {
     group('Contacts flow', function () {
       // save response as variable
       let res = http.get(`${baseUrl}/contacts.php`);
       // add duration property to metric
       contactsLatency.add(res.timings.duration);
       sleep(1);

       res = http.get(`${baseUrl}/`);
       // add duration property to metric
       contactsLatency.add(res.timings.duration);
       sleep(1);
     });
   }
   ```

   <!-- eslint-enable no-undef  -->

   As is, this script won't work, since it has undeclared functions and variables.

1. Add the necessary imports and variables. This script uses the `group`, `sleep`, and `http` functions or libraries. It also has a custom metric. Since this metric is specific to the group, you can add it `contacts.js`.

1. Finally, pass `baseUrl` as a parameter of the `contacts` function.

   <!-- md-k6:skip -->

   ```javascript
   import http from 'k6/http';
   import { Trend } from 'k6/metrics';
   import { group, sleep } from 'k6';

   const contactsLatency = new Trend('contact_duration');

   export function contacts(baseUrl) {
     group('Contacts flow', function () {
       // save response as variable
       let res = http.get(`${baseUrl}/contacts.php`);
       // add duration property to metric
       contactsLatency.add(res.timings.duration);
       sleep(1);

       res = http.get(`${baseUrl}/`);
       // add duration property to metric
       contactsLatency.add(res.timings.duration);
       sleep(1);
     });
   }
   ```

1. Repeat the process with the `coinflip` group in a file called `coinflip.js`.
   Use the tabs to see the final three files should (`options` moved to the bottom of `main.js` for better readability).

   {{< code >}}

   ```main
   import { contacts } from './contacts.js';
   import { coinflip } from './coinflip.js';

   const baseUrl = 'https://test.k6.io';

   export default function () {
     // Put visits to contact page in one group
     contacts(baseUrl);
     // Coinflip players in another group
     coinflip(baseUrl);
   }

   //define configuration
   export const options = {
     scenarios: {
       //arbitrary name of scenario:
       breaking: {
         executor: 'ramping-vus',
         stages: [
           { duration: '10s', target: 20 },
           { duration: '50s', target: 20 },
           { duration: '50s', target: 40 },
           { duration: '50s', target: 60 },
           { duration: '50s', target: 80 },
           { duration: '50s', target: 100 },
           { duration: '50s', target: 120 },
           { duration: '50s', target: 140 },
           //....
         ],
       },
     },
     //define thresholds
     thresholds: {
       http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }], // availability threshold for error rate
       http_req_duration: ['p(99)<1000'], // Latency threshold for percentile
     },
   };
   ```

   ```contacts
   import http from 'k6/http';
   import { Trend } from 'k6/metrics';
   import { group, sleep } from 'k6';

   const contactsLatency = new Trend('contact_duration');

   export function contacts(baseUrl) {
     group('Contacts flow', function () {
       // save response as variable
       let res = http.get(`${baseUrl}/contacts.php`);
       // add duration property to metric
       contactsLatency.add(res.timings.duration);
       sleep(1);

       res = http.get(`${baseUrl}/`);
       // add duration property to metric
       contactsLatency.add(res.timings.duration);
       sleep(1);
     });
   }
   ```

   ```coinflip
   import http from 'k6/http';
   import { Trend } from 'k6/metrics';
   import { group, sleep } from 'k6';

   const coinflipLatency = new Trend('coinflip_duration');

   export function coinflip(baseUrl) {
     group('Coinflip game', function () {
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

   {{< /code >}}

   Run the test:

   ```bash
   # setting the workload to 10 iterations to limit run time
   k6 run main.js --iterations 10
   ```

   The results should be very similar to running the script in a combined file, since these are the same test.

## Modularize workload

Now that the iteration code is totally modularized, you might modularize your `options`, too.

The following example creates a module `config.js` to export the threshold and workload settings.

{{< code >}}

```main
import { coinflip } from './coinflip.js';
import { contacts } from './contacts.js';
import { thresholdsSettings, breakingWorkload } from './config.js';

export const options = {
  scenarios: { breaking: breakingWorkload },
  thresholds: thresholdsSettings,
};

const baseUrl = 'https://test.k6.io';

export default function () {
  contacts(baseUrl);
  coinflip(baseUrl);
}
```

```config
export const thresholdsSettings = {
  http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
  http_req_duration: ['p(99)<1000'],
};

export const breakingWorkload = {
  executor: 'ramping-vus',
  stages: [
    { duration: '10s', target: 20 },
    { duration: '50s', target: 20 },
    { duration: '50s', target: 40 },
    { duration: '50s', target: 60 },
    { duration: '50s', target: 80 },
    { duration: '50s', target: 100 },
    { duration: '50s', target: 120 },
    { duration: '50s', target: 140 },
    //....
  ],
};
```

{{< /code >}}

Notice the length of this final script and compare it with the script at the beginning of this page.
Though the final execution is the same, it's half the size and more readable.

Besides shortness, this modularity lets you compose scripts from many parts, or dynamically configure scripts at run time.

## Mix and match logic

With modularized configuration and logic, you can define named scenarios for different workloads and [select one with `--scenario`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/#run-selected-scenarios).

Change `main.js` and `config.js` to define a smoke test with five iterations and a breaking test, then choose the workload when you run the script.

To do this, follow these steps:

1. Add the workload settings for configuring the smoke test to `config.js`:

   <!-- md-k6:skip -->

   ```javascript
   export const smokeWorkload = {
     executor: 'shared-iterations',
     iterations: 5,
     vus: 1,
   };

   export const thresholdsSettings = {
     http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
     http_req_duration: ['p(99)<1000'],
   };

   export const breakingWorkload = {
     executor: 'ramping-vus',
     stages: [
       { duration: '10s', target: 20 },
       { duration: '50s', target: 20 },
       { duration: '50s', target: 40 },
       { duration: '50s', target: 60 },
       { duration: '50s', target: 80 },
       { duration: '50s', target: 100 },
       { duration: '50s', target: 120 },
       { duration: '50s', target: 140 },
       //....
     ],
   };
   ```

1. Edit `main.js` to define a named scenario for each workload:

   <!-- md-k6:skip -->

   ```javascript
   import { coinflip } from './coinflip.js';
   import { contacts } from './contacts.js';
   import { thresholdsSettings, breakingWorkload, smokeWorkload } from './config.js';

   export const options = {
     scenarios: {
       smoke: smokeWorkload,
       breaking: breakingWorkload,
     },
     thresholds: thresholdsSettings,
   };

   const baseUrl = 'https://test.k6.io';

   export default function () {
     contacts(baseUrl);
     coinflip(baseUrl);
   }
   ```

1. Select the smoke test:

   ```bash
   k6 run --scenario smoke main.js
   ```

1. When you want to run the breaking test, select that workload instead:

   ```bash
   k6 run --scenario breaking main.js
   ```

   Always select the intended workload for this example. Without `--scenario`, k6 runs both scenarios, including the breaking test.

This was a simple example to showcase how you can modularize a test.
As your test suite grows and more people are involved in performance testing, your modularization strategy becomes essential to building and maintaining an efficient testing suite.

## Next steps

Now you've seen examples to write tests, assert for performance, filter results, and modularize scripts.
Notice how the tests progress in complexity: from single endpoints to holistic tests, from small to large loads, and from single tests to reusable modules. These progressions are typical in testing, with the next step being to automate. It might be impractical to automate a tutorial, but if you are interested,
read the [Automated performance testing](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/automated-performance-testing) guide.

More likely, you want to learn more about k6. The [k6-learn repository](https://github.com/grafana/k6-learn) has more details to practice.
Or, you can read and explore the [testing guides](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides) and try to build out your testing strategy.

Happy testing!
