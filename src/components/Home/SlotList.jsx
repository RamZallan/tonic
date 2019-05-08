import React, {Component} from 'react';
import Slot from './Slot';
import {ListGroup, Row, Col} from "reactstrap";

class SlotList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Slots: [],
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.slots !== prevProps.slots) {
            this.renderSlotList();
        }
    }

    renderSlotList() {
        const Slots = this.props.slots
            .sort((a, b) => (a.number - b.number))
            .map((slot, index) => {
            return (
                    <Slot
                        key={slot.number}
                        slot={slot}
                        machine={this.props.machine}
                        slotNum={index + 1}
                        isDrinkAdmin={this.props.isDrinkAdmin}
                    />
            )
        });
        this.setState({Slots});
    }

    render() {
        return this.props.isSnack ? (
            <Row>
                <Col xs="12" lg="4">
                    <ListGroup flush>
                        {this.state.Slots.slice(0, 6)}
                    </ListGroup>
                </Col>
                <Col xs="12" lg="4">
                    <ListGroup flush>
                        {this.state.Slots.slice(6, 12)}
                    </ListGroup>
                </Col>
                <Col xs="12" lg="4">
                    <ListGroup flush>
                        {this.state.Slots.slice(12)}
                    </ListGroup>
                </Col>
            </Row>
        ) : (
            <ListGroup flush>
                {this.state.Slots}
            </ListGroup>
        );
    }
}

export default SlotList;
