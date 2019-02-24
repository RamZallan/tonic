import React from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
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
                        <NavbarBrand href="/">WebDrink</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <div>
                                    {
                                    this.props.isDrinkAdmin && 
                                    <NavItem>
                                        {/* Todo make more atomic, AdminDropdown */}
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret className="navbar-user">
                                                Admin
                                                <span className="caret"/>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem href={"/users"}>
                                                    Users
                                                </DropdownItem>
                                                <DropdownItem href={"/items"}>
                                                    Items
                                                </DropdownItem>
                                                <DropdownItem href={"/temps"}>
                                                    Temps
                                                </DropdownItem>
                                                <DropdownItem href={"/logs"}>
                                                    Logs
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </NavItem>
                                    }
                                </div>
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

NavBar.propTypes = {};

export default NavBar;