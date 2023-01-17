---
title: 'Expose your application'
excerpt: 'How to make your applications accessible from the test scripts.'
---

To access your application from the test scripts, you must assign it an external IP in the cluster where it's running.
How you do this depends on the platform you use to deploy the application.
The following sections explain the different approaches.

You can retrieve the external IP address and store in an environment variable (`SVC_IP` in this example) using the following command:

<CodeGroup labels={["Linux/MacOS", "Windows PowerShell"]}>

```bash
SVC_IP=$(kubectl -n <name space>  get svc <service name> --output jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

```Powershell
$Env:SVC_IP=$(kubectl -n <name space>  get svc <service name> --output jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

</CodeGroup>

## As a LoadBalancer service

A service of type [`LoadBalancer`](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/) receives an external IP from an external load-balancer provider.
How you configure the load balancer depends on the your cluster's deployment platform and configuration.
The following sections provide guidelines to expose your application when running in common development environments.
If your cluster is deployed in a public cloud, check your cloud provider documentation.

If the service that you want your tests to access is not defined as a load balancer, you can change the service type with the following command. The service will then receive an external IP.

<CodeGroup labels={["Linux/MacOS", "Windows PowerShell"]}>

```bash
kubectl -n <name space> patch svc <service name> -p '{"spec": {"type": "LoadBalancer"}}'
```

```bash
kubectl -n <name space> patch svc <service name> -p '{\"spec\": {\"type\": \"LoadBalancer\"}}'
```

</CodeGroup>


### Configuring a LoadBalancer in Kind

[Kind](https://kind.sigs.k8s.io/) is a tool to run local Kubernetes clusters using a Docker container to emulate nodes.
You can use kind for local development or CI.
Services deployed in a kind cluster can be exposed to be accessed from the host machine [using metallb as a load balancer](https://kind.sigs.k8s.io/docs/user/loadbalancer).

### Configuring a LoadBalancer in Minikube

[Minikube](https://github.com/kubernetes/minikube) implements a local Kubernetes cluster that supports different technologies to virtualize the cluster's infrastructure, such as containers, VMs or bare metal.

Minikube's tunnel command runs as a process, creating a network route on the host to the service CIDR of the cluster.
It uses the cluster’s IP address as a gateway. The tunnel command exposes the external IP directly to any program that is running on the host operating system.

```console
minikube tunnel
```