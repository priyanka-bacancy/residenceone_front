import React, { Component } from 'react';

import './Reception.css';

import Table from '../commonComponent/Table';
import { FaMobileAlt, FaEnvelope } from 'react-icons/fa';
import { Button } from 'reactstrap';

class Packetin extends Component {
  render() {
    const columnPackageIn = [
      {
        id: 'number',
        Header: 'Number',
        accessor: 'tempIdNumber',
      },
      {
        id: 'status',
        Header: 'Status',
        Cell: (row) => {
          return <div className='complete'>
            {row.original.smsSent === true ? <span className='space' style={{ color: 'green' }}><FaMobileAlt /></span> : <span className='space' style={{ color: 'red' }}><FaMobileAlt /></span>}
            {row.original.emailSent === true ? <span className='space' style={{ color: 'green' }}><FaEnvelope /></span> : <span className='space' style={{ color: 'red' }}><FaEnvelope /></span>}
            <ion-icon name="mail"></ion-icon>
          </div>
        },
        filterable: false,
      },
      {
        id: 'dateTimeReceived',
        Header: 'Date in',
        accessor: 'dateTimeReceived',
        Cell: ((row) => {
          let date = row.value;
          return (<div>{row.value ? date.substring(0, date.indexOf("T")) : null}</div>);
        }),
      },
      {
        id: 'timeIn',
        Header: 'Time in',
        accessor: 'dateTimeReceived',
        Cell: ((row) => {
          let time = row.value;
          return (<div>{row.value ? time.substr(11, 5) : null}</div>);
        }),
      },
      {
        id: 'name',
        Header: 'Name',
        accessor: 'user.fullName'
      },
      {
        Header: 'Profile Picture',
        accessor: 'user.picture',
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              <img alt='Img' height={34} src={this.props.values.imagePath + row.original.picture} />
            </div>
          )
        },
        filterable: false,
      },
      {
        id: 'user_family_families_units_unit_officialId',
        Header: 'Main Unit Id',
        accessor: 'user.family.families_units[0].unit.officialId'
      },
      {
        id: 'user_family_families_units_unit_building_name',
        Header: 'Building',
        accessor: 'user.family.families_units[0].unit.building.name'
      },
      {
        Header: '',
        Cell: (row) => {
          let data = row.original;
          return <Button color="success" type='submit' name='recover' onClick={() => this.props.recoverPackage(data)}> Recover </Button>
        },
        filterable: false,
      },
    ]

    return (
      <div>
        <Table
          data={this.props.values.data}
          columns={columnPackageIn}
          values={this.props.values}
          onPageChange={pageIndex => this.props.onPageChange(pageIndex)}
          onPageSizeChange={(pageSize) => this.props.onPageSizeChange(pageSize)}
          onFilteredChange={(filtered) => this.props.onFilteredChange(filtered)}
          recoverPackage={(row) => this.props.recoverPackage(row)}
        />
      </div>
    )
  }
}
export default Packetin;
