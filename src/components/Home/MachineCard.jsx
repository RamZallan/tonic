import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Badge } from 'reactstrap';
import SlotList from './SlotList';

class MachineCard extends Component {
    render() {
        const isSnack = this.props.machine.name === 'snack';
        const statusBadge = this.props.machine.is_online ? (
            <Badge className="float-right" color="success">
                Online
            </Badge>
        ) : (
            <Badge className="float-right" color="danger">
                Offline
            </Badge>
        );
        return (
            <Col xs="12" lg={isSnack ? '12' : '6'}>
                <Card>
                    <CardHeader>
                        {this.props.machine.display_name} {statusBadge}
                    </CardHeader>
                    <CardBody>
                        <SlotList
                            machine={this.props.machine}
                            slots={this.props.slots}
                            isSnack={isSnack}
                            isDrinkAdmin={this.props.isDrinkAdmin}
                        />
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default MachineCard;
