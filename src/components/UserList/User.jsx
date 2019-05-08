import React, {Component} from 'react';
import { connect } from "react-redux";

import { updateUserCredits } from '../../actions';
import {ButtonGroup, Button, InputGroup, InputGroupAddon, Input} from "reactstrap";


class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newVal: null,
        };
    }
    
    handleEmptyInput() {
        this.props.handleAlert({
           type: 'error',
           message: "Enter a value into the input to update a user's balance."
        });
    }

    handleUpdate(drinkBalance) {
        if (drinkBalance === null) {
            this.handleEmptyInput();
        } else {
            this.props.clearAlert();
            this.props.updateCredits(this.props.oidc.user.access_token, this.props.uid, drinkBalance);
        }

    }

    handleSet() {
        if (this.state.newVal === null) {
            this.handleEmptyInput();
        } else {
            this.props.clearAlert();
            this.handleUpdate(this.state.newVal);
        }
    }

    handleIncrement() {
        if (this.state.newVal === null) {
            this.handleEmptyInput();
        } else {
            this.props.clearAlert();
            this.handleUpdate(this.props.drinkBalance + this.state.newVal);
        }
    }

    handleDecrement() {
        if (this.state.newVal === null) {
            this.handleEmptyInput();
        } else {
            this.props.clearAlert();
            this.handleUpdate(this.props.drinkBalance - this.state.newVal);
        }
    }

    handleValueChange(e) {
        let intVal = parseInt(e.target.value, 10);
        if (intVal && !isNaN(intVal)) {
            this.setState({newVal: intVal});
        } else {
            this.setState({newVal: null});
        }
    }

    render() {
        return (
            <tr>
                <td>
                <img
                  className="rounded-circle"
                  src={`https://profiles.csh.rit.edu/image/${this.props.uid}`}
                  alt=""
                  aria-hidden={true}
                  width={20}
                  height={20}
                />
                    {this.props.cn} ({this.props.uid})
                </td>
                <td>
                    {this.props.drinkBalance}
                </td>
                <td>
                    <InputGroup>
                        <Input placeholder="Value" onChange={e => this.handleValueChange(e)}/>
                        <InputGroupAddon addonType="append">
                            <ButtonGroup>
                                <Button onClick={this.handleSet.bind(this)} color="primary">Set</Button>
                                <Button onClick={this.handleIncrement.bind(this)} color="secondary">+</Button>
                                <Button onClick={this.handleDecrement.bind(this)} color="secondary">-</Button>
                            </ButtonGroup>
                        </InputGroupAddon>
                    </InputGroup>
                </td>
            </tr>
        );
    }
};


const mapStateToProps = state => ({
    oidc: state.oidc,
});

const mapDispatchToProps = dispatch => ({
    updateCredits: (access_token, uid, drinkBalance) => updateUserCredits(dispatch, access_token, uid, drinkBalance),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
