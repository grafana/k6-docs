---
weight: 300
title: Browser Tests in Kubernetes
---

# Browser Tests in Kubernetes

This guide will help you get setup with k6 browser testing using the official `grafana/k6:latest-with-browser` image. We first explain how to make a simple setup for browser test, and then introduce requirements and how to integrate it with k6 Operator.

## Quick start (simplest Pod)

Start with the simplest Pod flow to verify that Chromium can launch in your cluster.

1. Create a `script.js` with a browser test: https://grafana.com/docs/k6/latest/using-k6-browser/write-your-first-browser-test/
2. Create a ConfigMap with your script:

```
kubectl create configmap script --from-file script.js
```

3. Create a Pod with `kubectl apply -f pod.yaml`, where `pod.yaml` looks like:

```
apiVersion: v1
kind: Pod
metadata:
 name: k6-browser-test
spec:
 containers:
   - name: k6
     image: grafana/k6:latest-with-browser
     command:
       - k6
     args:
       - run
       - /script/script.js
     resources:
       requests:
         cpu: "4"
         memory: "8G"
       limits:
         cpu: "4"
         memory: "8G"
     volumeMounts:
       - name: script
         mountPath: /script/script.js
         subPath: script.js
 volumes:
   - name: script
     configMap:
       name: script
```

4. Now wait and view the logs to see if it ran successfuly or not. We have some [troubleshooting](#troubleshooting) steps below that might help.

## Browser Runner Model (current vs proposed)

Today, `grafana/k6:latest-with-browser` bundles the k6 binary and Chromium in the same pod. Each k6 runner starts its own browser process, which is simple but heavy on CPU and memory.

There is an open proposal to split browser and k6 runners, enabling an M:N model (M k6 runners to N browser instances) and potentially improving resource efficiency. This is not implemented yet, but it is relevant for capacity planning and for teams running larger browser workloads: [#631](https://github.com/grafana/k6-operator/issues/631).

## Current image behavior (CPU rendering)

[`grafana/k6:latest-with-browser`](https://github.com/grafana/k6/blob/master/Dockerfile#L19) includes both the k6 binary and a Chromium build that uses SwiftShader (CPU rendering). This keeps setup simple but can be heavy on CPU and may not work well for apps that require GPU-backed rendering. We have an open issue for this which you can follow along for any updates: [#5571](https://github.com/grafana/k6/issues/5571).

## Performance and sizing recommendations

Browser tests are CPU- and memory-heavy. Start with higher limits to confirm stability, then scale down.

- Set CPU and memory to match (or exceed) a modern desktop machine for initial runs.
- Try to keep CPU/memory utilization under ~80% during steady-state.
- General guidance on running larger tests: https://grafana.com/docs/k6/latest/testing-guides/running-large-tests/

## Other requirements and prerequisites

This list may expand in the future, as we learn about new use cases of browser testing. Pay attention to the following:

- If you use `securityContext` or OpenShift SCCs/PSPs, verify the policy allows Chromium to start. Capture the exact error string in Troubleshooting so it is searchable.
- Chromium is sensitive to restrictive security policies. In particular, avoid overly aggressive capability drops without testing browser startup.

## Troubleshooting

- If Chromium crashes immediately:
  - It is often due to security policies preventing Chromium from starting.
  - In rare cases we have seen it occur due to trying to run the incorrect arch image on an incompatible arch, for example, running an image built for amd64 on an arm based machine.
- `Headless: true` is not supported in this environment. A common error looks like:
  `Missing X server or $DISPLAY\n[13:13:1211/091921.199737:ERROR:ui/aura/env.cc:257] The platform failed to initialize.  Exiting.`
- `capabilities.drop: all` is generally good security posture but can break Chromium. It requires more capabilities than most CLI workloads.
- Either add larger instances or reduce the CPU allocation if you see something like: `0/1 nodes are available: 1 Insufficient cpu. no new claims to deallocate, preemption: 0/1 nodes are available: 1 No preemption victims found for incoming pod.`. Keep in mind that reducing CPU might worsen the browser test result.
- `error building browser on IterStart: making browser data directory "/tmp/k6browser-data-...": read-only file system`  
  Fix: mount a writable `emptyDir` and set `TMPDIR` to that path (or mount `emptyDir` at `/tmp`). Example:

  ```yaml
  securityContext:
    readOnlyRootFilesystem: true
  env:
    - name: TMPDIR
      value: /var/tmp
  volumeMounts:
    - name: tmp
      mountPath: /var/tmp
  volumes:
    - name: tmp
      emptyDir: {}
  ```
- `Error from server (BadRequest): error when creating "plz.yaml": PrivateLoadZone in version "v1alpha1" cannot be handled as a PrivateLoadZone: strict decoding error: unknown field "spec.*.securityContext"`
  Fix: This is a known issue with the PLZ CRD. We are working on a solution to the `securityContext` object to the PLZ CRD: [#696](https://github.com/grafana/k6-operator/issues/696).

If you can't find the answer you are looking for, please open an [new issue](https://github.com/grafana/k6-operator/issues) with the relevant details so that we can try to reproduce the issue and help resolve it.

## References

- k6 with-browser Dockerfile: https://github.com/grafana/k6/blob/master/Dockerfile#L19
- Chromium capabilities reference: https://github.com/grafana/crocochrome/blob/main/doc/capabilities.md
- k6 browser test example: https://grafana.com/docs/k6/latest/using-k6-browser/write-your-first-browser-test/
- Large test sizing guidance: https://grafana.com/docs/k6/latest/testing-guides/running-large-tests/
- Chrome crashing in with-browser image, in podman and kubernetes: https://github.com/grafana/k6/issues/4338
