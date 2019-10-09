import React, {Component} from 'react';
import { connect } from "react-redux";

import DropModal from './DropModal';
import EditSlotModal from './EditSlotModal';
import {ListGroupItem, Badge, ButtonGroup, Button} from "reactstrap";

class Slot extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dropModal: false,
          editModal: false,
        };

        this.toggleDropModal = this.toggleDropModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    toggleDropModal() {
        this.setState(prevState => ({
            dropModal: !prevState.dropModal,
        }));
    }

    toggleEditModal() {
        this.setState(prevState => ({
            editModal: !prevState.editModal,
        }));
    }

    render() {
        const disabled = this.props.slot.empty || !this.props.slot.active;
        return (
            <ListGroupItem className="drink-item" disabled={disabled}>
                <span className="text">{this.props.slot.item.name}</span>

                <span className="pull-right">
                    <Badge className="price-badge" color="success">{this.props.slot.item.price} credits</Badge>
                    <ButtonGroup size="sm" className="pull-right">
                        <Button className="drop" onClick={this.toggleDropModal} disabled={disabled || this.props.drink_balance < this.props.slot.item.price} color="primary">Drop</Button>
                        {this.props.isDrinkAdmin && (
                            <Button color="info" onClick={this.toggleEditModal}>Edit</Button>
                        )}
                    </ButtonGroup>
                    {this.state.dropModal && (
                        <DropModal
                            machine={this.props.machine}
                            slot={this.props.slotNum}
                            drink={this.props.slot.item.name}
                            toggle={this.toggleDropModal}
                            modal={this.state.dropModal}
                            dropResult={this.props.dropResult}
                            dropLoading={this.props.dropLoading}
                        />
                    )}
                    {this.state.editModal && (
                        <EditSlotModal
                            machine={this.props.machine}
                            slot={this.props.slotNum}
                            toggle={this.toggleEditModal}
                            modal={this.state.editModal}
                            drink={this.props.slot}
                        />
                    )}
                </span>
            </ListGroupItem>
        );
    }
}

const mapStateToProps = state => ({
  drink_balance: (state.apis.credits.user || {}).drinkBalance,
  dropResult: state.apis.drop,
  dropLoading: state.apis.isFetching,
});

export default connect(
    mapStateToProps
)(Slot);
