---
title: "Response"
---

| Name | Type | Description |
|------|------|-------------|
| `Response.status` | number | The response gRPC status code. Use the gRPC status constants to check equality. |
| `Response.message` | object | The successful protobuf message, serialized to JSON. Will be `null` if `status !== grpc.StatusOK`. |
| `Response.headers` | object | Key-value pairs representing all the metadata headers returned by the gRPC server. |
| `Response.trailers` | object | Key-value pairs representing all the metadata trailers returned by the gRPC server. |
| `Response.error` | object | If `status !== grpc.StatusOK` then the error protobuf message, serialized to JSON; otherwise `null`. |
