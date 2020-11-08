import { show, hide } from 'redux-modal';

class ModalActions {

  /**
   * open modal
   * @param {String} modal
   * @param {Object} params
   * @returns {Function}
   */
  openModal(modal, params = {}) {
    return (dispatch) => {
      dispatch(show(modal, params));
    };
  }

  /**
   * close modal
   * @param {String} modal
   * @returns {Function}
   */
  closeModal(modal) {
    return (dispatch) => {
      dispatch(hide(modal));
    };
  }

}

export default new ModalActions();
