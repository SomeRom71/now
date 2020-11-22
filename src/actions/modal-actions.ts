import { Dispatch } from 'react';
import { show, hide } from 'redux-modal';

class ModalActions {

  /**
   * open modal
   * @param {String} modal
   * @param {Object} params
   * @returns {Function}
   */
  openModal(modal: string, params = {}) {
    return (dispatch: Dispatch<object>) => {
      dispatch(show(modal, params));
    };
  }

  /**
   * close modal
   * @param {String} modal
   * @returns {Function}
   */
  closeModal(modal:string) {
    return (dispatch: Dispatch<object>) => {
      dispatch(hide(modal));
    };
  }

}

export default new ModalActions();
