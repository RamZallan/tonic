import React, {Component} from 'react';
import MachineCard from './MachineCard';
import {Container, Row, Col} from "reactstrap";

const TempData = [
            {
                id: "ld",
                name: "Little Drink",
                data:
                    [
                        {
                            time: 1550620800000,
                            temp: 40,
                        },
                        {
                            time: 1550624400000,
                            temp: 38,
                        },
                        {
                            time: 1550628000000,
                            temp: 45,
                        },
                        {
                            time: 1550631600000,
                            temp: 45,
                        },
                        {
                            time: 1550635200000,
                            temp: 42,
                        },
                        {
                            time: 1550638800000,
                            temp: 40,
                        },
                        {
                            time: 1550642400000,
                            temp: 40,
                        },
                        {
                            time: 1550646000000,
                            temp: 38,
                        },
                    ],
            },
            {
                id: "bd",
                name: "Big Drink",
                data:
                    [
                        {
                            time: 1550620800000,
                            temp: 35,
                        },
                        {
                            time: 1550624400000,
                            temp: 36,
                        },
                        {
                            time: 1550628000000,
                            temp: 36,
                        },
                        {
                            time: 1550631600000,
                            temp: 38,
                        },
                        {
                            time: 1550635200000,
                            temp: 40,
                        },
                        {
                            time: 1550638800000,
                            temp: 40,
                        },
                        {
                            time: 1550642400000,
                            temp: 41,
                        },
                        {
                            time: 1550646000000,
                            temp: 32,
                        },
                    ],
            },
    ];

class Temperatures extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            Machines: null
        };
    }

    componentDidMount() {
        this.renderMachineCards();
    }

    renderMachineCards() {
        // Not sure where we will be keeping data
        const Machines = TempData.map((machine, index) => {
            return (
                <Row>
                    <Col>
                        <MachineCard
                            key={index}
                            {...machine}
                        />
                    </Col>
                </Row>
            );
        });
        this.setState({Machines});
    }

    render() {
        return (
            <Container>
                {this.state.Machines}
            </Container>
        )
    }
}

export default Temperatures;
