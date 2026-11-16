---
title: 'lookup( hostname )'
description: 'Lookup the IP addresses a DNS name is bound to using system configured DNS servers'
weight: 30
---

# lookup( hostname )

The `dns.lookup` function performs DNS resolution using the system's default DNS configuration and returns a promise that resolves to an array of IP addresses. This function is useful, for instance, for testing standard DNS resolution behavior and comparing it with custom DNS server results.

## Parameters

| Parameter | Type   | Description                                                               |
| :-------- | :----- | :------------------------------------------------------------------------ |
| hostname  | string | The domain name to resolve. For example, "example.com" or "k6.io".                |

## Returns

A promise resolving to an array of strings, where each string is an IP address that the domain name resolves to. The function returns the same IP addresses that would be returned by the system's standard DNS resolution mechanism.

## Metrics

When using `dns.lookup`, the following metrics are automatically generated:

- `dns_lookups`: Counter incremented for each lookup attempt
- `dns_lookup_duration`: Trend measuring the time taken for DNS lookup

These metrics help you monitor DNS performance using your system's DNS configuration.

## Examples

<!-- md-k6:skipall -->

### Basic lookup

```javascript
import dns from 'k6/x/dns';

export default async function () {
  // Resolve using system DNS servers
  const addresses = await dns.lookup('k6.io');
  console.log('k6.io resolves to:', addresses);
  // Output: k6.io resolves to: ["104.21.7.127", "172.67.154.74"]
}
```

### Comparing system vs custom DNS

```javascript
import dns from 'k6/x/dns';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const domain = 'example.com';

  // Get results from system DNS
  const systemResults = await dns.lookup(domain);

  // Get results from Google's DNS
  const googleResults = await dns.resolve(domain, 'A', '8.8.8.8:53');

  console.log('System DNS results:', systemResults);
  console.log('Google DNS results:', googleResults);

  // Check if both methods return results
  expect(systemResults.length).toBeGreaterThan(0);
  expect(googleResults.length).toBeGreaterThan(0);

  // Compare results (they might differ due to different DNS configurations)
  const hasCommonAddress = systemResults.some(ip => googleResults.includes(ip));
  expect(hasCommonAddress).toBeTruthy();
}
```

### Testing DNS consistency

```javascript
import dns from 'k6/x/dns';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export const options = {
  vus: 1,
  iterations: 10,
};

export default async function () {
  const domain = 'k6.io';

  try {
    const results = await dns.lookup(domain);

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(ip =>
      /^\d+\.\d+\.\d+\.\d+$/.test(ip) || /^[0-9a-fA-F:]+$/.test(ip)
    )).toBeTruthy();

    console.log(`Iteration ${__ITER}: ${domain} -> ${results.join(', ')}`);
  } catch (error) {
    console.error('DNS lookup failed:', error);
  }
}
```

### Load testing with system DNS

```javascript
import dns from 'k6/x/dns';
import { sleep } from 'k6';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { Trend, Rate } from 'k6/metrics';

const lookupDuration = new Trend('dns_lookup_duration_custom');
const successRate = new Rate('dns_lookup_success_rate');

export const options = {
  vus: 10,
  duration: '60s',
};

const domains = [
  'k6.io',
  'example.com',
  'google.com',
  'github.com',
  'stackoverflow.com',
];

export default async function () {
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const startTime = Date.now();

  try {
    const results = await dns.lookup(domain);
    const duration = Date.now() - startTime;

    lookupDuration.add(duration);
    successRate.add(true);

    expect(results.length).toBeGreaterThan(0);

    console.log(`${domain} resolved in ${duration}ms to ${results.length} addresses`);
  } catch (error) {
    const duration = Date.now() - startTime;
    lookupDuration.add(duration);
    successRate.add(false);

    console.error(`Failed to resolve ${domain}: ${error.message}`);
  }

  sleep(1);
}
```

### Validating DNS configuration

```javascript
import dns from 'k6/x/dns';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const testDomains = [
    'k6.io',
    'grafana.com',
    'example.com',
  ];

  for (const domain of testDomains) {
    try {
      const results = await dns.lookup(domain);

      expect(results.length).toBeGreaterThan(0);
      expect(results.every(ip => {
        // Basic IPv4/IPv6 validation
        return /^\d+\.\d+\.\d+\.\d+$/.test(ip) || /^[0-9a-fA-F:]+$/.test(ip);
      })).toBeTruthy();

      console.log(`✓ ${domain}: ${results.join(', ')}`);
    } catch (error) {
      console.error(`✗ ${domain}: ${error.message}`);
    }
  }
}
```

## Error handling

The `lookup` function may throw errors in the following cases:

- Invalid hostname format
- DNS resolution timeout
- No DNS servers configured on the system
- Network connectivity issues

```javascript
import dns from 'k6/x/dns';

export default async function () {
  try {
    const results = await dns.lookup('nonexistent.invalid.domain.test');
    console.log('Unexpected success:', results);
  } catch (error) {
    console.log('Expected DNS lookup error:', error.message);
  }

  // Test with invalid hostname format
  try {
    const results = await dns.lookup('');
    console.log('Unexpected success with empty hostname:', results);
  } catch (error) {
    console.log('Expected error for empty hostname:', error.message);
  }
}
```
