---
title: "k6/net/grpc"
excerpt: "k6 gRPC API"
---

The `k6/net/grpc` module, added in k6 v0.29.0, provides a [gRPC](https://grpc.io/) client for Remote Procedure Calls (RPC) over HTTP/2.

<Blockquote mod="warning">

The k6 gRPC API is currently considered in beta and is subject to change. Future k6 versions might have slight differences in the method and type signatures described in this documentation.

</Blockquote>

| Class/Method | Description |
|--------------|-------------|
| [Client](/javascript-api/k6-net-grpc/client) | gRPC client used for making RPC calls to a gRPC Server |
| [Client.load(importPaths, ...protoFiles)](/javascript-api/k6-net-grpc/client/client-load-importpaths----protofiles) | Loads and parses the given protocol buffer definitions to be made available for RPC requests. |
| [Client.connect(address [,params])](/javascript-api/k6-net-grpc/client/client-connect-address-params) | Connects to a given gRPC service. |
| [Client.invoke(url, request [,params])](/javascript-api/k6-net-grpc/client/client-invoke-url-request-params) | Makes an unary RPC for the given service/method and returns a [Response](/javascript-api/k6-net-grpc/response). |
| [Client.close()]() | Close the connection to the gRPC service. |
| [Params](/javascript-api/k6-net-grpc/params) | RPC Request specific options. |
| [Response](/javascript-api/k6-net-grpc/response) | Returned by RPC requests. |

| Constant | Description |
|----------|-------------|
| `StatusOK` | OK is returned on success. |
| `StatusCanceled` | Canceled indicates the operation was canceled (typically by the caller). |
| `StatusUnknown` | Unknown error. |
| `StatusInvalidArgument` | InvalidArgument indicates the client specified an invalid argument. |
| `StatusDeadlineExceeded` | DeadlineExceeded means operation expired before completion. |
| `StatusNotFound` | NotFound means some requested entity (e.g., file or directory) was not found. |
| `StatusAlreadyExists` | AlreadyExists means an attempt to create an entity failed because one already exists. |
| `StatusPermissionDenied` | PermissionDenied indicates the caller does not have permission to execute the specified operation. |
| `StatusResourceExhausted` | ResourceExhausted indicates some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space. |
| `StatusFailedPrecondition` | FailedPrecondition indicates operation was rejected because the system is not in a state required for the operation's execution. |
| `StatusAborted` | Aborted indicates the operation was aborted, typically due to a concurrency issue like sequencer check failures, transaction aborts, etc. |
| `StatusOutOfRange` | OutOfRange means operation was attempted past the valid range. E.g., seeking or reading past end of file. |
| `StatusUnimplemented` | Unimplemented indicates operation is not implemented or not supported/enabled in this service. |
| `StatusInternal` | Internal errors. Means some invariants expected by the underlying system have been broken. |
| `StatusUnavailable` | Unavailable indicates the service is currently unavailable. This is a most likely a transient condition and may be corrected by retrying with a backoff. Note that it is not always safe to retry non-idempotent operations. |
| `StatusDataLoss` | DataLoss indicates unrecoverable data loss or corruption. |
| `StatusUnauthenticated` | Unauthenticated indicates the request does not have valid authentication credentials for the operation. |
