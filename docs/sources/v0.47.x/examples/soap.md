---
title: 'SOAP'
description: 'Load Testing SOAP API.'
weight: 14
---

# SOAP

Although k6 doesn't have any built-in APIs for working with SOAP or XML data in general, you
can still easily load test a SOAP-based API by crafting SOAP messages and using the HTTP request APIs.

## Making SOAP requests

{{< code >}}

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

const soapReqBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hs="http://www.holidaywebservice.com/HolidayService_v2/">
    <soapenv:Body>
        <hs:GetHolidaysAvailable>
            <hs:countryCode>UnitedStates</hs:countryCode>
        </hs:GetHolidaysAvailable>
    </soapenv:Body>
</soapenv:Envelope>`;

export default function () {
  // When making a SOAP POST request we must not forget to set the content type to text/xml
  const res = http.post(
    'http://www.holidaywebservice.com/HolidayService_v2/HolidayService2.asmx',
    soapReqBody,
    {
      headers: { 'Content-Type': 'text/xml' },
    }
  );

  // Make sure the response is correct
  check(res, {
    'status is 200': (r) => r.status === 200,
    'black friday is present': (r) => r.body.indexOf('BLACK-FRIDAY') !== -1,
  });

  sleep(1);
}
```

{{< /code >}}
