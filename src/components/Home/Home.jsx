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
        if (this.props !== prevProps && this.props.stock) {
            this.renderMachineCards();
        }
    }

    renderMachineCards() {
        // Not sure where we will be keeping data
        const Machines = Object.keys(this.props.stock).map((item, index) => {
            return (
                    <MachineCard
                        key={index}
                        name={item}
                        slots={this.props.stock[item]}
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
