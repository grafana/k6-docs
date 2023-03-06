# Technical documentation

These docs use the Hugo as a static site generator.

To build locally, you need:

- [ ] Either [`podman`](https://podman.io/) or Docker.

To start the server, make sure the Docker daemon is running.
Then follow these steps:

1. Run `make docs` (or `sudo make docs`, depending on the necessary Docker privileges).
1. Enter to confirm.
1. Preview docs at [http://localhost:3002/docs/k6-in-grafana/](http://localhost:3002/docs/k6-in-grafana/).

The process builds the site using the [docs-base container image](https://hub.docker.com/r/grafana/docs-base).
The presentation you see at `localhost` depends on what the latest version of that image is.
