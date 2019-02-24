import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        if (!this.props.name || !this.props.username) return null;

        const { name, username, drink_balance } = this.props;

        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="navbar-user">
                    <img
                      className="rounded-circle"
                      src={`https://profiles.csh.rit.edu/image/${username}`}
                      alt=""
                      aria-hidden={true}
                      width={32}
                      height={32}
                    />
                    {name} ({drink_balance} credits)
                    <span className="caret"/>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href={"https://profiles.csh.rit.edu/user/" + username}>
                        Profile
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem href="https://github.com/ramzallan/tonic/">
                        View on Github
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

Profile.propTypes = {};

export default Profile;