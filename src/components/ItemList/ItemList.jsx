import React, {Component} from 'react';
import Item from './Item';
import {Form, FormGroup, Input, Table} from "reactstrap";

// "join" drink + items data to see if an item is in a machine
const DrinkData = [
        {
            id: "ld",
            name: "Little Drink",
            slots:
                [
                    {
                        slot_id: 1,
                        drink_id: 1,
                        item: "Coke",
                        price: 10,
                    },
                    {
                        slot_id: 2,
                        drink_id: 8,
                        item: "Diet Coke",
                        price: 10,
                    },
                    {
                        slot_id: 3,
                        drink_id: 7,
                        item: "Drink's Choice",
                        price: 5,
                    },
                    {
                        slot_id: 1,
                        drink_id: 9,
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
                        slot_id: 1,
                        drink_id: 4,
                        item: "Bawls",
                        price: 20,
                    },
                    {
                        slot_id: 2,
                        drink_id: 10,
                        item: "Jolt",
                        price: 30,
                    },
                    {
                        slot_id: 3,
                        drink_id: 100,
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
                        slot_id: 1,
                        drink_id: 5,
                        item: "Soylent",
                        price: 100,
                    },
                    {
                        slot_id: 2,
                        drink_id: 5,
                        item: "Soylent",
                        price: 100,
                        empty: true,
                    },
                    {
                        slot_id: 3,
                        item_id: 101,
                        item: "marcsiphone",
                        price: 1000,
                    },
                ]
        },
];

const ItemData = [
        {
           id: 1,
           name: "Coke",
           price: 10,
        },
        {
           id: 2,
           name: "Sprite",
           price: 10
        },
        {
           id: 3,
           name: "Wegman's Cola",
           price: 5
        },
        {
           id: 4,
           name: "Bawls",
           price: 20
        },
        {
           id: 5,
           name: "Soylent",
           price: 100
        },
        {
           id: 6,
           name: "Swiss Miss",
           price: 15
        },
        {
           id: 7,
           name: "Drink's Choice",
           price: 9
        },
        {
           id: 8,
           name: "Diet Coke",
           price: 10,
        },
        {
           id: 9,
           name: "Fanta's Choice",
           price: 9,
        },
        {
           id: 10,
           name: "Jolt",
           price: 30,
        },
];

class ItemList extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            filterStr: "",
        };
    }

    componentDidMount() {
        this.renderItemsList();
    }

    renderItemsList() {
        for (let machine of DrinkData) {
            for (let slot of machine.slots) {
                for(let item of ItemData) {
                  if (item.id === slot.drink_id) {
                        if (item['machines'] && !item['machines'].includes(machine.name)) {
                            item['machines'].push(machine.name);
                        } else {
                            item['machines'] = [machine.name];
                        }
                  } 
                };
            };
        };
    }

    render() {
        const items = ItemData
            .filter(item => (this.state.filterStr
                ? item.name.toLowerCase().includes(this.state.filterStr.toLowerCase())
                : true)
            )
            .sort((a, b) => (a.machines ? (b.machines ? (a.machines.length < b.machines.length): false) : true))
            .map((item, index) => {
                return (
                    <Item
                        key={index}
                        {...item}
                    />
                );
            });
        return (
            <div>
                <h1>Items</h1>
                <Form>
                    <FormGroup>
                        <Input onChange={e => this.setState({filterStr: e.target.value })} type="search" placeholder="Search"/>
                    </FormGroup>
                </Form>
                {items.length ?
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </Table>
                :
                    <div>No results matching "{this.state.filterStr}".</div>
                }
            </div>
        )
    }
}

export default ItemList;
