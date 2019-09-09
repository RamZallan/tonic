import React from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, FormGroup, Input, Label } from 'reactstrap';

import { changeSlotActive, fetchItems, fetchStock } from '../../actions';


class EditSlotModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: this.props.modal,
          newDrink: this.props.drink.item.id,
          newActive: this.props.drink.active,
          alertObj: null,
        };

        this.changeActive = this.changeActive.bind(this);
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

    handleDrinkChange(e) {
        this.setState({
            newDrink: e.target.value,
        });
    }

    handleEnableToggle(e) {
        this.setState(prevState => ({
            newActive: !prevState.newActive,
        }));
    }

    changeActive() {
        this.props.doChangeSlotActive(this.props.oidc.user.access_token, this.props.machine.name, this.props.slot, this.state.newActive, this.state.newDrink);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
          modal: nextProps.modal,
      });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.changeSlotActiveError !== this.props.changeSlotActiveError ||
                prevProps.changeSlotActive !== this.props.changeSlotActive) {
            if (this.props.changeSlotActiveError) {
                this.handleAlert({
                    type: 'error',
                    message: this.props.changeSlotActiveError,
                })
            } else if (this.props.changeSlotActive.message) {
                this.handleAlert({
                    type: 'success',
                    message: this.props.changeSlotActive.message,
                })
                this.props.getStock(this.props.oidc.user.access_token);
            }
        }
    }

    componentDidMount() {
        if (!this.props.items) {
            this.props.getItems(this.props.oidc.user.access_token);
        }
    }

    toggle() {
        this.clearAlert();
        this.props.toggle();
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
        let itemOptions;
        if (this.props.items) {
            itemOptions = this.props.items
                .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
                .map(item => (<option value={item.id} key={item.id}>{item.name}</option>));
        }
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Editing <b>{this.props.machine.display_name} Slot {this.props.slot}</b></ModalHeader>
                    <ModalBody>
                        { alertContent }
                        <FormGroup>
                            <Label>Item</Label>
                            <Input type="select" placeholder={'Item name'} value={this.state.newDrink} onChange={e => this.handleDrinkChange(e)}>
                                {itemOptions || <option disabled>No items</option>}
                            </Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input checked={this.state.newActive || false} onChange={e => this.handleEnableToggle(e)} type="checkbox" />{' '}
                                Active
                            </Label>
                        </FormGroup>
                        </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.changeActive}>Confirm</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


const mapStateToProps = state => ({
    oidc: state.oidc,
    items: state.apis.items.items,
    changeSlotActive: state.apis.changeSlotActive,
    changeSlotActiveError: (state.apis.changeSlotActive || {}).error,
});

const mapDispatchToProps = dispatch => ({
    doChangeSlotActive: (access_token, machine, number, active, item_id) => changeSlotActive(dispatch, access_token, machine, number, active, item_id),
    getItems: access_token => fetchItems(dispatch, access_token),
    getStock: access_token => fetchStock(dispatch, access_token),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSlotModal);
