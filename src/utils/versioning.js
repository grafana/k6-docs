/** version number for which documentation is available (except for the latest version) */
const SUPPORTED_VERSIONS = ['v0.31', 'v0.32', 'v0.33', 'v0.34'];
/** latest version number for URLs without version prefix */
const LATEST_VERSION = 'v0.35';

/** applies only for development and staging; all versions are built on production */
const DEFAULT_JS_API_VERSIONS_TO_BUILD = 2;

module.exports = {
  SUPPORTED_VERSIONS,
  LATEST_VERSION,
  DEFAULT_JS_API_VERSIONS_TO_BUILD,
};
