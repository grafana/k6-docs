---
title: 'gRPC'
excerpt: 'A partir de k6 v0.29.0, soportamos peticiones gRPC unarias a través del módulo incorporado `k6/net/grpc`.'
---

[gRPC](https://grpc.io/) es un marco RPC ligero de código abierto. Fue desarrollado originalmente por Google, y su versión 1.0 se publicó en agosto de 2016. Desde entonces, ha ganado mucha atención así como una amplia adopción.

En comparación con JSON, que se transmite como texto legible por humanos, gRPC es binario, por lo que es más rápido de transmitir y más compacto. En los benchmarks que hemos visto entre gRPC y REST basado en JSON, gRPC ha demostrado ser mucho más rápido que su contraparte más tradicional. Los mensajes y servicios utilizados por gRPC se describen en archivos `.proto`, que contienen definiciones de búferes de protocolo (protobuf).

A partir de k6 v0.29.0, soportamos peticiones gRPC unarias a través del módulo incorporado [k6/net/grpc](/javascript-api/k6-net-grpc).
