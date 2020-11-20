import React, { useState } from 'react';
import { connectModal } from 'redux-modal';
import { useDispatch } from 'react-redux';
import ModalActions from '../../../actions/modal-actions';
import Modal from '../modal';
import { REGISTRATION_MODAL, LOGIN_MODAL } from '../../../constants/modal-constants';
import Button from '../../button';
import PhoneForm from './phone-form';
import EmailForm from './email-form';
import styles from './registration.module.scss';

declare global {
  interface Window { recaptchaVerifier: any }
}

const RegistrationModal = () => {
  const dispatch = useDispatch();
  const [withPhone, setWithPhone] = useState<boolean>(true);

  const openLoginModal = () => {
    dispatch(ModalActions.closeModal(REGISTRATION_MODAL));
    dispatch(ModalActions.openModal(LOGIN_MODAL));
  };

  return (
    <Modal size="s">
      <h2 className={styles.title}>Registration</h2>
      {withPhone
        ? <PhoneForm setWithPhone={setWithPhone} />
        : <EmailForm setWithPhone={setWithPhone} />}
      <Button
        styleType="text"
        onClick={() => openLoginModal()}
        className={styles.link}
      >
        Already have an account
      </Button>
    </Modal>
  );
};

export default connectModal({ name: REGISTRATION_MODAL })(RegistrationModal);
