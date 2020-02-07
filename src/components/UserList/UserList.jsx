import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, FormGroup, Input, Table, Alert } from 'reactstrap';

import User from './User';
import { fetchUsers, fetchCredits } from '../../actions';
import InfoSpinner from '../InfoSpinner';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterStr: '',
            alertObj: null,
        };

        this.handleAlert = this.handleAlert.bind(this);
        this.clearAlert = this.clearAlert.bind(this);
    }

    componentDidMount() {
        if (this.props.oidc.user && !this.props.users) {
            this.props.getUsers(this.props.oidc.user.access_token);
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.creditsUpdateError !== this.props.creditsUpdateError ||
            prevProps.creditsUpdate !== this.props.creditsUpdate
        ) {
            if (this.props.creditsUpdateError) {
                this.handleAlert({
                    type: 'error',
                    message: this.props.creditsUpdateError,
                });
            } else if (this.props.creditsUpdate.message) {
                this.handleAlert({
                    type: 'success',
                    message: this.props.creditsUpdate.message,
                });
                this.props.getUsers(this.props.oidc.user.access_token);
                this.props.getCredits(
                    this.props.oidc.user.access_token,
                    this.props.oidc.user.profile.preferred_username
                );
            }
        }
    }

    handleAlert(alertObj) {
        this.setState({
            alertObj: alertObj,
        });
    }

    clearAlert() {
        this.setState({
            alertObj: null,
        });
    }

    render() {
        if (!this.props.users) {
            return <InfoSpinner>Loading users</InfoSpinner>;
        } else if (!this.props.users.length) {
            return <h2>No users found</h2>;
        }
        let alertContent = '';
        if (this.state.alertObj) {
            switch (this.state.alertObj.type) {
                case 'error':
                    alertContent = (
                        <Alert color="danger">
                            <b>Error: </b>
                            {this.state.alertObj.message}
                        </Alert>
                    );
                    break;
                case 'success':
                default:
                    alertContent = (
                        <Alert color="success">
                            <b>Success: </b>
                            {this.state.alertObj.message}
                        </Alert>
                    );
                    break;
            }
        }
        const filterLen = this.state.filterStr.length;
        const users = this.props.users
            .filter(user =>
                filterLen > 0
                    ? this.state.filterStr ===
                          user.uid.substring(0, filterLen) ||
                      this.state.filterStr === user.cn.substring(0, filterLen)
                    : false
            )
            .sort((a, b) => a.uid > b.uid)
            .map((user, index) => {
                return (
                    <User
                        key={index}
                        {...user}
                        handleAlert={this.handleAlert}
                        clearAlert={this.clearAlert}
                    />
                );
            });
        return (
            <div>
                <h1>Users</h1>
                {alertContent}
                <Form>
                    <FormGroup>
                        <Input
                            onChange={e =>
                                this.setState({ filterStr: e.target.value })
                            }
                            type="search"
                            placeholder="Search"
                        />
                    </FormGroup>
                </Form>
                {users.length ? (
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Credits</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{users}</tbody>
                    </Table>
                ) : (
                    <div>
                        {this.state.filterStr.length
                            ? `No results matching "${this.state.filterStr}".`
                            : 'Enter a search query to find users.'}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    oidc: state.oidc,
    users: state.apis.users.users,
    creditsUpdate: state.apis.creditsUpdate,
    creditsUpdateError: (state.apis.creditsUpdate || {}).error,
});

const mapDispatchToProps = dispatch => ({
    getUsers: access_token => fetchUsers(dispatch, access_token),
    getCredits: (access_token, uid) =>
        fetchCredits(dispatch, access_token, uid),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
