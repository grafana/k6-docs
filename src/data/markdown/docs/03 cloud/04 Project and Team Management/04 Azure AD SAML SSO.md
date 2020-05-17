---
title: 'Azure AD SAML SSO'
excerpt: 'Guide on setting up Azure AD to act as a SAML SSO IdP with k6 Cloud'
---

<div class="doc-blockquote" data-props='{"mod": "warning"}'>

> <b>This feature requires the SAML SSO addon or an Enterprise plan</b><br>
> To setup SAML SSO based authentication to k6 Cloud you must have a Team plan or above and the SAML SSO addon, alternatively be on an Enterprise plan. You must also have an Azure AD Premium Subscription.

</div>

## Configuration

1. Navigate to [https://portal.azure.com/](https://portal.azure.com/).
<br><br>

2. Log in to Azure and go to **"Azure Active Directory"** tab.
<br><br>

3. Select the **"Enterprise applications"** service.
<br><br>

4. Click on the **"New application"** button.
<br><br>

5. Select **"Non-gallery application"**.

    ![Azure AD New Application Type](images/04 Azure AD SAML SSO/azure-ad-new-application-type.png)
<br><br>

6. Give the application a name, eg. **k6 Cloud**.
<br><br>

7. Click **"Add"**.
<br><br>

8. When your application has successfully been added, click **"Set up single sign on"** (or the equivalent "Single sign-on" link in the left menu):

    ![Azure AD Setup Single Sign-On](images/04 Azure AD SAML SSO/azure-ad-setup-single-sign-on.png)
<br><br>

9. Click **"SAML"** to enable it:

    ![Azure AD Enable SAML](images/04 Azure AD SAML SSO/azure-ad-enable-saml.png)
<br><br>

10. Edit **"Basic SAML Configuration"**:

    ![Azure AD Basic SAML Configuration](images/04 Azure AD SAML SSO/azure-ad-setup-basic-config.png)

    Setting:

    | Property                                   | Value                               |
    | ------------------------------------------ | ----------------------------------- |
    | Identifier (Entity ID)                     | `https://api.k6.io/sso/acs/`        |
    | Reply URL (Assertion Consumer Service URL) | `https://api.k6.io/sso/acs/`        |
    | Logout Url                                 | `https://api.k6.io/account/logout/` |

    Resulting in:

    ![Azure AD Basic SAML Configuration](images/04 Azure AD SAML SSO/azure-ad-setup-basic-config2.png)
<br><br>

11. Edit **"User Attributes & Claims"**:

    ![Azure AD User Attributes](images/04 Azure AD SAML SSO/azure-ad-setup-user-attributes.png)

    Setting the following user attributes (and clearing the "Namespace" property for each attribute):

    | Attribute                | Value                                                                     |
    | -------------------------| ------------------------------------------------------------------------- |
    | `Unique User Identifier` | `user.userprincipalname`                                                  |
    | `user.email`             | `user.userprincipalname`                                                  |
    | `user.username`          | `user.userprincipalname`                                                  |
    | `user.first_name`        | `user.givenname`                                                          |
    | `user.last_name`         | `user.surname`                                                            |
    | `token`                  | An unique token that you'll be provided with by the k6 Cloud support team. |

    Resulting in:

    ![Azure AD User Attributes](images/04 Azure AD SAML SSO/azure-ad-setup-user-attributes2.png)
<br><br>

12. Copy the "App Federation Metadata Url" and send it to k6 Cloud support for completion of the setup.

    ![Azure AD SAML Signing Certificate](images/04 Azure AD SAML SSO/azure-ad-setup-saml-signing-cert.png)
