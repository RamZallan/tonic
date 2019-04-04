import React, {Component} from 'react';
import DropModal from './DropModal';
import {ListGroupItem, Badge, ButtonGroup, Button} from "reactstrap";

class Slot extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <ListGroupItem className="drink-item" tag="a" href="#" disabled={this.props.slot.empty}>
                    {this.props.slot.name}

                <span className="pull-right">
                    <Badge pill color="info">{this.props.slot.price} credits</Badge>&nbsp;
                    <ButtonGroup size="sm" className="pull-right">
                        <Button onClick={this.toggle} disabled={this.props.slot.empty} color="primary">Drop</Button>
                        {this.props.isDrinkAdmin && <Button color="info">Edit</Button>}
                    </ButtonGroup>
                    <DropModal
                        drink={this.props.slot.name}
                        toggle={this.toggle}
                        modal={this.state.modal}
                    />
                </span>
            </ListGroupItem>
        )
    }
}

export {Slot};
