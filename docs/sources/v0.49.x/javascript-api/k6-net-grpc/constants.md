---
title: 'Constants'
description: 'Define constants to distinguish between gRPC Response'
weight: 40
---

# Constants

Define constants to distinguish between [gRPC Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response) statuses.

| Constant                   | Description                                                                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StatusOK`                 | OK is returned on success.                                                                                                                                                                                                   |
| `StatusCanceled`           | Canceled indicates the operation was canceled (typically by the caller).                                                                                                                                                     |
| `StatusUnknown`            | Unknown error.                                                                                                                                                                                                               |
| `StatusInvalidArgument`    | InvalidArgument indicates the client specified an invalid argument.                                                                                                                                                          |
| `StatusDeadlineExceeded`   | DeadlineExceeded means operation expired before completion.                                                                                                                                                                  |
| `StatusNotFound`           | NotFound means some requested entity (e.g., file or directory) was not found.                                                                                                                                                |
| `StatusAlreadyExists`      | AlreadyExists means an attempt to create an entity failed because one already exists.                                                                                                                                        |
| `StatusPermissionDenied`   | PermissionDenied indicates the caller does not have permission to execute the specified operation.                                                                                                                           |
| `StatusResourceExhausted`  | ResourceExhausted indicates some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.                                                                                   |
| `StatusFailedPrecondition` | FailedPrecondition indicates operation was rejected because the system is not in a state required for the operation's execution.                                                                                             |
| `StatusAborted`            | Aborted indicates the operation was aborted, typically due to a concurrency issue like sequencer check failures, transaction aborts, etc.                                                                                    |
| `StatusOutOfRange`         | OutOfRange means operation was attempted past the valid range. E.g., seeking or reading past end of file.                                                                                                                    |
| `StatusUnimplemented`      | Unimplemented indicates operation is not implemented or not supported/enabled in this service.                                                                                                                               |
| `StatusInternal`           | Internal errors. Means some invariants expected by the underlying system have been broken.                                                                                                                                   |
| `StatusUnavailable`        | Unavailable indicates the service is currently unavailable. This is a most likely a transient condition and may be corrected by retrying with a backoff. Note that it is not always safe to retry non-idempotent operations. |
| `StatusDataLoss`           | DataLoss indicates unrecoverable data loss or corruption.                                                                                                                                                                    |
| `StatusUnauthenticated`    | Unauthenticated indicates the request does not have valid authentication credentials for the operation.                                                                                                                      |

### Example

{{< code >}}

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('grpcbin.test.k6.io:9001', {
    // plaintext: false
  });

  const data = { greeting: 'Bert' };
  const response = client.invoke('hello.HelloService/SayHello', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  client.close();
  sleep(1);
};
```

{{< /code >}}
