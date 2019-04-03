import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import SlotList from './SlotList'

class MachineCard extends Component {
    getName(abbrev) {
        switch(abbrev) {
            case 'bigdrink':
                return 'Big Drink';
            case 'littledrink':
                return 'Little Drink';
            case 'snack':
                return 'Snack';
            default:
                return 'Unknown Machine'
        }
    }
    render() {
        return (
                <Col xs="12" lg="4">
                    <Card>
                        <CardHeader>{this.getName(this.props.name)}</CardHeader>
                        <CardBody>
                            <SlotList slots={this.props.slots} isDrinkAdmin={this.props.isDrinkAdmin}/>
                        </CardBody>
                    </Card>
                </Col>
        );
    }
};

export default MachineCard;
