---
title: 'HTTP/2'
excerpt: ''
---

HTTP/2.0 es la última versión del protocolo HTTP e introduce algunas mejoras importantes en comparación con su predecesor. La principal es la introducción de un protocolo de hilo binario con flujos multiplexados a través de una única conexión TCP. Esto resuelve un antiguo problema de rendimiento de HTTP/1.1, [el bloqueo de cabecera](https://en.wikipedia.org/wiki/Head-of-line_blocking).

Bueno, al menos lo resuelve parcialmente, ya que todavía hay mecanismos de control de la congestión TCP que interfieren con la naturaleza independiente prevista de los flujos multiplexados en los casos de paquetes perdidos/atrapados y de retransmisión/remontaje. La solución completa es ejecutar HTTP/2.0 sobre UDP, que es lo que Google implementó con QUIC.

## Características adicionales de HTTP/2.0

- Compresión integrada de las cabeceras HTTP
- Push del servidor
- Canalización de solicitudes
- Priorización de solicitudes

## HTTP/2 con k6

Cuando realizas peticiones HTTP en k6, éste actualiza automáticamente la conexión a HTTP/2.0 si el servidor lo soporta, al igual que lo haría tu navegador web. Puedes comprobar qué protocolo se ha utilizado para una petición concreta mirando la propiedad `proto` del objeto de respuesta.

<CodeGroup labels={["Check if protocol used for request is HTTP/2.0"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://test-api.k6.io/');
  check(res, {
    'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0',
  });
  sleep(1);
}
```

</CodeGroup>

Para más información sobre los valores que puede tener el campo `r.proto`, consulte la siguiente documentación: 

- [k6 HTTP](/javascript-api/k6-http/response)
- https://http2.github.io/http2-spec/#versioning
