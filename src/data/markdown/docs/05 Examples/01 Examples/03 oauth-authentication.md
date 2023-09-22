---
title: 'OAuth Authentication'
excerpt: 'Scripting examples on how to use OAuth authentication in your load test.'
---

Scripting examples on how to use OAuth authentication in your load test.

## OAuth authentication

The following examples take a set of arguments, shown in the function documentation, and returns the response body as JSON so that you can extract the token from.

### Azure Active Directory

<CodeGroup labels={["azure.js"]} lineNumbers={[true]}>

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

### Azure B2C

The following example shows how to authenticate against Azure B2C using the [Client Credentials Flow](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-oauth-code#client-credentials-flow).

This example is build after a JMeter eyample: [Load Test Azure AD B2C Ciam Flows using Azure Load Testing Service](https://github.com/azure-ad-b2c/load-tests)

<CodeGroup labels={["azure-b2c.js"]} lineNumbers={[true]}>

```javascript
import http from "k6/http";
import crypto from "k6/crypto";
import encoding from "k6/encoding";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const B2cGraphSettings = {
  B2C: {
    client_id: "", // Application ID in Azure
    policy_name: "{policy_name}",
    tenant_id: "", // Directory ID in Azure
    tenant_name: "",
    scope: "openid",
    redirect_url: "https://jwt.ms",
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
  var state = GetState();
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
    `https://${B2cGraphSettings.B2C.tenant_name}.b2clogin.com/${B2cGraphSettings.B2C.tenant_id}` +
    `/oauth2/v2.0/token` +
    `?p=${B2cGraphSettings.B2C.policy_name}` +
    `&client_id=${B2cGraphSettings.B2C.client_id}` +
    `&grant_type=authorization_code` +
    `&scope=${B2cGraphSettings.B2C.scope}` +
    `&code=${code}` +
    `&redirect_uri=${B2cGraphSettings.B2C.redirect_url}` +
    `&code_verifier=${codeVerifier}`;

  const response = http.post(url, "", {
    tags: {
      b2c_login: "GetToken",
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
  const diags =
    '{"pageViewId":"4c4fb67d-8e6e-40c6-96c5-ad6a892f75d1","pageId":"CombinedSigninAndSignup","trace":[{"ac":"T005","acST":1647878090,"acD":1},{"ac":"T021 - URL:https://login.lagomars.com/static/tenant/templates/AzureBlue/unified.cshtml?slice=001-000&dc=SAN","acST":1647878090,"acD":1093},{"ac":"T029","acST":1647878091,"acD":5},{"ac":"T019","acST":1647878091,"acD":8},{"ac":"T004","acST":1647878091,"acD":2},{"ac":"T003","acST":1647878091,"acD":2},{"ac":"T035","acST":1647878092,"acD":0},{"ac":"T030Online","acST":1647878092,"acD":0},{"ac":"T002","acST":1647878097,"acD":0},{"ac":"T018T010","acST":1647878095,"acD":1605}]}';
  const url =
    `https://${B2cGraphSettings.B2C.tenant_name}.b2clogin.com/${B2cGraphSettings.B2C.tenant_id}` +
    `/${B2cGraphSettings.B2C.policy_name}/api/CombinedSigninAndSignup/confirmed` +
    `?csrf_token=${state.csrfToken}` +
    `&rememberMe=false` +
    `&tx=StateProperties=${state.stateProperty}` +
    `&p=B2C_1A_signin_rest_api_validation` +
    `&diags=${encoding.b64encode(diags)}`;

  const response = http.get(url, "", {
    tags: {
      b2c_login: "CombinedSigninAndSignup",
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
    `https://${B2cGraphSettings.B2C.tenant_name}.b2clogin.com/${B2cGraphSettings.B2C.tenant_id}` +
    `/${B2cGraphSettings.B2C.policy_name}/SelfAsserted` +
    `?tx=StateProperties=${state.stateProperty}` +
    `&p=${B2cGraphSettings.B2C.policy_name}` +
    `&request_type=RESPONSE` +
    `&signInName=${username}` +
    `&password=${password}`;

  const params = {
    headers: {
      "X-CSRF-TOKEN": `${state.csrfToken}`,
    },
    tags: {
      b2c_login: "SelfAsserted",
    },
  };
  http.post(url, "", params);
};

/**
 * Calls the B2C login page to get the state property
 * @function
 * @returns {b2cStateProperties} b2cState
 */
const GetState = () => {
  var nonce = randomString(50);
  var challenge = crypto.sha256(nonce.toString(), "base64rawurl");

  const url =
    `https://${B2cGraphSettings.B2C.tenant_name}.b2clogin.com` +
    `/${B2cGraphSettings.B2C.tenant_id}/oauth2/v2.0/authorize?` +
    `p=${B2cGraphSettings.B2C.policy_name}` +
    `&client_id=${B2cGraphSettings.B2C.client_id}` +
    `&nonce=${nonce}` +
    `&redirect_uri=${B2cGraphSettings.B2C.redirect_url}` +
    `&scope=${B2cGraphSettings.B2C.scope}` +
    `&response_type=code` +
    `&prompt=login` +
    `&code_challenge_method=S256` +
    `&code_challenge=${challenge}` +
    `&response_mode=fragment`;

  const response = http.get(url, "", {
    tags: {
      b2c_login: "GetCookyAndState",
    },
  });

  const vuJar = http.cookieJar();
  const responseCookies = vuJar.cookiesForURL(response.url);

  var b2cState = {};
  b2cState.codeVerifier = nonce;
  b2cState.csrfToken = responseCookies["x-ms-cpim-csrf"][0];
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
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};
```



</CodeGroup>

### Okta

<CodeGroup labels={["Okta-test.js"]} lineNumbers={[true]}>

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

</CodeGroup>

For a detailed example, please visit this article: [How to Load Test OAuth secured APIs with k6?](https://k6.io/blog/how-to-load-test-oauth-secured-apis-with-k6)
