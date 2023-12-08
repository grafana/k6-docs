# Contributor's guide

When you contribute to the docs, it helps to know how things work.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Important directories](#important-directories)
- [Build locally](#build-locally)
    - [Before you begin](#before-you-begin)
    - [Build and preview](#build-and-preview)
- [Write](#write)
    - [Where to make updates](#where-to-make-updates)
        - [Updates and fixes to the latest version of k6](#updates-and-fixes-to-the-latest-version-of-k6)
        - [Updates and fixes to the next major release of k6](#updates-and-fixes-to-the-next-major-release-of-k6)
    - [Use the `apply-patch` script](#use-the-apply-patch-script)
    - [Style Guides](#style-guides)
    - [Shortcodes](#shortcodes)
- [Deploy](#deploy)
- [Create a new release](#create-a-new-release)

<!-- markdown-toc end -->

## Important directories

For writers, these are the most important directories:

- [`docs/sources`](../docs/sources) is where the docs live.
- `docs/sources/VERSION/shared` has Markdown files that can be reused across multiple pages by using the [`shared` shortcode](https://grafana.com/docs/writers-toolkit/write/shortcodes/#docsshared).
- `src/data/markdown` contains the Markdown files for the legacy version of the docs, available at https://k6.io/docs. **You do not need to update these files if you're making changes to the current or next version of the docs, available at https://grafana.com/docs/k6/latest/**.

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

You can find the Markdown file for the docs in the [`docs/sources`](../docs/sources) folder. In that folder you'll find:

- A `next` folder, which represents the docs for the next major release of k6.
- Multiple version folders (for example, v0.47.x), which represents the docs for that specific version of k6.

Depending on the type of update you need to make, you'll want to make updates to different folders.

### Where to make updates

#### Updates and fixes to the latest version of k6

If you're making any updates or fixes that apply to the latest version of k6, you'll need to:

- Update the Markdown files in the `docs/sources/next` folder.
- Update the Markdown files in the `docs/sources/v{LATEST_VERSION}` folder.
  - You can do this manually or by using the [`apply-patch`](../scripts/apply-patch) script from the `scripts` folder. Refer to the [Use the `apply-patch` script](#use-the-apply-patch-script) section for more details.

This is to make sure that any changes you make are also brought over to the next major release version of k6.

#### Updates and fixes to the next major release of k6

If you're making any updates or fixes that only apply to the next major release of k6, you'll need to:

- Update the Markdown files in the `docs/sources/next` folder.

Once you make any changes and open a PR, and that PR is reviewed, you can merge it without having to worry about those changes showing up in the `latest` version of the docs. The `latest` version will always display the highest numbered version folder of the docs.

### Use the `apply-patch` script

You can use the `apply-patch script` to port changes from one version folder to another. This is especially helpful if you're making updates or fixes to the latest version of k6, and want to make sure they're also reflected in the `next` version folder.

To use the script, make sure you're in the root of the k6-docs folder and run:

```bash
scripts/apply-patch <COMMIT> <SOURCE> <DESTINATION>
```

For example, if you'd like to apply the changes from your last commit, from the `docs/sources/next` folder to the `docs/sources/v0.47.x`, you can run:

```bash
scripts/apply-patch HEAD~ docs/sources/next docs/sources/v0.47.x
```

Or if you'd like to apply the changes from your previous three commits, you can run:

```bash
scripts/apply-patch HEAD~3 docs/sources/next docs/sources/v0.47.x
```

### Style guides

- k6 follows the style prescribed in the [Grafana Writers' Toolkit](https://grafana.com/docs/writers-toolkit/), which itself inherits most of its rules from the [Google developer documentation style guide](https://developers.google.com/style).

### Shortcodes

- We've also added a number of writing enhancements, like admonitions, tabbed code fences, and collapsible sections. For all syntax and components you can use, checkout the [Writers' Toolkit, Shortcodes](https://grafana.com/docs/writers-toolkit/write/shortcodes/). 

Refer to [Writers' Toolkit, Write documentation](https://grafana.com/docs/writers-toolkit/write/) for more details about how to write new topics, how to use shortcodes, how to add images, and more.

## Deploy

Once a PR is merged to the main branch, if there are any changes made to the `docs/sources` folder, the GitHub Action [`publish-technical-documentation.yml`](https://github.com/grafana/k6-docs/blob/main/.github/workflows/publish-technical-documentation.yml) will sync the changes with the grafana/website repository, and the changes will be deployed to production soon after.

## Create a new release

>  ### ⚠️ Versions
>
> Versions follow the same major numbers as github.com/grafana/k6.

When a new major version of k6 is released, you need to create a new folder for it in the [`docs/sources`](../docs/sources) folder.

The process for creating a new release should be:

- Review any open PRs that relate to the next major release, and merge them if they have been reviewed and approved.
- `git pull` the latest version of the k6-docs repository.
- In the `docs/sources` folder:
  - Duplicate the `next` folder.
  - Rename the `next copy` folder to match the next major release version. For example, if the next release is `v0.48`, the folder should be renamed to `v0.48.x`.
- Build the docs locally to check that the latest version matches the new version folder.
- Commit and push your changes.

Once your changes are automatically deployed, you should be able to see the new version live by going to https://grafana.com/docs/k6/latest/.
