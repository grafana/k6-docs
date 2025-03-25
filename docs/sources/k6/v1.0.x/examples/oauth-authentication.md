---
title: 'OAuth Authentication'
description: 'Scripting examples on how to use OAuth authentication in your load test.'
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

### Azure B2C

The following example shows how you can authenticate with Azure B2C using the [Client Credentials Flow](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-oauth-code#client-credentials-flow).

This example is based on a JMeter example found at the [azure-ad-b2c/load-tests](https://github.com/azure-ad-b2c/load-tests) repository.

To use this script, you need to:

1. [Set up your own Azure B2C tenant](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant)
   - Copy the tenant name, it will be used in your test script.
1. [Register a web application](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga)
   - Register a single page application with the redirect URL of: https://jwt.ms. That's needed for the flow to receive a token.
   - After the creation, you can get the Application (client) ID, and the Directory (tenant) ID. Copy both of them, they'll be used in your test script.
1. [Create a user flow so that you can sign up and create a user](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows)
   - Create a new user, and copy the username and password. They'll be used in the test script.

You can find the settings in the B2C settings in the Azure portal if you need to refer to them later on. Make sure to fill out all the variables for the `B2CGraphSettings` object, as well as replace `USERNAME` and `PASSWORD` in `export default function`.

{{< code >}}

```javascript
import http from 'k6/http';
import crypto from 'k6/crypto';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const B2CGraphSettings = {
  B2C: {
    client_id: '', // Application ID in Azure
    user_flow_name: '',
    tenant_id: '', // Directory ID in Azure
    tenant_name: '',
    scope: 'openid',
    redirect_url: 'https://jwt.ms',
  },
};

/**
 * Authenticate using OAuth against Azure B2C
 * @function
 * @param  {string} username - Username of the user to authenticate
 * @param  {string} password
 * @return {string} id_token
 */
export function GetB2cIdToken(username, password) {
  const state = GetState();
  SelfAsserted(state, username, password);
  const code = CombinedSigninAndSignup(state);
  return GetToken(code, state.codeVerifier);
}

/**
 * @typedef {object} b2cStateProperties
 * @property {string} csrfToken
 * @property {string} stateProperty
 * @property {string} codeVerifier
 *
 */

/**
 * Get the id token from Azure B2C
 * @function
 * @param {string} code
 * @returns {string} id_token
 */
const GetToken = (code, codeVerifier) => {
  const url =
    `https://${B2CGraphSettings.B2C.tenant_name}.b2clogin.com/${B2CGraphSettings.B2C.tenant_id}` +
    `/oauth2/v2.0/token` +
    `?p=${B2CGraphSettings.B2C.user_flow_name}` +
    `&client_id=${B2CGraphSettings.B2C.client_id}` +
    `&grant_type=authorization_code` +
    `&scope=${B2CGraphSettings.B2C.scope}` +
    `&code=${code}` +
    `&redirect_uri=${B2CGraphSettings.B2C.redirect_url}` +
    `&code_verifier=${codeVerifier}`;

  const response = http.post(url, '', {
    tags: {
      b2c_login: 'GetToken',
    },
  });

  return JSON.parse(response.body).id_token;
};

/**
 * Signs in the user using the CombinedSigninAndSignup policy
 * extraqct B2C code from response
 * @function
 * @param {b2cStateProperties} state
 * @returns {string} code
 */
const CombinedSigninAndSignup = (state) => {
  const url =
    `https://${B2CGraphSettings.B2C.tenant_name}.b2clogin.com/${B2CGraphSettings.B2C.tenant_name}.onmicrosoft.com` +
    `/${B2CGraphSettings.B2C.user_flow_name}/api/CombinedSigninAndSignup/confirmed` +
    `?csrf_token=${state.csrfToken}` +
    `&rememberMe=false` +
    `&tx=StateProperties=${state.stateProperty}` +
    `&p=${B2CGraphSettings.B2C.user_flow_name}`;

  const response = http.get(url, '', {
    tags: {
      b2c_login: 'CombinedSigninAndSignup',
    },
  });
  const codeRegex = '.*code=([^"]*)';
  return response.url.match(codeRegex)[1];
};

/**
 * Signs in the user using the SelfAsserted policy
 * @function
 * @param {b2cStateProperties} state
 * @param {string} username
 * @param {string} password
 */
const SelfAsserted = (state, username, password) => {
  const url =
    `https://${B2CGraphSettings.B2C.tenant_name}.b2clogin.com/${B2CGraphSettings.B2C.tenant_id}` +
    `/${B2CGraphSettings.B2C.user_flow_name}/SelfAsserted` +
    `?tx=StateProperties=${state.stateProperty}` +
    `&p=${B2CGraphSettings.B2C.user_flow_name}` +
    `&request_type=RESPONSE` +
    `&email=${username}` +
    `&password=${password}`;

  const params = {
    headers: {
      'X-CSRF-TOKEN': `${state.csrfToken}`,
    },
    tags: {
      b2c_login: 'SelfAsserted',
    },
  };
  http.post(url, '', params);
};

/**
 * Calls the B2C login page to get the state property
 * @function
 * @returns {b2cStateProperties} b2cState
 */
const GetState = () => {
  const nonce = randomString(50);
  const challenge = crypto.sha256(nonce.toString(), 'base64rawurl');

  const url =
    `https://${B2CGraphSettings.B2C.tenant_name}.b2clogin.com` +
    `/${B2CGraphSettings.B2C.tenant_id}/oauth2/v2.0/authorize?` +
    `p=${B2CGraphSettings.B2C.user_flow_name}` +
    `&client_id=${B2CGraphSettings.B2C.client_id}` +
    `&nonce=${nonce}` +
    `&redirect_uri=${B2CGraphSettings.B2C.redirect_url}` +
    `&scope=${B2CGraphSettings.B2C.scope}` +
    `&response_type=code` +
    `&prompt=login` +
    `&code_challenge_method=S256` +
    `&code_challenge=${challenge}` +
    `&response_mode=fragment`;

  const response = http.get(url, '', {
    tags: {
      b2c_login: 'GetCookyAndState',
    },
  });

  const vuJar = http.cookieJar();
  const responseCookies = vuJar.cookiesForURL(response.url);

  const b2cState = {};
  b2cState.codeVerifier = nonce;
  b2cState.csrfToken = responseCookies['x-ms-cpim-csrf'][0];
  b2cState.stateProperty = response.body.match('.*StateProperties=([^"]*)')[1];
  return b2cState;
};

/**
 * Helper function to get the authorization header for a user
 * @param {user} user
 * @returns {object} httpsOptions
 */
export const GetAuthorizationHeaderForUser = (user) => {
  const token = GetB2cIdToken(user.username, user.password);

  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };
};

export default function () {
  const token = GetB2cIdToken('USERNAME', 'PASSWORD');
  console.log(token);
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
export function authenticateUsingOkta(
  oktaDomain,
  authServerId,
  clientId,
  clientSecret,
  scope,
  resource
) {
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
