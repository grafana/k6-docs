---
title: 'Tutorial: tests as code'
excerpt: A series of docs to learn how to use the major features of k6
slug: '/using-k6/tutorial'
---

This tutorial provides some procedures for common real-life uses of k6.
They assume no prior knowledge of k6 or of JavaScript.

These tasks are all reproducible, so open up your favorite editor and follow along.
Imagine that you are a developer or tester who is responsible for performance in your development team.

## Context: test a new endpoint

Your development team has just developed a new Login endpoint.
Before releasing, it has the following performance responsibilities:
- Test the endpoint for the following questions:
  - Does it work?
  - Does it perform within the service-level objectives under average load?
  - At what load does performance degrade beyond objectives?
- Filter the results for better analysis
- Break the script down into reusable parts

## Before you start

We encourage you to open your terminal and actively experiment with these examples.
The tutorial requires the following:
- [ ] [k6 installed](/get-started/installation) 
- [ ] A clean directory to experiment in.
- [ ] Something to do during the minute or two when k6 runs the longest example tests
- [ ] Optional: [`jq`](https://stedolan.github.io/jq/) to filter some results

## Tutorials

| In this tutorial                                                                | Learn how to                                                       |
|---------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [Test for functional behavior](/using-k6/tutorial/test-for-functional-behavior) | Use k6 to script requests and evaluate that performance is correct |
| [Test for performance](/using-k6/tutorial/test-for-functional-behavior)         | Use k6 to increase load and find faults                            |
| [Analyze results](/using-k6/tutorial/analyze-results)                           | Filter results and make custom metrics                             |
| [Reuse and re-run](/using-k6/tutorial/reuse-and-re-run)                          | Modularize and rerun tests                                         |


