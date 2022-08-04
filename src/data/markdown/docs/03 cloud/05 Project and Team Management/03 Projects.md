---
title: 'Projects'
excerpt: 'Keep your tests and team members organized with projects, a filing system built into the k6 web app'
---

Organizations can organize their tests and testers into _projects._

## Using Projects

You can think of Projects as a filing system that organizes your tests on a per-organization level.

Here are some ways we users use Projects to stay organized:

- Per team: Each team is given their own project for them to do their work and collaborate (see also [Teams](/cloud/project-and-team-management/teams)).
- Per component: A project is created for each component or service you're testing
- Per brand: E-commerce customers may want to use projects per brand to stay organized
- Per Customer: When dealing with custom software, you can to organize by customer to ensure each unique system is tested
- Per Major Release: After your systems go through a major change, you can to create a new project to organize the most recent data

> To learn how to manage users on an organization or project level, refer to [Members](/cloud/project-and-team-management/members).

## Running CLI Tests in a Specific Project

By default, when you run a test from the CLI, the test runs in the default project of your default organization.
You can **change the default project** of your default organization in the [account settings](https://app.k6.io/account).

If you want to set the test run in a different project, specify the `projectID` setting.

You can grab the project ID from the top-left corner of the dashboard:

![Test result navigation](images/02-Projects/projectID.png)

Then, modify your script to add the `projectID` to the [Cloud execution options](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli#cloud-execution-options):

```javascript
export const options = {
  ext: {
    loadimpact: {
      projectID: 3479144,
    },
  },
};
```
