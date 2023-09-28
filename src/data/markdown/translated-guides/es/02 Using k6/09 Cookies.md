---
title: 'Cookies'
excerpt: 'En la mayoría de los casos, k6 gestionará de forma transparente la recepción, el almacenamiento y el envío de cookies.'
---

Las cookies HTTP son utilizadas por los sitios web y las aplicaciones para almacenar piezas de información de estado en el dispositivo del usuario. Un servidor indica al cliente, a través de una cabecera HTTP `Set-Cookie`, qué información quiere que se almacene en la máquina del usuario.

El navegador del usuario almacenará los datos de la cookie y los asociará con el nombre de host del servidor, y para cada solicitud posterior a ese nombre de host, incluirá los datos de la cookie almacenados en una cabecera `Cookie`.

A continuación, puede controlar reglas más específicas sobre cuándo deben enviarse o no los datos de la cookie, incluyendo la limitación a subdominios específicos del dominio o a una ruta específica. También es posible establecer una fecha de caducidad en la cookie y decirle al navegador que sólo la envíe a través de conexiones cifradas (SSL/TLS).

## Cookies en k6

En la mayoría de los casos, k6 gestionará de forma transparente la recepción, el almacenamiento y el envío de cookies, tal y como se ha descrito anteriormente, de modo que las pruebas de su sitio web o aplicación basados en cookies funcionarán sin que usted tenga que hacer nada especial.

En algunos casos de uso, puede desear un mayor control sobre las cookies. En k6 tienes dos opciones, o bien [manipular directamente las cabeceras HTTP](/javascript-api/k6-http/params), o utilizar la más ergonómica API de cookies. A continuación veremos esto último.

## Simple configuración de las cookies

Para simular que una cookie ha sido previamente establecida por un navegador y ahora se supone que se incluye en una solicitud posterior al servidor, incluimos la cookie en el parámetro de solicitud de `cookies`:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://httpbin.test.k6.io/cookies', {
    cookies: {
      my_cookie: 'hello world',
    },
  });
}
```

</CodeGroup>

Esto sólo aplicará la cookie para la solicitud en cuestión, pero no se enviará para las solicitudes posteriores. Si quieres hacer esto tienes que añadir la cookie a un cookies jar, y por defecto hay un cookies jar  por VU,  con el que podemos interactuar para establecer e inspeccionar las cookies:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world');
  http.get('https://httpbin.test.k6.io/cookies');
}
```

</CodeGroup>

El cookies jar  por VU almacena todas las cookies recibidas del servidor en una cabecera `Set-Cookie`. También puede crear "cookies jar locales" que anulen el cookies jar por VU, pero puede encontrar más sobre esto más adelante.

También se puede especificar que una cookie debe ser anulada si ya forma parte del cookie jar por VU:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world');

  const cookies = {
    my_cookie: {
      value: 'hello world 2',
      replace: true,
    },
  };

  const res = http.get('https://httpbin.test.k6.io/cookies', {
    cookies,
  });

  check(res.json(), {
    'cookie has correct value': (b) => b.cookies.my_cookie == 'hello world 2',
  });
}
```

</CodeGroup>

## Accediendo a las cookies

Para ver qué cookies se establecieron para una respuesta en particular podemos mirar en la propiedad `cookies` del objeto respuesta:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io/cookies/set?my_cookie=hello%20world', {
    redirects: 0,
  });
  check(res, {
    "has cookie 'my_cookie'": (r) => r.cookies.my_cookie.length > 0,
    'cookie has correct value': (r) => r.cookies.my_cookie[0].value === 'hello world',
  });
}
```

</CodeGroup>

