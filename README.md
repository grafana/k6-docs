# k6 Documentation
![Staging](https://github.com/grafana/k6-docs/workflows/Staging/badge.svg)
![Production](https://github.com/grafana/k6-docs/workflows/Production/badge.svg)

This repo contains the source code of the [k6 documentation](https://k6.io/docs/).

## Contributing

For small changes and spelling fixes, we recommend using the GitHub UI because the markdown files are relatively easy to edit.

For larger contributions, consider running the project locally to see how the changes look like before making a pull request.

Markdown files for the documentation are located in [`src/data/markdown/docs`](src/data/markdown/docs) folder. The URL structure is generated based on the folder structure and file names.

The markdown files support a few custom extensions explained on the [File Format Guide](CONTRIBUTING_FILE_FORMAT.md).

## Install and run in Docker

This uses `docker-compose` and port `8100`.

```shell
git clone git@github.com:grafana/k6-docs.git
cd k6-docs
cp .env.example .env.development

docker-compose  up -d --build
```

Note that starting up the Docker takes several minutes, during which the
website will not be accessible. Use `docker-compose logs -f web` to track
progress.

Then visit http://localhost:8100

> If you want to re-run the `--build` command, you may get an error about not having access to delete a `cache/` folder. Use `sudo` to delete this manually before retrying.


## Manual Installation
If you prefer not to use Docker, you can install the project locally.

Requirements:
- NodeJS version 16.0.0 or higher
- npm or yarn

Clone the project and install dependencies:

```bash
git clone git@github.com:grafana/k6-docs.git
cd k6-docs
npm install  # or yarn install
```

Run the docs locally:

```bash
npm start  # or yarn start
```

Visit http://localhost:8000

## Deployment

### To staging
All pull requests merged to `main` will result in an automatic deployment to the staging environment.

### To production

>  #### ⚠️ Versions
>
> Versions follow the same major and minor as github.com/grafana/k6. When cutting a new release of the docs between k6 releases, only increment the patch digit(s).

All tags created using the format `vN.N.N`, for instance, `v0.0.1`, will result in an automatic deployment to the production environment. Tags can either be created and pushed from the git cli, or from https://github.com/grafana/k6-docs/releases

Once in the link above, click on the "Draft a new Release" button.
![DraftRelease1](./internal-images/DraftNewRelease.png)

In the next screen, click on "Choose a tag", type a version number increasing the one below (in image should be v0.37.17).
![DraftRelease2](./internal-images/DraftNewRelease2.png)

Add a description and the bins included, then press the "Publish release" green button at the bottom.
