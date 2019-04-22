import React, { Component } from 'react';

import { getVehicle } from './../api/Api';
import { getToken } from '../../global';
import Table from '../commonComponent/Table';

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      imagePath: '',
      current_page: 1,
      totalRecords: '',
      limit: 20,
      filtered: [],
      filter_string: ''
    }
  }

  componentDidMount() {
    if (getToken()) {
      this.getVehicle();
    }
  }

  getVehicle() {
    const { current_page, limit, filter_string } = this.state;
    getVehicle(current_page, limit, filter_string)
      .then((res) => {
        console.log("Vehicle List : ", res);
        this.setState({
          data: res.data.data,
          imagePath: res.data.vehicleImagePath,
          totalRecords: res.data.totalRecords,
          total_pages: Math.ceil(res.data.totalRecords / this.state.limit)
        })
        return res;
      })
  }

  onPageChange(pageIndex) {
    this.setState({ current_page: pageIndex + 1 }, () => this.getVehicle())
  }
  onPageSizeChange(pageSize) {
    this.setState({ limit: pageSize }, () => this.getVehicle())
  }

  onFilteredChange(filtered) {
    if (filtered.length >= 0) {
      let string = "";
      for (let i = 0; i < filtered.length; i++) {
        string = string + `&${filtered[i].id}=${filtered[i].value}`;
      }
      this.setState({ filtered, filter_string: string }, () => this.getVehicle());
    }
  }

  render() {
    const { data, imagePath } = this.state
    const columns = [
      {
        id: 'numberPlate',
        Header: 'Number Plate',
        accessor: 'numberPlate',
      },
      {
        id: 'brand',
        Header: 'Brand',
        accessor: 'brand',
      },
      {
        id: 'model',
        Header: 'Model',
        accessor: 'model',
      },
      {
        id: 'color',
        Header: 'Color',
        accessor: 'color',
      },
      {
        Header: 'Main Driver',
        accessor: 'user.fullName',
      },
      {
        Header: 'Photo',
        accessor: 'photo',
        Cell: (row) => {
          return (
            <div style={{ textAlign: "center" }}>
              <img alt='Img' height={34} src={imagePath + row.row.photo} />
            </div>
          )
        },
      },
      {
        Header: 'Active on',
        accessor: 'lastMarkedActive'
      }
    ]

    return (
      <div>
        <Table
          data={data}
          columns={columns}
          values={this.state}
          onPageChange={pageIndex => this.onPageChange(pageIndex)}
          onPageSizeChange={(pageSize) => this.onPageSizeChange(pageSize)}
          onFilteredChange={(filtered) => this.onFilteredChange(filtered)}
        />
      </div >
    )
  }
}
export default Vehicle;
