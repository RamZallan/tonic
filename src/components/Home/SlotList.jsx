import React, {Component} from 'react';
import Slot from './Slot';
import {ListGroup, Row, Col} from "reactstrap";

class SlotList extends Component {
    render() {
        const slots = this.props.slots
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
        return this.props.isSnack ? (
            <Row>
                <Col xs="12" lg="4">
                    <ListGroup flush>
                        {slots.slice(0, 6)}
                    </ListGroup>
                </Col>
                <Col xs="12" lg="4">
                    <ListGroup flush>
                        {slots.slice(6, 12)}
                    </ListGroup>
                </Col>
                <Col xs="12" lg="4">
                    <ListGroup flush>
                        {slots.slice(12)}
                    </ListGroup>
                </Col>
            </Row>
        ) : (
            <ListGroup flush>
                {slots}
            </ListGroup>
        );
    }
}

export default SlotList;
