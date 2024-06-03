---
weight: 400
title: Schedule k6 tests
---

# Schedule k6 tests

While the k6-operator doesn't support scheduling k6 tests directly, you can schedule tests with the `CronJob` object from Kubernetes directly. The `CronJob` would run on a schedule and execute the creation and deletion of the `TestRun` object.

Running these tests requires a little more setup than a standalone test run.

## Create a `ConfigMap` with k6 scripts

Refer to [Run k6 scripts with `TestRun` CRD](https://grafana.com/docs/k6/<K6_VERSION>/set-up/set-up-distributed-k6/usage/executing-k6-scripts-with-testrun-crd/) for details on how to create a `ConfigMap` with k6 scripts.

## Create a ConfigMap of the YAML file for the `TestRun` job

<!-- TODO: add a proper description for default installations: for bundle & Helm  -->

When using the `make deploy` installation method, add a `configMapGenerator` to the `kustomization.yaml`:

```yaml
configMapGenerator:
  - name: <test-name>-config
    files:
      - <test-name>.yaml
```

## Create a `ServiceAccount` for the `CronJob`

For the `CronJob` to be able to create and delete `TestRun` objects, create a service account:

```yaml
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: k6-<namespace>
rules:
  - apiGroups:
      - k6.io
    resources:
      - testruns
    verbs:
      - create
      - delete
      - get
      - list
      - patch
      - update
      - watch
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: k6-<namespace>
roleRef:
  kind: Role
  name: k6-<namespace>
  apiGroup: rbac.authorization.k8s.io
subjects:
  - kind: ServiceAccount
    name: k6-<namespace>
    namespace: <namespace>
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: k6-<namespace>
```

## Create a `CronJob`

This is an example of how to define a `CronJob` in a YAML file:

```yaml
# snapshotter.yml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: <test-name>-cron
spec:
  schedule: '<cron-schedule>'
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccount: k6
          containers:
            - name: kubectl
              image: bitnami/kubectl
              volumeMounts:
                - name: k6-yaml
                  mountPath: /tmp/
              command:
                - /bin/bash
              args:
                - -c
                - 'kubectl delete -f /tmp/<test-name>.yaml; kubectl apply -f /tmp/<test-name>.yaml'
          restartPolicy: OnFailure
          volumes:
            - name: k6-yaml
              configMap:
                name: <test-name>-config
```
