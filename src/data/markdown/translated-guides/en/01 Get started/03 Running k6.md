---
title: 'Running k6'
excerpt: 'Follow along to learn how to run a test, add virtual users, increase the test duration, and ramp the number of requests up and down as the test runs.'
---

Follow along to learn how to:
1. Run a test.
2. Add virtual users.
3. Increase the test duration. 
4. Ramp the number of requests up and down as the test runs.

With these example snippets, you'll run the test with your machine's resources.
But, if you have a k6 Cloud account, you can also use the `k6 cloud` command to outsource the test to k6 servers. 

<!-- preserving  old anchor --->
## Run local tests {#running-local-tests}

To run a simple local script:
1. Copy the following code, paste it into your favorite editor, and save it as `script.js`:

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export default function () {
    http.get('https://test.k6.io');
    sleep(1);
  }
  ```

  </CodeGroup>

1. Run k6 with the following command:

  <CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

  ```bash
  $ k6 run script.js
  ```

  ```bash
  # When using the `k6` docker image, you can't just give the script name since
  # the script file will not be available to the container as it runs. Instead
  # you must tell k6 to read `stdin` by passing the file name as `-`. Then you
  # pipe the actual file into the container with `<` or equivalent. This will
  # cause the file to be redirected into the container and be read by k6.

  $ docker run --rm -i grafana/k6 run - <script.js
  ```

  ```bash
  PS C:\> cat script.js | docker run --rm -i grafana/k6 run -
  ```

  </CodeGroup>

## Add VUs {#adding-more-vus}

Now run a load test with more than one virtual user and a longer duration:

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run --vus 10 --duration 30s script.js
```

```bash
$ docker run --rm -i grafana/k6 run --vus 10 --duration 30s - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run --vus 10 --duration 30s -
```

</CodeGroup>

_Running a 30-second, 10-VU load test_

<Blockquote mod="note" title="Virtual users">

k6 runs multiple iterations in parallel with _virtual users_ (VUs).
In general terms, more virtual users means more simulated traffic.

VUs are essentially parallel `while(true)` loops.
Scripts are written in JavaScript, as ES6 modules,
so you can break larger tests into smaller pieces or make reusable pieces as you like.

</Blockquote>

### The init context and the default function

For a test to run, you need to have *init code*, which prepares the test, and *VU code,* which makes requests.

Code in the init context defines functions and configures the test options (like `duration`).

Every test also has a `default` function,
which defines the VU logic.

<CodeGroup labels={[]}>

```javascript
// init

export default function () {
  // vu code: do things here...
}
```

</CodeGroup>

Init code runs first and is called only once per VU.
The `default` code runs as many times or as long as is configured in the test options.

To learn more about how k6 executes, read about the [Test lifecycle](/using-k6/test-lifecycle).

## Set options {#using-options}

Instead of typing `--vus 10` and `--duration 30s` each time you run the script,
you can set the options in your JavaScript file:

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
```

</CodeGroup>

If you run the script without flags, k6 uses the options defined in the script:

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run script.js
```

```bash
$ docker run --rm -i grafana/k6 run - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run -
```

</CodeGroup>

## Ramp VUs up and down in stages {#stages-ramping-up-down-vus}

You can ramp the number of VUs up and down during the test.
To configure ramping, use the `options.stages` property.


<CodeGroup labels={["stages.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

</CodeGroup>

For more granular ramp configuration, you can use [scenarios](/using-k6/scenarios) and the `ramping-vus` executor.

## Execution modes

<Blockquote mod="note" title="">

**Portability is a major design goal of k6.**

You can run the same test in different modes with minimal changes.

</Blockquote>

k6 supports three execution modes to run a k6 test: local, distributed, and cloud. 

- **Local**: the test execution happens entirely on a single machine, container, or CI server. 

  ```bash
  k6 run script.js
  ```

- **Distributed**: the test execution is [distributed across a Kubernetes cluster](https://k6.io/blog/running-distributed-tests-on-k8s/). 
  
  <CodeGroup labels={["Running", "k6-resource.yaml"]} lineNumbers={[true]}> 

  ```bash
  kubectl apply -f /path/k6-resource.yaml
  ```

  ```yml
  ---
  apiVersion: k6.io/v1alpha1
  kind: K6
  metadata:
    name: k6-sample
  spec:
    parallelism: 4
    script:
      configMap:
        name: "k6-test"
        file: "script.js"
  ```

  </CodeGroup>

- **Cloud**: the test runs on [k6 Cloud](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/) or [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/).

  ```bash
  k6 cloud script.js
  ```

  Additionally, cloud-based solutions can run cloud tests on your [own cloud infrastructure](https://grafana.com/docs/grafana-cloud/k6/author-run/private-load-zone-v2/), and accept the test results from a [local](/results-output/real-time/cloud/) or [distributed test](https://github.com/grafana/k6-operator#k6-cloud-output).

