---
title: 'resolve( query, recordType, nameserver )'
description: 'Resolve a DNS name to IP addresses using a specified DNS server'
weight: 20
---

# resolve( query, recordType, nameserver )

The `dns.resolve` function performs DNS resolution using a specified DNS server and returns a promise that resolves to an array of IP addresses. This function allows you to test specific DNS servers, validate DNS configurations, and measure DNS resolution performance under load.

## Parameters

| Parameter  | Type   | Description                                                                                                     |
| :--------- | :----- | :-------------------------------------------------------------------------------------------------------------- |
| query      | string | The domain name to resolve. For example, "example.com" or "k6.io".                                                      |
| recordType | string | The DNS record type to query. Supported values: "A" (IPv4 addresses), "AAAA" (IPv6 addresses)                 |
| nameserver | string | The DNS server to use for resolution in the format "host:port". For example, "8.8.8.8:53" or "[2606:4700:4700::1111]:53" |

## Returns

A promise resolving to an array of strings, where each string is an IP address that the domain name resolves to. For A records, these will be IPv4 addresses. For AAAA records, these will be IPv6 addresses.

## Examples

### Basic A record resolution

<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';

export default async function () {
  // Resolve IPv4 addresses using Google's DNS server
  const ipv4Addresses = await dns.resolve('k6.io', 'A', '8.8.8.8:53');
  console.log('k6.io IPv4 addresses:', ipv4Addresses);
  // Output: k6.io IPv4 addresses: ["104.21.7.127", "172.67.154.74"]
}
```

### AAAA record resolution

<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';

export default async function () {
  // Resolve IPv6 addresses using Cloudflare's IPv6 DNS server
  const ipv6Addresses = await dns.resolve('k6.io', 'AAAA', '[2606:4700:4700::1111]:53');
  console.log('k6.io IPv6 addresses:', ipv6Addresses);
  // Output: k6.io IPv6 addresses: ["2606:4700:3033::6815:77f", "2606:4700:3030::ac43:9a4a"]
}
```

### Testing multiple DNS servers

<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export const options = {
  vus: 5,
  duration: '30s',
};

const dnsServers = [
  '8.8.8.8:53',     // Google DNS
  '1.1.1.1:53',     // Cloudflare DNS
  '9.9.9.9:53',     // Quad9 DNS
];

export default async function () {
  const domain = 'example.com';

  for (const server of dnsServers) {
    try {
      const results = await dns.resolve(domain, 'A', server);

      expect(results.length).toBeGreaterThan(0);
      expect(results.every(ip => /^\d+\.\d+\.\d+\.\d+$/.test(ip))).toBeTruthy();

      console.log(`${server} resolved ${domain} to:`, results);
    } catch (error) {
      console.error(`Failed to resolve ${domain} using ${server}:`, error);
    }
  }
}
```

### Performance comparison

<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';
import { Trend } from 'k6/metrics';

const resolutionTime = new Trend('custom_dns_resolution_time');

export const options = {
  vus: 1,
  iterations: 100,
};

export default async function () {
  const startTime = Date.now();

  try {
    const results = await dns.resolve('k6.io', 'A', '8.8.8.8:53');
    const duration = Date.now() - startTime;

    resolutionTime.add(duration);

    console.log(`Resolution took ${duration}ms, found ${results.length} addresses`);
  } catch (error) {
    console.error('DNS resolution failed:', error);
  }
}
```

## Error handling

The `resolve` function may throw errors in the following cases:

- Invalid domain name format
- Unsupported record type
- DNS server unreachable or timeout
- DNS server returns an error response


<!-- md-k6:skip -->

```javascript
import dns from 'k6/x/dns';

export default async function () {
  try {
    const results = await dns.resolve('nonexistent.invalid', 'A', '8.8.8.8:53');
    console.log('Unexpected success:', results);
  } catch (error) {
    console.log('Expected DNS resolution error:', error.message);
  }
}
```

## Metrics

When using `dns.resolve`, the following metrics are automatically generated:

- `dns_resolutions`: Counter incremented for each resolution attempt
- `dns_resolution_duration`: Trend measuring the time taken for DNS resolution

These metrics help you monitor DNS performance and identify potential bottlenecks in your testing scenarios.

## Best practices

- **Nameserver format**: Always specify the port number, typically 53 for DNS, in the nameserver parameter.
- **Timeout behavior**: DNS queries have built-in timeouts; consider this when designing load tests.
- **Load testing**: Use multiple VUs and iterations to properly test DNS server performance under load.
