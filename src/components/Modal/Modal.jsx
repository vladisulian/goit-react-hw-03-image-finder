import { Component } from 'react';
export class Modal extends Component {
  render() {
    return (
      <div className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}
