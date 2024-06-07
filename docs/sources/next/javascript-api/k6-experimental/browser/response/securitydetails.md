---
title: 'securityDetails()'
description: 'Browser module: Response.securityDetails method'
---

# securityDetails()

Returns SSL and other security information.

### Returns

| Type                             | Description                                  |
| -------------------------------- | -------------------------------------------- |
| Promise<SecurityDetails \| null> | Returns [SecurityDetails](#securitydetails). |

### SecurityDetails

| Property    | Type     | Description                                                                                                                                   |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| subjectName | string   | Common Name component of the Subject field. The value is extracted from the certificate. This should only be used for informational purposes. |
| issuer      | string   | Common Name component of the Issuer field. The value is extracted from the certificate. This should only be used for informational purposes.  |
| validFrom   | number   | Unix timestamp (in seconds) specifying the exact date/time when this cert becomes valid.                                                      |
| validTo     | number   | Unix timestamp (in seconds) specifying the exact date/time when this cert becomes invalid.                                                    |
| protocol    | string   | The specific TLS protocol used. For example `TLS 1.3`.                                                                                        |
| sanList     | string[] | String with hex encoded SHA256 fingerprint of the certificate. The value is extracted from the certificate.                                   |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    const res = await page.goto('https://test.k6.io/');

    const sd = await res.securityDetails();
    console.log(`securityDetails: ${JSON.stringify(sd)}`); // securityDetails: {"subject_name":"*.k6.io"...}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
