import React, {Component} from 'react';
import {ButtonGroup, Button, InputGroup, InputGroupAddon, Input} from "reactstrap";


class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newVal: 0,
        };
    }
    
    handleSet() {
        console.log("New balance: " + this.state.newVal);
    }
    
    handleIncrement() {
        console.log("New balance: " + (this.props.drinkBalance + this.state.newVal));
    }
    
    handleDecrement() {
        console.log("New balance: " + (this.props.drinkBalance - this.state.newVal));
    }
    
    handleValueChange(e) {
        let intVal = parseInt(e.target.value, 10);
        if (!isNaN(intVal)) {
            this.setState({newVal: intVal});
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

export default User;