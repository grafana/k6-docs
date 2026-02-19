---
title: 'sleep( t )'
description: 'Suspends VU execution for the specified duration.'
description: 'Suspends VU execution for the specified duration.'
---

# sleep( t )

Suspend VU execution for the specified duration.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| t         | number | Duration, in seconds. |

{{< admonition type="warning" >}}

Do not use `sleep` with async code such as functions that return promises or event handlers. `sleep` blocks VU execution and will prevent promises from resolving and event handlers from running. This is due to the ECMAScript specification, which requires the execution stack to be empty before the event loop can process events and run callbacks.

For async code, use [`setTimeout`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-timers) and related timer functions instead. They schedule callbacks without blocking the event loop.

{{< /admonition >}}

### Examples

Fetching two different pages with a 0-30 second random sleep in between:

{{< code >}}

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

export default function () {
  http.get('https://k6.io');
  sleep(Math.random() * 30);
  http.get('https://k6.io/features');
}
```

{{< /code >}}

Using the [k6-utils](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils) library to specify a range between a minimum and maximum:

{{< code >}}

```javascript
import { sleep } from 'k6';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  http.get('https://k6.io');
  sleep(randomIntBetween(20, 30));
  http.get('https://k6.io/features');
}
```

{{< /code >}}

**Avoid:** Using `sleep` in a loop to poll for changes. This blocks the event loop, so the condition never updates:

{{< code >}}

<!-- md-k6:skip -->

```javascript
import { Client, Stream } from 'k6/net/grpc';
import { sleep } from 'k6';

const client = new Client();

export default () => {
  if (__ITER == 0) {
    client.connect('127.0.0.1:10000', { plaintext: true, reflect: true });
  }

  const stream = new Stream(client, 'main.FeatureExplorer/ListFeatures', null);
  let received = false;

  stream.on('data', () => {
    received = true;
  });

  stream.on('end', () => {
    client.close();
  });

  stream.write({
    lo: { latitude: 400000000, longitude: -750000000 },
    hi: { latitude: 420000000, longitude: -730000000 },
  });

  // BAD: sleep blocks the event loop - the 'data' handler never runs
  while (!received) {
    sleep(0.1);
  }
};
```

{{< /code >}}

**Prefer:** Using `setInterval` to poll. The event loop stays free, so handlers run and the condition updates:

{{< code >}}

<!-- md-k6:skip -->

```javascript
import { Client, Stream } from 'k6/net/grpc';

const client = new Client();

export default () => {
  if (__ITER == 0) {
    client.connect('127.0.0.1:10000', { plaintext: true, reflect: true });
  }

  const stream = new Stream(client, 'main.FeatureExplorer/ListFeatures', null);
  let received = false;
  let cleanedUp = false;

  function cleanup() {
    if (cleanedUp) return;
    cleanedUp = true;
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    stream.end();
    client.close();
  }

  stream.on('data', () => {
    received = true;
  });

  stream.on('end', cleanup);

  stream.write({
    lo: { latitude: 400000000, longitude: -750000000 },
    hi: { latitude: 420000000, longitude: -730000000 },
  });

  const intervalId = setInterval(() => {
    if (received) {
      cleanup();
      console.log('Received response');
    }
  }, 100);

  const timeoutId = setTimeout(cleanup, 5000);
};
```

{{< /code >}}
