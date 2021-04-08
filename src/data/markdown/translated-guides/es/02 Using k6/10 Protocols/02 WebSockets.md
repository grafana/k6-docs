---
title: 'WebSockets'
excerpt: 'Comparando las pruebas basadas en HTTP con las de WebSocket, hay algunas diferencias en la estructura y el funcionamiento interno de k6.'
---

[WebSocket](https://en.wikipedia.org/wiki/WebSocket) es un protocolo que proporciona canales de comunicación full-duplex a través de una única conexión TCP. Es comúnmente utilizado por las aplicaciones de una sola página (SPA), y en cierta medida por las aplicaciones móviles, para añadir funcionalidad basada en el servidor, lo que suele suponer una mejora del rendimiento respecto a las soluciones basadas en el sondeo.

## Pruebas de carga de WebSockets con k6

Comparando las pruebas basadas en HTTP con las de WebSocket, hay algunas diferencias en la estructura y el funcionamiento interno. La principal diferencia es que, en lugar de ejecutar continuamente un bucle de la función principal `(export default function() { ... })` una y otra vez, cada VU está ahora configurada para ejecutar un bucle de eventos asíncrono.

La estructura básica de una prueba WebSocket se parece a esto:

<CodeGroup labels={["Basic structure of WebSocket-based tests"]} lineNumbers={[true]}>

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', () => console.log('connected'));
    socket.on('message', (data) => console.log('Message received: ', data));
    socket.on('close', () => console.log('disconnected'));
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

</CodeGroup>

Como puedes ver arriba el método [connect()](/javascript-api/k6-ws/connect-url-params-callback) toma una función "run" como su tercer parámetro, y esa función debe aceptar un objeto [Socket](/javascript-api/k6-ws/socket) como su único parámetro. La función "run" forma la base del bucle de eventos asíncrono.

Será llamada inmediatamente cuando se cree la conexión WebSocket, ejecutará todo el código dentro de ella (normalmente código para configurar los manejadores de eventos), y luego bloqueará hasta que la conexión WebSocket sea cerrada (por el host remoto o usando [socket.close()](/javascript-api/k6-ws/socket/socket-close)).

## Manejo de errores

Para capturar los errores que pueden ocurrir durante la vida de una conexión WebSocket se adjunta un manejador al evento "error", como se ilustra a continuación:

<CodeGroup labels={["Error handling in WebSocket tests"]} lineNumbers={[true]}>

```javascript
  import ws from "k6/ws";
  import { check } from "k6";

  export default function() {
    const url = "ws://echo.websocket.org";
    const params = { "tags": { "my_tag": "hello" } };

    const res = ws.connect(url, params, function(socket) {
      socket.on('open', function open() {
          ...
      });

      socket.on('error', function(e) {
        if (e.error() != "websocket: close sent") {
          console.log('An unexpected error occured: ', e.error());
        }
      });
    });

    check(res, { "status is 101": (r) => r && r.status === 101 });
  }
```

</CodeGroup>

## Timers

Si quieres programar una acción recurrente puedes utilizar la función [socket.setInterval](/javascript-api/k6-ws/socket#section-socketsetinterval) para especificar una función que debe ser llamada con un intervalo determinado.

<CodeGroup labels={["Timers in WebSocket tests"]} lineNumbers={[true]}>

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log('connected');

      socket.setInterval(function timeout() {
        socket.ping();
        console.log('Pinging every 1sec (setInterval test)');
      }, 1000);
    });

    socket.on('ping', () => console.log('PING!'));
    socket.on('pong', () => console.log('PONG!'));
    socket.on('close', () => console.log('disconnected'));
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

</CodeGroup>

## Timeouts

Se puede añadir un tiempo de espera a la conexión WebSocket pasando una función manejadora así como el valor del tiempo de espera (en milisegundos) a la función [socket.setTimeout](/javascript-api/k6-ws/socket/socket-settimeout-callback-delay).

<CodeGroup labels={["Timeouts in WebSocket tests"]} lineNumbers={[true]}>

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', () => console.log('connected'));
    socket.on('close', () => console.log('disconnected'));

    socket.setTimeout(function () {
      console.log('2 seconds passed, closing the socket');
      socket.close();
    }, 2000);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

</CodeGroup>

El tiempo de espera en el código anterior cerrará la conexión WebSocket después de 2 segundos.

## Múltiples manejadores de eventos


Puede adjuntar múltiples funciones de control a un evento, como ilustra el código siguiente.

<CodeGroup labels={["Multiple event handlers in WebSocket tests"]} lineNumbers={[true]}>

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const response = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log('connected');
      socket.send(Date.now());

      socket.setInterval(function timeout() {
        socket.ping();
        console.log('Pinging every 1sec (setInterval test)');
      }, 1000);
    });

    socket.on('ping', () => console.log('PING!'));
    socket.on('pong', () => console.log('PONG!'));
    socket.on('pong', () => {
      // Multiple event handlers on the same event
      console.log('OTHER PONG!');
    });

    socket.on('close', () => console.log('disconnected'));

    socket.on('error', (e) => {
      if (e.error() != 'websocket: close sent') {
        console.log('An unexpected error occured: ', e.error());
      }
    });

    socket.setTimeout(function () {
      console.log('2 seconds passed, closing the socket');
      socket.close();
    }, 2000);
  });

  check(response, { 'status is 101': (r) => r && r.status === 101 });
}
```

</CodeGroup>
