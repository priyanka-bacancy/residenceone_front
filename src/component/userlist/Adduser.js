import React, { Component } from 'react';

import { ModalHeader, ModalBody, Input, ModalFooter, Button } from 'reactstrap';
import { Nav, DropdownItem, UncontrolledDropdown, DropdownToggle, Collapse } from 'reactstrap';
import Toggle from 'react-toggle'
import Select from 'react-select'

import DateRangePicker from 'react-bootstrap-daterangepicker';

import './Userlist.css';

class Adduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenPersonalDetail: false,
      isOpenSecurity: false,
      isOpenResidenceLinkedData: false,
      isOpenPool: false,
      isOpenNote: false,
    }
  }

  render() {
    const { lastName, firstName, telephone, email, dateOfBirth, companyName, password, confirmPassword, note, activeDateRange, pool, selectedPosition } = this.props.getValues.signup;
    return (
      <div className='main-heading'>
        <ModalHeader toggle={this.props.addUserToggle}>
          Add User
      </ModalHeader>
        <ModalBody style={{ 'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto' }}>
          <div className='column-heading'>First Name</div>
          <Input
            type='text'
            name='firstName'
            value={firstName}
            placeholder='First name'
            onChange={(e) => this.props.onChange('signup.firstName', e.target.value)}
          />
          <div className='column-heading'> Last Name</div>
          <Input
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Last name'
            onChange={(e) => this.props.onChange('signup.lastName', e.target.value)}
          />
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown>

              <DropdownToggle nav onClick={() => { this.setState({ isOpenPersonalDetail: !this.state.isOpenPersonalDetail }) }}>
                <ModalHeader className='adduser'>Personal data</ModalHeader>
              </DropdownToggle>

              <Collapse isOpen={this.state.isOpenPersonalDetail} navbar>
                <Nav>

                  <DropdownItem>
                    <div className='column-heading'>Mobile Number</div>
                    <Input
                      type='number'
                      name='telephone'
                      value={telephone}
                      placeholder='Mobile number'
                      onChange={(e) => this.props.onChange('signup.telephone', e.target.value)}
                    />
                  </DropdownItem>

                  <DropdownItem>
                    <div className='column-heading'>Email address</div>
                    <Input
                      type='email'
                      name='email'
                      value={email}
                      placeholder='Email address'
                      onChange={(e) => this.props.onChange('signup.email', e.target.value)}
                    />
                  </DropdownItem>

                  <DropdownItem>
                    <div className='column-heading'>Company Name</div>
                    <Input
                      type='companyName'
                      name='companyName'
                      value={companyName}
                      placeholder='Company Name'
                      onChange={(e) => this.props.onChange('signup.companyName', e.target.value)}
                    />
                  </DropdownItem>

                  <DropdownItem>
                    <div className='column-heading'> Select Date of Birth</div>
                    <DateRangePicker
                      singleDatePicker
                      onApply={(event, picker) => this.props.handleApply(event, picker)}
                    >
                      <Input
                        type='text'
                        name='dateOfBirth'
                        value={dateOfBirth}
                      />
                    </DateRangePicker>
                  </DropdownItem>
                </Nav>
              </Collapse>

              <DropdownToggle nav onClick={() => { this.setState({ isOpenSecurity: !this.state.isOpenSecurity }) }}>
                <ModalHeader className='adduser'>Security</ModalHeader>
              </DropdownToggle>
              <Collapse isOpen={this.state.isOpenSecurity} navbar>
                <Nav>
                  <DropdownItem>
                    <div className='column-heading'>Password</div>
                    <Input
                      type='password'
                      name='password'
                      value={password}
                      placeholder='Password'
                      onBlur={(e) => this.props.validatePassword(e)}
                      onChange={(e) => this.props.onChange('signup.password', e.target.value)}
                    />
                    {this.props.getValues.isValidPassword ? null : <div><span style={{ color: 'red'}}>Password must be 6 characters long</span></div>}
                  </DropdownItem>

                  <DropdownItem>
                    <div className='column-heading'> Confirm Password</div>
                    <Input
                      type='password'
                      name='confirmPassword'
                      value={confirmPassword}
                      placeholder='Confirm password'
                      onBlur={(e) => this.props.passwordCheck(e)}
                      onChange={(e) => this.props.onChange('signup.confirmPassword', e.target.value)}
                    />
                    {this.props.getValues.passwordMatch ? null :<div><span style={{ color: 'red' }}>Confirm password and password must be similar </span></div>}
                  </DropdownItem>
                </Nav>
              </Collapse>

              <DropdownToggle nav onClick={() => { this.setState({ isOpenResidenceLinkedData: !this.state.isOpenResidenceLinkedData }) }}>
                <ModalHeader className='adduser'>Residence-linked data</ModalHeader>
              </DropdownToggle>
              <Collapse isOpen={this.state.isOpenResidenceLinkedData} navbar>
                <Nav>
                  <DropdownItem>
                    <div className='column-heading'> Active date range</div>
                    <DateRangePicker
                      onApply={(event, picker) => this.props.dateRange(event, picker)}
                    >
                      <Input
                        type='text'
                        name='activeDateRange'
                        value={activeDateRange}
                      />
                    </DateRangePicker>
                  </DropdownItem>

                  <DropdownItem>
                    <div className='column-heading'> Position</div>
                    <Select
                      name='selectedType'
                      value={selectedPosition}
                      onChange={(e) => this.props.onChange('signup.selectedPosition', e)}
                      options={this.props.getValues.positionList}
                    />
                  </DropdownItem>

                </Nav>
              </Collapse>

              <DropdownToggle nav onClick={() => { this.setState({ isOpenPool: !this.state.isOpenPool }) }}>
                <ModalHeader className='adduser'>Pool</ModalHeader>
              </DropdownToggle>
              <Collapse isOpen={this.state.isOpenPool} navbar>
                <Nav>
                  <DropdownItem>
                    <div className='column-heading'>Mannual pool access</div>
                    <div>
                      <Toggle
                        defaultChecked={pool}
                        onChange={() => this.props.handleChangePool()}
                      />
                    </div>
                  </DropdownItem>
                </Nav>
              </Collapse>

              <DropdownToggle nav onClick={() => { this.setState({ isOpenNote: !this.state.isOpenNote }) }}>
                <ModalHeader className='adduser'> Note</ModalHeader>
              </DropdownToggle>
              <Collapse isOpen={this.state.isOpenNote} navbar>
                <Nav>
                  <DropdownItem>
                    <div className='column-heading'>Note</div>
                    <Input
                      type='textarea'
                      name='note'
                      value={note}
                      placeholder='Note'
                      onChange={(e) => this.props.onChange(e)}
                    />
                  </DropdownItem>
                </Nav>
              </Collapse>

            </UncontrolledDropdown>
          </Nav>
        </ModalBody>
        
        <ModalFooter >
          <Button color="success" id='adduser-button' onClick={() => this.props.onClickAction()}>Submit</Button>
          <Button color="danger" id='adduser-button' onClick={this.addUserToggle}>Cancel</Button>
        </ModalFooter>
      </div>
    )
  }
}
export default Adduser;    