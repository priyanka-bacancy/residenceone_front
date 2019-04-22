import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Modals extends Component {
  render() {
    return (
      <div className='main-heading'>
        <ModalHeader toggle={this.props.recoverToggle}>
          {this.props.header}
        </ModalHeader>
        <ModalBody>
          {this.props.body}
        </ModalBody>
        <ModalFooter>
          {this.props.footer}
        </ModalFooter>
      </div>
    )
  }
}
export default Modals