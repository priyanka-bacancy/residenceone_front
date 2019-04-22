import React, { Component } from 'react';

import './Reception.css';
import Select from 'react-select';
import { Button, ModalHeader, ModalBody } from 'reactstrap';


const options_number = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' }
];


class Packetinmodel extends Component {
  render() {
const {today,tempNumber,selectedType,selectedNumber,packageType ,comment} = this.props.getValue
    return (
      <div>
        <div>
          <ModalHeader toggle={this.props.getPackageToggle}>
            Reception and Notification
            </ModalHeader>
          <ModalBody>

            <div className='packet-id'>
              P{today}-{tempNumber}
            </div>
            <div className='packet-info'>
              What Kind of package is it ?
                <Select
                name='selectedType'
                value={selectedType}
                onChange={this.props.handleChangeType}
                options={packageType}
              />
            </div>
            <div className='packet-info'>
              Several package for the same recipient?
                <Select
                name='selectedNumber'
                value={selectedNumber}
                onChange={this.props.handleChangeNumber}
                 options={options_number}
              />
            </div>
            <div className='packet-info'>
              If you add a comment in the space below, it will be sent to the recipient of the package
                <textarea
                style={{ 'inlineSize': '100%' }}
                rows='3'
                cols='20'
                name='comment'
                value={comment}
                onChange={(e) => this.props.onChangeComment(e)}
              />
            </div>
            <div className='packet-info'>
              Take a picture of the package if it seems useful to you
              </div>
            <div className='packet-info'>
              <Button id='btn' color="primary">Click to take the picture</Button>
            </div>
            <div className='packet-info'>
              <Button id='btn' color="secondary">Print a label</Button>
            </div>
            <div className='packet-info'>
              <Button id='btn' color="success" onClick={this.props.sendNotification}>Send Notification</Button>
            </div>
          </ModalBody>
        </div>
      </div >
    )
  }
}
export default Packetinmodel;
