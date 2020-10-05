# Contributing to the k6 documentation

Thank you for your interest in contributing to k6!

(ﾉ ◕ ヮ ◕)ﾉ\*:・ﾟ ✧

Before you begin, make sure to familiarize yourself with the [Code of Conduct](CODE_OF_CONDUCT.md). If you've previously contributed to other open source project, you may recognize it as the classic [Contributor Covenant](https://contributor-covenant.org/).

If you want to chat with the team or the community, you can join the [k6 Slack](https://k6.io/slack/) or post a question on the [k6 community forum](https://community.k6.io/).

## Writing

The k6 documentation is a Gatsby application using React components and markdown files for the content of the different pages.

There are two types of pages: Welcome Pages and Documentation articles.

[Welcome Pages](src/templates/docs) are the pages shown on the header menu: `Guides`, `JavaScript API`, `Cloud Docs`, `Integration`, and `Examples`. They are made as separate React Components for maximum customisation.

Documentation articles are markdown files structured under the [`src/data/markdown/docs`](src/data/markdown/docs) folder.

If you want to know more about how to edit these pages, read more about the [File format](CONTRIBUTING_FILE_FORMAT.md)
