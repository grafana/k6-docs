# List of projects to provide to the make-docs script.
# Format is PROJECT[:[VERSION][:[REPOSITORY][:[DIRECTORY]]]]
# The following PROJECTS value mounts content into the k6 and k6-studio projects.
# This results in the content being served at http://localhost:3002/docs/k6/ and http://localhost:3002/docs/k6-studio/.
# The sources are found relative to thecurrent repository checkout determined by the name of the directory of the Git root.
# This overrides the default behavior of assuming the repository directory is the same as the project name.
PROJECTS := k6-studio:UNVERSIONED:$(notdir $(basename $(shell git rev-parse --show-toplevel))):docs/sources/k6-studio k6:UNVERSIONED:$(notdir $(basename $(shell git rev-parse --show-toplevel))):docs/sources/k6
