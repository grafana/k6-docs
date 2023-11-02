# Contributor's guide

When you contribute to the docs, it helps to know how things work.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Important directories](#important-directories)
- [Build locally](#build-locally)
    - [Before you begin](#before-you-begin)
    - [Build and preview](#build-and-preview)
- [Write](#write)
    - [Style Guides](#style-guides)
    - [Shortcodes](#shortcodes)
- [Deploy](#deploy)
    - [Upgrade a main release](#upgrade-a-main-release)

<!-- markdown-toc end -->

## Important directories

For writers, these are the most important directories:

- [`docs/sources`](../docs/sources) is where the docs live.
- `docs/sources/VERSION/shared` has Markdown files that can be reused across multiple pages by using the [`shared` shortcode](https://grafana.com/docs/writers-toolkit/write/shortcodes/#docsshared).

## Build locally

### Before you begin

To build the k6 docs in your machine, you'll need:

- [Docker](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation)

If you're using Docker, make sure you have the Docker Desktop application running.

### Build and preview

Clone the repository to your machine:

```bash
git clone https://github.com/grafana/k6-docs.git
```

Navigate to the `docs` directory and run `make docs`:

```bash
cd docs && make docs
```

You should see an output similar to this when the site finishes building:

```bash
View documentation locally:
                             http://localhost:3002/docs/k6/

                                                           Press Ctrl+C to stop the server
```

Go to http://localhost:3002/docs/k6/, and you should be able to see a preview of the docs.

Refer to [Writers' Toolkit, Build and review documentation](https://grafana.com/docs/writers-toolkit/review/) for more details about how to build the docs, and tools you can use such as Vale.

## Write

Each Markdown page should start with the following front matter.

```yaml
---
title: <page title>
description: <summary text for search engines and social shares. Aim for 170 characters>.
---
```

### Style guides

- k6 follows the style prescribed in the [Grafana Writers' Toolkit](https://grafana.com/docs/writers-toolkit/), which itself inherits most of its rules from the [Google developer documentation style guide](https://developers.google.com/style).

### Shortcodes

- We've also added a number of writing enhancements, like admonitions, tabbed code fences, and collapsible sections. For all syntax and components you can use, checkout the [Writers' Toolkit, Shortcodes](https://grafana.com/docs/writers-toolkit/write/shortcodes/). 

Refer to [Writers' Toolkit, Write documentation](https://grafana.com/docs/writers-toolkit/write/) for more details about how to write new topics, how to use shortcodes, how to add images, and more.

## Deploy

Once a PR is merged to the main branch, if there are any changes made to the `docs/sources` folder, the GitHub Action [`publish-technical-documentation.yml`](https://github.com/grafana/k6-docs/blob/main/.github/workflows/publish-technical-documentation.yml) will sync the changes with the grafana/website repository, and the changes will be deployed to production soon after.

### Upgrade a main release

>  #### ⚠️ Versions
>
> Versions follow the same major and minor numbers as github.com/grafana/k6.

TODO: Add step-by-step instructions for creating a new major version release.
