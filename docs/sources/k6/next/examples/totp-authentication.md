---
title: 'TOTP authentication'
description: 'Scripting examples for testing TOTP-based two-factor authentication flows, including login with 2FA and payment authentication.'
weight: 04
---

# TOTP authentication

The [`totp` jslib](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/totp) provides TOTP (Time-based One-Time Password) generation and verification as defined in [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238). Use it to load-test applications that rely on authenticator apps (Google Authenticator, Authy, and similar) for two-factor authentication (2FA) or step-up verification during payment flows.

## Before you begin

- You need the **Base32-encoded TOTP secret** for your test account. Retrieve it from your application's 2FA setup flow (the same secret that is normally encoded in a QR code).
- For real test runs, store the secret securely using a [secret source](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source/) instead of hard-coding it.
- The machine running k6 must have its system clock synchronized (NTP). TOTP codes are time-sensitive; clock drift of more than 30 seconds will cause failures.

## Basic 2FA login

The most common use case: log in with a username and password, then submit the TOTP code to complete the 2FA step.

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

// Replace with your test account's Base32-encoded TOTP secret.
const TOTP_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

export default async function () {
  // Step 1: Submit username and password.
  const loginRes = http.post('https://quickpizza.grafana.com/api/login', {
    username: 'testuser@example.com',
    password: 'SuperSecret1!',
  });

  check(loginRes, { 'login accepted': (r) => r.status === 200 });

  // Step 2: Generate the current TOTP code and submit it.
  const totp = new TOTP(TOTP_SECRET, 6);
  const code = await totp.gen();

  const mfaRes = http.post(
    'https://quickpizza.grafana.com/api/mfa/verify',
    JSON.stringify({ code }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginRes.json('session_token')}`,
      },
    }
  );

  check(mfaRes, { '2FA accepted': (r) => r.status === 200 });
}
```

{{< /code >}}

## Load TOTP secret from a secret source

Hard-coding secrets in scripts is unsafe. Use a [secret source](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source/) to inject the secret at runtime so it is automatically redacted from logs.

{{< code >}}

```javascript
import http from 'k6/http';
import secrets from 'k6/secrets';
import { check } from 'k6';
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

export default async function () {
  // Retrieve the TOTP secret from the configured secret source.
  const totpSecret = await secrets.get('totp_secret');
  const totp = new TOTP(totpSecret, 6);

  // Step 1: Primary authentication.
  const loginRes = http.post('https://quickpizza.grafana.com/api/login', {
    username: 'testuser@example.com',
    password: 'SuperSecret1!',
  });

  check(loginRes, { 'login accepted': (r) => r.status === 200 });

  // Step 2: 2FA verification.
  const code = await totp.gen();
  const mfaRes = http.post(
    'https://quickpizza.grafana.com/api/mfa/verify',
    JSON.stringify({ code }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginRes.json('session_token')}`,
      },
    }
  );

  check(mfaRes, { '2FA accepted': (r) => r.status === 200 });
}
```

{{< /code >}}

Run the test, passing the secret via the `mock` secret source for local testing:

<!-- md-k6:skip -->

```bash
k6 run --secret-source=mock=totp_secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ script.js
```

## Payment step-up authentication

Many payment flows require a fresh TOTP code as a "step-up" before processing high-value transactions, even for already-authenticated users.

{{< code >}}

```javascript
import http from 'k6/http';
import secrets from 'k6/secrets';
import { check, sleep } from 'k6';
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

export const options = {
  vus: 10,
  duration: '30s',
};

