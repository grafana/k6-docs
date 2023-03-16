---
title: Audit trails
description: Monitor actions performed by members in your test projects. 
weight: 506
aliases:
  - /docs/k6/reference/audit-trails
---

# Audit trails

The *Audit Trail* can provide valuable insights into the activity within your organization.

To view the Audit Trail, go to  **Manage > Audit Trail**.

> The audit trail view is currently not available in Grafana Cloud. We are working on it.
> 
> Meanwhile, the **Audit Trail** option redirects you to [k6 Cloud (app.k6.io)](https://app.k6.io/) to visualize them from there. 

## A log of system events and activities

An audit trail provides a chronological list of system events and user activities. 
Organization owners can use audit trails to keep an eye on the operations that their users perform and to trace events.

## Reconstructing Events

With the audit trail, you can piece together how a series of events perhaps led to an event.
Use cases include investigating the following:
- How a test was deleted
- How a member lost access to a project,
- How a subscription or billing settings were altered.

## Threat Detection

If you've noticed suspicious activity,
you can use audit logs to rule out the possibility that something or someone gained unauthorized access to your organization.
You can scan the audit trail for abnormalities and even check whether the IP addresses correlate to what you have 
registered for your users.

## Viewing Results
- To view results within a specified time frame, use the **period** filter (highlighted in green).
- To change how results are sorted, use the columns (highlighted in orange).

![k6 Cloud - Audit trail list](/media/docs/k6/screenshoot-k6-cloud-audit-trail.png)

| Column                        | Description                                   |
| ----------------------------- | --------------------------------------------- |
| **Created**                   | Date and time the event took place            |
| **Triggered by**              | Source of the event                           |
| **Event**                     | Brief summary of the event                    |
| **IP Address**                | The users IP address                          |
