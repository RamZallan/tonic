import React, {Component} from 'react';
import {Slot} from './Slot';
import {ListGroup} from "reactstrap";

class SlotList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Slots: null
        };
    }

    componentDidMount() {
        this.renderSlotList();
    }

    renderSlotList() {
        const Slots = Object.keys(this.props.slots).map((slot, index) => {
            return (
                    <Slot slot={this.props.slots[slot]} isDrinkAdmin={this.props.isDrinkAdmin}/>
            )
        });
        this.setState({Slots});
    }

    render() {
        return (
            <ListGroup hover flush>
                {this.state.Slots}
            </ListGroup>
        )
    }
}

export default SlotList;
