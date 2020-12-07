---
title: 'I was invited to an organization and I cannot run tests'
excerpt: 'How to correctly specify/choose a correct project to run your tests in k6'
---

> I was invited to an organization with a subscription. However, When I try to run tests, I get an error that my subscription doesn't have enough Virtual Users/exceeds the duration/uses too many load zones. Our subscription allows for the test I want to run. What is wrong and how do I fix this?

If you encounter a similar situation, probably, the problem is that you run the test from a different organization with another subscription.

This situation often happens because when you register your account, the k6 Cloud automatically creates a "personal" default organization for you. In this case, you might have two organizations; your "personal" organization and the invited organization. 

By default, tests run from your "personal" organization.

**How do I change the organization to fix this?**

If you run tests from the web interface, you will need to use the User menu - on the top of the left sidebar- to select a project within the desired organization.

![Select a project](images/05-team-member-org-id/project-dashboard.png)

If you run tests from the k6 CLI, you will need to set the `projectID` in the test script. 

To do this, copy the project ID from the top left corner of the project dashboard (see image above) and set the `projectID` as a [cloud execution option](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli#cloud-execution-options).

<CodeGroup labels={["Example:"]}>

```javascript
export let options = {
  ext: {
    loadimpact: {
      projectID: 123456,
    },
  },
};
```

</CodeGroup>

Read more about managing [Organizations](/cloud/project-and-team-management/organizations) and [Projects](/cloud/project-and-team-management/projects).
