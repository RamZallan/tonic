import React from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { NavLink as RouterNavLink } from "react-router-dom";
import UserProfile from '../../containers/UserProfile';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
        
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md" fixed="top">
                    <Container>
                        <NavbarBrand
                            activeClassName="active"
                            exact={true}
                            tag={RouterNavLink}
                            to={'/'}>
                                WebDrink
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                {
                                    this.props.isDrinkAdmin &&
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret className="navbar-user">
                                            Admin
                                            <span className="caret"/>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                              activeClassName="active"
                                              exact={true}
                                              tag={RouterNavLink}
                                              to={'/users'}>
                                                Users
                                            </DropdownItem>
                                            <DropdownItem
                                              activeClassName="active"
                                              exact={true}
                                              tag={RouterNavLink}
                                              to={'/items'}>
                                                Items
                                            </DropdownItem>
                                            <DropdownItem
                                              activeClassName="active"
                                              exact={true}
                                              tag={RouterNavLink}
                                              to={'/temps'}>
                                                Temps
                                            </DropdownItem>
                                            <DropdownItem
                                              activeClassName="active"
                                              exact={true}
                                              tag={RouterNavLink}
                                              to={'/logs'}>
                                                Logs
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }
                            </Nav>
                            <Nav navbar className="ml-auto">
                                <UserProfile/>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;