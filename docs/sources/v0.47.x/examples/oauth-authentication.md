---
title: 'OAuth Authentication'
excerpt: 'Scripting examples on how to use OAuth authentication in your load test.'
weight: 03
---

# OAuth Authentication

Scripting examples on how to use OAuth authentication in your load test.

## OAuth authentication

The following examples take a set of arguments, shown in the function documentation, and returns the response body as JSON so that you can extract the token from.

### Azure Active Directory

{{< code >}}

```javascript
import http from 'k6/http';

/**
 * Authenticate using OAuth against Azure Active Directory
 * @function
 * @param  {string} tenantId - Directory ID in Azure
 * @param  {string} clientId - Application ID in Azure
 * @param  {string} clientSecret - Can be obtained from https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app#create-a-client-secret
 * @param  {string} scope - Space-separated list of scopes (permissions) that are already given consent to by admin
 * @param  {string} resource - Either a resource ID (as string) or an object containing username and password
 */
export function authenticateUsingAzure(tenantId, clientId, clientSecret, scope, resource) {
  let url;
  const requestBody = {
    client_id: clientId,
    client_secret: clientSecret,
    scope: scope,
  };

  if (typeof resource == 'string') {
    url = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
    requestBody['grant_type'] = 'client_credentials';
    requestBody['resource'] = resource;
  } else if (
    typeof resource == 'object' &&
    resource.hasOwnProperty('username') &&
    resource.hasOwnProperty('password')
  ) {
    url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    requestBody['grant_type'] = 'password';
    requestBody['username'] = resource.username;
    requestBody['password'] = resource.password;
  } else {
    throw 'resource should be either a string or an object containing username and password';
  }

  const response = http.post(url, requestBody);

  return response.json();
}
```

{{< /code >}}

### Okta

{{< code >}}

```javascript
import http from 'k6/http';
import encoding from 'k6/encoding';

/**
 * Authenticate using OAuth against Okta
 * @function
 * @param  {string} oktaDomain - Okta domain to authenticate against (e.g. 'k6.okta.com')
 * @param  {string} authServerId - Authentication server identifier (default is 'default')
 * @param  {string} clientId - Generated by Okta automatically
 * @param  {string} clientSecret - Generated by Okta automatically
 * @param  {string} scope - Space-separated list of scopes
 * @param  {string|object} resource - Either a resource ID (as string) or an object containing username and password
 */
export function authenticateUsingOkta(oktaDomain, authServerId, clientId, clientSecret, scope, resource) {
  if (authServerId === 'undefined' || authServerId == '') {
    authServerId = 'default';
  }
  const url = `https://${oktaDomain}/oauth2/${authServerId}/v1/token`;
  const requestBody = { scope: scope };
  let response;

  if (typeof resource == 'string') {
    requestBody['grant_type'] = 'client_credentials';

    const encodedCredentials = encoding.b64encode(`${clientId}:${clientSecret}`);
    const params = {
      auth: 'basic',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };

    response = http.post(url, requestBody, params);
  } else if (
    typeof resource == 'object' &&
    resource.hasOwnProperty('username') &&
    resource.hasOwnProperty('password')
  ) {
    requestBody['grant_type'] = 'password';
    requestBody['username'] = resource.username;
    requestBody['password'] = resource.password;
    requestBody['client_id'] = clientId;
    requestBody['client_secret'] = clientSecret;

    response = http.post(url, requestBody);
  } else {
    throw 'resource should be either a string or an object containing username and password';
  }

  return response.json();
}
```

{{< /code >}}

For a detailed example, please visit this article: [How to Load Test OAuth secured APIs with k6?](https://k6.io/blog/how-to-load-test-oauth-secured-apis-with-k6)