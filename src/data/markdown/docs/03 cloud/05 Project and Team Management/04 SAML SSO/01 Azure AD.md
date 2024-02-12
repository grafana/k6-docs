---
title: 'Azure AD'
excerpt: 'Guide on setting up Azure AD to act as a SAML SSO IdP with k6 Cloud'
---

> ⭐️ SAML SSO is available on Enterprise plans.

Microsoft's Active Directory has been a long time the standard for managing an enterprise's users and their access permissions, and Azure Active Directory is its direct cloud counterpart. k6 Cloud integrates with Azure AD to provide organizations with a compliant way to handle on- and offboarding of team members to the service.

On this page, you can read:

- A quick table reference of the necessary fields to configure Azure AD as an IDP
- Detailed steps, with screenshots, of the entire procedure

## Prerequisites

To setup Azure AD SAML SSO based authentication to k6 Cloud you must have:

1. An [Enterprise plan](https://k6.io/pricing) or a plan with the SAML SSO add-on.
2. An [Azure AD Premium Subscription](https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing).

## Azure Active Directory

To find the **IdP metadata URL** needed by the k6 customer support team, find the **Single sign-on** menu for your Azure AD application. Copy the **SAML Certificates > App Federation Metadata Url** field.

Azure settings are modified from the **Single sign-on** sidebar menu for your Azure k6 cloud application.

### Basic SAML Configuration

| Attribute   | Value |
| ----------------------------| ----------- |
| Identifier (Entity ID) | `https://api.k6.io/sso/acs/` |
| Reply URL (Assertion Consumer Service URL) | `https://api.k6.io/sso/acs/` |
| Sign on URL | _Optional_ |
| Relay State (Optional) | _Optional_ |
| Logout Url (Optional) | `https://api.k6.io/sso/acs/logout` |

### Attributes and claims

These are required.

<!-- vale off -->

| Attribute | Value |
| ----------| ------|
| user.first_name | user.givenname |
| user.last_name | user.surname |
| user.email | user.userprincipalname |
| user.username | user.userprincipalname |
| token | `<TOKEN-YOU-GET-FROM-K6-SUPPORT>` |
| Unique User Identifier | user.userprincipalname |

<!-- vale on -->

### Additional attributes and claims

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

## Add Azure AD as an IdP

This procedure covers the same material of the previous sections, but adds granular detail:

1. Navigate to [https://portal.azure.com/](https://portal.azure.com/).
2. Log in to Azure Portal and go to **Azure Active Directory** tab.
3. Select the **Enterprise applications** service.
4. Click on the **New application** button.
5. Select **Non-gallery application**.
    ![Azure AD New Application Type](images/01-Azure-AD/azure-ad-new-application-type.png)
6. Give the application a name, e.g. **k6 Cloud**.
7. Click **Add**.
8. When your application has successfully been added, click **Set up single sign on** (or the equivalent "Single sign-on" link in the left menu):
    ![Azure AD Setup Single Sign-On](images/01-Azure-AD/azure-ad-setup-single-sign-on.png)
9. Click **SAML** to enable it:
    ![Azure AD Enable SAML](images/01-Azure-AD/azure-ad-enable-saml.png)
10. Edit **Basic SAML Configuration**:
    ![Azure AD Basic SAML Configuration](images/01-Azure-AD/azure-ad-setup-basic-config.png)

    Setting:

    | Property                                   | Value                              |
    | ------------------------------------------ | ---------------------------------- |
    | Identifier (Entity ID)                     | `https://api.k6.io/sso/acs/`       |
    | Reply URL (Assertion Consumer Service URL) | `https://api.k6.io/sso/acs/`       |
    | Logout Url                                 | `https://app.k6.io/account/logout` |

    Resulting in:
    ![Azure AD Basic SAML Configuration](images/01-Azure-AD/azure-ad-setup-basic-config2.png)

11. Edit **User Attributes & Claims**:
    ![Azure AD User Attributes](images/01-Azure-AD/azure-ad-setup-user-attributes.png)

    Setting the following user attributes (and clearing the "Namespace" property for each attribute):

    | Attribute                | Value                                                                      |
    | ------------------------ | -------------------------------------------------------------------------- |
    | `Unique User Identifier` | `user.userprincipalname`                                                   |
    | `user.email`             | `user.userprincipalname`                                                   |
    | `user.username`          | `user.userprincipalname`                                                   |
    | `user.first_name`        | `user.givenname`                                                           |
    | `user.last_name`         | `user.surname`                                                             |
    | `token`                  | An unique token that you'll be provided with by the k6 Cloud support team. |

    Resulting in:
    ![Azure AD User Attributes](images/01-Azure-AD/azure-ad-setup-user-attributes2.png)

12. Copy the "App Federation Metadata Url" and send it to k6 Cloud support for completion of the setup.
    ![Azure AD SAML Signing Certificate](images/01-Azure-AD/azure-ad-setup-saml-signing-cert.png)
13. Also, edit **SAML Signing Certificate** and set the "Signing option" to "Sign SAML response and assertion":
    ![Azure AD SAML Signing Certificate's signing option](images/01-Azure-AD/azure-ad-signing-option.png)
14. Before moving to the final step of testing the integration, make sure you've added the appropriate users and groups to the application in Azure AD:
    ![Azure AD Users and Groups menu](images/01-Azure-AD/azure-ad-users-groups-menu.png)
15. Once you've gotten confirmation from k6 Cloud support that your account is ready we advise you to test the integration by clicking the "Test" button in Azure AD:
    ![Azure AD Test SSO](images/01-Azure-AD/azure-ad-test-sso.png)

## Teams setup

Take the following steps to enable mapping of Azure Active Directory groups with k6 Cloud projects:

1. Navigate to [https://portal.azure.com/](https://portal.azure.com/).
2. Log in to Azure Portal and go to **Azure Active Directory** tab.
3. In the right pane, click on the **Groups** menu item.
4. Click on the **New Group** button.
5. Choose **Security** as the group type and choose a name for the group.
6. Click on the **No owners selected** and choose the group owner (usually the administrator).
7. Click on the **No members selected** and choose members of this group and click on **Select** when you're done.
8. Click on **Create** when you've done setting up your group. You'll be redirected back to the **Groups** page, and after a few seconds, your group will be created.
9. Go to your **k6 Cloud** enterprise application. To do so, search for **Enterprise Applications** in the top search bar.
10. Click on the **Users and groups** in the right pane, and you'll be presented with the list of users and groups assigned to your k6 Cloud application.
11. Click on the **Add user/group**, choose the newly created group, and click on **Assign**. This application is now assigned to all the members of that group. You can assign as many groups as you want to your k6 Cloud application. The group members will be later assigned to their projects on k6 Cloud.
12. Now click on the **Single sign-on** option in the right pane. In the  **Attributes & Claims** section, click on **Edit** on the frame top right corner.
13. Click on the **Add a group claim** and add a group claim as shown below:
    ![Azure SAML SSO group claim](images/01-Azure-AD/azure-group-claim.png)
14. You've successfully set up teams on your end. Inform your point of contact about the object id of each group and the list of projects on k6 Cloud you want the users from those groups to land on. You can retrieve the object id of the group by navigating to your **Azure Active Directory** and then clicking on **Groups** in the right pane. The list of groups and their object ids will be shown.
