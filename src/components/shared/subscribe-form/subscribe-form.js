import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { Button } from 'components/shared/button';
import FormMessage from 'components/shared/form-message';
import MarketoForm from 'components/shared/marketo-form';
import { useSubscribeForm } from 'hooks/use-subscribe-form';
import React from 'react';
import * as Yup from 'yup';

import styles from './subscribe-form.module.scss';

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const defaultValues = {
  email: '',
};

const SubscribeForm = () => {
  const { form, status, onSubmit } = useSubscribeForm({
    resolver: yupResolver(schema),
    defaultValues,
    formatData: (values) => values,
    isMarketoForm: true,
  });

  const { register, handleSubmit, formState } = form;

  return (
    <div className={classNames(styles.subscribeWrapper, 'container')}>
      <div className={styles.subscriptionText}>
        <p className={styles.subscriptionTextBold}>
          Subscribe to our newsletter!
        </p>
        <p>Product developments and news from the k6 community.</p>
      </div>
      <form
        id="newsletter-form"
        className={styles.subscribeForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        {status === 'success' && <FormMessage type="success" />}
        {status === 'error' && <FormMessage type="error" />}
        {!status && (
          <>
            <input
              className={classNames(styles.subscribeInput, {
                [styles.subscribeInputInvalid]: !!formState.errors?.email,
              })}
              name={'email'}
              type={'email'}
              placeholder="Email"
              {...register('email', { required: true })}
            />
            <Button
              className={styles.subscribeButton}
              type="submit"
              size="sm"
              disabled={formState.isSubmitting}
              loading={formState.isSubmitting}
            >
              Subscribe now
            </Button>
          </>
        )}
      </form>
      <MarketoForm
        debug={false}
        formId={process.env.GATSBY_NEWSLETTER_FORM_ID}
      />
    </div>
  );
};

export default SubscribeForm;
