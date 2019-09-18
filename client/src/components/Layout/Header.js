import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
// import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import PropTypes from "prop-types";
import {connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";


import {logoutUser} from "../../actions/authAction";
// import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');

// const MdNotificationsActiveWithBadge = withBadge({
//   size: 'md',
//   color: 'primary',
//   style: {
//     top: -10,
//     right: -10,
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   children: <small>5</small>,
// })(MdNotificationsActive);


class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  onLogoutClick=(e)=>{
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {

    const {isAuthenticated , user} =this.props.auth;
    const authLink=(
        <Nav className="ml-auto" navbar>
          <NavItem>
            <a 
              style={{color:'black'}}
              href='' 
              onClick={this.onLogoutClick} 
              className='nav-link'>
              Logout
            </a>
          </NavItem>
        </Nav>
      )
    const gestLink=(
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to="/login" className='nav-link'>Login</Link>
          </NavItem> 
        </Nav>
      )
    // const { isNotificationConfirmed } = this.state;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        {/*
        <Nav navbar>
          <SearchInput />
        </Nav>
        \*/}

        <Nav navbar className={bem.e('nav-right')}>
          {/*<NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem>
          */}

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
              {isAuthenticated?authLink:gestLink}
            </NavLink>
            
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes={
  logoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  auth:state.auth,
})

export default connect(mapStateToProps,{logoutUser})(withRouter(Header));
