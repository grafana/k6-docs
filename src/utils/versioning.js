const { isProduction } = require('./utils.node');
/** version number for which documentation is available (except for the latest version) */
const ALL_SUPPORTED_JS_API_VERSIONS = [
  'v0.32',
  'v0.33',
  'v0.34',
  'v0.35',
  'v0.36',
  'v0.37',
  'v0.38',
  'v0.39',
  'v0.40',
  'v0.41',
  'v0.42',
  'v0.43',
]
  .sort()
  .reverse();
/** latest version number for URLs without version prefix */
const LATEST_VERSION = 'v0.44';

/** applies only for development and staging */
/** amount DOES NOT include LATEST_VERSION */
/** if no JS_API_VERSIONS_TO_BUILD is defined in env */
/** which takes precedence over */
const DEFAULT_AMOUNT_JS_API_VERSIONS_TO_BUILD =
  process.env.JS_API_VERSIONS_TO_BUILD || 1;

/** applies this for production */
/** amount DOES NOT include LATEST_VERSION */
const PROD_AMOUNT_JS_API_VERSIONS_TO_BUILD = 3;

/** single source of truth how many versions to build */
const JS_API_VERSIONS_TO_BUILD = isProduction
  ? PROD_AMOUNT_JS_API_VERSIONS_TO_BUILD
  : DEFAULT_AMOUNT_JS_API_VERSIONS_TO_BUILD;

const SUPPORTED_VERSIONS = ALL_SUPPORTED_JS_API_VERSIONS.sort()
  .reverse()
  .slice(0, JS_API_VERSIONS_TO_BUILD);

module.exports = {
  SUPPORTED_VERSIONS,
  LATEST_VERSION,
};
