import React, {Component} from 'react';
import MachineCard from './MachineCard';
import {Container, Row} from "reactstrap";

const DrinkData = [
            {
                id: "ld",
                name: "Little Drink",
                slots:
                    [
                        {
                            id: 1,
                            item: "Coke",
                            price: 10,
                        },
                        {
                            id: 2,
                            item: "Diet Coke",
                            price: 10,
                        },
                        {
                            id: 3,
                            item: "Drink's Choice",
                            price: 5,
                        },
                        {
                            id: 1,
                            item: "Fanta's Choice",
                            price: 9,
                            empty: true,
                        }
                    ]
            },
            {
                id: "bd",
                name: "Big Drink",
                slots:
                    [
                        {
                            id: 1,
                            item: "Bawls",
                            price: 20,
                        },
                        {
                            id: 2,
                            item: "Jolt",
                            price: 30,
                        },
                        {
                            id: 3,
                            item: "A Gun",
                            price: 1,
                        },
                        {
                            slot_id: 3,
                            drink_id: 7,
                            item: "Drink's Choice",
                            price: 5,
                        },
                    ]
            },
            {
                id: "s",
                name: "Snack",
                slots:
                    [
                        {
                            id: 1,
                            item: "Soylent",
                            price: 100,
                        },
                        {
                            id: 2,
                            item: "Soylent",
                            price: 100,
                            empty: true,
                        },
                        {
                            id: 3,
                            item: "marcsiphone",
                            price: 1000,
                        },
                    ]
            },
    ];

class Home extends Component {
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
        const Machines = DrinkData.map((item, index) => {
            return (
                    <MachineCard
                        key={index}
                        {...item}
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
                {this.state.Machines}
            </Row>
            </Container>
        )
    }
}

export default Home;
