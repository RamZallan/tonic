import React, {Component} from 'react';
import {Container, Row} from "reactstrap";
import { connect } from "react-redux";

import MachineCard from './MachineCard';
import InfoSpinner from "../InfoSpinner";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Machines: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.stock !== prevProps.stock && this.props.stock) {
            this.renderMachineCards();
        }
    }

    renderMachineCards() {
        const Machines = this.props.stock.map((machine, index) => {
            return (
                    <MachineCard
                        key={machine.id}
                        machine={machine}
                        slots={machine.slots}
                        isDrinkAdmin={this.props.isDrinkAdmin}
                    />
            );
        });
        this.setState({Machines});
    }

    render() {
        return (
            <Container>
            <Row>
                {this.props.stock ? this.state.Machines : <InfoSpinner>Loading drinks</InfoSpinner>}
            </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    stock: state.apis.stock.machines,
});

export default connect(
    mapStateToProps
)(Home);
