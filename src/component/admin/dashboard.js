import React, { Component } from 'react';

import { Button } from 'reactstrap';
import { Route, Switch, Link } from 'react-router-dom';
import { Nav, DropdownItem, UncontrolledDropdown, DropdownToggle, Collapse } from 'reactstrap';

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

const Heading = ({ match }) => <h1> {match.params.id}</h1>

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenApp: false,
      isOpenAdmin: false
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

          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>

              <DropdownToggle nav caret id='link1' onClick={() => { this.setState({ isOpenAdmin: !this.state.isOpenAdmin }) }}>
                Administration
              </DropdownToggle>
              <Collapse isOpen={this.state.isOpenAdmin} navbar>
                <Nav>
                  {/* <DropdownItem >
                    <FaRegCircle id='link1' /><Link to="/admin/users" className='link'>Structure</Link>
                  </DropdownItem> */}
                  <DropdownItem>
                    <FaRegBuilding id='link1' /> <Link to="/admin/units" className='link'>Units</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaUser id='link1' /> <Link to="/admin/users" className='link'>Users</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaAtom id='link1' /> <Link to="/admin/groups" className='link'>Groups</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaUsers id='link1' /> <Link to="/admin/families" className='link'>Families</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaUserSecret id='link1' /> <Link to="/admin/owners" className='link'>Owners</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaCar id='link1' />  <Link to="/admin/vehicle" className='link'>Vehicle</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaFileAlt id='link1' /> <Link to="/admin/pools" className='link'>Document</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaCalendarAlt id='link1' /> <Link to="/admin/event" className='link'>Event</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaRegNewspaper id='link1' /> <Link to="/admin/pools" className='link'>News feed</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaSwimmer id='link1' /> <Link to="/apps/pools" className='link'>Pool</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaRegCheckCircle id='link1' /> <Link to="/admin/pools" className='link'>Issue Tracking</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaRegAddressCard id='link1' /> <Link to="/admin/pools" className='link'>Contact</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaCogs id='link1' /><Link to="/admin/pools" className='link'>Settings</Link>
                  </DropdownItem>

                </Nav>
              </Collapse>

              <DropdownToggle nav caret id='link1' onClick={() => { this.setState({ isOpenApp: !this.state.isOpenApp }) }}>
                Application
                </DropdownToggle>
              <Collapse isOpen={this.state.isOpenApp} navbar>
                <Nav>
                  <DropdownItem>
                    <FaSwimmer id='link1' /> <Link to="/apps/pools" className='link'>Pool</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaGift id='link1' /> <Link to="/apps/reception" className='link'>Reception</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaFlagCheckered id='link1' /><Link to="/apps/reception" className='link'>Notification</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaCar id='link1' />  <Link to="/apps/vehicle" className='link'>Vehicle</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaRegCheckCircle id='link1' /> <Link to="/admin/pools" className='link'>Issue Tracking</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <FaRegAddressCard id='link1' /> <Link to="/admin/pools" className='link'>Contact</Link>
                  </DropdownItem>

                </Nav>
              </Collapse>
            </UncontrolledDropdown>
          </Nav>

        </div>

        <div id='right'>
          <div style={{ textAlign: "right" }}><Button type='submit' name='logout' onClick={this.logout}>Logout</Button></div><hr />
          <div><b><u><Route path='/admin/:id?' component={Heading} /></u> </b></div>
          <div><b> <Route path='/apps/:id?' component={Heading} /></b></div>
          <hr />
          <Switch>
            <Route path={`${match.url}/users`} component={Userlist} />
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