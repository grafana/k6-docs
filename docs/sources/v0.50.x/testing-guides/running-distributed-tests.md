---
title: 'Running distributed tests'
description: 'How to run distributed tests in Kubernetes'
weight: 05
---

# Running distributed tests

It has already been established that k6 can [run large load tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/running-large-tests) from a single instance, but what about _multiple instances running a single test_?

Several reasons why you may wish to run a distributed test include:

- Your [system under test](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#system-under-test) (SUT) should be accessed from multiple IP addresses.
- A fully optimized node cannot produce the load required by your extremely large test.
- Kubernetes is already your preferred operations environment.

For scenarios such as these, we've created the [k6-operator](https://github.com/grafana/k6-operator).

## Introducing k6-operator

[k6-operator](https://github.com/grafana/k6-operator) is an implementation of the [operator pattern](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#operator-pattern) in Kubernetes, defining [custom resources](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#custom-resource) in Kubernetes.
The intent is to automate tasks that a _human operator_ would normally do; tasks like provisioning new application components, changing configurations, or resolving run-time issues.

The k6-operator defines the custom `TestRun` resource type and listens for changes to, or creation of, `TestRun` objects.
Each `TestRun` object references a k6 test script, configures the environment, and specifies the number of instances, as `parallelism`, for a test run.
Once a change is detected, the operator will react by modifying the cluster state, spinning up k6 test jobs as needed.

## Get started with k6-operator

Let's walk through the process for getting started with the k6-operator.
The only requirement being access to a Kubernetes cluster and having the appropriate access and tooling.

{{% admonition type="note" %}}

This process can be performed on a local Kubernetes cluster running within [Docker](https://docs.docker.com/get-docker/)!
Using [kind](https://kind.sigs.k8s.io/) or [k3d](https://k3d.io/) are awesome options to experiment with the process.

{{% /admonition %}}

- [Introducing k6-operator](#introducing-k6-operator)
- [Get started with k6-operator](#get-started-with-k6-operator)
- [1. Install the operator](#1-install-the-operator)
- [2. Create a test script](#2-create-a-test-script)
- [3. Add test scripts](#3-add-test-scripts)
  - [Add as a ConfigMap](#add-as-a-configmap)
  - [Add inside a PersistentVolume](#add-inside-a-persistentvolume)
- [4. Create a custom resource](#4-create-a-custom-resource)
  - [Script in a ConfigMap](#script-in-a-configmap)
  - [Script in a PersistentVolume](#script-in-a-persistentvolume)
  - [Configure the environment](#configure-the-environment)
  - [Change command-line arguments](#change-command-line-arguments)
- [5. Run your test](#5-run-your-test)
- [6. When things go wrong](#6-when-things-go-wrong)
- [See also](#see-also)

## 1. Install the operator

The first step to running distributed tests in Kubernetes is to install the operator if not already installed in the cluster.
At this time, installation does require having the project source code downloaded onto your system.
Installation commands must be run from the source directory.

{{% admonition type="note" %}}

Besides privileged access to a Kubernetes cluster, installation will require that the system performing the installation has the following tools installed:

- [Git](https://git-scm.com/downloads)
- [Go](https://go.dev/doc/install)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)
- [Make](https://www.gnu.org/software/make/)

{{% /admonition %}}

From your command-line, execute the following:

```shell
git clone https://github.com/grafana/k6-operator && cd k6-operator
```

Ensure that your `kubectl` tool is set for the appropriate Kubernetes cluster.
Then, from the `k6-operator` directory, you may now perform the installation:

```shell
make deploy
```

By default, the operator will be installed into a new namespace, `k6-operator-system`.
You can verify the successful installation by listing available resources within the namespace:

```shell
kubectl get pod -n k6-operator-system
```

After a few moments, your resulting status should become `Running` as shown below:

{{< code >}}

```bash
NAME                                              READY   STATUS    RESTARTS   AGE
k6-operator-controller-manager-7664957cf7-llw54   2/2     Running   0          160m
```

{{< /code >}}

You are now ready to start create and execute test scripts!

## 2. Create a test script

Creating k6 test scripts for Kubernetes is no different from creating the script for the command-line.
If you haven’t already created test cases for your system, then we suggest having a read through one of our guides for creating tests for websites and APIs/microservices:

- [Website testing guide](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/load-testing-websites)
- [API testing guide](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/api-load-testing)

In general, it is advised to start small and expand on your scripts over iterations.
So let's start simple and create a `test.js` with the following content:

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  http.get('https://test.k6.io/');
  sleep(1);
}
```

{{< /code >}}

{{% admonition type="note" %}}

While creating scripts, [run them locally](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6#running-local-tests) before publishing to your cluster.
This can give you immediate feedback if you have errors in your script.

{{% /admonition %}}

Let's go ahead and verify our script is valid by performing a brief test:

```shell
k6 run test.js
```

We should see a successful execution and resulting output summary.

## 3. Add test scripts

In order for your test scripts to be run, they must be published into your cluster.
Two main methods for this are using [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) or [PersistentVolume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) resources.

### Add as a ConfigMap

Using a `ConfigMap` is a quick and straightforward mechanism for adding your test scripts to Kubernetes.
The `kubectl` tool provides a convenient method to create a new `ConfigMap` from a local script.

Let's create our ConfigMap as `my-test` with the content of our `test.js` script we created in the previous step:

```shell
kubectl create configmap my-test --from-file test.js
```

{{% admonition type="caution" %}}

Limitations exist on how large your test script can be when deployed within a `ConfigMap`.
Kubernetes imposes a size limit of 1,048,576 bytes (1 MiB) for the data, therefore if your test scripts exceed this limit, you'll need to mount a `PersistentVolume`.

Check the [motivations](https://kubernetes.io/docs/concepts/configuration/configmap/#motivation) for when you should use a `ConfigMap` versus a `PersistentVolume`.

{{% /admonition %}}

You should see confirmation with `configmap/my-test created`.

### Add inside a PersistentVolume

Setting up a `PersistentVolume` is beyond the scope of this guide, but enables access to a shared filesystem from your Kubernetes cluster via `PersistentVolumeClaim`.

When using this option, organize your test scripts in the applicable filesystem just as you would locally.
This mechanism is ideal when breaking up monolithic scripts into reusable [modules](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules).

{{% admonition type="note" %}}

Organizing your test scripts was part of the discussion during [episode #76](https://www.youtube.com/watch?v=zDtEzp_JUOE&utm=k6-guides) of k6 Office Hours.

{{% /admonition %}}

{{% admonition type="caution" %}}

When using a `PersistentVolume`, the operator will expect all test scripts to be contained within a directory named `/test/`.

{{% /admonition %}}

To learn more about creating `PersistentVolume` and `PersistentVolumeClaim` resources, review the [Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

## 4. Create a custom resource

During [installation](#1-install-the-operator), the `TestRun` [Custom Resource definition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) was added to the Kubernetes API.
The data we provide in the custom resource `TestRun` object should contain all the information necessary for the k6-operator to start a distributed load test.

Specifically, the main elements defined within the `TestRun` object relate to the name and location of the test script to run, and the amount of [parallelism](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#parallelism) to utilize.

{{% admonition type="note" %}}

The `TestRun` custom resource provides many configuration options to control the initialization and execution of tests.
For the full listing of possible options, please refer to the project [source](https://github.com/grafana/k6-operator/blob/main/config/crd/bases/k6.io_testruns.yaml) and [README](https://github.com/grafana/k6-operator/blob/main/README.md).

{{% /admonition %}}

The following examples will show some common variations for the custom resource:

### Script in a ConfigMap

When the test script to be executed is contained within a `ConfigMap` resource, we specify the script details within the `configMap` block of [YAML](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#yaml).
The `name` is the name of the ConfigMap and the `file` is the key-value for the entry.

Let's create the file `run-k6-from-configmap.yaml` with the following content:

{{< code >}}

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: run-k6-from-configmap
spec:
  parallelism: 4
  script:
    configMap:
      name: my-test
      file: test.js
```

{{< /code >}}

Recall when the script was [added as a ConfigMap](#add-as-a-configmap) for our configuration values.
We created the ConfigMap named `my-test`.
The test script content was added to the map using the filename as the key-value, therefore the `file` value is `test.js`.

The amount of `parallelism` is up to you; how many pods do you want to split the test amongst?
The operator will split the workload between the pods using [execution segments](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#execution-segment).

{{% admonition type="caution" %}}

It is important that the `ConfigMap` and `CustomResource` are created in the same [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

{{% /admonition %}}

### Script in a PersistentVolume

If the test script to be executed is contained within a `PersistentVolume`, creation of a [PersistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) will be required.
We won't go into the details of PersistentVolumes and PersistentVolumeClaims, but to learn more, you should review the [Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

Assume we've created a `PersistentVolumeClaim` named `my-volume-claim` against a `PersistentVolume` containing the test script `/test/test.js`, we can create the file `run-k6-from-volume.yaml` with the following content:

{{< code >}}

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: run-k6-from-volume
spec:
  parallelism: 4
  script:
    volumeClaim:
      name: my-volume-claim
      # File is relative to /test/ directory within volume
      file: test.js
```

{{< /code >}}

{{% admonition type="caution" %}}

It is important that the `PersistentVolumeClaim` and `CustomResource` are created in the same [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

{{% /admonition %}}

### Configure the environment

Not everything should be included directly in your scripts.
Well written scripts will allow for variability to support multiple scenarios and to avoid hard-coding values that tend to change.
These could be anything from passwords to target urls, in addition to system options.

We can pass this data as [environment variables](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#environment-variables) for use with each pod executing your script.
This can be defined explicitly within the `TestRun` resource, or by referencing a `ConfigMap` or `Secret`.

{{< code >}}

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: run-k6-with-vars
spec:
  parallelism: 4
  script:
    configMap:
      name: my-test
      file: test.js
  runner:
    env:
      - name: MY_CUSTOM_VARIABLE
        value: 'this is my variable value'
    envFrom:
      - configMapRef:
          name: my-config-vars
      - secretRef:
          name: my-secrets-vars
```

{{< /code >}}

{{% admonition type="note" %}}

The above YAML introduces the `runner` section. This section applies to each pod that will be running a portion of your test, based upon the desired `parallelism`.

{{% /admonition %}}

Now, with the referenced resources, our test scripts can [use environment variables](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/environment-variables) as in the following:

```javascript
export function setup() {
  console.log(`Variable is set as: ${__ENV.MY_CUSTOM_VARIABLE}`);
}
```

### Change command-line arguments

[k6 options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/) can be specified in many ways, one being the command-line.
Specifying options via command-line can still be accomplished when using the operator as shown with the following example:

{{< code >}}

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: run-k6-with-args
spec:
  parallelism: 4
  script:
    configMap:
      name: my-test
      file: test.js
  arguments: --tag testid=run-k6-with-args --log-format json
```

{{< /code >}}

With the above arguments, we're adding a [test-wide custom tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#test-wide-tags) to metrics and changing the output format of logs to [JSON](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#json).

{{% admonition type="note" %}}

Be sure to visit the [options reference](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference) for a listing of available options.

{{% /admonition %}}

## 5. Run your test

Tests are executed by applying the custom resource `TestRun` to a cluster where the operator is running.
The test configuration is applied as in the following:

```shell
kubectl apply -f /path/to/your/k6-resource.yaml
```

After completing a test run, you need to clean up the test jobs created.
This is done by running the following command:

```shell
kubectl delete -f /path/to/your/k6-resource.yaml
```

{{% admonition type="note" %}}

If you make use of [real-time results output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time), e.g. [Prometheus Remote Write](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write), use the `cleanup` option to automatically remove resources upon test completion as with the following example:

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: run-k6-with-realtime
spec:
  parallelism: 4
  # Removes all resources upon completion
  cleanup: post
  script:
    configMap:
      name: my-test
      file: test.js
  arguments: -o experimental-prometheus-rw
```

{{% /admonition %}}

## 6. When things go wrong

Sadly nothing works perfectly all the time, so knowing where you can go for help is important.

Be sure to search the [k6-operator category in the community forum](https://community.grafana.com/c/grafana-k6/k6-operator/73).
k6 has a growing and helpful community of engineers working with k6-operator, so there's a good chance your issue has already been discussed and overcome.
It's also in these forums where you'll be able to get help from members of the k6 development team.

## See also

Here are some additional resources to help on your learning journey:

- [Distributed load testing using Kubernetes with k6 (k6 Office Hours #72)](https://www.youtube.com/watch?v=5d5zxsGz8L4)
- [Demo for k6-operator](https://github.com/javaducky/demo-k6-operator)
- [Blog: Running distributed k6 tests on Kubernetes](https://k6.io/blog/running-distributed-tests-on-k8s/)
