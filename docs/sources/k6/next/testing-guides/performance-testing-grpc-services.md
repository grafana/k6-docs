---
title: Performance testing gRPC services
description: Learn the basics of gRPC and how to write a gRPC performance test in k6.
weight: 350
---

# Performance testing gRPC services

In this guide, you'll learn the basics of gRPC and how to write a gRPC performance test using k6.

## Before you begin

- [Install k6 v0.29](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6/) or higher.

## What is gRPC

gRPC is a lightweight open source RPC framework. It was originally developed by Google, with 1.0 being released in August 2016.

In comparison to JSON, which is transmitted as human-readable text, gRPC is binary, making it both faster to transmit and more compact. For chatty, distributed systems, these improvements accumulate quickly, making the difference not only noticeable in benchmarks but also by the end-user.

### API types

gRPC supports four different types of RPCs: unary, server streaming, client streaming, and bi-directional streaming. In reality, the messages are multiplexed using the same connection, but in the spirit of keeping things simple and approachable, this isn't illustrated in the gRPC service model diagrams below.

#### Unary

Unary calls work the same way as a regular function call: a single request is sent to the server which in turn replies with a single response.

![Unary call](/media/docs/k6-oss/diagram-grpc-unary.png)

#### Server streaming

In server streaming mode, the client sends a single request to the server, which in turn replies with multiple responses.

![Server streaming](/media/docs/k6-oss/diagram-grpc-server.png)

#### Client streaming

The client streaming mode is the opposite of the server streaming mode. The client sends multiple requests to the server, which in turn replies with a single response.

![Client streaming](/media/docs/k6-oss/diagram-grpc-client.png)

#### Bi-directional streaming

In bi-directional streaming mode, both the client and the server may send multiple messages.

![Bi-directional streaming](/media/docs/k6-oss/diagram-grpc-bidirectional.png)

### The `.proto` definition

The messages and services used for gRPC are described in .proto files, containing [Protocol buffers](https://en.wikipedia.org/wiki/Protocol_Buffers), or protobuf, definitions.

The definition file is then used to generate code which can be used by both senders and receivers as a contract for communicating through these messages and services. As the binary format used by gRPC lacks any self-describing properties, this is the only way for senders and receivers to know how to interpret the messages.

For this guide, you can use the `quickpizza.proto` definition available for download on the [QuickPizza demo application GitHub repository](https://raw.githubusercontent.com/grafana/quickpizza/refs/heads/main/proto/quickpizza.proto). For details on how to build your own gRPC proto definition, refer to [the official gRPC docs](https://grpc.io/docs/what-is-grpc/core-concepts/).

```protobuf
syntax = "proto3";
option go_package = "pkg/grpc/quickpizza";
package quickpizza;

service GRPC {
    rpc Status(StatusRequest) returns (StatusResponse) {}
    rpc RatePizza(PizzaRatingRequest) returns (PizzaRatingResponse) {}
}

message StatusRequest {
}

message StatusResponse {
    bool ready = 1;
}

message PizzaRatingRequest {
    repeated string ingredients = 1;
    string dough = 2;
}

message PizzaRatingResponse {
    int32 stars_rating = 1;
}
```

## Write a gRPC performance test with k6

Starting with k6 v0.29.0, you can use a built-in module for gRPC communication. You can find more details for all the methods available on the [k6/net/grpc module documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/).

### Create the test

The gRPC module is a separate module, available from your test script as `k6/net/grpc`. Before you can use it, you first have to create an instance of the client. Instantiating the client, as well as the `load()` function, is only available during test initialization, that is, directly in the global scope.

<!-- md-k6:skip -->

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
```

Next, load a `.proto` definition applicable for the system under test. For the purpose of this article, you can use [QuickPizza](grpc-quickpizza.grafana.com:443). The `.load()` function takes two arguments, the first one being an array of paths to search for proto files, and the second being the name of the file to load.

<!-- md-k6:skip -->

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

// Download quickpizza.proto for grpc-quickpizza.grafana.com, located at:
// https://raw.githubusercontent.com/grafana/quickpizza/refs/heads/main/proto/quickpizza.proto
// and put it in the same folder as this script.
const client = new grpc.Client();
client.load(['definitions'], 'quickpizza.proto');
```

After that's done, add the rest of the test that calls the gRPC service.

<!-- md-k6:skip -->

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

// Download quickpizza.proto for grpc-quickpizza.grafana.com, located at:
// https://raw.githubusercontent.com/grafana/quickpizza/refs/heads/main/proto/quickpizza.proto
// and put it in the same folder as this script.
const client = new grpc.Client();
client.load(null, 'quickpizza.proto');

export default () => {
  client.connect('grpc-quickpizza.grafana.com:443', {
    // plaintext: false
  });

  const data = { ingredients: ['Cheese'], dough: 'Thick' };
  const response = client.invoke('quickpizza.GRPC/RatePizza', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
  sleep(1);
};
```

This test script does the following:

1. First, it uses the `.connect()` function to connect to the system under test. By default, the client will set `plaintext` to false, only allowing you to use encrypted connections. If you, for any reason, need to connect to a server that lacks SSL/TLS, just flip this setting to `true`.
1. The script then continues by creating the object you want to send to the remote procedure you're invoking. In the case of `RatePizza`, the object includes the ingredients for the pizza, and the type of dough.
1. Next, it invokes the remote procedure, using the syntax `<package>.<service>/<procedure>`, as described in the proto file. This call is made synchronously, with a default timeout of 60000 ms (60 seconds). To change the timeout, add the key `timeout` to the config object of `.connect()` with the duration as the value, for instance `'2s'` for 2 seconds.
1. After k6 receives a response from the server, the script checks to make sure the procedure executed successfully. The gRPC module includes constants for this comparison which are listed here. Comparing the response status with `grpc.StatusOK`, which is `200 OK` just like for HTTP/1.1 communication, ensures the call was completed successfully.
1. The script then logs the message in the response, closes the client connection, and sleeps for a second.

### Run the test

You can execute the test just like any other test by using the `k6 run` command:

```bash
$ k6 run grpc-example.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: grpc-example.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

INFO[0000] {"starsRating":3}                             source=console

     ✓ status is OK

     checks...............: 100.00% 1 out of 1
     data_received........: 4.1 kB  3.6 kB/s
     data_sent............: 762 B   656 B/s
     grpc_req_duration....: avg=33.75ms min=33.75ms med=33.75ms max=33.75ms p(90)=33.75ms p(95)=33.75ms
     iteration_duration...: avg=1.16s   min=1.16s   med=1.16s   max=1.16s   p(90)=1.16s   p(95)=1.16s
     iterations...........: 1       0.860427/s
     vus..................: 1       min=1      max=1
     vus_max..............: 1       min=1      max=1


running (00m01.2s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m01.2s/10m0s  1/1 iters, 1 per VU
```

From the output, you can check that the script is working and that the server indeed responds with a rating for the type of pizza supplied in the request body. You can also see that the `check` was successful, meaning the server responded with `200 OK`.

## Summary

In this article, you've gone through some of the fundamentals of gRPC and how it works. You also had a look at the k6 gRPC client and created a working test script demonstrating its functionality.

## Additional resources

- [k6 gRPC Module API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/)
- [k6 QuickPizza: A demo service for gRPC](grpc-quickpizza.grafana.com:443)
- [The official website of the gRPC project](https://grpc.io/).
- [Examples from the gRPC repository on GitHub](https://github.com/grpc/grpc/tree/master/examples).
