import React, { useState } from 'react';
import { connectModal } from 'redux-modal';
import { useDispatch } from 'react-redux';
import Button from '../../button';
import Modal from '../modal';
import ModalActions from '../../../actions/modal-actions';
import { REGISTRATION_MODAL, LOGIN_MODAL } from '../../../constants/modal-constants';
import PhoneForm from './phone-form';
import EmailForm from './email-form';
import styles from '../registration-modal/registration.module.scss';

const LoginModal = () => {

  const dispatch = useDispatch();
  const [withPhone, setWithPhone] = useState<boolean>(true);

  const openRegistrationModal = () => {
    dispatch(ModalActions.closeModal(LOGIN_MODAL));
    dispatch(ModalActions.openModal(REGISTRATION_MODAL));
  };

  return (
    <Modal size="s">
      <h2 className={styles.title}>Sign In</h2>
      {withPhone
        ? <PhoneForm setWithPhone={setWithPhone} />
        : <EmailForm setWithPhone={setWithPhone} />}
      <Button
        styleType="text"
        onClick={() => openRegistrationModal()}
        className={styles.link}
      >
        Create an account
      </Button>
    </Modal>
  );
};

export default connectModal({ name: LOGIN_MODAL })(LoginModal);
