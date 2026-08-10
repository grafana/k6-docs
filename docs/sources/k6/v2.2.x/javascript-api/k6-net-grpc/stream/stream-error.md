---
title: 'Error'
head_title: 'gRPC.Error'
description: 'The error object of a gRPC stream.'
weight: 15
aliases:
  - ../../k6-experimental/grpc/stream/stream-error/ # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc/stream/stream-error/
---

# Error

The error object is the object that is passed to the `error` event handler function.

| Name            | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| `Error.code`    | number | A gRPC error code.                       |
| `Error.details` | array  | A list of details attached to the error. |
| `Error.message` | string | An original error message.               |
