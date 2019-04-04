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
        const isSnack = this.props.name === 'snack';
        return (
                <Col xs="12" lg={isSnack ? '12' : '6'}>
                    <Card>
                        <CardHeader>{this.getName(this.props.name)}</CardHeader>
                        <CardBody>
                            <SlotList slots={this.props.slots} isSnack={isSnack} isDrinkAdmin={this.props.isDrinkAdmin}/>
                        </CardBody>
                    </Card>
                </Col>
        );
    }
};

export default MachineCard;
