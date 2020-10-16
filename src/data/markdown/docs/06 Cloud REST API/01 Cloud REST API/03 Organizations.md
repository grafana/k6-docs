---
title: 'Organizations'
excerpt: ''
draft: 'true'
---

## List organizations

Returns a list of organizations associated with the authenticated user along with organization details.

**GET** `/v3/organizations`

<CodeGroup labels={["Response"]}>

```json
{
  "organizations": [
    {
      "id": 0,
      "name": "string",
      "owner_id": 0,
      "description": "string",
      "billing_address": "string",
      "billing_country": "string",
      "billing_email": "user@example.com",
      "vat_number": "string",
      "created": "2020-08-13T18:28:45Z",
      "updated": "2020-08-13T18:28:45Z",
      "is_default": true
    }
  ]
}
```

</CodeGroup>

## Read organization details

Returns details for the specified organization.

**GET** `/v3/organizations/{organization_id}`

| Path Parameter  | Type    | Description                                           |
| --------------- | ------- | ----------------------------------------------------- |
| organization_id | integer | A unique integer value identifying this organization. |

<CodeGroup labels={["Response"]}>

```json
{
  "organization": {
    "id": 0,
    "name": "string",
    "owner_id": 0,
    "description": "string",
    "billing_address": "string",
    "billing_country": "string",
    "billing_email": "user@example.com",
    "vat_number": "string",
    "created": "2020-08-13T18:28:45Z",
    "updated": "2020-08-13T18:28:45Z",
    "is_default": true
  }
}
```

</CodeGroup>

## List organization projects

Returns all projects a user is member of in the specified organization.

**GET** `/v3/organizations/{organization_id}/projects`

| Path Parameter  | Type    | Description                                           |
| --------------- | ------- | ----------------------------------------------------- |
| organization_id | integer | A unique integer value identifying this organization. |

<CodeGroup labels={["Response"]}>

```json
{
  "projects": [
    {
      "id": 47,
      "name": "my Project",
      "description": "project for load testing of my site",
      "organization_id": 1013,
      "created": "2020-08-13T18:28:45Z",
      "updated": "2020-08-13T18:28:45Z",
      "is_default": true
    }
  ]
}
```

</CodeGroup>
