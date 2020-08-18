---
title: 'Projects'
excerpt: 'Keep your tests and team members organized with projects, a foldering system built into the k6 web app'
---

## Background

Projects are a way to stay organized within your account in k6. In the simpliest terms, projects can be considered a foldering system which you can use to organize your tests. Projects are assigned on a per organization level. Organization owners and admins can invite users to be members of a project. Only Read/Write members can be explicitly restricted from accessing a project.

## Using Projects

Projects are a simple foldering system. They are flexible enough to allow you to use them in a way that makes sense to you, but simple enough to not lose information in a deep nested structure.

Here are some ways we have seen users utilize Projects to stay organized:

- Per team: Each team is given their own project for them to do their work and collaborate
- Per component: A project is created for each component or service you are testing.
- Per brand: E-commerce customers may want to use projects per brand to stay organized
- Per Customer: When dealing with custom software, you may wish to organize by customer to ensure each unique system is tested
- Per Major Release: After your systems go through a major change, you may wish to create a new project to organize the most recent data

## Running CLI Tests in a Specific Project

If you are using the CLI to trigger your tests, you will need to specify a `projectID` in order to use the correct subscription and organize your results in the correct project. You will need to get the project ID from the top left corner of the dashboard:

![Test result navigation](images/02%Projects/projectID.png)
