# k6 Documentation
![Staging](https://github.com/loadimpact/k6-docs/workflows/Staging/badge.svg)
![Production](https://github.com/loadimpact/k6-docs/workflows/Production/badge.svg)

This repo contains the source code of the [k6 documentation](https://k6.io/docs/).

## Install and run in Docker

This uses `docker-compose` and port `8100`.

```shell
git clone git@github.com:loadimpact/k6-docs.git
cd k6-docs

docker-compose  up -d --build
```

Note that starting up the docker takes several minutes, during which the
website will not be accessible. Use `docker-compose logs -f web` to track
progress.

Then visit http://localhost:8100

> If you want to re-run the `--build` command you may get an error about not
having access to delete a `cache/` folder. Use `sudo` to delete this manually
before retrying.


## Manual Installation

This uses port `8000` by default.

```bash
git clone git@github.com:loadimpact/k6-docs.git
cd k6-docs
npm install
```

Running manually:

```bash
npm start
```

Visit http://localhost:8000

## Deployment

### To staging
All pull requests merged to `master` will result in an automatic deployment to the staging environment.

### To production
All tags created using the format `vN.N.N`, for instance `v0.0.1`, will result in an automatic deployment to the production environment. Tags can either be created and pushed from the git cli, or from https://github.com/loadimpact/k6-docs/releases

## Contributing

Documentation articles are markdown files structured under the
[`src/data/markdown/docs`](src/data/markdown/docs) folder.

The markdown files support a few custom extensions explained on the [File Format Guide](CONTRIBUTING_FILE_FORMAT.md).
