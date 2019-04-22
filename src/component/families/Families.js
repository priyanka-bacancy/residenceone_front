import React, { Component } from 'react';

import { NavItem, Nav, NavLink, TabContent } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaEllipsisV } from 'react-icons/fa';

import { getFamilyList } from '../api/Api'

import classnames from 'classnames';
import { getToken } from '../../global'
import Table from '../commonComponent/Table';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    id: 'mainPerson_name',
    Header: 'Main Person',
    accessor: 'mainPerson.fullName',
  },
  {
    id: 'mainPerson_telephone',
    Header: 'Mobile Number',
    accessor: 'mainPerson.telephone',
  },
  {
    id: 'mainPerson_personStatus',
    Header: 'Owner/Renter',
    accessor: 'mainPerson.personStatus'
  },
  {
    id: 'families_units_unit_officialId',
    Header: 'Main unit',
    accessor: 'families_units[0].unit.officialId'
  },
  {
    id: 'families_units_unit_building_name',
    Header: 'Building',
    accessor: 'families_units[0].unit.building.name'
  },
  {
    id: 'families_units_unit_shares',
    Header: 'Shares',
    accessor: 'families_units[0].unit.shares'
  },
]

class Families extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current_page: 1,
      totalRecords: '',
      limit: 20,
      filtered: [],
      activeTab: true,
      filter_string: '',
      sorted: {
        id: '',
        desc: ''
      }
    }
  }

  componentDidMount() {
    if (getToken()) {
      this.getFamilies();
    }
  }

  getFamilies() {
    const { activeTab, current_page, limit, filter_string, sorted } = this.state;
    getFamilyList(activeTab, current_page, limit, filter_string, sorted)
      .then((res) => {
        this.setState({
          data: res.data.data,
          totalRecords: res.data.totalRecords,
          total_pages: Math.ceil(res.data.totalRecords / this.state.limit)
        })
        console.log(res);

        return res;
      })
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        current_page: 1
      }, () => this.getFamilies());
    }
  }
  onFilteredChange(filtered) {
    if (filtered.length >= 0) {
      let string = '';
      for (let i = 0; i < filtered.length; i++) {
        string = string + `&${filtered[i].id}=${filtered[i].value}`;
      }
      this.setState({ filtered, filter_string: string }, () => this.getFamilies())
    }
  }

  onSortedChange(sorted) {
    console.log(sorted);

    let sort = { ...this.state.sorted }

    let str = sorted[0].id;
    let final = str.replace(/_/g, ".");

    sort["id"] = final;
    sort["desc"] = sorted[0].desc ? 'desc' : 'asc';
    this.setState({ sorted: sort }, () => this.getFamilies())
  }

  onPageChange(pageIndex) {
    this.setState({ current_page: pageIndex + 1 }, () => this.getFamilies())
  }
  onPageSizeChange(pageSize) {
    this.setState({ limit: pageSize }, () => this.getFamilies())
  }

  render() {
    const { activeTab, data } = this.state;
    return (
      <div>
        <div>
          <div id='buttongroup'>
            <Nav tabs>
              <NavItem>
                <NavLink href="#" className={classnames({ active: activeTab === true })} onClick={() => { this.toggle(true); }}>Active</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" className={classnames({ active: activeTab === false })} onClick={() => { this.toggle(false); }}>Inactive</NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle id='dot-icon'>
            <FaEllipsisV />
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem onClick={() => this.handleClick()} >Add New Family</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <div>
          <TabContent activeTab={activeTab}>
            <Table
              data={data}
              columns={columns}
              values={this.state}
              onPageChange={pageIndex => this.onPageChange(pageIndex)}
              onPageSizeChange={(pageSize) => this.onPageSizeChange(pageSize)}
              onFilteredChange={(filtered) => this.onFilteredChange(filtered)}
              onSortedChange={(sorted) => this.onSortedChange(sorted)}
            />
          </TabContent>
        </div>
      </div>
    )
  }
}
export default Families;
