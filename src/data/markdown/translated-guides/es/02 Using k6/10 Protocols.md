---
title: "Protocolos"
excerpt: "Por defecto, k6 viene con suporte para los siguientes protocolos: HTTP/1.1, HTTP/2, WebSockets y gRPC. k6 soporta otros protocols por medio de Extensiones/Plugins."
---
Por defecto, k6 viene con suporte para los siguientes protocolos:

* HTTP/1.1
* [HTTP/2](/es/usando-k6/protocolos/http-2/)
* [WebSockets](/es/usando-k6/protocolos/websockets/)
* [gRPC](/es/usando-k6/protocolos/grpc/)


k6 utilizará HTTP/1.1 por defecto cuando contacte con un servidor. Si, tras la conexión, el servidor informa a k6 de que soporta HTTP/2, k6 actualizará la conexión a HTTP/2 en su lugar. Todo esto es automático - tanto el uso de HTTP/1.1 inicialmente como la potencial actualización del protocolo, y no tiene que hacer nada especial al usar k6 para activar HTTP/1.1 o HTTP/2. Sin embargo, es posible que desee verificar qué protocolo se está utilizando realmente para una transacción, lo que requiere un paso adicional.

[WebSockets](/es/usando-k6/protocolos/websockets/) es un poco diferente, la estructura de la prueba y el ciclo de vida de los VU es diferente.

k6 v0.29.0 introdujo [xk6](https://k6.io/blog/extending-k6-with-xk6) permitiendo a la comunidad construir extensiones de k6 y por tanto añadir soporte para protocolos adicionales.

La comunidad k6 contribuyó con extensiones para SQL, Kafka, ZeroMQ, Redis y otros protocolos. La lista completa se puede encontrar en [GitHub](https://github.com/topics/xk6).
