---
title: "Protocols"
excerpt: "Out of the box k6 comes with support for a few protocols: HTTP / WebSockets / gRPC / ..."
---
Out of the box k6 comes with support for the following protocols:

* HTTP/1.1
* [HTTP/2](/using-k6/protocols/http-2)
* [WebSockets](/using-k6/protocols/websockets)
* [gRPC](/using-k6/protocols/grpc)

k6 will use HTTP/1.1 by default when it contacts a server. If, after connection, the server
reports to k6 that it supports [HTTP/2](/using-k6/protocols/http-2), k6 will upgrade the
connection to HTTP/2 instead. This is all automatic - both the use of HTTP/1.1 initially and
the potential protocol upgrade, and you don't have to do anything special when using k6 to
enable either HTTP/1.1 or HTTP/2. You might want to verify which protocol is actually being
used for a transaction though, which requires an extra step.

[WebSockets](/using-k6/protocols/websockets) is a little bit different, the structure of the
test and the VU lifecycle is different.

k6 v0.29.0 introduced [xk6](https://k6.io/blog/extending-k6-with-xk6) allowing the community 
to build k6 extensions and therefore add support for additional protocols. 

k6 community contributed extensions for SQL, Kafka, ZeroMQ, Redis, and other protocols. 
Full list can be found on [GitHub](https://github.com/topics/xk6). 
