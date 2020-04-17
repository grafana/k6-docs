import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import qs from 'qs';
import { Heading } from 'components/shared/heading';
import { Field } from 'components/shared/field';
import { CheckboxField } from 'components/shared/checkbox-field';
import { Button } from 'components/shared/button';
import SucessSVG from './success.inline.svg';

import styles from './contact-us-form.module.scss';

import animationVideo from './videos/animation.mp4';

export const ContactUsForm = () => {
  // performing animation delay 2s
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current.querySelector('video').onended = (e) => {
      setTimeout(() => {
        e.target.load();
      }, 2000);
    };
  }, []);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(false);
  return (
    <section className={styles.wrapper}>
      <div className={'container'}>
        <Heading as={'h2'} className={styles.title}>
          How can we help?
        </Heading>
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
            emailSubscription: false,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
              .email()
              .required(),
            message: Yup.string().required(),
            emailSubscription: Yup.boolean().required(),
          })}
          onSubmit={(values, { resetForm }) => {
            setSubmitting(true);
            fetch(window.location.pathname, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: qs.stringify({
                'form-name': 'contact',
                ...values,
              }),
            })
              .then(() => {
                setSubmitting(false);
                setStatus('success');
                setTimeout(() => { setStatus(false); }, 5000);
                resetForm();
              })
              .catch(() => {
                setSubmitting(false);
              });
          }}
          render={({
            values,
            errors,
            touched,
            isValid,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form name={'contact'} className={styles.form} data-netlify={'true'} data-netlify-honeypot={'bot-field'} onSubmit={handleSubmit}>
                <div className={styles.formContent}>
                  <div className={styles.formFieldsWrapper}>
                    <Field
                      id={'name'}
                      className={styles.formField}
                      label={'Your name'}
                      name={'name'}
                      autoComplete={'name'}
                      value={values.name}
                      isInvalid={touched.name && !!errors.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Field
                      id={'email'}
                      className={styles.formField}
                      label={'Email address'}
                      name={'email'}
                      autoComplete={'email'}
                      value={values.email}
                      isInvalid={touched.email && !!errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <Field
                    id={'message'}
                    label={'Type the message'}
                    tag={'textarea'}
                    name={'message'}
                    rows={6}
                    value={values.message}
                    isInvalid={touched.message && !!errors.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.formFooter}>
                  {status === 'success' &&
                    <div className={styles.success}>
                      <div className={styles.successIcon}><SucessSVG/></div>
                      <span className={styles.successText}>Your message has been successfully sent</span>
                    </div>}
                  {
                    status !== 'success' &&
                    <div className={styles.actions}>
                      <CheckboxField
                        id={'emailSubscription'}
                        name={'emailSubscription'}
                        checked={values.emailSubscription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        Yes, I&apos;d like to receive more information on k6 products,
                  events and&nbsp;promotions via email. Refer to k6’s{' '}
                        <a
                          className={'link'}
                          href={'privacy-policy'}
                          target={'_blank'}
                        >
                          Privacy Policy
                        </a>
                      </CheckboxField>
                      <Button
                        className={styles.formButton}
                        type={'submit'}
                        disabled={!dirty || (dirty && !isValid) || isSubmitting}
                        cursor
                        loading={submitting}
                      >
                        Get in touch
                      </Button>
                    </div>
                  }
                </div>

                <div
                  className={styles.formAnimation}
                  ref={videoRef}
                  dangerouslySetInnerHTML={{
                    __html: `<video src="${animationVideo}" type="video/mp4" autoPlay muted playsinline/>`, // Because React doesn't support attribute 'muted'. Nice, huh? https://github.com/facebook/react/issues/10389
                  }}
                />
              </form>
          )}
        />
      </div>
    </section>
  );
};
