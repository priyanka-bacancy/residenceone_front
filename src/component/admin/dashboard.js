import React, { Component } from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import { Button, Nav, DropdownItem, UncontrolledDropdown, DropdownToggle, Collapse } from 'reactstrap';

import { FaRegCircle, FaRegBuilding, FaUser, FaAtom, FaUsers, FaUserSecret, FaCar, FaFileAlt, FaCalendarAlt, FaRegNewspaper, FaSwimmer, FaRegCheckCircle, FaRegAddressCard, FaCogs, FaGift, FaFlagCheckered } from 'react-icons/fa';

import history from '../../history';

import { getToken } from './../../global';

import './Dashboard.css';

import Userlist from '../userlist/Userlist';
import Pools from '../pools/Pools';
import Units from '../units/Units';
import Families from '../families/Families';
import Reception from '../Reception/Reception';
import Vehicle from '../vehicle/Vehicle';
import Owners from '../owners/Owners';
import Profilepage from '../userlist/Profilepage';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenApp: false,
      isOpenAdmin: false,
      admin: [
        { symbol: <FaRegCircle />, to: '/admin/users', name: 'Structure' },
        { symbol: <FaRegBuilding />, to: '/admin/units', name: 'Units' },
        { symbol: <FaUser />, to: '/admin/users', name: 'Users' },
        { symbol: <FaAtom />, to: '/admin/groups', name: 'Groups' },
        { symbol: <FaUsers />, to: '/admin/families', name: 'Families' },
        { symbol: <FaUserSecret />, to: '/admin/owners', name: 'Owners' },
        { symbol: <FaCar />, to: '/admin/vehicle', name: 'Vehicle' },
        { symbol: <FaFileAlt />, to: '/admin/document', name: 'Document' },
        { symbol: <FaCalendarAlt />, to: '/admin/event', name: 'Event' },
        { symbol: <FaRegNewspaper />, to: '/admin/news', name: 'News Feed' },
        { symbol: <FaSwimmer />, to: '/admin/pools', name: 'Pools' },
        { symbol: <FaRegCheckCircle />, to: '/admin/issues', name: 'Issue Tracking' },
        { symbol: <FaRegAddressCard />, to: '/admin/contact', name: 'Contact' },
        { symbol: <FaCogs />, to: '/admin/setting', name: 'Setting' },
      ],
      application: [
        { symbol: <FaSwimmer />, to: '/admin/pools', name: 'Pool' },
        { symbol: <FaGift />, to: '/admin/reception', name: 'Reception' },
        { symbol: <FaFlagCheckered />, to: '/admin/notification', name: 'Notification' },
        { symbol: <FaCar />, to: '/admin/vehicle', name: 'Vehicle' },
        { symbol: <FaRegCheckCircle />, to: '/admin/issues', name: 'Issue Tracking' },
        { symbol: <FaRegAddressCard />, to: '/admin/contact', name: 'Contact' },
      ]
    }
  }

  componentWillMount() {
    if (!getToken()) {
      history.push('/login');
    }
  }
  logout() {
    localStorage.removeItem('user');
    history.push('/login');
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <div id='left' className='main-menu'>
          <div className='head'>LA CADENELLE</div>

          <Nav className="ml-auto">
            <UncontrolledDropdown>
              <DropdownToggle nav caret id='link1' onClick={() => { this.setState({ isOpenAdmin: !this.state.isOpenAdmin, isOpenApp: false }) }}>
                Administration
              </DropdownToggle>
              <Collapse isOpen={this.state.isOpenAdmin}>
                {this.state.admin.map((admin, index) =>
                  <DropdownItem key={index}>
                    <b id='link1'>{admin.symbol}</b><Link to={admin.to} className='link'>{admin.name}</Link>
                  </DropdownItem>
                )}
              </Collapse>

              <DropdownToggle nav caret id='link1' onClick={() => { this.setState({ isOpenApp: !this.state.isOpenApp, isOpenAdmin: false }) }}>
                Application
                </DropdownToggle>
              <Collapse isOpen={this.state.isOpenApp}>
                {this.state.application.map((application, index) =>
                  <DropdownItem key={index}>
                    <b id='link1'>{application.symbol}</b><Link to={application.to} className='link'>{application.name}</Link>
                  </DropdownItem>
                )}
              </Collapse>
            </UncontrolledDropdown>
          </Nav>

        </div>

        <div id='right'>
          <div style={{ textAlign: "right" }}>
            <Button type='submit' name='logout' onClick={this.logout}>Logout</Button>
          </div>
          {/* <hr /> */}
          {/* <div><b><u><Route path='/admin/:id?' component={Heading} /></u> </b></div>
          <div><b> <Route path='/apps/:id?' component={Heading} /></b></div> */}
          <hr />
          <Switch>
            <Route exact path={`${match.url}/users`} component={Userlist} />
            <Route exact path={`${match.url}/users/:id?`} component={Profilepage} />
            <Route path={`${match.url}/pools`} component={Pools} />
            <Route exact path={`${match.url}/units`} component={Units} />
            <Route exact path={`${match.url}/families`} component={Families} />
            <Route exact path={`${match.url}/reception`} component={Reception} />
            <Route exact path={`${match.url}/vehicle`} component={Vehicle} />
            <Route exact path={`${match.url}/owners`} component={Owners} />
          </Switch>
        </div>
      </div >
    );
  }
}

export default Dashboard;