---
title: 'gRPC'
excerpt: 'gRPC is a lightweight open-source RPC framework. Starting with k6 v0.29.0, we support unary gRPC requests.'
---

## Overview

[gRPC](https://grpc.io/) is a lightweight open-source RPC framework. It was originally developed by Google, with 1.0
being released in August 2016. Since then, it's gained a lot of attention as well as a wide adoption.

In comparison to JSON, which is transmitted as human-readable text, gRPC is binary, making it both
faster to transmit and more compact. In the benchmarks we've seen between gRPC and JSON-based REST,
gRPC has proved to be a lot faster than it's more traditional counterpart. The messages and services
used for gRPC are described in `.proto` files, containing [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) (protobuf) definitions.

Starting with k6 v0.29.0, we support unary gRPC requests via the [k6/net/grpc](/javascript-api/k6-net-grpc) built-in module.