export default async function () {
  const totpSecret = await secrets.get('totp_secret');
  const sessionToken = await secrets.get('session_token');
  const totp = new TOTP(totpSecret, 6);

  // Step 1: Initiate the payment.
  const paymentRes = http.post(
    'https://quickpizza.grafana.com/api/payments',
    JSON.stringify({
      amount: 9999,
      currency: 'USD',
      recipient_account: 'ACC-987654',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
    }
  );

  check(paymentRes, { 'payment initiated': (r) => r.status === 202 });

  const paymentId = paymentRes.json('payment_id');

  // Step 2: Generate TOTP and confirm the payment (step-up auth).
  const code = await totp.gen();
  const confirmRes = http.post(
    `https://quickpizza.grafana.com/api/payments/${paymentId}/confirm`,
    JSON.stringify({ totp_code: code }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
    }
  );

  check(confirmRes, { 'payment confirmed': (r) => r.status === 200 });

  sleep(1);
}
```

{{< /code >}}

## Handle token expiry with time bias

TOTP codes are valid for one time window (30 seconds by default). If your test submits the code close to a window boundary, the server may reject it because the window has already rolled over. Use the `bias` parameter in `gen()` to generate the code for the *next* window as a fallback.

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

const TOTP_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

export default async function () {
  const totp = new TOTP(TOTP_SECRET, 6);

  // Generate the code for the current window.
  const code = await totp.gen();

  const res = http.post(
    'https://quickpizza.grafana.com/api/mfa/verify',
    JSON.stringify({ code }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (res.status === 401) {
    // The window may have just rolled over. Try the next 30-second window.
    const nextCode = await totp.gen(30, 30);
    const retryRes = http.post(
      'https://quickpizza.grafana.com/api/mfa/verify',
      JSON.stringify({ code: nextCode }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    check(retryRes, { '2FA accepted (next window)': (r) => r.status === 200 });
  } else {
    check(res, { '2FA accepted': (r) => r.status === 200 });
  }
}
```

{{< /code >}}

## Parameterized multi-account test

Load test 2FA flows across multiple accounts by reading per-account TOTP secrets from a CSV file.

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

// accounts.csv format:
//   username,password,totp_secret
//   user1@example.com,pass1,SECRET1BASE32ENCODED
//   user2@example.com,pass2,SECRET2BASE32ENCODED
const accounts = new SharedArray('accounts', function () {
  return open('./accounts.csv')
    .split('\n')
    .slice(1) // skip header row
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const [username, password, totpSecret] = line.split(',');
      return { username, password, totpSecret };
    });
});

export const options = {
  vus: 5,
  duration: '1m',
};

export default async function () {
  // Each VU picks a different account in round-robin fashion.
  const account = accounts[__VU % accounts.length];
  const totp = new TOTP(account.totpSecret, 6);

  // Step 1: Primary login.
  const loginRes = http.post('https://quickpizza.grafana.com/api/login', {
    username: account.username,
    password: account.password,
  });

  check(loginRes, { 'login accepted': (r) => r.status === 200 });

  // Step 2: 2FA.
  const code = await totp.gen();
  const mfaRes = http.post(
    'https://quickpizza.grafana.com/api/mfa/verify',
    JSON.stringify({ code }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginRes.json('session_token')}`,
      },
    }
  );

  check(mfaRes, { '2FA accepted': (r) => r.status === 200 });
}
```

{{< /code >}}

## Verify a TOTP code

Use `TOTP.verify()` to assert that a code generated by the library is accepted by the server, or to validate a server-issued code in functional tests.

{{< code >}}

```javascript
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';
import { check } from 'k6';

const TOTP_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

export default async function () {
  const totp = new TOTP(TOTP_SECRET, 6);

  const code = await totp.gen();
  const isValid = await totp.verify(code);

  check(null, { 'generated code is self-consistent': () => isValid });
}
```

{{< /code >}}

## Notes

- **Clock synchronization**: TOTP codes are derived from the current Unix timestamp divided by the time step. A skewed system clock will produce codes that are out of sync with the server. Ensure NTP is running on CI/CD agents.
- **Test accounts only**: Use dedicated test accounts with known TOTP secrets. Never extract TOTP secrets from production user accounts.
- **Secret management**: Always use a [secret source](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source/) in CI/CD pipelines so secrets are redacted from k6 output and never stored in test scripts.
- **8-digit codes**: Some applications use 8-digit codes. Pass `8` as the second argument to the `TOTP` constructor: `new TOTP(secret, 8)`.
- **Custom time step**: Some servers use a 60-second window instead of 30 seconds. Pass the time step explicitly: `totp.gen(60)`.
