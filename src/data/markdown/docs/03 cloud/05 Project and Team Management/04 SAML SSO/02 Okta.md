---
title: 'Okta'
excerpt: 'Guide on setting up Okta to act as a SAML SSO IdP with k6 Cloud'
---

> ⭐️ SAML SSO is available on Enterprise plans.

## Background

Okta is a well-known identity and access management service that provides means for provisioning and user management all in a single place. k6 Cloud integrates with Okta to provide organizations with a compliant way to handle on- and offboarding of team members to the service.

## Prerequisites

To setup Okta SAML SSO based authentication to k6 Cloud you must have:

1. A [Team plan](https://k6.io/pricing) or above and the SAML SSO add-on(\$), alternatively be on an Enterprise plan.
2. An [Okta Subscription with SSO Integrations](https://www.okta.com/pricing/).

## Configuration

1. Head over to [`https://your-organization.okta.com/`](https://your-organization.okta.com/).
2. Go to Applications menu item and click on Applications.
3. Click on Browse App Catalog button.
![Okta applications](images/02-Okta/okta-apps.png)
4. Search for k6 Cloud and choose the application from the drop-down, and then click on Add.
![k6 Cloud application](images/02-Okta/okta-k6-cloud-app.png)
5. You'll be presented with a few setup options. Choose your desired application label and visibility settings and click on Done.
![k6 Cloud application setup](images/02-Okta/okta-k6-cloud-app-setup.png)
6. You'll be sent to the k6 Cloud application configuration page, where you can copy the Metadata URL from the Sing On tab. The link referenced by the Identity Provider metadata should be copied and sent to the customer success team for further setup. The link usually looks like
[`https://your-organization.okta.com/app/your-app-id/sso/saml/metadata`](https://your-organization.okta.com/app/your-app-id/sso/saml/metadata)
![k6 Cloud application metadata](images/02-Okta/okta-k6-cloud-app-metadata-url.png)
7. The customer success team will convert your k6 Cloud organization to a SAML organization and provide you with a token. On the same tab (Sign On), click on Edit in the top right corner and paste the token in the Advanced Sign-on Settings and click on Save button at the bottom of the same box.
![k6 Cloud application token](images/02-Okta/okta-k6-cloud-app-token.png)
8. Now go to Assignments tab and assign the app to the users:
![k6 Cloud application assignments](images/02-Okta/okta-k6-cloud-app-assignments.png)
9. The app will appear on the users' dashboard and when they click on the app icon, they will be redirected to k6 Cloud app and will be provisioned the first time or signed in the second time on. Upon provisioning, they will be automatically assigned to the default project(s) with __project read/write__ permissions.
![Okta user dashboard](images/02-Okta/okta-user-dashboard.png)
