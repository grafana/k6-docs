---
title: 'k6 extension quick start guide'
menuTitle: 'Quick start guide'
description: 'Learn how to to create a k6 extension using the xk6-example GitHub repository and GitHub Codespaces.'
weight: 100
---

# k6 extension quick start guide

This guide covers the first steps to developing k6 extensions. By following these step-by-step instructions, you will learn how to create a functional extension under your GitHub account, run a k6 test that uses it, and create a custom build of k6 using xk6.

## Before you begin

To follow along, you’ll need:

- A [GitHub account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github).

Having a GitHub account simplifies the process of developing k6 extensions, which the guide will cover. [GitHub Codespaces](https://github.com/features/codespaces) provides a streamlined development experience for k6 extensions, reducing the need for local setup.

## Create a GitHub repository

The first step is to create a GitHub repository using the [grafana/xk6-example](https://github.com/grafana/xk6-example) template repository. This can be done interactively in a browser by clicking [here](https://github.com/new?template_name=xk6-example&template_owner=grafana). Name the repository `xk6-quickstart`, and set the visibility to **Public**.

Alternatively, use the [GitHub CLI](https://cli.github.com/) to create the repository.

```bash
gh repo create -p grafana/xk6-example -d "Experimental k6 extension" --public xk6-quickstart
```

## Create a codespace

GitHub Codespaces is a GitHub feature that lets you create and use a fully configured development environment in the cloud.

To create a GitHub Codespace:

- Go to the `xk6-quickstart` repository you created in the previous step
- On the repository page, click the green `Code` button and then select `Codespaces` from the dropdown menu.
- Click `Create new codespace`.

Once the codespace is ready, it will open in your browser as a Visual Studio Code-like environment, letting you begin working on your project with the repository code already checked out.

Alternatively, use the [GitHub CLI](https://cli.github.com/) to create the codespace, replacing `USER` with your GitHub username:

```bash
gh codespace create --repo USER/xk6-quickstart --web
```

## Run the example script

The repository's root directory includes a `script.js` file. When developing k6 extensions, use the `xk6 run` command instead of `k6 run` to execute your scripts.

```bash
xk6 run script.js
```

xk6 will run `script.js` without creating an executable k6 file in the current directory.

## Build a custom k6

To use a custom k6 extension, such as `xk6-quickstart`, a custom k6 binary must be built using the `xk6 build` subcommand.

```bash
xk6 build --with github.com/USER/xk6-quickstart=.
```

Replace `USER` with your GitHub username. This command builds a custom k6 executable in the current directory, including the `xk6-quickstart` extension, using the current directory as the extension's source.

To execute the example k6 script, use the newly built k6 executable by running the following command.

```bash
./k6 run script.js
```

## Customize the extension

You can modify the Go source code to change the extension's functionality, and use new functionality from JavaScript.

The repository also includes a smoke test, Makefile, and Go test files that you can inspect and update as you change the extension’s code.

## Set up a local development environment

While using a GitHub codespace in the browser is a good starting point, you can also set up a local development environment for a better developer experience.

#### Before you begin

To create a local development environment, you’ll need:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Code Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Clone and open the example repository

First, clone the `xk6-quickstart` repository to your machine and open it in Visual Studio Code. Make sure to replace `USER` with your GitHub username:

```bash
git clone https://github.com/USER/xk6-quickstart.git
code xk6-quickstart
```

Visual Studio Code will detect the [development container](https://containers.dev/) configuration and show a pop-up to open the project in a dev container. Accept the prompt and the project opens in the dev container, and the container image is rebuilt if necessary.

After that, you can follow the same instructions as [Run the example script](#run-the-example-script).

Refer to [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers) for more details about dev containers.

## Next steps

You have created a `xk6-quickstart` extension under your own GitHub account using the extension template, and learned how to build a custom k6 binary with the extension and run a test.

Next, explore the [extensions catalog](https://grafana.com/docs/k6/latest/extensions/explore/) to see which extensions are available, and to learn more about how to build your custom extension.

The [grafana/xk6-example](https://github.com/grafana/xk6-example) GitHub template streamlines the creation of k6 extensions, letting you easily expand k6's JavaScript features. If you're looking to extend k6's output functionalities instead, the [grafana/xk6-output-example](https://github.com/grafana/xk6-output-example) GitHub template provides a similar, easy-to-use starting point.
