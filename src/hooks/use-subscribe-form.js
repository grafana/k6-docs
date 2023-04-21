import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useSubscribeForm = ({ resolver, defaultValues, formatData }) => {
  const [status, setStatus] = useState('');
  const form = useForm({
    mode: 'onChange',
    resolver,
    defaultValues,
  });

  const submitMarketoForm = (email) => {
    window.MktoForms2.getForm(process.env.GATSBY_NEWSLETTER_FORM_ID)
      .vals({ Email: email })
      .onSuccess(() => {
        form.reset(defaultValues);
        setStatus('success');
        setTimeout(() => {
          setStatus(false);
        }, 8000);
      })
      .submit();
  };

  const onSubmit = (values) => {
    const data = formatData(values);

    return submitMarketoForm(data.email);
  };

  return { form, status, setStatus, onSubmit };
};
