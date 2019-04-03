import React, {Component} from 'react';
import MachineCard from './MachineCard';
import {Container, Row} from "reactstrap";

const DrinkData = {
    "machines": {
        "bigdrink": {
            "1": {
                "id": 12,
                "name": "Canada Dry",
                "price": 10
            },
            "2": {
                "id": 11,
                "name": "Sprite Cranbery",
                "price": 10
            },
            "3": {
                "id": 10,
                "name": "Sprite",
                "price": 10
            },
            "4": {
                "id": 9,
                "name": "Dr. Pepper",
                "price": 10
            },
            "5": {
                "id": 7,
                "name": "J-Cola",
                "price": 10
            },
            "6": {
                "id": 6,
                "name": "Pepsi",
                "price": 10
            },
            "7": {
                "id": 2,
                "name": "Cherry Coke",
                "price": 10,
                empty: true
            }
        },
        "littledrink": {
            "1": {
                "id": 1,
                "name": "Coke",
                "price": 10
            },
            "2": {
                "id": 3,
                "name": "Diet Coke",
                "price": 10
            },
            "3": {
                "id": 5,
                "name": "Conke",
                "price": 10
            },
            "4": {
                "id": 2,
                "name": "Cherry Coke",
                "price": 10
            },
            "5": {
                "id": 8,
                "name": "Pepis",
                "price": 10,
                empty: true,
            }
        },
        "snack": {
            "1": {
                "id": 13,
                "name": "A Snack",
                "price": 120,
                empty: true,
            },
            "2": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "3": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "4": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "5": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "6": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "7": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "8": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "9": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "10": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "11": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "12": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "13": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "14": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "15": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "16": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "17": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            },
            "18": {
                "id": 13,
                "name": "A Snack",
                "price": 120
            }
        }
    },
    "message": "Successfully retrieved machine contents for littledrink, bigdrink, snack"
};

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
        const Machines = Object.keys(DrinkData.machines).map((item, index) => {
            return (
                    <MachineCard
                        key={index}
                        name={item}
                        slots={DrinkData.machines[item]}
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
