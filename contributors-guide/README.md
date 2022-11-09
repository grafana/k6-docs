# Contributor's guide

When you contribute to the docs, it helps to know how things work.
On this page, you find:
- The most important docs directories
- The procedures to build locally and deploy remotely

For help with the Gatsby and writing, refer to the [Gatsby build and components reference](./gatsby-reference) and [Troubleshooting](./troubleshooting)

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Important directories](#important-directories)
- [The writing workflow](#the-writing-workflow)
    - [Build locally](#build-locally)
    - [Write](#write)
    - [Deploy](#deploy)
      
<!-- markdown-toc end -->


## Important directories

For writers, these are the most important directories:
- [`src/data/markdown`](../src/data/markdown) is where the docs live
  - `translated-guides` has the principle OSS docs
- [`gatsby-node.js`](../gatsby-node.js) is where URI redirects are programmed.
- [`src/templates/docs`](../src/templates/docs)  has the "landing pages" for major docs sections: cloud, guides, examples, et cetera.
- [`src/components/shared`](../src/components/shared) has the reusable writing enhancements, like our stylish `<blockquote>`

## The writing workflow

These the following sections cover how to build locally and deploy the site.

### Build locally

For any substantial changes, a local, live preview hugely improves writer comfort, which translates to better doc quality.

#### Necessary software

If you don't want to build with Docker (refer to repo README), you'll need the following
- NodeJS version 16.0.0 or higher
- A node version manager like `nvm` or `fnm`
- `npm` or `yarn`

#### Build procedure

Then, to build:

1. Clone the project
 
  ```bash
  git clone git@github.com:grafana/k6-docs.git
  cd k6-docs
  npm install  # or yarn install
  ```
2. Use the version manager to install a version of node compatible with the version in `package.json`.
 
 ```bash
  nvm install 16.16
  nvm use 16.16
  ```
3. Install dependencies (only necessary the first time)

  ```bash
  npm install  # or yarn install
  ```

4. Run the docs locally:

  ```bash
  npm start  # or yarn start
  ```

If everything works, a live preview should be serving on http://localhost:8000.
Things don't always work, though. The [Troubleshooting](./troubleshooting) section covers some common breaks.

### Write

Each markdown page should start with the following frontmatter.

```yaml
---
title: <page title>
excerpt: <summary text for social shares. Aim for 170 characters>.
---
```


The writing style aims to follow the [Grafana Writers' Toolkit](https://grafana.com/docs/writers-toolkit/),
which itself mostly follows the [Google developer documentation style guide](https://developers.google.com/style).
Beyond that, Gatsby has a set way to build pages, and we've added a number of writing enhancements, like nested tables, tabbed code fences, and collapsible sections.
- To look up how to use Gatsby, make redirects, and use components, check the [Gatsby reference](./gatsby-reference)
- To troubleshoot common issues, refer to [Troubleshooting](troubleshooting.md)

### Deploy

GitHub actions build preview builds of the site in multiple stages:

1. Each PR to main gets a build preview at `https://mdr-ci.staging.k6.io/docs/refs/pull/<PR-NUMBER>/merge`. With every commit to the PR branch, the preview updates.
1. The main branch deploys to `staging.k6.io`
1. **After the repo release number is upgraded, the main branch deploys to `k6.io`**

![release-process diagram](https://user-images.githubusercontent.com/47385188/200912113-1fc81137-1fe5-4f33-a8a9-e1f97c774d1d.png)


#### Upgrade a main release

>  #### ⚠️ Versions
>
> Versions follow the same major and minor numbers as github.com/grafana/k6. When cutting a new release of the docs between k6 releases, only increment the patch digit(s).

Before you upgrade versions, it's a good idea to give the updated docs a final look at `https://staging.k6.io`
**Especially check that redirects work and components render correctly!**

Unless k6 OSS has a major version upgrade, increment the version by 0.0.1. For example, `0.43.1` → `0.43.2`
As the UI might change, refer to GitHub [Managing releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) doc for the canonical instructions.

Each release has a tag, which you can create either through the Github CLI or from https://github.com/grafana/k6-docs/releases

1. From the releases page, select **Draft a new Release**.
![DraftRelease1](../internal-images/DraftNewRelease.png)

1. In the next screen, select **Choose a tag**, type a version number increasing the one below (in image, it  should be v0.37.17).
![DraftRelease2](../internal-images/DraftNewRelease2.png)

1. Optionally add a description and generate release notes, then **Publish release**.

