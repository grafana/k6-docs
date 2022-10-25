---
title: 'SAML SSO'
excerpt: 'Guide on setting up a SAML SSO Identity Provider with k6 Cloud'
---

> ⭐️ SAML SSO is available on Enterprise plans.

## What is SAML SSO?

[SAML SSO](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) is an open standard that allows your company to manage your users through a central Identity Provider (IdP) application (such as [Azure Active Directory](/cloud/project-and-team-management/saml-sso/azure-ad) and [Okta](/cloud/project-and-team-management/saml-sso/okta)).
Once set up, new employees just need to be granted access in that application. They will then be able to log into k6 cloud without any additional authentication.

Upon connecting, the user will end up in the correct k6 organization and have access to k6 [Teams](/cloud/project-and-team-management/teams) and [Projects](/cloud/project-and-team-management/projects) based on the Okta/Azure Groups you have assigned them to. Removing them from the IdP means they also completely lose access to k6.

## Suggested Identity Providers (IdPs)

- [Okta](https://www.okta.com) - [setup instructructions](/cloud/project-and-team-management/saml-sso/okta). We can also auto-create Teams/Projects with names matching the Okta Groups you send.
- [Azure Active Directory](https://azure.microsoft.com/en-au/products/active-directory/) - [setup instructions](/cloud/project-and-team-management/saml-sso/azure-ad). Azure is supported, but Azure only pass group IDs and not actual group names to k6 cloud. This means that for anything more advanced, you need to manually create Teams/Projects on the k6 cloud side and then contact us in order to map them to the IDs sent from Azure AD.
- [Auth0](https://auth0.com/) is tested, but not supported, because it can't map [custom attributes](https://community.auth0.com/t/adding-custom-saml-attribute-when-auth0-is-idp/45691) in assertions.
- Since we support the open The  [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0) standard, you can connect k6 Cloud to practically any SAML 2.0 identity provider, not just the ones documented here.


## General setup

To set up SAML SSO for your organization, you need admin access to your k6 Organization and to the admin panel of the IdP you are using. This is currently a somewhat manual process that involves getting in touch with the k6 customer success team. These are the general steps:

1. Choose or create the  `k6 Cloud` SAML SSO application on your IdP of choice (such as Okta or Azure). You will want to organize your users into _Groups_ on the IdP side.
2. You need to find the **IdP Metadata URL** for your SAML SSO application. This should be forwarded to the k6 customer success team.
    - In Okta, go to the "Sign on" tab for your IdP application. Use `SAML Signing Certificates->Actions->View IdP metadata` and copy the URL of the page that opens.
    - In Azure, find the "Single sign-on" menu for your IdP application. Copy the `SAML Certificates->App Federation Metadata Url` field.
3. You will get a **token** string back from the k6 customer success team. In the SAML SSO application, add a custom _attribute_ `token` and set it to the value of the token you received.
    - In Okta, this is added from the  `General tab -> SAML Settings -> Edit` for your IdP app.
    - For Azure, this is added with  `Attributes & Claims -> Edit` in your IdP SSO setup.
4. If your IDP supports it, you can create custom attributes that point to IdP _Groups_ you want to map to k6 cloud Teams/Projects. These key:value pairs will be sent to k6 cloud when the user logs in. 
    - For Okta, you could set up an attribute named (for example) `department` with value (of type regex) `.*` to consider all groups as valid to send to k6 cloud. When a user connects, this would send for example `department`: ["engineering", "backend", "QA"], where the sent group-names sent only include those the user is actually a member of. Okta's default `Everyone` group is ignored. You need to tell the k6 customer success team of your setup. We can set up the system to automatically create a Team + Project of matching name for each Okta Group you send (or use existing ones if you already have them).
    - For Azure, you set up a _Group claim_ to send Azure Group IDs to us. Name the group claim (for example) `department` . When a user connects, this would send something like `department: ["11431a2-2da4s3-3ab215", "13ab51-1b121a-18a2a85"]` to us, where each id represents an Azure Group the user is actually a member of. Since we don't know what these group ids mean, you need to create the Teams/Project in k6 cloud and then tell us which Azure ID should go with each k6 Team/Project.
5. Assign IdP Groups (or users) to the application so they can use it.
6. **Optional:** Request the k6 customer success team to enforce SAML SSO on all existing and new users. This effectively disables username/password authentication for all users, even the owner.
7. **Optional:** Choose in k6 cloud `Organization->Settings->SAML SSO` which Team or Project newly provisioned users should join by default.
8. Users with access to the IdP `k6 Cloud` app can now click the icon to log into k6 cloud for the first time.
9. Once the user logged in once (is _provisioned_), they can henceforth log in both via the IdP dashboard and by using the SAML SSO button available on the login page of [k6.io](https://app.k6.io/account/login).

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

## Assigning default Teams (or projects) to newly provisioned users

When new users are provisioned into k6 Cloud, they automatically join your organization and will be assigned the default [Project](/cloud/project-and-team-management/projects/) of your organization. If you have access to  [Teams](/cloud/project-and-team-management/teams/) you will probably want to assign users to teams instead of directly to projects. You can change both in the k6 app settings: `Organization->Settings->SAML SSO` (see steps below).

While teams/projects can be auto-created on-connection (if you arranged for this with the k6 customer success team), they need to already exist for you to assign them in these settings.

> Note that this feature doesn't work retroactively: Already existing (provisioned) users on k6 Cloud won't be affected by changes made here. 

Follow these steps to update list of default teams/projects for new users:

1. Make sure you correctly setup the SAML organization with the help of the customer success team. You can use your admin account to test the setup.
2. Go to your organization setting and choose the SAML SSO tab:
![SAML SSO settings](images/04-SAML-SSO/saml-sso-settings.png)
As you can see below, the default project is already selected. If you have access to Teams, it's recommended that you [set up your Teams](/cloud/project-and-team-management/teams#creating-a-team) to grant access to the Projects you like, and just set up new users to join those Team(s) here rather than add them directly to Projects.

![SAML SSO default project](images/04-SAML-SSO/saml-sso-default-project.png)
3. From the drop-down you can choose the default team(s) or project(s) newly provisioned users will be assigned. Then click on update button:
![SAML SSO update default projects](images/04-SAML-SSO/saml-sso-update-default-project.png)
4. Now the users assigned to the IdP application can sign in to k6 Cloud. They'll be automatically added to project(s) in step 3 with __project read/write__ permissions. They will join Teams with a **team read only** permission (but the team will normally grant **project read/write** projects to all projects linked to the team).