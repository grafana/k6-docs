---
title: 'Cost attribution'
description: 'Learn how cost attribution works in Grafana Cloud k6 and how labels help you track VUh usage across teams and projects.'
weight: 100
---

# Cost attribution

With cost attribution in Grafana Cloud k6, you can track how your organization consumes Virtual User Hours (VUh) across different teams, departments, or cost centers. By assigning labels to k6 projects, you gain visibility into which groups drive usage, making it possible to implement chargebacks, allocate budgets, and plan capacity.

## How cost attribution works

Cost attribution is based on **labels** that you assign to k6 projects. When a test runs under a labeled project, the VUh consumed by that test run is associated with the project's labels. You can then view and filter usage data by these labels in the Cost Management and Billing app.

The workflow has three main parts:

1. **Define labels.** Organization administrators create labels in the Grafana Cloud k6 settings. Each label represents a category, such as `team` or `environment`. When you assign a label to a project, you provide a specific value. For example, a label named `environment` might have the value `staging` for one project and `production` for another.

1. **Assign labels to projects.** After labels exist, you assign them to k6 projects. All future test runs in a labeled project inherit the project's labels for usage tracking.

1. **View usage by label.** The [Cost Management and Billing app](https://grafana.com/docs/grafana-cloud/cost-management-and-billing/) shows VUh consumption broken down by label, so you can see how usage distributes across your organization.

## Labels and the Grafana labels plugin

Grafana Cloud k6 integrates with the [Grafana labels plugin](https://grafana.com/docs/grafana-cloud/cost-management-and-billing/cost-attributions/) for centralized label management. Labels you define in the Grafana labels plugin sync automatically with Grafana Cloud k6, so you can manage labels across Grafana Cloud products from a single place.

You can also create and manage labels directly in the Grafana Cloud k6 settings without using the labels plugin. Labels created in k6 sync back to the centralized label system.

## What cost attribution tracks

Cost attribution currently tracks **VUh consumption only**. Each test run's VUh is attributed to the labels assigned to its parent project. This covers:

- Cloud test runs executed from the Grafana Cloud k6 infrastructure
- Test runs streamed to Grafana Cloud k6 with `k6 cloud run --local-execution`

{{< admonition type="note" >}}

Cost attribution does not currently track labels for generated k6 metrics. Only VUh usage is attributed to labels.

{{< /admonition >}}

## When to use cost attribution

Cost attribution is useful when your organization needs to:

- **Charge back usage** to specific teams or business units based on actual VUh consumption.
- **Allocate budgets** for performance testing across departments.
- **Gain financial transparency** into which teams or projects consume the most testing resources.
- **Track usage across stacks** when your organization uses multiple Grafana Cloud stacks.

## Scope and limitations

Keep the following in mind when you use cost attribution:

- Cost attribution begins tracking usage from the moment you assign labels. It doesn't apply retroactively to past test runs.
- Only VUh consumption is tracked. Generated k6 test metrics aren't labeled for cost attribution in the initial release.
- Labels are assigned at the project level. Individual test runs within a project all share the same labels.

## Next steps

- [Manage cost attribution labels](https://grafana.com/docs/k6/<K6_VERSION>/grafana-cloud-k6/manage-cost-attribution-labels/) to set up labels and assign them to your projects.
- Learn more about [cost attribution in Grafana Cloud](https://grafana.com/docs/grafana-cloud/cost-management-and-billing/cost-attributions/).
