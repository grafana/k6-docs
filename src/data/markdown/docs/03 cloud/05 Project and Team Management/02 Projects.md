---
title: 'Projects'
excerpt: 'Keep your tests and team members organized with projects, a filing system built into the k6 web app'
---

## Background

Projects are a way to stay organized within your account in k6. Projects are assigned on a per organization level. Organization owners and admins can invite users to be members of a project. Only Read/Write members can be explicitly restricted from accessing a project.

## Using Projects

Projects can be considered a filing system which you use to organize your tests. They are flexible enough to allow you to use them in a way that makes sense to you, but simple enough to not lose information in a deep nested structure.

Here are some ways we have seen users utilize Projects to stay organized:

- Per team: Each team is given their own project for them to do their work and collaborate
- Per component: A project is created for each component or service you're testing
- Per brand: E-commerce customers may want to use projects per brand to stay organized
- Per Customer: When dealing with custom software, you may wish to organize by customer to ensure each unique system is tested
- Per Major Release: After your systems go through a major change, you may wish to create a new project to organize the most recent data

## Running CLI Tests in a Specific Project

If you are using the CLI to trigger your tests, you need to specify a `projectID` in order to use the correct subscription and organize your results in the correct project. You can grab the project ID from the top left corner of the dashboard:

![Test result navigation](images/02-Projects/projectID.png)

Then, modify your script to add the project ID to the [Cloud execution options](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli#cloud-execution-options):

```js
export const options = {
  ext: {
    loadimpact: {
      projectID: 3479144,
    },
  },
};
```

When you [run the script in the CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli), the results will be saved within the k6 Cloud project you specified.
