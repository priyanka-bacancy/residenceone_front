import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { NavItem, Nav, NavLink, TabContent } from 'reactstrap';
import moment from 'moment';
import classnames from 'classnames';

const localizer = BigCalendar.momentLocalizer(moment)
const myEventsList = [
  {
    'title': 'Month End Event',
    'allDay': true,
    'start': new Date(2019, 3, 30),
    'end': new Date(2019, 3, 30)
  },
]

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: true,
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <h2>Events</h2>
        <hr />
        <div style={{ marginLeft: '20px', marginRight: '20px' }}>
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
          <div>
            <TabContent activeTab={activeTab}>
              <BigCalendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "90vh" }}
              />
            </TabContent>
          </div>
        </div>
      </div>
    )
  }
}
export default Events;
