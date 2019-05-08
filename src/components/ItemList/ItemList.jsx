import React, {Component} from 'react';
import { connect } from "react-redux";
import {Form, FormGroup, Input, Table, Button, Row, Col, Card, CardBody, CardHeader, Alert} from "reactstrap";

import Item from './Item';
import { fetchItems, clearTransactionResponses, addItem } from '../../actions';
import InfoSpinner from "../InfoSpinner";


class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterStr: "",
            newName: null,
            newPrice: null,
            alertObj: null,
        };

        this.handleAddItem = this.handleAddItem.bind(this);
        this.wrapper = this.wrapper.bind(this);
    }

    clearAlert() {
        this.setState({
            alertObj: null,
        });
    }

    handleAlert(alertObj) {
        this.setState({
            alertObj: alertObj,
        });
    }

    handleNameChange(e) {
        this.clearAlert();
        if (!e.target.value || !e.target.value.length) {
            this.setState({
                newName: null
            });
        } else {
            this.setState({
                newName: e.target.value,
            });
        }
    }

    handlePriceChange(e) {
        this.clearAlert();
        let intVal = parseInt(e.target.value, 10);
        if (intVal && !isNaN(intVal)) {
            this.setState({
                newPrice: intVal
            });
        } else {
            this.setState({
                newPrice: null
            });
        }
    }

    handleAddItem() {
        if (!this.state.newName || !this.state.newName) {
            this.handleAlert({
                type: 'error',
                message: 'Enter a name and price for the new item.',
            });
        } else {
            this.props.addItem(this.props.oidc.user.access_token, this.state.newName, this.state.newPrice);
        }
    }

    componentDidMount() {
        if (this.props.oidc.user && !this.props.items) {
            this.props.getItems(this.props.oidc.user.access_token);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemAddError !== this.props.itemAddError ||
                prevProps.itemAdd !== this.props.itemAdd) {
            if (this.props.itemAddError) {
                this.handleAlert({
                    type: 'error',
                    message: this.props.itemAddError,
                })
            } else if (this.props.itemAdd.message) {
                this.handleAlert({
                    type: 'success',
                    message: this.props.itemAdd.message,
                })
                this.props.getItems(this.props.oidc.user.access_token);
            }
        }
    }

    renderItemsList() {
        for (let machine of this.props.stock) {
            for (let slot of machine.slots) {
                for(let item of this.props.items) {
                    let drink = slot.item;
                    if (item.id === drink.id) {
                        if (item['machines'] && !item['machines'].includes(machine.display_name)) {
                            item['machines'].push(machine.display_name);
                        } else {
                            item['machines'] = [machine.display_name];
                        }
                    }
                };
            };
        };
    }

    wrapper() {
        this.props.clearTransactionResponses();
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
                        item={item}
                        clearTransactionResponses={this.wrapper}
                    />
                );
            });
        let alertContent = '';
        if (this.state.alertObj) {
            switch(this.state.alertObj.type) {
                case 'error':
                    alertContent = (<Alert color="danger"><b>Error: </b>{this.state.alertObj.message}</Alert>);
                    break;
                case 'success':
                default:
                    alertContent = (<Alert color="success"><b>Success: </b>{this.state.alertObj.message}</Alert>);
                    break;
            }
        }
        return (
            <Row>
                <Col xs="12">
                    <h1>Items</h1>
                </Col>

                <Col xs="12">
                    <Card>
                        <CardHeader>
                            Add new item
                        </CardHeader>
                        <CardBody>
                            {alertContent}
                            <Form>
                                <Row form>
                                    <Col xs="12" md="5">
                                        <FormGroup>
                                            <Input onChange={e => this.handleNameChange(e)} type="text" placeholder="Name" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="5">
                                        <FormGroup>
                                            <Input onChange={e => this.handlePriceChange(e)} type="text" placeholder="Price" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="2" id="newItem">
                                        <FormGroup>
                                            <Button color="primary" onClick={this.handleAddItem}>Add item</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="12">
                    <Card>
                        <CardHeader>
                            Edit items
                        </CardHeader>
                        <CardBody>
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
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    oidc: state.oidc,
    stock: state.apis.stock.machines,
    items: state.apis.items.items,
    itemAdd: state.apis.addItem,
    itemAddError: (state.apis.addItem || {}).error,
});

const mapDispatchToProps = dispatch => ({
    getItems: access_token => fetchItems(dispatch, access_token),
    clearTransactionResponses: () => clearTransactionResponses(dispatch),
    addItem: (access_token, name, price) => addItem(dispatch, access_token, name, price)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList);
