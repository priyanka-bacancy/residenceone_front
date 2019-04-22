import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import history from './history';
import Login from './component/login/Login';
import Dashboard from './component/admin/dashboard';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/admin' component={Dashboard} />
            <Route path='/apps' component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

// <Nav className="ml-auto" navbar>
// <UncontrolledDropdown nav inNavbar>

//   <DropdownToggle nav caret id='link1' onClick={() => { this.setState({ isOpenAdminData: !this.state.isOpenAdminData, }) }}>
//     Administration
//     </DropdownToggle>
//   <Collapse isOpen={this.state.isOpenAdminData} navbar>
//     <Nav>
//       <NavItem>
//         <Link to='/admin/users'>User</Link>
//       </NavItem></Nav>
//   </Collapse>

//   <DropdownToggle nav caret id='link1'>
//     Application
//     </DropdownToggle>
//   <DropdownMenu right id='drop'>
//     <DropdownItem>
//       <FaSwimmer id='link1' /> <Link to="/apps/pools" className='link'>Pool</Link>
//     </DropdownItem>
//     <DropdownItem>
//       <FaGift id='link1' /> <Link to="/apps/reception" className='link'>Reception</Link>
//     </DropdownItem>
//     <DropdownItem>
//       <FaFlagCheckered id='link1' /><Link to="/apps/reception" className='link'>Notification</Link>
//     </DropdownItem>
//     <DropdownItem>
//       <FaCar id='link1' />  <Link to="/apps/vehicle" className='link'>Vehicle</Link>
//     </DropdownItem>
//     <DropdownItem>
//       <FaRegCheckCircle id='link1' /> <Link to="/admin/pools" className='link'>Issue Tracking</Link>
//     </DropdownItem>
//     <DropdownItem>
//       <FaRegAddressCard id='link1' /> <Link to="/admin/pools" className='link'>Contact</Link>
//     </DropdownItem>
//   </DropdownMenu>

// </UncontrolledDropdown>
// </Nav>