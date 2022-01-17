---
title: 'Members'
excerpt: 'Guide on inviting Team Members to your k6 account for collaboration'
---


> <b>Members must specify a project id when runnings tests from a CLI</b>
> 
> If you're running tests from a CLI you must specify a `projectID` in `options.ext.loadimpact.projectID` in order to use the subscription of the Organization you have been invited to. You can find an example [here](/cloud/project-and-team-management/projects/#running-cli-tests-in-a-specific-project).

## Roles

In k6 Cloud app you can invite users to gain access to your organization, projects and subscriptions. There are currently two types of roles which you can assign when inviting a new member: [Admin](/cloud/project-and-team-management/members#admin) or [Project member](/cloud/project-and-team-management/members#project-member).

### Admin

Users with this role will be able to see and edit all the projects under your organization, manage members and change the majority of organizations settings.

### Project member

This role is suitable for cases when you don't want to grant the ability to edit organization or project settings. You can choose what kind of access type you want to grant to your selected projects - [Read/Write](/cloud/project-and-team-management/members/#read-write) or [Read-Only](/cloud/project-and-team-management/members/#read-only).

#### Read/Write

This access type gives a project member the ability to create, edit, run and schedule tests in a particular project.

#### Read-Only

Read-Only access type gives a project member the ability only to view tests and test runs in a particular project, not being able to modify them in any way.

## Managing members

There's two places in the k6 Cloud app where you can manage members - [Members tab](/cloud/project-and-team-management/members/#members-tab) under the **Organization settings** or through [Project settings](/cloud/project-and-team-management/members/#project-settings). 

### Members tab

To locate **Members tab** click on **Members** link under the **Organization Settings** sub-menu in the top left corner.

![Members tab menu](images/03-Team-Members/members-tab-menu.png)

Under the **Members tab** you will be able to invite new members to projects under your organization, change access levels or delete currently existing members.

![Members tab](images/03-Team-Members/members-tab.png)

To add new members click on `Invite new members` button. 

![Invite members under members tab](images/03-Team-Members/invite-members-members-tab.png)

Then, within the modal, enter email addresses and select what kind of permission role you want to assign.<br />

> `Role` field will let you choose between [Admin](/cloud/project-and-team-management/members#admin) or [Project member](/cloud/project-and-team-management/members#project-member) roles, as you are able to manage members throughout the whole currently selected organization.  

### Project settings

To locate this view click on the **Project settings** link located in the project dashboard near the `Create new test` button.

![Project settings menu](images/03-Team-Members/project-settings-menu.png)

In the **Project settings** view you will be able to invite new members, change access levels or delete currently existing members from your selected project. 

![Project settings](images/03-Team-Members/project-settings.png)

To add new project members click on `Invite members` button.

![Invite members under project settings](images/03-Team-Members/invite-new-members-project-settings.png)

Here you will be able to specify email addresses and the permission role you want to assign to your currently selected project.

> `Role` field will only let you choose between [Read/Write](/cloud/project-and-team-management/members/#read-write) or [Read-Only](/cloud/project-and-team-management/members/#read-only)
> access types, as this view operates under the context of the currently selected project. If you want to set a member as an admin please refer to [Members tab](/cloud/project-and-team-management/members/#members-tab) section.
