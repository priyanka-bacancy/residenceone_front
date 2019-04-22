import React, { Component } from 'react';

import './Reception.css';

import { Button, ModalHeader, ModalBody, Input } from 'reactstrap';

import SignaturePad from 'react-signature-pad'

class Recovermodel extends Component {
  render() {
    return (
      <div>
        <div>
          <ModalHeader toggle={this.props.recoverToggle}>
            Packet Recovery
            </ModalHeader>
          <ModalBody>
            <div className='recovery-item'>
              <div className='packet-info'>
                <div >
                  Packet Number
                </div>
                <div className='packet-id'>
                  {this.props.recoveryData.tempIdNumber}
                </div>
              </div>
              <div className='packet-info'>
                <div>
                  Packet Type
                  </div>
                <div className='packet-output'>
                  {this.props.recoveryData.packet_type.name}
                </div>
              </div>
              <div className='packet-info'>
                <div>
                  Number of Packets
                  </div>
                <div className='packet-output'>
                  {this.props.recoveryData.numberOfItems}
                </div>
              </div>
              <div>
                <div className='packet-info'>
                  Recipient
                  </div>
                <div className='packet-output'>
                  {/* {this.state.recoveryData} */}
                </div>
              </div>
              <div className='packet-info'>
                <div>
                  Signature
              </div>
                <div className='signature'>
                  <SignaturePad clearButton="true" />
                </div>
                <div>
                  <Button color="danger" type='clear'>  Clear</Button>
                </div>
              </div>
              <div className='packet-info'>
                <div>
                  Note after Recovery
              </div>
                <div>
                  <Input
                    type='text'
                    name='noteAfterRecovey'
                    value={this.props.noteAfterRecovery}
                    onChange={(e) => this.props.onChangeComment(e)}
                  />
                </div>
              </div>
              <div className='packet-info'>
                <Button id='btn' color="success" onClick={() => this.props.packetRecovered()}>Packet recovered</Button>
              </div>
            </div>
          </ModalBody>
        </div>
      </div >
    )
  }
}
export default Recovermodel;
