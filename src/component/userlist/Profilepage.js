import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';
import classnames from 'classnames';
import { FaEllipsisV, FaPaperclip } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, NavItem, Nav, NavLink, TabContent, TabPane } from 'reactstrap';

import { getToken } from '../../global';
import Adduser from './Adduser';

class Profilepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Profile',
      userProfile: {},
      family: {},
      units: {},
      tabName: [
        { tabData: 'Profile' },
        { tabData: 'Notification' },
        { tabData: 'Packets' },
        { tabData: 'Preferences' },
        { tabData: 'Role History' },
        { tabData: 'Group History' },
        { tabData: 'Ownership History' },
        { tabData: 'Family History' },
      ],
      editPage: false,
      copied: false,
      activeDateRange: ''
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:8080/api/user/detail/${this.props.match.params.id}`,
      { headers: { token: getToken() } })
      .then((res) => {
        if ((res.data.data.activeFrom !== null) && (res.data.data.activeTo !== null)) {
          let dateFrom = res.data.data.activeFrom;
          var finalDateFrom = dateFrom.substring(0, 10)
          let dateTo = res.data.data.activeTo;
          var finalDateTo = dateTo.substring(0, 10)
        }
        this.setState({
          userProfile: res.data.data,
          family: _.get(res.data.data, 'family'),
          units: _.get(res.data.data, 'family.families_units[0].unit'),
          activeDateRange: finalDateFrom + ' - ' + finalDateTo
        })
      })
  }
  toggle(tab) {
    this.setState({ activeTab: tab });
  }
  handleClick() {
    this.setState({ editPage: true })
  }

  handicapped() {
    this.setState({ isHandicapped: '1' })
  }
  render() {
    return (
      <div>
        <div className='edit-page-heading'>User Profile : {this.state.userProfile.fullName}
          <CopyToClipboard text={this.state.userProfile.fullName}
            onCopy={() => this.setState({ copied: true })}>
            <button><FaPaperclip /></button>
          </CopyToClipboard>
        </div>

        <hr />
        <h6 className='edit-sub-heading'>Family name: {_.get(this.state, 'family.name')}
          <CopyToClipboard text={_.get(this.state, 'family.name')}
            onCopy={() => this.setState({ copied: true })}>
            <button><FaPaperclip /></button>
          </CopyToClipboard>
        </h6>

        <h6 className='edit-sub-heading1'>Main Unit Id: {_.get(this.state, 'units.officialId')}
          <CopyToClipboard text={_.get(this.state, 'units.officialId')}
            onCopy={() => this.setState({ copied: true })}>
            <button><FaPaperclip /></button>
          </CopyToClipboard>
        </h6>

        <div id='buttongroup'>
          <Nav tabs>
            {this.state.tabName.map((selectedTab) =>
              <NavItem key={selectedTab.tabData}>
                <NavLink href="#" className={classnames({ active: this.state.activeTab === selectedTab.tabData })} onClick={() => { this.toggle(selectedTab.tabData); }}>{selectedTab.tabData}</NavLink>
              </NavItem>
            )}
          </Nav>
        </div>

        <UncontrolledDropdown>

          <DropdownToggle id='dot-icon'>
            <FaEllipsisV />
          </DropdownToggle>

          <DropdownMenu >
            <DropdownItem onClick={() => this.handleClick()} >Edit profile details</DropdownItem>
            <DropdownItem onClick={() => this.handicapped()}>Mark as handicapped</DropdownItem>
            <DropdownItem>Mark as inactive</DropdownItem>
            <DropdownItem>Help</DropdownItem>
          </DropdownMenu>

        </UncontrolledDropdown>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="Profile">
            {this.state.editPage ? <Adduser userId={this.props.match.params.id} userProfile={this.state.userProfile} activeDateRange={this.state.activeDateRange} /> : <img src={this.state.userProfile.picture} height={150} alt="profilePicture" className='profile' />}
          </TabPane>
        </TabContent>

      </div>
    )
  }
}

export default Profilepage;