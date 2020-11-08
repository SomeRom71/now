import React from 'react';
import { connectModal } from 'redux-modal';
import Modal from '../modal';

const AuthModal = () => (
  <Modal>
    <h2>Registration</h2>
    <input type="mail" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <button onClick={() => {}}>Continue</button>
  </Modal>
);

export default connectModal({ name: 'auth-modal' })(AuthModal);
