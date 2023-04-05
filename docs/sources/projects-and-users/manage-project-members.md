---
title: Manage project members
description: Learn the distinct roles in k6 projects and how to grant role access to team members
weight: 402
aliases:
  - /docs/k6/projects-and-users/manage-project-members/
---

# Manage project members

A k6 project member is a Grafana user with access to a particular [k6 project]({{< relref "./projects" >}}). Each member is associated with a role that includes permissions in the project.

## Roles

Grafana Cloud k6 uses the following roles to control user access:

- **Admin**. Can access to all the resources.
- **Editor**. Can create and run tests.
- **Viewer**. Can only view tests.

## Grant member roles

**Before you begin:**

- Ensure that you are an admin of the k6 project.
- The new project member must be a Grafana organization member and have logged into the Grafana Stack of the k6 project.

Then, to grant a role to a team member in a k6 project, follow these steps:
1. Click **Projects** on the k6 sidebar.
2. Click the **Project Settings** (gear) icon of the particular project.
3. Click the **Add users** button.
4. In the **Email address** field, locate and select a user.
5. In the **Role** field, select a role.
6. Click the **Add users** button.

The following example shows a list as it appears to an admin.

![Grafana Cloud k6 - Project Settings](/media/docs/k6/screenshoot-grafana-cloud-k6-project-settings.png)

In this view, you can remove a user from the project or change their role.
