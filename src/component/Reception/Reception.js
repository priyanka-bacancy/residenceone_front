import React, { Component } from 'react';

import './Reception.css';

import axios from 'axios';
import classnames from 'classnames';

import { FaMobileAlt, FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { NavItem, Nav, NavLink, TabContent, TabPane } from 'reactstrap';
import Table from '../commonComponent/Table';
import { getToken, getId } from '../../global';
import { getReceptionList, getPacket, getLastPacketIn } from '../api/Api';

import Packetin from './Packetin';
import Recovermodel from './Recovermodel';
import Packetinmodel from './Packetinmodel';
import Packetout from './Packetout';

class Reception extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'all',

      comment: '',
      current_page: 1,

      data: [],

      editModal: false,
      editUser: '',

      filtered: [],
      filter_string: '',

      imagePath: '',
      limit: 20,
      modal: false,
      noteAfterRecovey: '',

      packageType: [],
      personDetail: '',
      recoverModel: false,
      recoveryData: '',
      recoveredBySign: '',

      selected: {},
      selectAll: 0,
      selectedNumber: '',
      selectedType: null,

      tempNumber: '',
      today: '',
      tempIdNumber: '',
      totalRecords: '',

    }
    this.getPackageToggle = this.getPackageToggle.bind(this);
    this.editToggle = this.editToggle.bind(this);
    this.recoverToggle = this.recoverToggle.bind(this);
    this.receivePackage = this.receivePackage.bind(this);
    this.recoverPackage = this.recoverPackage.bind(this);
    this.typeList = this.typeList.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  componentDidMount() {
    if (getToken()) {
      this.getReception();
    }
  }

  getReception() {
    const { current_page, limit, filter_string } = this.state;
    getReceptionList(current_page, limit, filter_string)
      .then((res) => {
        this.setState({
          data: res.data.data,
          imagePath: res.data.imagePath,
          totalRecords: res.data.totalRecords,
          total_pages: Math.ceil(res.data.totalRecords / this.state.limit)
        })
        return res;
      })
  }

  receivePackage(row) {
    this.setState({ modal: !this.state.modals, personDetail: row });
    getLastPacketIn()
      .then((res) => {
        let idString = res.data.data.maxTempIdNumber;
        let number = idString.substr(-4);
        let tempNumber = Number(number); //Convert string to number
        let incrementNumber = tempNumber + 1;
        let finalNumber = ('0000' + incrementNumber).slice(-4)
        this.setState({ tempNumber: finalNumber });
        return res
      })
    var today = new Date();
    var date = today.getFullYear() + '' + ("0" + (today.getMonth() + 1)).slice(-2) + '' + today.getDate();
    this.setState({ today: date });
    this.typeList();
  }

  recoverPackage(row) {
    this.setState({ recoverModel: !this.state.recoverModel, recoveryData: row });
  }

  handleChangeType = (selectedType) => {
    this.setState({ selectedType });
  }

  handleChangeNumber = (selectedNumber) => {
    this.setState({ selectedNumber })
  }

  onChangeComment(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFilteredChange(filtered) {
    if (this.state.activeTab === 'all') {
      if (filtered.length >= 0) {
        let string = '';
        for (let i = 0; i < filtered.length; i++) {
          string = string + `&${filtered[i].id}=${filtered[i].value}`;
        }
        this.setState({ filtered, filter_string: string }, () => this.getReception())
      }
    }
    else if (this.state.activeTab === 'false') {
      if (filtered.length >= 0) {
        let string = '';
        for (let i = 0; i < filtered.length; i++) {
          string = string + `&${filtered[i].id}=${filtered[i].value}`;
        }
        this.setState({ filtered, filter_string: string }, () => this.packetIn())
      }
    }
  }

  onPageChange(pageIndex) {
    if (this.state.activeTab === 'all') {
      this.setState({ current_page: pageIndex + 1 }, () => this.getReception())
    }
    else if (this.state.activeTab === 'false' || 'true') {
      this.setState({ current_page: pageIndex + 1 }, () => this.packetIn())
    }
  }

  onPageSizeChange(pageSize) {
    if (this.state.activeTab === 'all') {
      this.setState({ limit: pageSize }, () => this.getReception())
    }
    else if (this.state.activeTab === 'false' || 'true') {
      this.setState({ limit: pageSize }, () => this.packetIn())
    }

  }

  getPackageToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  editToggle(row) {
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      editUser: row
    }));
  }

  recoverToggle() {
    this.setState(prevState => ({
      recoverModel: !prevState.recoverModel
    }));
  }

  toggle(tab) {
    if (tab === 'all') {
      this.setState({ activeTab: 'all', current_page: 1, limit: 20 }, () => this.getReception())
    }
    else {
      this.setState({ activeTab: tab, current_page: 1 }, () => this.packetIn());
    }
  }

  async typeList() {
    let data = [];
    let result = await axios.get(`http://localhost:8080/api/reception/packetTypes/list`, {
      headers: { token: getToken() }
    });

    for (let i = 0; i < 2; i++) {
      data[i] = { label: `${result.data.data[i].name}`, value: `${result.data.data[i].id}` }
    }
    this.setState({ packageType: data || [] });
    let tempIdNumber = `P${this.state.today}-${this.state.tempNumber}`;
    this.setState({ tempIdNumber: tempIdNumber });
  }

  packetIn() {
    const { current_page, limit, activeTab, filter_string } = this.state;
    getPacket(current_page, limit, activeTab, filter_string)
      .then((res) => {
        this.setState({
          data: res.data.data,
          imagePath: res.data.imagePath,
          totalRecords: res.data.totalRecords,
          total_pages: Math.ceil(res.data.totalRecords / this.state.limit)
        })
        return res;
      })
  }

  sendNotification() {
    const { comment, personDetail, selectedType, selectedNumber, tempIdNumber } = this.state;
    axios.post(`http://localhost:8080/api/reception/add-packet`,
      {
        noteByGuard: comment,
        recipientId: personDetail.id,
        recipientFamilyId: personDetail.familyId,
        dateTimeReceived: new Date(),
        receivedById: getId(),
        packetTypeLabel: selectedType.label,
        packetType: selectedType.value,
        numberOfItems: selectedNumber.value,
        tempIdNumber: tempIdNumber,
        telephone: personDetail.telephone,
        email: personDetail.email,
        fullName: personDetail.fullName,
        emailPref: null,
        smsPref: null,
        langpref: null,
      },
      { headers: { token: getToken() } }
    );
    this.setState({ modal: false, activeTab: 'all' }, () => this.getReception())
  }

  packetRecovered() {
    const { recoveryData } = this.state
    axios.post(`http://localhost:8080/api/reception/update-recovered-date`,
      {
        id: recoveryData.id,
        dateTimeRecovered: new Date(),
        noteAfterRecovery: this.state.noteAfterRecovey,
        recoveredById: recoveryData.receivedById,
        recoveredBySign: this.state.recoveredBySign,
      },
      { headers: { token: getToken() } }
    );
    this.setState({ recoverModel: false, activeTab: 'all' }, () => this.getReception())
  }

  toggleRow(firstName) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[firstName] = !this.state.selected[firstName];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
        newSelected[x.firstName] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  render() {
    const { data, activeTab, modal, recoverModel, editModal, editUser, selected, imagePath } = this.state;
    const columnAll = [
      {
        Header: "",
        columns: [
          {
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selected[original.firstName] === true}
                  onChange={() => this.toggleRow(original.firstName)}
                />
              );
            },
            Header: x => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selectAll === 1}
                  ref={input => {
                    if (input) {
                      input.indeterminate = this.state.selectAll === 2;
                    }
                  }}
                  onChange={() => this.toggleSelectAll()}
                />
              );
            },
            filterable: false,
          },

        ]
      },
      {
        id: 'name',
        Header: 'Name',
        accessor: 'fullName',
        Cell: (row) => {
          return (
            <div>
              <NavLink href='#' onClick={() => this.editToggle(row.original)}>{row.value}</NavLink>
            </div>
          );
        },
      },
      {
        Header: 'Profile Picture',
        accessor: 'picture',
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              <img alt='Img' height={34} src={imagePath + row.row.picture} />
            </div>
          )
        },
        filterable: false,
      },
      {
        id: 'family_families_units_unit_officialId',
        Header: 'Main unit ID',
        accessor: 'family.families_units[0].unit.officialId',
      },
      {
        id: 'family_families_units_unit_building_name',
        Header: 'Building',
        accessor: 'family.families_units[0].unit.building.name'
      },
      {
        Header: 'Telephone',
        accessor: 'telephone',
      },
      {
        Header: '',
        Cell: (row) => {
          return <Button color="success" type='submit' name='receive' onClick={() => this.receivePackage(row.original)}> Receive </Button>
        },
        filterable: false,
      },
      {
        Header: 'Complete',
        Cell: (row) => {
          return <div className='complete'>
            {row.row.telephone ? null : <span className='space'><FaMobileAlt /></span>}
            {row.row.email ? null : <span className='space'><FaEnvelope /></span>}
            {row.row.dateOfBirth ? null : <span><FaBirthdayCake /></span>}
            <ion-icon name="mail"></ion-icon>
          </div>
        },
        filterable: false,
      },
    ]

    return (
      <div>
        <div id='buttongroup'>
          <Nav tabs>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === 'all' })} onClick={() => { this.toggle('all'); }}>Residents</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === 'false' })} onClick={() => { this.toggle('false'); }}>Packet In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === 'true' })} onClick={() => { this.toggle('true'); }}>Packet Out</NavLink>
            </NavItem>
          </Nav>
        </div>
        <div>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="all">
              <Table
                data={data}
                columns={columnAll}
                values={this.state}
                onPageChange={pageIndex => this.onPageChange(pageIndex)}
                onPageSizeChange={(pageSize) => this.onPageSizeChange(pageSize)}
                onFilteredChange={(filtered) => this.onFilteredChange(filtered)}
              />
            </TabPane>
          </TabContent>
        </div>
        <div>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='false'>
              <Packetin
                values={this.state}
                onPageChange={(pageIndex) => this.onPageChange(pageIndex)}
                onPageSizeChange={(pageSize) => this.onPageSizeChange(pageSize)}
                onFilteredChange={(filtered) => this.onFilteredChange(filtered)}
                recoverPackage={(row) => this.recoverPackage(row)}
              />
            </TabPane>
          </TabContent>
        </div>
        <div>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='true'>
              <Packetout
                values={this.state}
                onPageChange={(pageIndex) => this.onPageChange(pageIndex)}
                onPageSizeChange={(pageSize) => this.onPageSizeChange(pageSize)}
                onFilteredChange={(filtered) => this.onFilteredChange(filtered)}
                recoverPackage={(row) => this.recoverPackage(row)}
              />
            </TabPane>
          </TabContent>
        </div>
        <div>
          <Modal isOpen={modal}>
            <Packetinmodel
              getPackageToggle={() => this.getPackageToggle()}
              getValue={this.state}
              handleChangeType={(e) => this.handleChangeType(e)}
              handleChangeNumber={(e) => this.handleChangeNumber(e)}
              onChangeComment={(e) => this.onChangeComment(e)}
              sendNotification={() => this.sendNotification()}
            />
          </Modal>
        </div>
        <div>
          <Modal isOpen={recoverModel}>
            <Recovermodel
              recoverToggle={this.recoverToggle}
              recoveryData={this.state.recoveryData}
              packetRecovered={() => this.packetRecovered()}
              onChangeComment={(e) => this.onChangeComment(e)}
            />
          </Modal>
        </div>
        <div>
          <Modal isOpen={editModal}>
            <ModalHeader toggle={this.editToggle}>
              Edit user Detail
            </ModalHeader>
            <ModalBody>
              <div className='edit-info'>
                Mobile number
                <Input
                  type='text'
                  value={editUser.telephoneData}
                />
              </div>
              <div className='edit-info'>
                Email address
                <Input
                  type='email'
                  value={editUser.emailData}
                />
              </div>
              <div className='edit-info'>
                Select date of birth
               <Input
                  type='date'
                  value={editUser.dateOfBirthData}
                />
              </div>
              <div className='edit-info'>
                <Input type='file' name='upload' />
              </div>
            </ModalBody>
            <ModalFooter>
              <div>
                <Button color="success" type='submit' name='submit'> Submit </Button>
              </div>
              <div>
                <Button color="danger" type='submit' name='cancel'> Cancel </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div >
    )
  }
}
export default Reception;
