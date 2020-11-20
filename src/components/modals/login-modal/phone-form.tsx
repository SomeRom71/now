import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Button from '../../button';
import ModalActions from '../../../actions/modal-actions';
import { LOGIN_MODAL } from '../../../constants/modal-constants';
import { INDEX_PATH } from '../../../constants/router-constants';
import inputStyle from '../../input/input.module.scss';
import styles from '../registration-modal/registration.module.scss';

type FormInputs = {
  phone: string,
  code: string,
};

interface PhoneFormProps {
  setWithPhone: Function,
}

const PhoneForm = ({ setWithPhone }: PhoneFormProps) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, formState,
  } = useForm<FormInputs>();
  const [responseError, setResponseError] = useState<string>('');
  const { isSubmitting } = formState;
  const [codeAuth, setCodeAuth] = useState<firebase.auth.ConfirmationResult>();

  const responceErrorHandler = (message: string) => {
    setResponseError(message);
  };

  const successLogin = () => {
    dispatch(ModalActions.closeModal(LOGIN_MODAL));
    router.push(INDEX_PATH);
  };

  const signUpWithPhone = async ({ phone, code }: FormInputs) => {
    if (!codeAuth) {
      const { recaptchaVerifier } = window;
      await firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
        .then((confirmRes) => {
          setCodeAuth(confirmRes);
          if (responseError) setResponseError('');
        })
        .catch((phoneErrors) => setResponseError(phoneErrors.message));
    } else {
      await codeAuth.confirm(code)
        .then(() => successLogin())
        .catch((codeErrors) => responceErrorHandler(codeErrors.message));
    }
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(signUpWithPhone)}
    >
      {!codeAuth ? (
        <>
          <div className={styles.field}>
            <input
              className={inputStyle.input}
              type="mail"
              name="phone"
              placeholder="Phone"
              ref={register({
                required: {
                  value: true,
                  message: 'Phone is required',
                },
                pattern: {
                  value: /^[\d ()+-]+$/,
                  message: 'Invalid phone number',
                },
              })}
            />
            <Button
              type="button"
              className={styles.change}
              styleType="text"
              onClick={() => setWithPhone(false)}
            >
              Sign in with Email
            </Button>
          </div>
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </>
      ) : (
        <>
          <input
            className={cn(inputStyle.input, inputStyle.code)}
            name="code"
            placeholder="0 0 0 0 0 0"
            minLength={6}
            maxLength={6}
            ref={register({
              required: {
                value: true,
                message: 'Code is required',
              },
              pattern: {
                value: /^[\d ()+-]+$/,
                message: 'Invalid code number',
              },
            })}
          />
          {errors.code && <span className={cn(styles.error, styles.codeErr)}>{errors.code.message}</span>}
        </>
      )}
      {responseError && <span className={styles.error}>{responseError}</span>}
      <Button
        type="submit"
        styleType="button"
        disabled={Object.keys(errors).length !== 0}
        className={styles.button}
        loading={isSubmitting}
      >
        {!codeAuth ? 'CONTINUE' : 'Send code'}
      </Button>
      <div id="recaptcha-container" />
    </form>
  );
};

export default PhoneForm;
