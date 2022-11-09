# Contributor's guide

When you contribute to the docs, it helps to know how things work.

## Important directories

For writers, these are the most important directories:
- [`src/data/markdown`](./src/data/markdown) is where the docs live
  - `translated-guides` has the principle OSS docs
- [`./gatsby-node.js`](https://github.com/grafana/k6-docs/blob/main/gatsby-node.js) is where URI redirects are programmed.
- [`src/templates/docs`](./src/templates/docs)  has the "landing pages" for major docs sections: cloud, guides, examples, et cetera.
- [`src/components/shared`](./src/components/shared) has the reusable writing enhancements, like our stylish `<blockquote>`

## The writing workflow

These the following sections cover how to build locally and deploy the site.

### Build locally {#build}

For any substantial changes, a local, live preview hugely improves writer comfort, which translates to better doc quality.

If you don't want to build with Docker (refer to repo README), you'll need the following
- NodeJS version 16.0.0 or higher
- A node version manager like `nvm` or `fnm`
- `npm` or `yarn`

Then, to build:

1. Clone the project
  ```bash
  git clone git@github.com:grafana/k6-docs.git
  cd k6-docs
  npm install  # or yarn install
  ```
1. Use the version manager to install a version of node compatible with the version in `package.json`.
  ```bash
  nvm install 16.16
  nvm use 16.16
  ```

1. Install dependencies (only necessary the first time)

  ```bash
  npm install  # or yarn install
  ```

1. Run the docs locally:

  ```bash
  npm start  # or yarn start
  ```

If everything works, a live preview should be serving on http://localhost:8000.
Things don't always work, though. The [Troubleshooting](./troubleshooting) section covers some common breaks.

### Preview and deploy builds {#build}

GitHub actions build preview builds of the site in multiple stages:

1. Each PR to main gets a build preview at `https://mdr-ci.staging.k6.io/docs/refs/pull/<PR-NUMBER>/merge`

  With every commit to the PR branch, the preview updates.

1. The main branch deploys to `staging.k6.io`
1. **After the repo release number is upgraded, the main branch deploys to `k6.io`**

[Release process diagram](../internal-images/release.svg)

### Upgrade a main release

>  #### ⚠️ Versions
>
> Versions follow the same major and minor numbers as github.com/grafana/k6. When cutting a new release of the docs between k6 releases, only increment the patch digit(s).

Before you upgrade versions, it's a good idea to give the updated docs a final look at `https://staging.k6.io`
**Especially check that redirects work and components render correctly!**

As the UI might change, refer to GitHub [Managing releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) doc for the canonical instructions.

All tags created using the format `vN.N.N`, for instance, `v0.0.1`, will result in an automatic deployment to the production environment. Tags can either be created and pushed from the git cli, or from https://github.com/grafana/k6-docs/releases

1. From the releases page, select **Draft a new Release**.
![DraftRelease1](../internal-images/DraftNewRelease.png)

1. In the next screen, select **Choose a tag**, type a version number increasing the one below (in image, it  should be v0.37.17).
![DraftRelease2](../internal-images/DraftNewRelease2.png)

1. Optionally add a description and generate release notes, then **Publish release**.

