# k6 Documentation

![Staging](https://github.com/grafana/k6-docs/workflows/Staging/badge.svg)
![Production](https://github.com/grafana/k6-docs/workflows/Production/badge.svg)

Welcome to the k6 docs!
This repo contains the source code of the [k6 documentation](https://k6.io/docs/).

Some key facts:
- Issues and contributions are **always welcome**!
- The docs are written in Markdown, built with Gatsby, and linted with Prettier and Vale.
- The [Contributor's guide](./CONTRIBUTING) has meta-documentation about building locally, using special components and styling, deploying, troubleshooting, and more.
- We have a [Code of conduct](https://github.com/grafana/k6-docs/blob/main/CODE_OF_CONDUCT.md).

## Contributing

Don't feel shy about contributing! All input is welcome. No fix is too trivial.

If something confuses you or feels lacking about the docs, make an issue.
If you find something that you think you can fix, please go ahead. You don't need to ask permission.

Markdown files for the documentation are located in [`src/data/markdown/docs`](src/data/markdown/docs) folder. The URL structure is generated based on the folder structure and file names.

For small changes and spelling fixes, the GitHub UI is most convenient. 
For larger contributions, consider running the project locally to see how the changes look like before making a pull request.
You can build locally with Docker, as described in the following section,
or you can use node, as described in the [Contributor's Guide](./CONTRIBUTING)
 
The following docs cover the different stages of the writing workflow:

- [Build locally](./CONTRIBUTING#build-locally). For any large changes, being able to view how the site looks live hugely improves writer comfort and doc quality. To build locally, you'll need node and a node version manager.
- [Contributor's reference](./CONTRIBUTING/gatsby-reference.md). The syntax and structure of the page paths, custom style components, program redirects, and so on.
- [Troubleshooting](./CONTRIBUTING/troubleshooting.md). Unfortunately, things can go wrong. Fortunately, most errors usually share the same few fixes.
- [Preview and deploy](./CONTRIBUTING#deploy). Each PR has a preview. The main branch has two previews, staging (which deploys on merges) and prod (which deploys with version upgrades).

  Only people with qualified permissions can deploy.


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

Note: If experience issues when starting the docs locally with Docker, run the commands below to clean up previous executions: 

```shell
docker-compose rm --stop --force --volumes
docker image rm k6-docs-web:latest
```

And run again `docker-compose  up -d --build`.

