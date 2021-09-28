---
title: 'SAML SSO'
excerpt: 'Guide on setting up a SAML SSO Identity Provider with k6 Cloud'
---

> ⭐️ SAML SSO is available on Enterprise plans.

## What is SAML?

Security Assertion Markup Language (SAML) is an open standard for exchanging authentication and authorization data between parties, in particular, between an Identity Provider (e.g. Azure AD) and a Service Provider (e.g. k6 Cloud). The SAML SSO easies provisioning, management and access of users from a single identity provider, e.g. Okta, Azure AD or others, to multiple service providers.

k6 Cloud makes use of SAML single sign-on (SSO) to facilitate provisioning of new users into the app and later giving them access to various organization(s) and projects, and in turn load tests and test runs.

Read more over at Wikipedia about [Security Assertion Markup Language](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) and [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0).

## IdP and SP setup

To setup SAML SSO for your organization, some requirements should be satisfied and some steps should be taken on your IdP and on k6 Cloud. Assuming you already have admin access to your IdP and the k6 Cloud, this is the usual process to enable SAML SSO for your organization on k6 Cloud:

1. Install or setup the SAML SSO application on your IdP.
2. Provide the "SAML Metadata Autoconf URL" to the customer success team.
3. Update the application on the IdP with the provided token from the customer success team.
4. Assign users to the IdP application.
5. Optionally choose default projects for newly provisioned users to land in on k6 Cloud.

## Supported IdPs

Currently the following IdPs are supported and setup instructions for each of them are provided on their own page.

* [Azure Active Directory](/cloud/project-and-team-management/saml-sso/azure-ad)
* [Okta](/cloud/project-and-team-management/saml-sso/okta)

## Assigning default project(s) to newly provisioned users

When new users are provisioned into k6 Cloud, they are automatically joined to your organization and will be assigned the default project of your organization, usually called "My first project". However, you can change these default settings and choose which projects to assign to newly provisioned users.

It is recommended to update the list of projects as early as possible in the setup process before any new users are provisioned, so that you can have pre-defined projects assigned to the users. Please note that this feature doesn't work retroactively, that is, already existing (provisioned) users on k6 Cloud won't be affected by this change.

Follow these steps to update list of default projects for new users:

1. Make sure you correctly setup the SAML organization with the help of the customer success team. You can use your admin account to test the setup.
2. Go to your organization setting and choose the SAML SSO tab:
![SAML SSO settings](images/04-SAML-SSO/saml-sso-settings.png)
As you can see below, the default project is already selected:
![SAML SSO default project](images/04-SAML-SSO/saml-sso-default-project.png)
3. From the drop-down you can choose the default project(s) newly provisioned users will be assigned, then click on update button:
![SAML SSO update default projects](images/04-SAML-SSO/saml-sso-update-default-project.png)
4. Now the users assigned to the IdP application can sign in to k6 Cloud and they'll be automatically added to the specified project(s) in step 3 with __project read/write__ permissions.

Note: You must __not__ invite team members through the k6 Cloud web app. Rather _team members must SSO into k6 Cloud for account provisioning to happen_.
