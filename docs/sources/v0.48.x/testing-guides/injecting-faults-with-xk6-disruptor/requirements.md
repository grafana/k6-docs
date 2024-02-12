---
title: 'Requirements'
description: 'Requirements for using xk6-disruptor in your test scripts'
weight: 02
---

# Requirements

The xk6-disruptor is a k6 extension.
To use it in a k6 test script, you need to bundle a k6 extension that includes the disruptor.
Refer to the [Installation](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/installation) section for instructions on how to get this custom build.

xk6-disruptor needs to interact with the Kubernetes cluster on which the application under test is running.
To do so, you must have the credentials to access the cluster in a [kubeconfig](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) file.
Ensure that this file is pointed to by the `KUBECONFIG` environment variable or that it is located at the default location, `$HOME/.kube/config`.

{{% admonition type="note" %}}

xk6-disruptor requires Kubernetes version 1.23 or higher

{{% /admonition %}}

`xk6-disruptor` requires the [grafana/xk6-disruptor-agent](https://github.com/grafana/xk6-disruptor/pkgs/container/xk6-disruptor-agent) image for injecting the [disruptor agent](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/how--it-works) into the disruption targets. Kubernetes clusters can be configured to restrict the download of images from public repositories. You need to ensure this image is available in the cluster where the application under test is running. Additionally, the xk6-disruptor-agent must run with network access privileges. Kubernetes clusters [can be configured to restrict the privileges of containers](https://kubernetes.io/docs/concepts/security/pod-security-admission/).
If you find an error similar to the following when using the xk6-disruptor, contact your cluster administrator and request the necessary privileges.

> ERROR\[0000\] error creating PodDisruptor: pods "nginx" is forbidden: violates PodSecurity "baseline:latest": non-default capabilities (container "xk6-agent" must not include "NET_ADMIN", "NET_RAW" in securityContext.capabilities.add)

You also need to ensure your test application is accessible from the machine where the tests run.
Refer to [Expose your application](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/expose--your-application) section for instructions on how to make your application available from outside the Kubernetes cluster..
