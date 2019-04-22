import React, { Component } from 'react';

import { getOwnerList } from '../api/Api';
import { getToken } from '../../global'
import Table from '../commonComponent/Table';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Account Reference',
    accessor: 'ownerAccRef',
  },
  {
    Header: 'Total units',
    accessor: 'totalUnit'
  },
  {
    Header: 'Total shares',
    accessor: 'totalShares'
  },
]

class Owners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current_page: 1,
      totalRecords: '',
      limit: 20,
      filtered: [],
      filter_string: '',
    }
  }

  componentDidMount() {
    if (getToken()) {
      this.getOwners();
    }
  }

  getOwners() {
    const { current_page, limit, filter_string } = this.state;
    getOwnerList(current_page, limit, filter_string)
      .then((res) => {
        this.setState({
          data: res.data.data,
          totalRecords: res.data.totalRecords,
          total_pages: Math.ceil(res.data.totalRecords / this.state.limit)
        })
        return res;
      })
  }


  onFilteredChange(filtered) {
    if (filtered.length >= 0) {
      let string = '';
      for (let i = 0; i < filtered.length; i++) {
        string = string + `&${filtered[i].id}=${filtered[i].value}`
      }
      this.setState({ filtered, filter_string: string }, () => this.getOwners());
    }
  }
  onPageChange(pageIndex) {
    this.setState({ current_page: pageIndex + 1 }, () => this.getOwners())
  }
  onPageSizeChange(pageSize) {
    this.setState({ limit: pageSize }, () => this.getOwners())
  }

  render() {
    return (
      <div>
        <Table
          data={this.state.data}
          columns={columns}
          values={this.state}
          onPageChange={pageIndex => this.onPageChange(pageIndex)}
          onPageSizeChange={(pageSize) => this.onPageSizeChange(pageSize)}
          onFilteredChange={(filtered) => this.onFilteredChange(filtered)}
        />
      </div>
    )
  }
}
export default Owners;
