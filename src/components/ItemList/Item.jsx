import React, {Component} from 'react';
import {ButtonGroup, Button, Badge} from "reactstrap";

import UpdateItemModal from "./UpdateItemModal";
import DeleteItemModal from "./DeleteItemModal";


class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updateModal: false,
            deleteModal: false,
        };

        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    toggleUpdateModal() {
        this.props.clearTransactionResponses();
        this.setState(prevState => ({
            updateModal: !prevState.updateModal,
        }));
    }

    toggleDeleteModal() {
        this.props.clearTransactionResponses();
        this.setState(prevState => ({
            deleteModal: !prevState.deleteModal,
        }));
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.item.name}
                    {this.props.item.machines && this.props.item.machines.map((machine, index) => {
                        switch(machine) {
                            case "Big Drink":
                                return <Badge key={index} id="machine-label" color="info" pill>{machine}</Badge>
                            case "Snack":
                                return <Badge key={index} id="machine-label" color="warning" pill>{machine}</Badge>
                            case "Little Drink":
                                return <Badge key={index} id="machine-label" color="success" pill>{machine}</Badge>
                            default:
                                return <Badge key={index} id="machine-label" color="danger" pill>{machine}</Badge>
                        }
                    })}
                </td>
                <td>
                    {this.props.item.price}
                </td>
                <td>
                    <ButtonGroup size="sm">
                        <Button color="info" onClick={this.toggleUpdateModal}>Edit</Button>
                        <Button color="danger" onClick={this.toggleDeleteModal}>Delete</Button>
                    </ButtonGroup>
                </td>

                {this.state.updateModal && (
                <UpdateItemModal 
                    toggle={this.toggleUpdateModal}
                    modal={this.state.updateModal}
                    item={this.props.item}
                /> )}
                {this.state.deleteModal && (
                <DeleteItemModal 
                    toggle={this.toggleDeleteModal}
                    modal={this.state.deleteModal}
                    item={this.props.item}
                /> )}
            </tr>
        );
    }
}

export default Item;