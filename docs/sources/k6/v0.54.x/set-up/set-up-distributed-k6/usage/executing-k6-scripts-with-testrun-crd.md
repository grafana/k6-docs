---
weight: 100
title: Run k6 scripts with TestRun CRD
---

# Run k6 scripts with TestRun CRD

This guide covers how you can configure your k6 scripts to run using the k6 Operator.

## Defining test scripts

There are several ways to configure scripts in the `TestRun` CRD. The operator uses `configMap`, `volumeClaim` and `localFile` to serve test scripts to the jobs.

### ConfigMap

The main way to configure a script is to create a `ConfigMap` with the script contents:

```bash
kubectl create configmap my-test --from-file /path/to/my/test.js
```

Then specify it in `TestRun`:

```bash
  script:
    configMap:
      name: my-test
      file: test.js
```

{{< admonition type="note" >}}

A single `ConfigMap` has a character limit of 1048576 bytes. If you need to have a larger test file, you have to use a `volumeClaim` or a `localFile` instead.

{{< /admonition >}}

### VolumeClaim

If you have a PVC with the name `stress-test-volumeClaim` containing your script and any other supporting files, you can pass it to the test like this:

```yaml
spec:
  script:
    volumeClaim:
      name: 'stress-test-volumeClaim'
      # test.js should exist inside /test/ folder.
      # All the js files and directories test.js is importing
      # should be inside the same directory as well.
      file: 'test.js'
```

The pods will expect to find the script files in the `/test/` folder. If `volumeClaim` fails, that's the first place to check. The latest initializer pod doesn't generate any logs and when it can't find the file, it exits with an error. Refer to [this GitHub issue](https://github.com/grafana/k6-operator/issues/143) for potential improvements.

#### Sample directory structure

```
├── test
│   ├── requests
│   │   ├── stress-test.js
│   ├── test.js
```

In the preceding example, `test.js` imports a function from `stress-test.js` and these files would look like this:

```js
// test.js
import stressTest from './requests/stress-test.js';

export const options = {
  vus: 50,
  duration: '10s',
};

export default function () {
  stressTest();
}
```

```js
// stress-test.js
import { sleep, check } from 'k6';
import http from 'k6/http';

export default () => {
  const res = http.get('https://test-api.k6.io');
  check(res, {
    'status is 200': () => res.status === 200,
  });
  sleep(1);
};
```

### LocalFile

If the script is present in the filesystem of a custom runner image, it can be accessed with the `localFile` option:

```yaml
spec:
  parallelism: 4
  script:
    localFile: /test/test.js
  runner:
    image: <custom-image>
```

{{< admonition type="note" >}}

If there is any limitation on the usage of `volumeClaim` in your cluster, you can use the `localFile` option. We recommend using `volumeClaim` if possible.

{{< /admonition >}}

### Multi-file tests

In case your k6 script is split between multiple JavaScript files, you can create a `ConfigMap` with several data entries like this:

```bash
kubectl create configmap scenarios-test --from-file test.js --from-file utils.js
```

If there are too many files to specify manually, using `kubectl` with a folder might be an option as well:

```bash
kubectl create configmap scenarios-test --from-file=./test
```

Alternatively, you can create an archive with k6:

```bash
k6 archive test.js [args]
```

The `k6 archive` command creates an `archive.tar` in your current folder. You can then use that file in the `configmap`, similarly to a JavaScript script:

```bash
kubectl create configmap scenarios-test --from-file=archive.tar
```

If you use an archive, you must edit your YAML file for the `TestRun` deployment so that the `file` option is set to the correct entrypoint for the `k6 run` command:

```yaml
# ...
spec:
  script:
    configMap:
      name: 'crocodile-stress-test'
      file: 'archive.tar' # <-- change here
```

## Run tests

Tests are executed by applying the custom resource `TestRun` to a cluster where the k6 Operator is running. Additional optional properties of the `TestRun` CRD allow you to control some key aspects of a distributed execution. For example:

```yaml
# k6-resource.yml

apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: k6-sample
spec:
  parallelism: 4
  script:
    configMap:
      name: k6-test
      file: test.js
  separate: false
  runner:
    image: <custom-image>
    metadata:
      labels:
        cool-label: foo
      annotations:
        cool-annotation: bar
    securityContext:
      runAsUser: 1000
      runAsGroup: 1000
      runAsNonRoot: true
    resources:
      limits:
        cpu: 200m
        memory: 1000Mi
      requests:
        cpu: 100m
        memory: 500Mi
  starter:
    image: <custom-image>
    metadata:
      labels:
        cool-label: foo
      annotations:
        cool-annotation: bar
    securityContext:
      runAsUser: 2000
      runAsGroup: 2000
      runAsNonRoot: true
```

A `TestRun` CR is created with this command:

```bash
kubectl apply -f /path/to/your/k6-resource.yml
```

## Clean up resources

After completing a test run, you need to clean up the test jobs that were created:

```bash
kubectl delete -f /path/to/your/k6-resource.yml
```

Alternatively, you can configure the automatic deletion of all resources with the `cleanup` option:

```yaml
spec:
  cleanup: 'post'
```

With the `cleanup` option set, k6 Operator removes the `TestRun` CRD and all created resources once the test run ends.
