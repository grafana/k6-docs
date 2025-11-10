---
title: 'k6/x/dns'
description: 'k6 DNS extension API'
weight: 11
---

# k6/x/dns

{{< docs/shared source="k6" lookup="extension.md" version="<K6_VERSION>" >}}

The `k6/x/dns` module enables DNS resolution testing in k6, allowing you to resolve DNS names to IP addresses using custom DNS servers or the system's default DNS configuration. This module is useful for testing DNS server performance, validating DNS configurations, and incorporating DNS resolution into your load testing scenarios.

## Key features

- The [`dns.resolve()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-dns/resolve) function resolves DNS names using a specified DNS server, allowing you to test custom DNS configurations and server performance.
- The [`dns.lookup()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-dns/lookup) function resolves DNS names using the system's default DNS servers, providing a way to test standard DNS resolution behavior.
- Support for A (IPv4) and AAAA (IPv6) record types.
- Automatic metrics collection for DNS resolution performance analysis.

### Use cases

- Load testing DNS servers to ensure they can handle high query volumes.
- Validating DNS configurations in staging and production environments.
- Testing DNS failover mechanisms and redundancy.
- Incorporating DNS resolution time into overall application performance testing.

## API

| Function/Object                                                                                | Description                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [resolve](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-dns/resolve)     | Resolves a DNS name to IP addresses using a specified DNS server.                                                                                                                                                    |
| [lookup](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-dns/lookup)   | Resolves a DNS name to IP addresses using the system's default DNS servers.                                                                                                                                                                                                                                               |

## Metrics

The extension automatically generates the following metrics:

- `dns_resolutions`: Counter tracking the number of DNS resolution attempts.
- `dns_resolution_duration`: Trend measuring DNS resolution response times.
- `dns_lookups`: Counter tracking the number of DNS lookup attempts.
- `dns_lookup_duration`: Trend measuring DNS lookup response times.

## Examples

### Basic DNS resolution with custom server


<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';

export default async function () {
  // Resolve k6.io using Cloudflare's DNS server
  const ips = await dns.resolve('k6.io', 'A', '1.1.1.1:53');
  console.log('k6.io resolves to:', ips);
}
```


### DNS lookup using system defaults

{{< code >}}

<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';

export default async function () {
  // Resolve k6.io using system DNS servers
  const ips = await dns.lookup('k6.io');
  console.log('k6.io resolves to:', ips);
}
```

{{< /code >}}

### Comprehensive DNS testing

{{< code >}}

<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export const options = {
  vus: 10,
  duration: '30s',
};

export default async function () {
  // Test both IPv4 and IPv6 resolution
  const ipv4Results = await dns.resolve('example.com', 'A', '8.8.8.8:53');
  const ipv6Results = await dns.resolve('example.com', 'AAAA', '[2606:4700:4700::1111]:53');

  // Test system DNS
  const systemResults = await dns.lookup('example.com');

  // Validate results
  expect(ipv4Results.length).toBeGreaterThan(0);
  expect(ipv6Results.length).toBeGreaterThan(0);
  expect(systemResults.length).toBeGreaterThan(0);
}
```

{{< /code >}}
