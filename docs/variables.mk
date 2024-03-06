# List of projects to provide to the make-docs script.
# Format is PROJECT[:[VERSION][:[REPOSITORY][:[DIRECTORY]]]]
# The following PROJECTS value mounts content into the k6 project.
# This results in the content being served at http://localhost:3002/docs/k6/.
# The source of the content is the `/docs/sources` directory, which is the script default if not explicitly set.
# The `docs/sources` directory is found within the current repository checkout determined by the name of the directory of the git root.
# This overrides the default behavior of assuming the repository directory is the same as the project name.
PROJECTS := k6:UNVERSIONED:$(notdir $(basename $(shell git rev-parse --show-toplevel)))
export WEBSITE_MOUNTS := true
export DOCS_IMAGE := grafana/docs-base:2024-01-30
