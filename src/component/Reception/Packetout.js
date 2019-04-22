import React, { Component } from 'react';

import './Reception.css';
import Table from '../commonComponent/Table';

class Packetout extends Component {

  render() {

    const columnPackageOut = [
      {
        id: 'number',
        Header: 'Number',
        accessor: 'tempIdNumber',
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
        id: 'dateTimeRecovered',
        Header: 'Date out',
        accessor: 'dateTimeRecovered',
        Cell: ((row) => {
          let date = row.value;
          return (<div>{row.value ? date.substring(0, date.indexOf("T")) : null}</div>);
        }),
      },
      {
        id: 'dateTimeRecovered',
        Header: 'Time out',
        accessor: 'dateTimeRecovered',
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
        id: 'user_family_families_units_unit_officialId',
        Header: 'Main Unit Id',
        accessor: 'user.family.families_units[0].unit.officialId'
      },
    ]
    return (
      <div>
        <Table
          data={this.props.values.data}
          columns={columnPackageOut}
          values={this.props.values}
          onPageChange={pageIndex => this.props.onPageChange(pageIndex)}
          onPageSizeChange={(pageSize) => this.props.onPageSizeChange(pageSize)}
          onFilteredChange={(filtered) => this.props.onFilteredChange(filtered)}
          recoverPackage={(row) => this.recoverPackage(row)}
        />
      </div >
    )
  }
}
export default Packetout;
