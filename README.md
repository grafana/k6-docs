# k6 Documentation

![Staging](https://github.com/grafana/k6-docs/workflows/Staging/badge.svg)
![Production](https://github.com/grafana/k6-docs/workflows/Production/badge.svg)

Welcome to the k6 docs!
This repo contains the source code of the [k6 documentation](https://grafana.com/docs/k6/).

Some key facts:

- Issues and contributions are **always welcome**!
- The docs are written in Markdown and built with Hugo.
- The [Contributor's guide](./CONTRIBUTING) has meta-documentation about building locally, using special components and styling, deploying, troubleshooting, and more.
- We have a [Code of conduct](https://github.com/grafana/k6-docs/blob/main/CODE_OF_CONDUCT.md).
- We follow the Grafana Style Guide, and you can find more information about it in the [Writers' Toolkit](https://grafana.com/docs/writers-toolkit/).

## Contributing

Don't feel shy about contributing! All input is welcome. No fix is too trivial.

If something confuses you or feels lacking about the docs, make an issue.
If you find something that you think you can fix, please go ahead. You don't need to ask permission.

Markdown files for the documentation are located in the [`docs/sources/`](docs/sources) folder, with sub-folders for each k6 version. The URL structure is generated based on the folder structure and file names.

For small changes and spelling fixes, the GitHub UI is the most convenient way to contribute.
For larger contributions, consider running the project locally to see how the changes look like before making a pull request.

The following docs cover the different stages of the writing workflow:

- [Local development](#local-development). For any large changes, being able to see a preview of the site can help make sure things are rendered correctly, and spot any issues before they're deployed to production.
- [Writers' Toolkit](https://grafana.com/docs/writers-toolkit/). Learn more about the Grafana writing style guide, front matter properties, how to upload and add images, and much more.
- [Preview and deploy](./CONTRIBUTING#deploy). Changes made to the files inside of `docs/sources` are automatically deployed to production once they're merged to the main branch.

For more details, refer to the [CONTRIBUTING](./CONTRIBUTING/README.md) section.

## Local development

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
