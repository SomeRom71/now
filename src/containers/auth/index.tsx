import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { REGISTRATION_MODAL } from '../../constants/modal-constants';
import { INDEX_PATH } from '../../constants/router-constants';
import ModalActions from '../../actions/modal-actions';

const AuthContainer: React.FC = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      router.push(INDEX_PATH);
    } else {
      dispatch(ModalActions.openModal(REGISTRATION_MODAL));
    }
  });

  return (
    <div>asd</div>
  );
};

export default AuthContainer;
