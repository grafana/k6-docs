---
title: Projects
description: Projects allow to organize k6 tests in collections and grant their access.
weight: 401
aliases:
  - /docs/k6/projects-and-users/projects/
---

# Projects

Use Projects to organize k6 tests in collections and grant access to these collections.
Some ways to stay organized with Projects include the following:

- **Per team.** Each team is given their own project for them to do their work and collaborate.
- **Per component.** A project is created for each component or service you're testing.
- **Per brand.** E-commerce customers may want to use projects per brand to stay organized.
- **Per customer.** When dealing with custom software, you can to organize by customer to ensure each unique system is tested.
- **Per major release.** After your systems go through a major change, you can to create a new project to organize the most recent data.

> To invite users to a project, refer to [manage project members]({{< relref "./manage-project-members" >}}).


## Running CLI Tests in a Specific Project

By default, when you run a test from the CLI, the test runs in your default project.
To set the test run in a different project, specify the [`projectID` option]({{< relref "../author-run/cloud-scripting-extras/cloud-options" >}}) in the k6 script:

```javascript
export const options = {
  ext: {
    loadimpact: {
      projectID: 3479144,
    },
  },
};
```

In Grafana Cloud, you can find the `projectID` value below the project name on the project view:

![k6 Project ID](/media/docs/k6/screenshoot-grafana-cloud-k6-project-id.png)

