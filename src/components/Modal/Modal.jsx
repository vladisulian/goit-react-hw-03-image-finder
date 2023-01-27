import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  render() {
    return createPortal(
      <div className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
