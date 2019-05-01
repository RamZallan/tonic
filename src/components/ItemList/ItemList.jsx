import React, {Component} from 'react';
import { connect } from "react-redux";
import {Form, FormGroup, Input, Table} from "reactstrap";

import Item from './Item';
import { fetchItems } from '../../actions';
import InfoSpinner from "../InfoSpinner";


class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterStr: "",
        };
    }

    componentDidMount() {
        if (this.props.oidc.user && !this.props.items) {
            this.props.getItems(this.props.oidc.user.access_token);
        }
    }

    renderItemsList() {
        for (let machine of Object.keys(this.props.stock)) {
            for (let slot of Object.keys(this.props.stock[machine])) {
                for(let item of this.props.items) {
                    let drink = this.props.stock[machine][slot];
                    if (item.id === drink.id) {
                        if (item['machines'] && !item['machines'].includes(machine)) {
                            item['machines'].push(machine);
                        } else {
                            item['machines'] = [machine];
                        }
                  } 
                };
            };
        };
    }

    render() {
        if (!this.props.items) {
            return (<InfoSpinner>Loading items</InfoSpinner>);
        } else if (!this.props.items.length) {
            return (<h2>No items found</h2>);
        }
        this.renderItemsList();
        const items = this.props.items
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

const mapStateToProps = state => ({
    oidc: state.oidc,
    stock: state.apis.stock.machines,
    items: state.apis.items.items,
});

const mapDispatchToProps = dispatch => ({
    getItems: access_token => fetchItems(dispatch, access_token)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList);
