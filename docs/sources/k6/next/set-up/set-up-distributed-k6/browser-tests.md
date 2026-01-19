---
weight: 300
title: Browser Tests in k8s
---

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

## Requirements and prerequisites

This list will expand as new constraints show up in real clusters:

- If you use `securityContext` or OpenShift SCCs/PSPs, verify the policy allows Chromium to start. Capture the exact error string in Troubleshooting so it is searchable.
- `runAsUser` specifics: https://github.com/grafana/k6/pull/4831
  - Context: running the `-with-browser` image under strict non-root policies could fail because Chromium needs certain permissions; see issue [#4597](https://github.com/grafana/k6/issues/4597).
  - PR [#4831](https://github.com/grafana/k6/pull/4831) adjusts the image user configuration to better support non-root execution in restricted clusters.
- Linux capabilities: https://github.com/grafana/crocochrome/blob/main/doc/capabilities.md
  - crocochrome launches Chromium as a different (nobody) user using `syscall.Credential`, which requires `cap_setuid`, `cap_setgid`, and `cap_kill`.
  - Those capabilities must be present both in the binary and in the container `securityContext` (bounding set), otherwise Chromium launch will fail or the container won’t start.
  - Setting `allowPrivilegeEscalation: false` effectively disables file capabilities (`no_new_privs`), so capabilities in the binary won’t take effect.
  - Recommended `securityContext` (from crocochrome docs):
    ```yaml
    securityContext:
      runAsNonRoot: true
      readOnlyRootFilesystem: true
      allowPrivilegeEscalation: false
      capabilities:
        add: ["setuid", "setgid", "kill"] # For dropping privileges and killing children.
        drop: ["all"]
    ```

## Browser Runner Model (current vs proposed)

Today, `grafana/k6:latest-with-browser` bundles the k6 binary and Chromium in the same pod. Each k6 runner starts its own browser process, which is simple but heavy on CPU and memory.

There is an open proposal to split browser and k6 runners, enabling an M:N model (M k6 runners to N browser instances) and potentially improving resource efficiency. This is not implemented yet, but it is relevant for capacity planning and for teams running larger browser workloads. Source: https://github.com/grafana/k6-operator/issues/631

## Current image behavior (CPU rendering)

`grafana/k6:latest-with-browser` includes both the k6 binary and a Chromium build that uses SwiftShader (CPU rendering). This keeps setup simple but can be heavy on CPU and may not work well for apps that require GPU-backed rendering. Source: https://github.com/grafana/k6/blob/master/Dockerfile#L19

## Performance and sizing recommendations

Browser tests are CPU- and memory-heavy. Start with higher limits to confirm stability, then scale down.

- Set CPU and memory to match (or exceed) a modern desktop machine for initial runs.
- Try to keep CPU/memory utilization under ~80% during steady-state.
- General guidance on running larger tests: https://grafana.com/docs/k6/latest/testing-guides/running-large-tests/

## Security and policy considerations

Chromium is sensitive to restrictive security policies. In particular, avoid overly aggressive capability drops without testing browser startup.

## Troubleshooting

- If Chrome crashes immediately, it is often due to security policies preventing Chromium from starting.
- `Headless: true` is not supported in this environment. A common error looks like:
  `Missing X server or $DISPLAY\n[13:13:1211/091921.199737:ERROR:ui/aura/env.cc:257] The platform failed to initialize.  Exiting.`
- `capabilities.drop: all` is generally good security posture but can break Chromium. It requires more capabilities than most CLI workloads.
- Reduce the CPU allocation if you see something like: `0/1 nodes are available: 1 Insufficient cpu. no new claims to deallocate, preemption: 0/1 nodes are available: 1 No preemption victims found for incoming pod.`.
- `error building browser on IterStart: making browser data directory "/tmp/k6browser-data-...": read-only file system`  
  Fix: mount a writable `emptyDir` and set `TMPDIR` to that path (or mount `emptyDir` at `/tmp`).

## References

- k6 with-browser Dockerfile: https://github.com/grafana/k6/blob/master/Dockerfile#L19
- Chromium capabilities reference: https://github.com/grafana/crocochrome/blob/main/doc/capabilities.md
- k6 browser test example: https://grafana.com/docs/k6/latest/using-k6-browser/write-your-first-browser-test/
- Large test sizing guidance: https://grafana.com/docs/k6/latest/testing-guides/running-large-tests/
