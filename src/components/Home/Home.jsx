import React, {Component} from 'react';
import {Container, Row} from "reactstrap";
import { connect } from "react-redux";

import MachineCard from './MachineCard';
import Toasts from './Toasts';
import InfoSpinner from "../InfoSpinner";

class Home extends Component {
    render() {
        if (!this.props.stock) {
            return (<InfoSpinner>Loading drinks</InfoSpinner>);
        }
        const machines = this.props.stock.map((machine, index) => {
            return (
                    <MachineCard
                        key={machine.id}
                        machine={machine}
                        slots={machine.slots}
                        isDrinkAdmin={this.props.isDrinkAdmin}
                    />
            );
        });
        return (
            <Container>
            <Row>
                {machines}
                <Toasts />
            </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    stock: state.apis.stock.machines,
});

export default connect(
    mapStateToProps
)(Home);
