import React from 'react';
import { DefaultLayout } from 'layouts/default-layout';
import { NotFound } from 'components/pages/404/not-found';

export default function(props) {
  return (
    <DefaultLayout>
      <NotFound />
    </DefaultLayout>
  );
}
