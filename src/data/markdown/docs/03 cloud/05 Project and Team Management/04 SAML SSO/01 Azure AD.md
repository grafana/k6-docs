---
title: 'Azure AD'
excerpt: 'Guide on setting up Azure AD to act as a SAML SSO IdP with k6 Cloud'
---

> ⭐️ SAML SSO is available on Enterprise plans.

Microsoft's Active Directory has been a long time the standard for managing an enterprise's users and their access permissions, and Azure Active Directory is its direct cloud counterpart. k6 Cloud integrates with Azure AD to provide organizations with a compliant way to handle on- and offboarding of team members to the service.

## Prerequisites

To setup Azure AD SAML SSO based authentication to k6 Cloud you must have:

1. An [Enterprise plan](https://k6.io/pricing) or a plan with the SAML SSO add-on.
2. An [Azure AD Premium Subscription](https://azure.microsoft.com/en-us/pricing/details/active-directory/).

## Configuration

1.  Navigate to [https://portal.azure.com/](https://portal.azure.com/).

2.  Log in to Azure and go to **"Azure Active Directory"** tab.

3.  Select the **"Enterprise applications"** service.

4.  Click on the **"New application"** button.

5.  Select **"Non-gallery application"**.

    ![Azure AD New Application Type](images/01-Azure-AD/azure-ad-new-application-type.png)

6.  Give the application a name, e.g. **k6 Cloud**.

7.  Click **"Add"**.

8.  When your application has successfully been added, click **"Set up single sign on"** (or the equivalent "Single sign-on" link in the left menu):

    ![Azure AD Setup Single Sign-On](images/01-Azure-AD/azure-ad-setup-single-sign-on.png)

9.  Click **"SAML"** to enable it:

    ![Azure AD Enable SAML](images/01-Azure-AD/azure-ad-enable-saml.png)

10. Edit **"Basic SAML Configuration"**:

    ![Azure AD Basic SAML Configuration](images/01-Azure-AD/azure-ad-setup-basic-config.png)

    Setting:

    | Property                                   | Value                              |
    | ------------------------------------------ | ---------------------------------- |
    | Identifier (Entity ID)                     | `https://api.k6.io/sso/acs/`       |
    | Reply URL (Assertion Consumer Service URL) | `https://api.k6.io/sso/acs/`       |
    | Logout Url                                 | `https://app.k6.io/account/logout` |

    Resulting in:

    ![Azure AD Basic SAML Configuration](images/01-Azure-AD/azure-ad-setup-basic-config2.png)

11. Edit **"User Attributes & Claims"**:

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

13. Also, edit **"SAML Signing Certificate"** and set the "Signing option" to "Sign SAML response and assertion":

    ![Azure AD SAML Signing Certificate's signing option](images/01-Azure-AD/azure-ad-signing-option.png)

14. Before moving to the final step of testing the integration, make sure you've added the appropriate users and groups to the application in Azure AD:

    ![Azure AD Users and Groups menu](images/01-Azure-AD/azure-ad-users-groups-menu.png)

15. Once you've gotten confirmation from k6 Cloud support that your account is ready we advise you to test the integration by clicking the "Test" button in Azure AD:

    ![Azure AD Test SSO](images/01-Azure-AD/azure-ad-test-sso.png)

## See also

- [Project and Team Management / SAML SSO](/cloud/project-and-team-management/saml-sso/)