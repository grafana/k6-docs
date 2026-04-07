---
title: 'Manage cost attribution labels'
description: 'Learn how to create labels and assign them to k6 projects for cost attribution in Grafana Cloud k6.'
weight: 200
---

# Manage cost attribution labels

You manage cost attribution labels from within Grafana Cloud k6. You can create labels, assign them to projects with specific values, and update or remove labels as your organization's needs change.

## Before you begin

To manage labels, you need:

- A Grafana Cloud account with access to Grafana Cloud k6.
- Organization administrator permissions to create or modify labels.
- At least one k6 project to assign labels to.

## Create labels

Each label has a **key** and a **description**. The key represents a category, such as `team` or `environment`. The description explains the label's purpose. When you assign a label to a project, you provide a value for that label. For example, a label with the key `environment` might have the value `staging` on one project and `production` on another.

### Label naming guidelines

When you create labels, follow these guidelines for consistency:

- Use lowercase, descriptive keys, such as `team`, `department`, or `environment`.
- Keep label values consistent across your organization. For example, use `frontend` everywhere instead of mixing `frontend`, `Frontend`, and `FE`.
- Avoid changing label values frequently, because changes can affect historical usage tracking.

### Create a label

To create a label:

1. In Grafana Cloud, go to **Testing & synthetics** > **Performance** > **Settings** > **Labels**.
1. Click **New label**.
1. In the **Name** field, enter a key for the label.
1. Enter a description for the label.
1. Click **Submit**.

After you create labels, they're available to assign to any k6 project in your organization.

{{< admonition type="note" >}}

Labels you create in Grafana Cloud k6 sync with the Grafana labels plugin. If your organization manages labels centrally through the [Cost Management and Billing app](https://grafana.com/docs/grafana-cloud/cost-management-and-billing/cost-attributions/), labels sync automatically between both systems.

{{< /admonition >}}

## Assign labels to a project

After you create labels, assign them to projects so that future test runs are tracked under those labels. You can assign up to 30 labels per project.

To assign labels to a project:

1. In Grafana Cloud, go to **Testing & synthetics** > **Performance** > **Projects**.
1. Select the project you want to label.
1. Click the menu icon in the upper-right corner of the project page.
1. Select **Manage labels**. The **Edit project labels** dialog box opens.
1. Click **Add Label**.
1. From the **Label Name** drop-down, select a label.
1. In the **Label Value** field, enter a value for the project.
1. To add more labels, click **Add Label** again and repeat the previous steps.
1. Click **Save**.

All future test runs in this project are attributed to the selected labels. Existing past test runs aren't retroactively labeled.

## Update labels on a project

To change the labels assigned to a project:

1. From the project page, click the menu icon in the upper-right corner.
1. Select **Manage labels**.
1. In the dialog box, update the label values as needed. You can add new labels, change values, or remove labels.
1. Click **Save**.

Updated labels apply to future test runs only. Past test runs retain the labels that were assigned at the time they ran.

## Remove labels from a project

To remove labels from a project:

1. From the project page, click the menu icon in the upper-right corner.
1. Select **Manage labels**. The **Edit project labels** dialog box opens.
1. Click the delete icon next to each label you want to remove.
1. Click **Save**.

After you remove labels, future test runs in this project are no longer attributed to any cost labels.

## Edit or delete stack-level labels

To modify or remove label definitions that apply across all projects:

1. In Grafana Cloud, go to **Testing & synthetics** > **Performance** > **Settings** > **Labels**.
1. Find the label you want to modify.
1. Edit the label key or description, or delete the label.
1. Click **Save**.

{{< admonition type="caution" >}}

Deleting a label removes it from all projects that use it. This doesn't affect historical usage data, but future test runs in those projects are no longer attributed to the deleted label.

{{< /admonition >}}

## Next steps

- Learn more about [cost attribution in Grafana Cloud k6](https://grafana.com/docs/k6/<K6_VERSION>/grafana-cloud-k6/cost-attribution/).
- Refer to [cost attribution in Grafana Cloud](https://grafana.com/docs/grafana-cloud/cost-management-and-billing/cost-attributions/) for centralized label management.
