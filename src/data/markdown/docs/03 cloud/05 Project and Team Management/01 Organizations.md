---
title: 'Organizations'
excerpt: 'An explanation about organizations and the hierarchy in the k6 web app.'
---

_Organizations_ are the top-level structural unit in k6 Cloud.

## Using Organizations

By default, all users have one organization in their k6 account.
k6 creates and assigns this organization automatically when a user registers.
If you purchase a subscription, the subscription is associated with the organization.
As an organization owner, you can invite new users as either [Admins](/cloud/project-and-team-management/members#admin) or [Project members](/cloud/project-and-team-management/members#project-member).
These users can use the subscription and access projects in the organization.

If someone invites you to another Organization, you will have access based on the role the owner assigned to you ([Admin](/cloud/project-and-team-management/members#admin) or [Project member](/cloud/project-and-team-management/members#project-member)).

> **Most users require only one organization for their subscription.**
>
> Some larger companies may wish to use multiple organizations to manage multiple unique subscriptions.

### Run tests in another organization

If someone invites you to another organization as a Team Member, you must specify a projectID in `ext.loadimpact.projectID` to use that organization's subscription to run your test.

## Hierarchy Diagram

The following diagram visualizes the relationship of different aspects of the web application.

![Hierarchy](./images/01-Organizations/organization-hierarchy-diagram.png)
