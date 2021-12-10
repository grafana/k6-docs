import { Dropdown } from 'components/shared/dropdown';
import { navigate } from 'gatsby';
import React from 'react';
import { addTrailingSlash } from 'utils/utils.node';
import {
  LATEST_VERSION,
  SUPPORTED_VERSIONS,
  DEFAULT_JS_API_VERSIONS_TO_BUILD,
} from 'utils/versioning';

export const VersionSwitcher = ({
  currentVersion = LATEST_VERSION,
  versions,
}) => {
  const isProduction =
    process.env.GATSBY_DEFAULT_DOC_URL === 'https://k6.io/docs';
  const jsApiVersionsToBuild =
    process.env.JS_API_VERSIONS_TO_BUILD || DEFAULT_JS_API_VERSIONS_TO_BUILD;
  let SUPPORTED_VERSIONS_FOR_BUILD = SUPPORTED_VERSIONS;
  if (!isProduction && jsApiVersionsToBuild) {
    SUPPORTED_VERSIONS_FOR_BUILD = SUPPORTED_VERSIONS.sort()
      .reverse()
      .slice(0, Math.max(jsApiVersionsToBuild - 1, 0));
  }

  const availableVersions =
    !!versions && typeof versions !== 'undefined'
      ? Object.keys(versions)
          .sort()
          .reverse()
          .filter(
            (version) =>
              SUPPORTED_VERSIONS_FOR_BUILD.includes(version) ||
              version === LATEST_VERSION,
          )
      : [];

  const handleVersionChange = (newVersion) => {
    if (typeof window === 'undefined') {
      return;
    }
    navigate(addTrailingSlash(versions[newVersion].path));
  };

  return (
    <Dropdown
      currentOption={currentVersion}
      options={availableVersions.map((item) => ({ label: item, value: item }))}
      onChange={handleVersionChange}
    />
  );
};
