import React, {Component} from 'react';
import { connect } from "react-redux";

import DropModal from './DropModal';
import {ListGroupItem, Badge, ButtonGroup, Button} from "reactstrap";

class Slot extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          dropError: this.props.dropError,
          dropLoading: this.props.dropLoading,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            dropError: null, // clear old error
            dropLoading: false,
        }));
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
          dropError: nextProps.dropError,
          dropLoading: nextProps.dropLoading,
      });
    }

    render() {
        return (
            <ListGroupItem className="drink-item" tag="a" href="#" disabled={this.props.slot.empty}>
                    {this.props.slot.name}

                <span className="pull-right">
                    <Badge pill color="info">{this.props.slot.price} credits</Badge>&nbsp;
                    <ButtonGroup size="sm" className="pull-right">
                        <Button onClick={this.toggle} disabled={this.props.slot.empty || this.props.drink_balance < this.props.slot.price} color="primary">Drop</Button>
                        {this.props.isDrinkAdmin && <Button color="info">Edit</Button>}
                    </ButtonGroup>
                    <DropModal
                        machine={this.props.machine}
                        slot={this.props.slotNum}
                        drink={this.props.slot.name}
                        toggle={this.toggle}
                        modal={this.state.modal}
                        dropError={this.state.dropError}
                        dropLoading={this.state.dropLoading}
                    />
                </span>
            </ListGroupItem>
        );
    }
}

const mapStateToProps = state => ({
  drink_balance: (state.apis.credits.user || {}).drinkBalance,
  dropError: state.apis.drop.error,
  dropLoading: state.apis.isFetching,
});

export default connect(
    mapStateToProps
)(Slot);
