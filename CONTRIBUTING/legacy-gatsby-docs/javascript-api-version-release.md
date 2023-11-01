# Update version for JavaScript API documentation

The k6-docs project supports versioning for the JavaScript API section.

## How it works

`md` files for the latest version are located in `src/data/markdown/docs/02 javascript api` and page URLs have no version prefix.

Other versions are located in `src/data/markdown/versioned-js-api` and URLs for versioned pages contain the version number (e.g. _https://k6.io/docs/javascript-api/v0-31/_, _https://k6.io/docs/javascript-api/v0-31/k6-crypto/createhash-algorithm/)_

## How to add a new version

Let's say the new version `v0.33` is released and we want to add docs for it and make it the new latest version.

1. Make sure that `src/data/markdown/docs/02 javascript api` contains the `v0.32` docs you want to archive.
2. Prepare for running `archive-js-api-version.sh`.

- Add exec permission:  `chmod +x ./archive-js-api-version.sh`
- Make sure you have installed the `archive-js-api-version.sh` dependencies.

3. Run `npm run archive-version v0.32`.

This script will:

- Create a new folder inside `src/data/markdown/versioned-js-api` named `v0.32`.
- Copy the contents of `src/data/markdown/docs/02 javascript api` to the new folder.
- Replace internal links in `md` files for the JavaScript API section to point to `v0.32` pages.
- If any Javascript API pages have custom `slug` set in the `frontmatter`, the value will also be updated to include version number.

4. Go to `src/utils/versioning.js` and add `v0.32` to `SUPPORTED_VERSIONS`. Set `LATEST_VERSION = v0.33`.

5. Clean the cache and test it.

- `gatsby clean`
- `npm start`

6. Now, you can add the new docs for `v0.33` to `src/data/markdown/docs/02 javascript api` or merge open PRs for `v0.33`.
