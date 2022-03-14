---
title: 'Projects'
excerpt: 'Keep your tests and team members organized with projects, a filing system built into the k6 web app'
---

## Using Projects

Projects can be considered a filing system which you use to organize your tests on a per organization level. They are flexible enough to allow you to use them in a way that makes sense to you, but simple enough to not lose information in a deep nested structure.

Here are some ways we have seen users utilize Projects to stay organized:

- Per team: Each team is given their own project for them to do their work and collaborate
- Per component: A project is created for each component or service you're testing
- Per brand: E-commerce customers may want to use projects per brand to stay organized
- Per Customer: When dealing with custom software, you may wish to organize by customer to ensure each unique system is tested
- Per Major Release: After your systems go through a major change, you may wish to create a new project to organize the most recent data

> To learn more how to manage users on an organization or a project level check out [Members](/cloud/project-and-team-management/members).

## Running CLI Tests in a Specific Project

By default, triggering a test from the CLI sets the test run in the default project of your default organization.

> Note that you can **change the default project** of your default organization on the [account settings](https://app.k6.io/account).

If you want to set the test run in a different project, for example, one project used by your team that uses a company subscription. Then, you need to specify the `projectID` setting.

You can grab the project ID from the top left corner of the dashboard:

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
