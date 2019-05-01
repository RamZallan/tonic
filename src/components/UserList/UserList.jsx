import { connect } from "react-redux";
import React, {Component} from 'react';
import {Form, FormGroup, Input, Table} from "reactstrap";

import User from './User';
import { fetchUsers } from '../../actions';
import InfoSpinner from "../InfoSpinner";


class UserList extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            filterStr: "",
        };
    }

    componentDidMount() {
        if (this.props.oidc.user && !this.props.users) {
            this.props.getUsers(this.props.oidc.user.access_token);
        }
    }

    render() {
        console.log("User props:\n", this.props)
        if (!this.props.users) {
            return (<InfoSpinner>Loading users</InfoSpinner>);
        } else if (!this.props.users.length) {
            return (<h2>No users found</h2>);
        }
        const filterLen = this.state.filterStr.length;
        const users = this.props.users
            .filter(user => (filterLen > 0
                ? (this.state.filterStr === user.uid.substring(0, filterLen)
                    || this.state.filterStr === user.cn.substring(0, filterLen))
                : false)
            )
            .sort((a, b) => a.uid > b.uid)
            .map((user, index) => {
                return (
                    <User
                        key={index}
                        {...user}
                    />
                );
            });
        return (
            <div>
                <h1>Users</h1>
                <Form>
                    <FormGroup>
                        <Input onChange={e => this.setState({filterStr: e.target.value })} type="search" placeholder="Search"/>
                    </FormGroup>
                </Form>
                {users.length ?
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Credits</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users}
                        </tbody>
                    </Table>
                :
                    (<div>
                        {this.state.filterStr.length ?
                            "No results found for filter '" + this.state.filterStr + "'."
                        :   "Enter a search query to find users."
                        }
                    </div>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    oidc: state.oidc,
    users: state.apis.users.users,
});

const mapDispatchToProps = dispatch => ({
    getUsers: access_token => fetchUsers(dispatch, access_token)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);