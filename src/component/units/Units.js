import React, { Component } from 'react';
import Table from '../commonComponent/Table';

import { getToken } from '../../global';
import { getUnitList } from '../api/Api';

const columns = [
  {
    id: 'officialId',
    Header: 'Unit Id',
    accessor: 'officialId',
  },
  {
    id: 'section_name',
    Header: 'Section',
    accessor: 'section.name',
  },
  {
    id: 'building_name',
    Header: 'Building',
    accessor: 'building.name'
  },
  {
    Header: 'Entry',
    accessor: 'entry.name'
  },
  {
    Header: 'Level',
    accessor: 'level',
  },
  {
    Header: 'Location',
    accessor: 'buildingId',
  },
  {
    Header: 'Shares',
    accessor: 'shares',
  },
  {
    id: 'unit_type_type',
    Header: 'Unit type',
    accessor: 'unit_type.type'
  },
  {
    Header: 'Format',
    accessor: 'format',
  },
  {
    Header: 'Surface area',
    accessor: 'surfaceArea',
  },
]

class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total_pages: '',
      current_page: 1,
      totalRecords: '',
      limit: 20,
      filtered: [],
      filter_string: ''
    }
  }

  componentDidMount() {
    if (getToken()) {
      this.getUnits();
    }
  }

  onFilteredChange(filtered) {
    if (filtered.length >= 0) {
      let string = '';
      for (let i = 0; i < filtered.length; i++) {
        string = string + `&${filtered[i].id}=${filtered[i].value}`;
      }
      this.setState({ filtered, filter_string: string }, () => this.getUnits())
    }
  }

  onPageChange(pageIndex) {
    this.setState({ current_page: pageIndex + 1 }, () => this.getUnits())
  }
  onPageSizeChange(pageSize) {
    this.setState({ limit: pageSize }, () => this.getUnits())
  }
  getUnits() {
    const { current_page, limit, filter_string } = this.state;
    getUnitList(current_page, limit, filter_string)
      .then((res) => {
        this.setState({
          data: res.data.data,
          totalRecords: res.data.totalRecords,
          total_pages: Math.ceil(res.data.totalRecords / this.state.limit)
        })
        return res;
      })
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
export default Units;
