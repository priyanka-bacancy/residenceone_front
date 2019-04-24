import React, { Component } from 'react';
import { NavItem, Nav, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Axios from 'axios';
import { getToken } from '../../global';
class Profilepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'profile'
    }
  }
  componentDidMount() {
    Axios.get(`http://localhost:8080/api/user/detail/${this.props.match.params.id}`,
      {
        headers: { token: getToken() }
      })
  }
  toggle() {
    console.log("ssdfdsgfd");

  }
  render() {
    return (
      <div>
        <h1>User Profile</h1>
        <div id='buttongroup'>
          <Nav tabs>
            <NavItem>
              <NavLink href="#" className={classnames({ active: this.state.activeTab === 'profile' })} onClick={() => { this.toggle('all'); }}>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: this.state.activeTab === 'all' })} onClick={() => { this.toggle('false'); }}>Notification</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: this.state.activeTab === 'all' })} onClick={() => { this.toggle('true'); }}>Packets</NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    )
  }
}

export default Profilepage;