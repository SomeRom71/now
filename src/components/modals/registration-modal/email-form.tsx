/* eslint-disable max-len */
import React, { useState } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ModalActions from '../../../actions/modal-actions';
import { REGISTRATION_MODAL } from '../../../constants/modal-constants';
import { INDEX_PATH } from '../../../constants/router-constants';
import Button from '../../button';
import inputStyle from '../../input/input.module.scss';
import styles from './registration.module.scss';

type SignUpFields = {
  email: string;
  password: string;
  repeatPassword: string,
};

interface EmailFormProps {
  setWithPhone: Function,
}

const EmailForm = ({ setWithPhone }: EmailFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, watch, formState,
  } = useForm<SignUpFields>();
  const [responseError, setResponseError] = useState<string>('');
  const { isSubmitting } = formState;

  const responceErrorHandler = (message: string) => {
    setResponseError(message);
  };

  const successRegistration = () => {
    dispatch(ModalActions.closeModal(REGISTRATION_MODAL));
    router.push(INDEX_PATH);
  };

  const signUpWithEmail = async ({ email, password }: SignUpFields) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => successRegistration())
      .catch((emailErrors) => responceErrorHandler(emailErrors.message));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(signUpWithEmail)}
    >
      <div>
        <div className={styles.field}>
          <input
            className={inputStyle.input}
            type="mail"
            name="email"
            placeholder="Email"
            ref={register({
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <Button
            className={styles.change}
            styleType="text"
            onClick={() => setWithPhone(true)}
          >
            Sign up with Phone
          </Button>
        </div>
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>
      <div className={styles.field}>
        <input
          className={inputStyle.input}
          type="password"
          name="password"
          placeholder="Password"
          maxLength={18}
          ref={register({
            required: {
              value: true,
              message: 'Password is required',
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/,
              message: 'Password must be at least 6 characters, no more than 18 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.',
            },
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>
      <div className={styles.field}>
        <input
          className={inputStyle.input}
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          maxLength={18}
          ref={register({
            required: {
              value: true,
              message: 'The passwords do not match',
            },
            validate: (value) => value === watch('password') || 'The passwords do not match',
          })}
        />
        {errors.repeatPassword && <span className={styles.error}>{errors.repeatPassword.message}</span>}
      </div>
      {responseError && <span className={styles.error}>{responseError}</span>}
      <Button
        type="submit"
        styleType="button"
        id="submit-btn"
        disabled={Object.keys(errors).length !== 0}
        className={styles.button}
        loading={isSubmitting}
      >
        CONTINUE
      </Button>
    </form>
  );
};

export default EmailForm;
