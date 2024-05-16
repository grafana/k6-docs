---
weight: 100
title: Executing k6 scripts with TestRun CRD
---

# Executing k6 scripts with TestRun CRD

## Defining test scripts

There are several ways to configure scripts in `TestRun` CRD.
#The operator utilises `ConfigMap`s and `LocalFile` to serve test scripts to the jobs. To upload your own test script, run the following command to configure through `ConfigMap`:

### ConfigMap

The main way to configure script is to create a ConfigMap with the script contents:

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

{{% admonition type="note" %}}

There is a character limit of 1048576 bytes to a single configmap. If you need to have a larger test file, you'll need to use a volumeClaim or a localFile instead

{{% /admonition %}}

### VolumeClaim

If you have a PVC with the name `stress-test-volumeClaim` containing your script and any other supporting file(s), you can pass it to the test like this:

```yaml
spec:
  script:
    volumeClaim:
      name: "stress-test-volumeClaim"
      # test.js should exist inside /test/ folder.
      # All the js files and directories test.js is importing 
      # should be inside the same directory as well.
      file: "test.js"
```

The pods will expect to find script files in `/test/` folder. If `volumeClaim` fails, it's the first place to check: the latest initializer pod does not generate any logs and when it can't find the file, it will terminate with error. So missing file may not be that obvious and it makes sense to check it is present manually. See [GH issue](https://github.com/k6-operator/issues/143) for potential improvements.

#### Sample directory structure

```
├── test
│   ├── requests
│   │   ├── stress-test.js
│   ├── test.js
```

In the above example, `test.js` imports a function from `stress-test.js` and these files would look like this:

```js
// test.js
import stressTest from "./requests/stress-test.js";

export const options = {
  vus: 50,
  duration: '10s'
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

If the script is present in the filesystem of custom runner image, it can be accessed with `localFile` option:

```yaml
spec:
  parallelism: 4
  script:
    localFile: /test/test.js
  runner:
    image: <custom-image>
```

{{% admonition type="note" %}}

If there is any limitation on usage of `volumeClaim` in your cluster you can use the `localFile` option, but usage of `volumeClaim` is recommneded.

{{% /admonition %}}


### Multi-file tests

In case your k6 script is split between more than one JS file, you can simply create a ConfigMap with several data entries like this:

```bash
kubectl create configmap scenarios-test --from-file test.js --from-file utils.js
```

If there are too many files to specify manually, kubectl with folder might be an option as well:
```bash
kubectl create configmap scenarios-test --from-file=./test
```

Alternatively, you can create an archive with k6:
```bash
k6 archive test.js [args]
```

The above command will create an `archive.tar` in your current folder, unless `-O` option is used to change the name of the output archive. Then it is possible to put that archive into configmap similarly to JS script:
```bash
kubectl create configmap scenarios-test --from-file=archive.tar
```

In case of using an archive it must correctly set in your yaml for `TestRun` deployment:

```yaml
# ...
spec:
  script:
    configMap:
      name: "crocodile-stress-test"
      file: "archive.tar" # <-- change here
```

In other words, `file` option must be the correct entrypoint for `k6 run` command.


## Executing tests

Tests are executed by applying the custom resource `TestRun` to a cluster where the k6-operator is running. Additional optional properties of `TestRun` CRD allow you to control some key aspects of a distributed execution. For example:

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

`TestRun` CR is created with this command:

```bash
kubectl apply -f /path/to/your/k6-resource.yml
```

## Cleaning up resources

After completing a test run, you need to clean up the test jobs created. Manually this can be done by running the following command:

```bash
kubectl delete -f /path/to/your/k6-resource.yml
```

Alternatively, automatic deletion of all resources can be configured with `cleanup` option:
```yaml
spec:
  cleanup: "post"
```

With `cleanup` option set, k6-operator will remove `TestRun` CRD and all created resources once the test run is finished.

{{< section depth=2 >}}
