---
title: 'Expose your application'
description: 'How to make your applications accessible from the test scripts.'
weight: 04
aliases:
  - ./expose--your-application/
---

# Expose your application

To access your application from the test scripts, you must assign it an external IP in the cluster where it's running.
How you do this depends on the platform you use to deploy the application.
The following sections explain the different approaches.

## Using port-forwarding

`kubectl`'s `port-forward` command allows accessing applications running in a Kubernetes cluster using a local port.

For example, the following command will make `my-service`'s port `80` accessible as `localhost:8080`:

```bash
kubectl port-forward svc/my-service 8080:80
Forwarding from 127.0.0.1:8080 -> 80
```

### Limitations using port forwarding

To be able to inject faults, `xk6-disruptor` must [install an agent on each target](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/how--it-works) that intercepts the requests and applies the desired disruptions. This process requires any existing connection to the targets to be redirected to the agent.

Due to an existing bug in `kubectl`, the process of installing the disruptor can potentially [break the port forwarding](https://github.com/grafana/xk6-disruptor/issues/254). Notice that this issue happens only if the faults are injected in the service that is exposed using port forward. If the faults are injected in another service not exposed by port-forwarding, there shouldn't be any issue.

Until this issue is solved in `kubectl`, tests using port forwarding to access a service should ensure the agent is installed in the targets before any traffic is sent by the test.

The simplest way to accomplish this is to ensure the scenario that executes the load (#2) starts after the scenario that injects the faults (#1):

```js
    scenarios: {
        disrupt: {   // #1 inject faults
            executor: 'shared-iterations',
            iterations: 1,
            vus: 1,
            exec: "disrupt",
            startTime: "0s",
        },
        load: {   // #2 execute load
            executor: 'constant-arrival-rate',
            rate: 100,
            preAllocatedVUs: 10,
            maxVUs: 100,
            exec: "default",
            startTime: '20s',  // give time for the agents to be installed
            duration: "30s",
        }
     }
```

## As a LoadBalancer service

A service of type [`LoadBalancer`](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/) receives an external IP from an external load-balancer provider.
How you configure the load balancer depends on the your cluster's deployment platform and configuration.
The following sections provide guidelines to expose your application when running in common development environments.
If your cluster is deployed in a public cloud, check your cloud provider documentation.

If the service that you want your tests to access is not defined as a load balancer, you can change the service type with the following command. The service will then receive an external IP.

{{< code >}}

```bash
kubectl -n <name space> patch svc <service name> -p '{"spec": {"type": "LoadBalancer"}}'
```

```windows-powershell
kubectl -n <name space> patch svc <service name> -p '{\"spec\": {\"type\": \"LoadBalancer\"}}'
```

{{< /code >}}

You can retrieve the external IP address and store it in an environment variable (`SVC_IP` in this example) using the following command:

{{< code >}}

```bash
SVC_IP=$(kubectl -n <name space>  get svc <service name> --output jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

```windows-powershell
$Env:SVC_IP=$(kubectl -n <name space>  get svc <service name> --output jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

{{< /code >}}

### Configuring a LoadBalancer in Kind

[Kind](https://kind.sigs.k8s.io/) is a tool to run local Kubernetes clusters using a Docker container to emulate nodes.
You can use kind for local development or CI.
Services deployed in a kind cluster can be exposed to be accessed from the host machine [using metallb as a load balancer](https://kind.sigs.k8s.io/docs/user/loadbalancer).

### Configuring a LoadBalancer in Minikube

[Minikube](https://github.com/kubernetes/minikube) implements a local Kubernetes cluster that supports different technologies to virtualize the cluster's infrastructure, such as containers, VMs or bare metal.

Minikube's tunnel command runs as a process, creating a network route on the host to the service CIDR of the cluster.
It uses the cluster’s IP address as a gateway. The tunnel command exposes the external IP directly to any program that is running on the host operating system.

```bash
minikube tunnel
```
