import React from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, FormGroup, Input, Label } from 'reactstrap';

import { updateItem, fetchItems } from '../../actions';


class UpdateItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: this.props.modal,
          newName: this.props.item.name,
          newPrice: this.props.item.price,
          alertObj: null,
        };

        this.update = this.update.bind(this);
        this.toggle = this.toggle.bind(this);
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

    update() {
        this.props.doUpdateItem(this.props.oidc.user.access_token, this.props.item.id, this.state.newName, this.state.newPrice);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
          modal: nextProps.modal,
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

    componentDidUpdate(prevProps) {
        if (prevProps.updateItemError !== this.props.updateItemError ||
                prevProps.updateItem !== this.props.updateItem) {
            if (this.props.updateItemError) {
                this.handleAlert({
                    type: 'error',
                    message: this.props.updateItemError,
                })
            } else if (this.props.updateItem.message) {
                this.handleAlert({
                    type: 'success',
                    message: this.props.updateItem.message,
                })
            }
        }
    }

    toggle() {
        this.clearAlert();
        this.props.toggle();
        this.props.getItems(this.props.oidc.user.access_token);
    }

    render() {
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
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Editing "<b>{this.props.item.name}</b>"</ModalHeader>
                    <ModalBody>
                        { alertContent }
                        <FormGroup>
                            <Label for={'name' + this.props.item.name.replace(/\s+/g, '')}>Name</Label>
                            <Input
                                id={'name' + this.props.item.name.replace(/\s+/g, '')}
                                value={this.state.newName}
                                onChange={e => this.handleNameChange(e)}
                                placeholder={'Item name'}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for={'price' + this.props.item.name.replace(/\s+/g, '')}>Price</Label>
                            <Input
                                id={'price' + this.props.item.name.replace(/\s+/g, '')}
                                value={this.state.newPrice}
                                onChange={e => this.handlePriceChange(e)}
                                placeholder={'Item price'}
                            />
                        </FormGroup>
                        </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.update}>Confirm</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


const mapStateToProps = state => ({
    oidc: state.oidc,
    updateItem: state.apis.updateItem,
    updateItemError: (state.apis.updateItem || {}).error,
});

const mapDispatchToProps = dispatch => ({
    doUpdateItem: (access_token, id, name, price) => updateItem(dispatch, access_token, id, name, price),
    getItems: access_token => fetchItems(dispatch, access_token),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateItemModal);
