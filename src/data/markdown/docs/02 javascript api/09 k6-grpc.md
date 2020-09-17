---
title: "k6/grpc"
excerpt: "k6 gRPC API"
---

The k6/grpc modules provides a [gRPC](https://grpc.io/) client for Remote Procedure Calls (RPC) over HTTP/2.

| Function | Description |
|----------|-------------|
| [newClient()](/javascript-api/k6-grpc/newclient) | Creates a new [Client](/javascript-api/k6-grpc/client) that can be used to connect and make RPCs to a gRPC server. |

| Class/Method | Description |
|--------------|-------------|
| [Client](/javascript-api/k6-grpc/client) | gRPC client used for making RPC calls to a gRPC Server |
| [Client.load(importPaths, ...protoFiles)](/javascript-api/k6-grpc/client/client-load-importpaths----protofiles) | Loads and parses the given protocol buffer definitions to be made available for RPC requests. |
| [Client.connect(address [,params])]() | Connects to a given gRPC service. |
| [Client.invokeRPC(url, request [,params])]() | Makes a unary RPC for the given service/method and returns a [Response](). |
| [Client.close()]() | Close the connection to the gRPC service. |
