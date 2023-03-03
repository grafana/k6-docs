# Prototype of docs for k6 in Grafana

This repo contains the work in progress to document the k6-in-Grafana app.
These docs use the Hugo as a static site generator.

To build locally, you need:
- [ ] Docker

To start the server, make sure the Docker daemon is running.
Then follow these steps:
1. Go to the docs repo `cd docs/` . 
1. Run `make docs` (or `sudo make docs`, depending on the necessary Docker priviledges). 
1. Enter to confirm.
1. Preview docs at [http://localhost:3002/docs/k6-in-grafana/](http://localhost:3002/docs/k6-in-grafana/).

The process builds the site using the [docs-base Docker image](https://hub.docker.com/r/grafana/docs-base).
The presentation you see at `localhost` depends on what the latest version of that image is.

