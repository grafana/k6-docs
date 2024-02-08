---
title: 'Error'
head_title: 'gRPC.Error'
description: 'The error object of a gRPC stream.'
weight: 15
---

# Error

{{< docs/shared source="k6" lookup="experimental-grpc-module.md" version="<K6_VERSION>" >}}

The error object is the object that is passed to the `error` event handler function.

| Name            | Type   | Description                           |
| --------------- | ------ | ------------------------------------- |
| `Error.code`    | number | A gRPC error code.                    |
| `Error.details` | array  | A list details attached to the error. |
| `Error.message` | string | An original error message.            |
