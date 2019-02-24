import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import SlotList from './SlotList'

class MachineCard extends Component {
    render() {
        return (
                <Col xs="12" lg="4">
                    <Card>
                        <CardHeader>{this.props.name}</CardHeader>
                        <CardBody>
                            <SlotList slots={this.props.slots} isDrinkAdmin={this.props.isDrinkAdmin}/>
                        </CardBody>
                    </Card>
                </Col>
        );
    }
};

export default MachineCard;