La propiedad `cookies` del objeto de respuesta es un mapa en el que la clave es el nombre de la cookie y el valor es un array de objetos cookie de respuesta (ver más abajo la descripción).  Es un array para soportar múltiples cookies que tengan el mismo nombre (pero diferentes atributos `domain` y/o `path`), lo cual es parte de la [RFC6265](https://tools.ietf.org/html/rfc6265#section-5.3).

## Propiedades de un objeto de cookie de respuesta

Un objeto cookie de respuesta contiene las siguientes propiedades:

| Propiedad  | Tipo      | Descripción                                                                                                   |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| name      | `string`  | el nombre de la cookie
                                                                                        |
| value     | `string`  | el valor de la cookie                                                                                       |
| domain    | `string`  | dominio que decide a qué nombres de host debe enviarse esta cookie                                                  |
| path      | `string`  | limitar el envío de la cookie sólo si la ruta de la solicitud coincide con este valor                             |
| expires   | `string`  | cuando la cookie expira, esto tiene que estar en el formato RFC1123 con un aspecto similar: `Lun, 02 Ene 2006 15:04:05 MST` |
| max_age   | `number`  | se utiliza para el mismo propósito que expira pero se define como el número de segundos que una cookie será válida              |
| secure    | `boolean` | si es verdadero, la cookie sólo se enviará a través de una conexión cifrada (SSL/TLS)                                  |
| http_only | `boolean` | si es verdadero, la cookie no se expondrá a JavaScript en un entorno de navegador                               |

## Inspeccionando una cookie en el  jar

Para ver qué cookies están establecidas, y almacenadas en el cookies jar, para una URL en particular podemos utilizar el método `cookieForURL()` del objeto cookies jar:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io/cookies/set?my_cookie=hello%20world', {
    redirects: 0,
  });
  const jar = http.cookieJar();
  const cookies = jar.cookiesForURL('https://httpbin.test.k6.io/');
  check(res, {
    "has cookie 'my_cookie'": (r) => cookies.my_cookie.length > 0,
    'cookie has correct value': (r) => cookies.my_cookie[0] === 'hello world',
  });
}
```

</CodeGroup>

El objeto `cookies` devuelto por el método `cookiesForURL()` del jar es un mapa donde la clave es el nombre de la cookie y el valor es un array de valores de cookies (strings). Es un array para soportar múltiples cookies que tengan el mismo nombre (pero diferentes atributos `domain` y/o `path`), lo cual es parte de la [RFC6265](https://tools.ietf.org/html/rfc6265#section-5.3).

## Configurando las cookies avanzadas con los atributos

Para establecer cookies que controlen de forma más estricta el comportamiento de la cookie debemos añadir la cookie a un cookies jar. Un ejemplo:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world', {
    domain: 'httpbin.test.k6.io',
    path: '/cookies',
    secure: true,
    max_age: 600,
  });
  const res = http.get('https://httpbin.test.k6.io/cookies');
  check(res, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.cookies.my_cookie[0] !== null,
    'cookie has correct value': (r) => r.cookies.my_cookie[0].value == 'hello world',
  });
}
```

</CodeGroup>

## Jar de cookies local

Además del cookies jar por VU, también puede crear el jar de cookies locales que pueden anular el jar de cookies de VU por solicitud. Un ejemplo:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = new http.CookieJar();

  // Add cookie to local jar
  const cookieOptions = {
    domain: 'httpbin.test.k6.io',
    path: '/cookies',
    secure: true,
    max_age: 600,
  };
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world', cookieOptions);

  // Override per-VU jar with local jar for the following request
  const res = http.get('https://httpbin.test.k6.io/cookies', { jar });
  check(res, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.cookies.my_cookie[0] !== null,
    'cookie has correct value': (r) => r.cookies.my_cookie[0].value == 'hello world',
  });
}
```

</CodeGroup>

## Ejemplos

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
// Example showing two methods how to log all cookies (with attributes) from a HTTP response.
import http from 'k6/http';

function logCookie(c) {
  // Here we log the name and value of the cookie along with additional attributes.
  // For full list of attributes see:
  // https://k6.io/docs/using-k6/cookies#properties-of-a-response-cookie-object
  const output = `
     ${c.name}: ${c.value}
     tdomain: ${c.domain}
     tpath: ${c.path}
     texpires: ${c.expires}
     thttpOnly: ${c.http_only}
  `;
  console.log(output);
}
export default function () {
  const res = http.get('https://www.google.com/');

  // Method 1: Use for-loop and check for non-inherited properties
  for (const name in res.cookies) {
    if (res.cookies.hasOwnProperty(name) !== undefined) {
      logCookie(res.cookies[name][0]);
    }
  }

  // Method 2: Use ES6 Map to loop over Object entries
  new Map(Object.entries(res.cookies)).forEach((v, k) => {
    logCookie(v[0]);
  });
}
```

</CodeGroup>
