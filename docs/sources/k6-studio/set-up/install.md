---
title: 'Install k6 Studio'
description: 'Learn how to download and install k6 Studio'
weight: 100
---

# Install k6 Studio

You can install k6 Studio on Windows, macOS, and Linux.

## Before you begin

- Install [Google Chrome](https://www.google.com/chrome/) on your computer.

{{< admonition type="note" >}}

For ARM64 Linux users, you can use [Chromium](https://www.chromium.org/chromium-projects/) in place of Google Chrome.

{{< /admonition >}}

## Install k6 Studio on Mac

To install k6 Studio on macOS:

1. Go to the [Releases page](https://github.com/grafana/k6-studio/releases) in the k6 Studio GitHub repository.
1. Download the executable file for macOS:
   - If your Mac has an Apple silicon processor, download **k6.Studio-{VERSION}-arm64.dmg**.
   - If your Mac has an Intel silicon processor, download **k6.Studio-{VERSION}-x64.dmg**.
1. After the download finishes, open the executable file.
1. When prompted, move the k6 Studio application file to the Applications folder. This ensure updates can be installed correctly.

## Install k6 Studio on Windows

To install k6 Studio on Windows:

1. Go to the [Releases page](https://github.com/grafana/k6-studio/releases) in the k6 Studio GitHub repository.
1. Download the executable file for Windows: **k6.Studio-{VERSION}-Setup.exe**.
1. After the download finishes, open the executable file.

## Install k6 Studio on Linux

To install k6 Studio on Linux:

1. Go to the [Releases page](https://github.com/grafana/k6-studio/releases) in the k6 Studio GitHub repository.
1. Download the executable file for Linux:
   - If you're using a Debian-based system, download **k6.Studio-{VERSION}-amd64.deb**.
   - If you're using a Red Hat-based system, download **k6.Studio-{VERSION}-x86_64.rpm**.
1. After the download finishes, open your terminal and run:

```bash
sudo dpkg -i <K6_STUDIO_EXECUTABLE>
```

## Update k6 Studio

When using k6 Studio on Mac or Windows, k6 Studio automatically updates whenever a new version is released.

For Linux systems, you have to manually update the application. To do so, follow the instructions on [Install k6 Studio on Linux](#install-k6-studio-on-linux) to download the latest release, and run the installation command to update the application.
