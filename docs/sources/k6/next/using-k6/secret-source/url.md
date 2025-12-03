---
title: 'URL secret source'
menuTitle: 'URL'
description: 'The URL secret source fetches secrets from HTTP endpoints'
weight: 03
---

# URL secret source

The URL secret source fetches secrets from generic HTTP endpoints.

This source fetches secrets via HTTP requests and supports custom headers, JSON path extraction, rate limiting, and automatic retries.

## Basic usage

To use the URL secret source, specify a URL template with the `--secret-source` flag:

{{< code >}}

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key} script.js
```

```docker
docker run -it --rm \
  -v <SCRIPT_DIR>:/scripts \
  grafana/k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key} /scripts/script.js
```

{{< /code >}}

k6 replaces the `{key}` placeholder with the secret identifier when it fetches secrets.

## Configuration options

The URL secret source supports three configuration methods:

1. **Inline CLI arguments**: Key-value pairs in the `--secret-source` flag
2. **JSON configuration file**: Referenced via `config=path/to/file.json`
3. **Environment variables**: Prefixed with `K6_SECRET_SOURCE_URL_`

### Configuration parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `urlTemplate` | string | (required) | URL template with `{key}` placeholder |
| `method` | string | `GET` | HTTP method to use |
| `headers.*` | string | - | Custom headers. For example, `headers.Authorization=Bearer token` |
| `responsePath` | string | - | JSON path to extract the secret from the response. If empty, k6 uses the entire response |
| `timeout` | duration | `30s` | Request timeout (e.g., `30s`, `1m`, `500ms`) |
| `requestsPerMinuteLimit` | int | `300` | Maximum requests per minute |
| `requestsBurst` | int | `10` | Burst of requests above rate limit |
| `maxRetries` | int | `3` | Maximum retry attempts for failed requests |
| `retryBackoff` | duration | `1s` | Base backoff duration for retries |

### Inline configuration

Provide configuration as comma-separated key-value pairs:

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key},headers.Authorization=Bearer mytoken,timeout=10s script.js
```

### File-based configuration

Create a JSON configuration file:

```json
{
  "urlTemplate": "https://api.example.com/secrets/{key}",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer mytoken",
    "X-Custom-Header": "value"
  },
  "responsePath": "data.value",
  "timeout": "30s",
  "requestsPerMinuteLimit": 300,
  "requestsBurst": 10,
  "maxRetries": 3,
  "retryBackoff": "1s"
}
```

Reference the file with the `config` parameter:

```bash
k6 run --secret-source=url=config=secrets-config.json script.js
```

You can override file settings with inline parameters:

```bash
k6 run --secret-source=url=config=secrets-config.json,timeout=5s script.js
```

### Environment variables

Configure using environment variables with the prefix `K6_SECRET_SOURCE_URL_`:

```bash
export K6_SECRET_SOURCE_URL_URL_TEMPLATE="https://api.example.com/secrets/{key}"
export K6_SECRET_SOURCE_URL_HEADER_AUTHORIZATION="Bearer mytoken"
export K6_SECRET_SOURCE_URL_METHOD="GET"
export K6_SECRET_SOURCE_URL_RESPONSE_PATH="data.value"
export K6_SECRET_SOURCE_URL_TIMEOUT="30s"
export K6_SECRET_SOURCE_URL_MAX_RETRIES="3"
export K6_SECRET_SOURCE_URL_RETRY_BACKOFF="1s"
export K6_SECRET_SOURCE_URL_REQUESTS_PER_MINUTE_LIMIT="300"
export K6_SECRET_SOURCE_URL_REQUESTS_BURST="10"

k6 run script.js --secret-source=url
```

### Configuration precedence

When you use multiple configuration methods, k6 applies them in this order:

1. Default values
1. Environment variables
1. Configuration file
1. Inline CLI arguments

## Response handling

### Plain text responses

If no `responsePath` is specified, the entire response body is treated as the secret:

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key} script.js
```

### JSON responses

Extract specific values from JSON responses using dot notation:

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key},responsePath=data.value script.js
```

For this JSON response:

```json
{
  "data": {
    "value": "my-secret-value"
  }
}
```

The secret source extracts `"my-secret-value"`.

## Rate limiting

The URL secret source includes built-in rate limiting to prevent overwhelming the secret service:

- `requestsPerMinuteLimit`: Maximum requests per minute (default: 300)
- `requestsBurst`: Allows a burst of requests above the limit (default: 10)

Requests exceeding the rate limit are automatically queued.

## Retry behavior

Failed requests are automatically retried with exponential backoff:

- k6 retries server errors (5xx), rate limiting (429), network errors, and timeouts
- k6 doesn't retry client errors (4xx except 429)
- Backoff calculation: `wait = (base ^ attempt) + random jitter up to 1 second`
- Default settings: 3 retries with 1 second base backoff

## Examples

### Basic API with authentication

Fetch secrets from an API that requires a bearer token:

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key},headers.Authorization=Bearer mytoken script.js
```

### JSON API with nested response

Extract a specific value from a nested JSON response:

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/v2/secrets/{key},responsePath=secret.data.value,headers.X-API-Key=apikey123 script.js
```

### Custom timeout and retry settings

Configure shorter timeouts and more aggressive retries:

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key},timeout=5s,maxRetries=5,retryBackoff=2s script.js
```

### POST request with custom headers

Use POST method with multiple custom headers:

```bash
k6 run --secret-source=url=urlTemplate=https://api.example.com/secrets/{key},method=POST,headers.Content-Type=application/json,headers.X-Custom-Header=value script.js
```

### Multiple URL sources

Configure multiple URL secret sources with different names:

```bash
k6 run \
  --secret-source=url=default,urlTemplate=https://api1.example.com/secrets/{key},headers.Authorization=Bearer token1 \
  --secret-source=url=name=backup,urlTemplate=https://api2.example.com/secrets/{key},headers.Authorization=Bearer token2 \
  script.js
```

Access different sources in your script:

<!-- md-k6:skip -->

```javascript
import secrets from 'k6/secrets';

export default async () => {
  // Default source
  const secret1 = await secrets.get('my-key');

  // Named source
  const backupSource = await secrets.source('backup');
  const secret2 = await backupSource.get('my-key');
};
```
