---
title: 'SAML SSO'
excerpt: 'Guide on setting up a SAML SSO Identity Provider with k6 Cloud'
---

> ⭐️ SAML SSO is available on Enterprise plans.

## What is SAML SSO?

[SAML SSO](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) is an open standard that allows your company to manage your users through a central Identity Provider (IdP) application (such as [Azure Active Directory](/cloud/project-and-team-management/saml-sso/azure-ad) and [Okta](/cloud/project-and-team-management/saml-sso/okta)).
Once set up, new employees just need to be granted access in that application. They will then be able to log into k6 cloud without any additional authentication.

Upon connecting, the user will end up in the correct k6 organization and have access to k6 [Teams](/cloud/project-and-team-management/teams) and [Projects](/cloud/project-and-team-management/projects) based on the Okta/Azure Groups you have assigned them to. Removing them from the IdP means they also complete lose acccess to k6.

## Suggested Identity Providers (IdPs)

- [Okta](https://www.okta.com) - [setup instructructions](/cloud/project-and-team-management/saml-sso/okta).
- [Azure Active Directory](https://azure.microsoft.com/en-au/products/active-directory/) - [setup instructions](/cloud/project-and-team-management/saml-sso/azure-ad). Azure is supported, but Azure can only pass group IDs and not actual group names to k6 cloud. This means that for anything more advanced, you need to manually create Teams/Projects on the k6 cloud side and then contact us in order to map them to the IDs sent from Azure AD.
- [Auth0](https://auth0.com/) is tested, but not supported, because it can't map [custom attributes](https://community.auth0.com/t/adding-custom-saml-attribute-when-auth0-is-idp/45691) in assertions.
- Since we support the open The  [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0) standard, you can connect k6 Cloud to practically any SAML 2.0 identity provider, not just the ones documented here.


## General setup

To set up SAML SSO for your organization, you need admin access to your k6 Organization and to the admin panel of the IdP you are using. You also need to be in touch with the k6 customer success team. These are the general steps:

1. Choose or create the  `k6 Cloud` SAML SSO application on your IdP of choice.
2. Provide the "IdP Metadata URL" for your SAML SSO application to the k6 customer success team.
3. You will get a token string back from the k6 customer success team. In the SAML SSO application, add a custom attribute "token" and set it to the value of that token.
4. If your iDP supports it, you can create custom attributes that relate IdP "Groups" to one or more keys. Only the groups which the user is actually a member of in the IdP will be passed to k6 cloud when they log in. If you tell the customer success team of your setup, we can map them to matching Teams/Projects on the k6 side (even create them automatically).
6. Assign users (or groups) to the IdP application.
7. Optionally request from the k6 customer success team to enforce SAML SSO on all existing and new users. This effectively disables username/password authentication for all users, even the owner.
8. Optionally choose in k6 cloud `Organization->Settings->SAML SSO` which Team or Project newly provisioned users should default to joining.
9. Users can now be provisioned to k6 Cloud web app once they have access to and click on the application icon on their IdP dashboard.
10. Once the user is provisioned (created and joined to the correct organization/project on k6 Cloud), they can use both IdP- and SP-initiated to sign in. This means that in addition to the clicking on the k6 Cloud application on their IdP dashboard, the user can also use the SAML SSO button available on the k6 Cloud web app.

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
> SAML SSO provisioning is the first time a user signs in to k6 Cloud web app via SAML SSO from their IdP dashboard. This process causes the user to be created, joined to its organization and assigned to the default project(s). After this process the user can use IdP- and SP-initiated SAML SSO.

## Assigning default Teams (or projects) to newly provisioned users

When new users are provisioned into k6 Cloud, they automatically join your organization and will be assigned the default [Project](/cloud/project-and-team-management/projects/) of your organization. If you have access to  [Teams](/cloud/project-and-team-management/teams/) you will probably want to assign users to teams instead of directly to projects. You can change both in the k6 app settings: `Organization->Settings->SAML SSO` (see steps below).

While teams/projects can also be auto-created on-connection (if you arranged for this with the k6 customer success team), they need to already exist for you to assign them in these settings.

> Note that this feature doesn't work retroactively, that is, already existing (provisioned) users on k6 Cloud won't be affected by changes made here.

Follow these steps to update list of default teams/projects for new users:

1. Make sure you correctly setup the SAML organization with the help of the customer success team. You can use your admin account to test the setup.
2. Go to your organization setting and choose the SAML SSO tab:
![SAML SSO settings](images/04-SAML-SSO/saml-sso-settings.png)
As you can see below, the default project is already selected. If you have access to Teams, it's recommended that you [set up your Teams](/cloud/project-and-team-management/teams#creating-a-team) to grant access to the Projects you like, and just set up new users to join those Team(s) here rather than add them directly to Projects.

![SAML SSO default project](images/04-SAML-SSO/saml-sso-default-project.png)
3. From the drop-down you can choose the default project(s) newly provisioned users will be assigned, then click on update button:
![SAML SSO update default projects](images/04-SAML-SSO/saml-sso-update-default-project.png)
4. Now the users assigned to the IdP application can sign in to k6 Cloud and they'll be automatically added to the specified project(s) in step 3 with __project read/write__ permissions.

## Auto-assigning your internal teams to k6 teams

You can link your IdP groups to k6 _Teams_ and/or _Projects.

There are more detailed descriptions for linking [Okta](/cloud/project-and-team-management/saml-sso/okta) and [Azure Active Directory](/cloud/project-and-team-management/saml-sso/azure-ad) _groups_ to k6 cloud. This section just gives a general summary.

1. You, or whomever the IdP organization admin is, should organize your internal teams into Okta/Azure _groups_. Make sure to give those groups access to the `k6 Cloud` application.
2. You need to decide how those Okta/Azure groups should be mapped to k6 cloud. If you have access to k6 Teams, we recommend mapping each Azure/Okta group to a same-named k6 Team. Alternatively you can also link each group to a matching individual k6 Project.
3. In your IdP, you need to map your groups to an _attribute statement_.
    - In Okta you could for example add an attribute `department` with a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) value of `.*` (to consider all Okta groups). As a new user connects, this means all Okta groups are considered. _Only the group names of the groups the user is actually a member of will be sent to us_. Okta's default _Everyone_ group will be ignored.
    - In Azure, you should add a _Group claim_ for all Groups. Since Azure sends Azure Group IDs rather than group names, you need to also manually note down the Azure Group ID + Group name pair of every Group you want to map into k6 cloud.
4. Since mapping your teams to k6 projects is currently a manual process, you need to reach out to us via the Customer Success team for further setup. We will ask you for the attribute name you used to pass the group(s) to us.
    -  For Okta (if you use a regex like above), you'd only need to tell us the on attribute name you assigned (like `department`). Group names will become Team/Project names. When a the first member of an Okta Group connects, we will auto-create a Team + Project of the same name, if it doesn't already exist.
    - For Azure, you need to pre-create the Teams/Projects you need in k6 cloud. You then need to tell us which Group name corresponds to each Azure Group ID sent by Azure so we can map what Azure sends to the Teams/Projects you have created.
