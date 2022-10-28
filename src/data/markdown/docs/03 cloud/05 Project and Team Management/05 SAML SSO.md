---
title: 'SAML SSO'
excerpt: 'Guide on setting up a SAML SSO Identity Provider with k6 Cloud'
---

> ⭐️ SAML SSO is available on Enterprise plans.

## What is SAML SSO?

[SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) is an open standard to exchange authentication and authorization data. One use of SAML is _single sign-on_ (SSO), which lets an organization manage users through a central Identity Provider (IdP) application (such as [Azure Active Directory](/cloud/project-and-team-management/saml-sso/azure-ad) and [Okta](/cloud/project-and-team-management/saml-sso/okta)).
After you set up SAML SSO, you just need to grant access to new employees.
They will then be able to log into k6 cloud without any additional authentication.

Upon connecting, the user will end up in the correct k6 organization and have access to k6 [Teams](/cloud/project-and-team-management/teams) and [Projects](/cloud/project-and-team-management/projects) based on the Okta/Azure Groups you have assigned them to.

<Blockquote mod="warning" title="">

**If you remove users from the IdP, they lose all access to k6.**

</Blockquote>


## Suggested identity providers

- [Okta](https://www.okta.com) 
- [Azure Active Directory](https://azure.microsoft.com/en-au/products/active-directory/). Azure is supported, but Azure passes only _group IDs_ to k6 Cloud, not _group names_. This means that for anything more advanced, you need to manually create Teams or Projects in k6 Cloud side, then contact us to map them to the IDs sent from Azure AD.
- [Auth0](https://auth0.com/) is tested, but not supported, because it can't map [custom attributes](https://community.auth0.com/t/adding-custom-saml-attribute-when-auth0-is-idp/45691) in assertions.
- Since we support the open [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0) standard, you can connect k6 Cloud to practically any SAML 2.0 identity provider, not just the ones documented here. For further assistance, please contact support.

## Set up SAML SSO


**Before you begin**

To set up SAML SSO for your organization, you need the following:

- Admin access to your k6 Organization
- Admin access to the admin panel of the IdP you are using. 

Currently, setting up SAML SSO is a manual process that involves getting in touch with the k6 customer success team. 
The general procedure follows these steps:

1. Choose or create the `k6 Cloud` SAML SSO application on your IdP of choice (such as Okta or Azure). k6 recommends organizing your users into _Groups_ on the IdP side. Refer to the [Setups for specific IdPs](#idp-specific-setups).
2. Find the **IdP Metadata URL** for your SAML SSO application. Forward the URL to the k6 customer success team.
    - In Okta, go to the **Sign on** tab for your IdP application. Use `SAML Signing Certificates->Actions->View IdP metadata` and copy the URL of the page that opens.
    - In Azure, find the **Single sign-on** menu for your IdP application. Copy the `SAML Certificates->App Federation Metadata Url` field.
3. After you send the URL, the customer success team will send a **token**. In the SAML SSO application, add a custom _attribute_ `token` and set it to the value of the token you received.
4. **Optional**: If your IdP supports it, create custom attributes that point to the IdP _Groups_  that you want to map to k6 cloud Teams or Projects. These key-value pairs are sent to k6 cloud when users log in. [See below](#idp-specific-setups) for examples for Okta and Azure AD. 
5. Assign IdP Groups (or users) to the application so they can use it.
6. **Optional:** Request the k6 customer success team to enforce SAML SSO on all existing and new users. This effectively disables username/password authentication for all users, even the owner.
7. **Optional:** In k6 Cloud, go to `Organization->Settings->SAML SSO`. Choose the Team or Project that newly provisioned users will join by default.

After these steps, users with access to the IdP `k6 Cloud` app can now click the icon to log into k6 Cloud for the first time.
9. After users logs in once (is _provisioned_), they can henceforth log in both via the IdP dashboard and through the SAML SSO button available on the login page of [k6.io](https://app.k6.io/account/login).

> ⚠️ __Invite users via k6 Cloud web app doesn't work with SAML SSO__
>
> Once SAML SSO is enabled on the k6 Cloud for your organization, you must not invite team members through the k6 Cloud web app, rather they should use these following methods to be provisioned and to sign in:
>
> - Username/password and SAML SSO (mixed):<br/>
>   This is limited to the owner and the users created in advance via invitation with username/password.
> - SAML SSO:<br/>
>   All new users should be solely created via SAML SSO provisioning.
>
> 💡 __What is SAML SSO provisioning?__
>
> SAML SSO provisioning is the first time a user signs in to k6 Cloud web app via SAML SSO from their IdP dashboard. This process causes the user to be created, joined to its organization and assigned to the default project(s). 

## IdP-specific setups 

If you are familiar with SAML SSO, you only need this information to set up your IdP k6 cloud app. You should be able to adopt these examples for other IdPs as well.

### Okta 

These are modified from the Okta app in **General tab -> SAML Settings -> Edit**. You can also check out [setup instructructions with images](/cloud/project-and-team-management/saml-sso/okta). 

| Attribute                  | Value                                  |
| -------------------------- | -------------------------------------- |
| Single Sign On URL         | https://api.loadimpact.com/sso/acs/    |
| Recipient URL              | https://api.loadimpact.com/sso/acs/    |
| Destination URL            | https://api.loadimpact.com/sso/acs/    |
| Audience Restriction       | https://api.loadimpact.com/sso/acs/    |
| Default Relay State        | None                                   |
| Name ID Format             | EmailAddress                           |
| Response                   | Signed                                 |
| Assertion Signature        | Signed                                 |
| Signature Algorithm        | RSA_SHA256                             |
| Digest Algorithm           | SHA256                                 |
| Assertion Encryption       | Encrypted                              |
| SAML Single Logout         | Disabled                               |
| authnContextClassRef       | PasswordProtectedTransport             |
| Honor Force Authentication | Yes                                    |
| SAML Issuer ID             | http://www.okta.com/${org.externalKey} |

### Attribute Statements

These are required.

| Name            | Name Format | Value              |
| --------------- | ----------- | ------------------ |
| user.email      | Basic       | user.email         |
| user.username   | Basic       | user.login         |
| user.first_name | Basic       | user.firstName     |
| user.last_name  | Basic       | user.lastName      |
| token           | Basic       | `<TOKEN-YOU-GET-FROM-K6-SUPPORT>` |

#### Group Attribute Statements

Optional. If you don't pass group attribures, all users will start in the organization's _default_ Projects or Teams (configurable from the app, see the following section).

Configuring Okta to send Group attributes gives you more powerful mapping of Okta Groups to k6 cloud Teams Projects. Whatever you choose to add, you must communicate it to the k6 customer success team so they can set the matching mapping on the k6 cloud side.

This example would allow all Okta Groups to be sent.
When a user connects, Okta will send _only_ the Groups that the user acrually belongs to (k6 ignores the Okta `Everyone` Group).
k6 recommends this setup for most users.

| Name            | Name Format | Filter - Value  | 
| --------------- | ----------- | --------------- | 
| department      | Basic       | regex - .*      |


You can name the Attribute however you want, as long as you tell us what you chose.
As an example, if you are a member of three Okta teams, the data sent to k6 would look like this:


   `"department": ["Backend", "ProjectX", "Engineering"]`


If such teams existed on the k6 side, you'd join them. Otherwise they would be auto-created. Auto-created teams also get a Project with the same name assigned to it. 

### Azure Active Directory

Settings are modified from the `Single sign-on` sidebar menu for your Azure k6 cloud application. You can also check out [setup instructions with images](/cloud/project-and-team-management/saml-sso/azure-ad).

#### Basic SAML Configuration

| Attribute   | Value |
| ----------------------------| ----------- |
| Identifier (Entity ID) | https://api.k6.io/sso/acs/ | 
| Reply URL (Assertion Consumer Service URL) | https://api.k6.io/sso/acs/ |
| Sign on URL | _Optional_ | 
| Relay State (Optional) | _Optional_ | 
| Logout Url (Optional) | https://api.k6.io/sso/acs/logout |

#### Attributes and claims

These are required.

| Attribute | Value | 
| ----------| ------|
| user.first_name | user.givenname | 
| user.last_name | user.surname | 
| user.email | user.userprincipalname | 
| user.username | user.userprincipalname | 
| token | `<TOKEN-YOU-GET-FROM-K6-SUPPORT>` | 
| Unique User Identifier | user.userprincipalname | 

#### Additional attributes and claims 

This is optional. If not given, all users will end up starting in the k6 Organization's _default_ Project(s) or Team(s) (configurable from the app, see next section).

Setting Azure up to send Group attributes, allows for more powerful mapping of Azure Groups to k6 cloud Teams/Projects. Whatever you choose to add here, you must communicate it to the k6 customer success team so they can set it the matching mapping on the k6 cloud side.

| Attribute | Value  | 
| --------- | ------ | 
| department | user.groups | 
  
(It doesn't matter what the Attribute is called, as long as you tell us what you chose). Azure AD sends "Group Object IDs", so if you are a member of three groups, the data k6 receives would look like this: 

    "department": ["6663s5-234f20342-c232ad1-8dwsr2356", 
                   "114fs5-664f20543-b612bd3-s7sr23c88", 
                   "57f6sa-28ab52112-a25sc85-abc2aa223"]

k6 won't know which Azure Group each ID corresponds to. So you need to check the `Users and Groups` for your Azure application and figure out the  `Object Id` for each Group. You then need to send to send the k6 customer support a mapping like this: 
  
| Azure Group Object ID | Team /Project name to use on the k6 side| 
| --------------- | ----------------------------------- | 
| "6663s5-234f20342-c232ad1-8dwsr2356" | "Backend" | 
| "114fs5-664f20543-b612bd3-s7sr23c88" | "Frontend" | 
| "57f6sa-28ab52112-a25sc85-abc2aa223" | "ProjectX" | 


The k6 cloud support team will then map the Group IDs to your Teams on the k6 cloud side.

## Assigning default Teams and Projects to newly provisioned users

When new users are provisioned into k6 Cloud, they automatically join your organization and will be assigned the default [Project](/cloud/project-and-team-management/projects/) of your organization. If you have access to  [Teams](/cloud/project-and-team-management/teams/) you will probably want to assign users to teams instead of directly to projects. You can change both in the k6 app settings: `Organization->Settings->SAML SSO` (see steps below).

While teams/projects can be auto-created on-connection (if you arranged for this with the k6 customer success team), they need to already exist for you to assign them in these settings.


<Blockquote mod="note" title="This feature doesn't work retroactively">

 Changes here do not affect users who already exist (are provisioned) on k6 Cloud. 

</Blockquote>


Follow these steps to update list of default teams/projects for new users:

1. Make sure you correctly setup the SAML organization with the help of the customer success team. You can use your admin account to test the setup.
2. Go to your organization setting and choose the SAML SSO tab.
![SAML SSO settings](images/04-SAML-SSO/saml-sso-settings.png)

3. If you have access to Teams, it's recommended that you [set up your Teams](/cloud/project-and-team-management/teams#creating-a-team) to grant access to the Projects you like, and just set up new users to join those Team(s) here rather than add them directly to Projects. From the drop-down you can choose the default team(s) or project(s) newly provisioned users will be assigned.
![SAML SSO default project](images/04-SAML-SSO/saml-sso-default-project.png)

4. Now the users assigned to the IdP application can sign in to k6 Cloud. They'll be automatically added to project(s) in step 3 with __project read/write__ permissions. They will join Teams with a **team read only** permission (but the team will normally grant **project read/write** projects to all projects linked to the team).
