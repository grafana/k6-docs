---
title: 'Members'
excerpt: 'Guide on inviting Team Members to your k6 account for collaboration'
---


User membership is handled at the organization level. You can invite users with different roles to gain access to the organization or selected projects within the organization.

## Roles

The following roles are supported:

- [Owner](#owner)
- [Admin](#admin)
- [Project member](#project-member): Read/Write or Read-Only.

### Owner

The organization's owner has unrestricted access to the organization data, settings and all its projects and member roles. The owner can pass ownership to another member by using the _Transfer ownership_ link from the organization settings.

### Admin

Admin users can see and edit all projects under the organization, manage members and change the majority of an organization's settings. Admins can assign/remove other admins but not change the owner.

### Project member

This role is suitable for cases when you don't want to grant the ability to edit organization or project settings. You can choose what kind of access type you want to grant to your selected projects - Read/Write or Read-Only.

#### Read/Write

Gives a project member the ability to create, edit, run and schedule tests in a particular project.

#### Read-Only

Gives a project member the ability only to view tests and test runs in a particular project. They are not able to modify them in any way.

> ⚠️ &nbsp; If you only have access to run tests in a specific project, don't forget to specify its projectID when running a cloud test from the k6 CLI. Read more [here](/cloud/project-and-team-management/projects/#running-cli-tests-in-a-specific-project).

## Managing members

There's two places in the k6 Cloud app where you can manage members - [Members settings](/cloud/project-and-team-management/members/#members-settings) under the **Organization settings** or through [Project settings](/cloud/project-and-team-management/members/#project-settings).

### Members settings

To locate **Members settings** click on **Members** link under the **Organization Settings** sub-menu in the top left corner.

![Members tab menu](images/03-Team-Members/members-tab-menu.png)

Under the **Members settings** you can invite new members to projects under your organization, change access levels or delete currently existing members.

![Members tab](images/03-Team-Members/members-tab.png)

To add new members click on `Invite new members` button.

![Invite members under members tab](images/03-Team-Members/invite-members-members-tab.png)

Then, within the modal, enter email addresses and select what kind of permission role you want to assign.<br />

> `Role` field will let you choose between [Admin](/cloud/project-and-team-management/members#admin) or [Project member](/cloud/project-and-team-management/members#project-member) roles, as you are able to manage members throughout the whole currently selected organization.

### Project settings

To locate this view click on the **Project settings** link located in the project dashboard near the `Create new test` button.

![Project settings menu](images/03-Team-Members/project-settings-menu.png)

In the **Project settings** view you can invite new members, change access levels or delete currently existing members from your selected project.

![Project settings](images/03-Team-Members/project-settings.png)

To add new project members click on `Invite members` button.

![Invite members under project settings](images/03-Team-Members/invite-new-members-project-settings.png)

Here you can specify email addresses and the permission role you want to assign to your currently selected project.

> `Role` field will only let you choose between **Read/Write** or **Read-Only**
> access types, as this view operates under the context of the currently selected project. If you want to set a member as an admin please refer to [Members settings](/cloud/project-and-team-management/members/#members-settings) section.
