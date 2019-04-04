import React, {Component} from 'react';
import {Slot} from './Slot';
import {ListGroup, Row, Col} from "reactstrap";

class SlotList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Slots: [],
        };
    }

    componentDidMount() {
        this.renderSlotList();
    }

    renderSlotList() {
        const Slots = Object.keys(this.props.slots).map((slot, index) => {
            return (
                    <Slot key={index} slot={this.props.slots[slot]} isDrinkAdmin={this.props.isDrinkAdmin}/>
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
