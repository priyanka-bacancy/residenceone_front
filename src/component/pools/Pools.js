import React, { Component } from 'react';

// import './Pools.css';

import axios from 'axios';
import ReactTable from 'react-table'
import history from '../../history';

const columns = [
  {
    Header: 'Name',
    accessor: 'fullName'
  },
  {
    Header: 'Profile Picture',
    accessor: 'picture'
  },
  {
    Header: 'Main unit ID',
    accessor: 'unitId'
  },
  {
    Header: 'Position',
    accessor: 'personStatus'
  },
  {
    Header: 'Building',
    accessor: 'buildingId'
  },
]

class Pools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: ''
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('user')) {
      history.push('/login');
    }
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ token: user }, () => this.getPools());
  }

  getPools() {
    axios.get(`http://localhost:8080/api/entry/getAllSections`,
      {
        headers: { token: this.state.token }
      })
      .then((res) => {
        console.log(res);
        // this.setState({ data: res })
        return res;
      })
  }

  render() {
    return <ReactTable
      className='Pools'
      data={this.state.data}
      columns={columns}
    />
  }
}
export default Pools;
