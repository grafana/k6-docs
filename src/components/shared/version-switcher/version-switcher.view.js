import { Dropdown } from 'components/shared/dropdown';
import { navigate } from 'gatsby';
import React from 'react';
import { addTrailingSlash } from 'utils/utils.node';
import { LATEST_VERSION } from 'utils/versioning';

export const VersionSwitcher = ({
  currentVersion = LATEST_VERSION,
  versions,
}) => {
  const availableVersions = (
    Object.keys(versions).length
      ? Object.keys(versions)
          .sort()
          .reverse()
          .filter((version) => version !== currentVersion)
      : []
  ).map((version) => ({ label: version, value: version }));

  const handleVersionChange = (newVersion) => {
    if (typeof window === 'undefined') {
      return;
    }
    navigate(addTrailingSlash(versions[newVersion].path));
  };
  return (
    <Dropdown
      currentOption={currentVersion}
      options={availableVersions}
      onChange={handleVersionChange}
    />
  );
};
