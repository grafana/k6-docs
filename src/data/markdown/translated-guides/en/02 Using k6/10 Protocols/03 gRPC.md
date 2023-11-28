---
title: 'gRPC'
excerpt: 'gRPC is a lightweight open-source RPC framework. Starting with k6 v0.29.0, we support unary gRPC requests.'
canonicalUrl: https://grafana.com/docs/k6/latest/using-k6/protocols/grpc/
---

## Overview

[gRPC](https://grpc.io/) is a lightweight, open-source RPC framework.
It was originally developed by Google, with version 1.0 released in August 2016.
Since then, it's gained much attention and wide adoption.

Whereas JSON transmits as human-readable text, gRPC is binary.
The binary format makes data transfer faster and more compact.
In the benchmarks we've seen, gRPC has proved much faster than REST, gRPC's more traditional, JSON-based counterpart.
The messages and services used for gRPC are described in `.proto` files, containing definitions for [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) (protobuf).

k6 also supports unary gRPC requests to the [k6/net/grpc](/javascript-api/k6-net-grpc) built-in module.
For further information, read [our tutorial about performance testing gRPC services](https://k6.io/blog/performance-testing-grpc-services/).
