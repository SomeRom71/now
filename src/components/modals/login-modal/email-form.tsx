import React, { useState } from 'react';
import firebase from 'firebase';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Button from '../../button';
import ModalActions from '../../../actions/modal-actions';
import { LOGIN_MODAL } from '../../../constants/modal-constants';
import { INDEX_PATH } from '../../../constants/router-constants';
import inputStyle from '../../input/input.module.scss';
import styles from '../registration-modal/registration.module.scss';

type FormInputs = {
  email: string,
  password: string,
};

interface EmailFormProps {
  setWithPhone: Function,
}

const EmailForm = ({ setWithPhone }: EmailFormProps) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, formState,
  } = useForm<FormInputs>();
  const [responseError, setResponseError] = useState<string>('');
  const { isSubmitting } = formState;

  const responceErrorHandler = (message: string) => {
    setResponseError(message);
  };

  const successLogin = () => {
    dispatch(ModalActions.closeModal(LOGIN_MODAL));
    router.push(INDEX_PATH);
  };

  const signUpWithEmail = async ({ email, password }: FormInputs) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => successLogin())
      .catch((error) => responceErrorHandler(error.message));
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
            })}
          />
          <Button
            type="button"
            className={styles.change}
            styleType="text"
            onClick={() => setWithPhone(true)}
          >
            Sign in with Phone
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
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>
      {responseError && <span className={styles.error}>{responseError}</span>}
      <Button
        type="submit"
        styleType="button"
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
