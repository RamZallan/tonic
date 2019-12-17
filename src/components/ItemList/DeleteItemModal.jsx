import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Alert,
} from 'reactstrap';

import { deleteItem, fetchItems } from '../../actions';

class UpdateItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal,
            alertObj: null,
        };

        this.deleteItem = this.deleteItem.bind(this);
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

    deleteItem() {
        this.props.doDeleteItem(
            this.props.oidc.user.access_token,
            this.props.item.id
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modal: nextProps.modal,
        });
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.deleteItemError !== this.props.deleteItemError ||
            prevProps.deleteItem !== this.props.deleteItem
        ) {
            if (this.props.deleteItemError) {
                this.handleAlert({
                    type: 'error',
                    message: this.props.deleteItemError,
                });
            } else if (this.props.deleteItem.message) {
                this.handleAlert({
                    type: 'success',
                    message: this.props.deleteItem.message,
                });
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
            switch (this.state.alertObj.type) {
                case 'error':
                    alertContent = (
                        <Alert color="danger">
                            <b>Error: </b>
                            {this.state.alertObj.message}
                        </Alert>
                    );
                    break;
                case 'success':
                default:
                    alertContent = (
                        <Alert color="success">
                            <b>Success: </b>
                            {this.state.alertObj.message}
                        </Alert>
                    );
                    break;
            }
        }
        return (
            <Modal size="sm" isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                    Are you sure you want to delete "
                    <b>{this.props.item.name}</b>"?
                </ModalHeader>
                {alertContent && <ModalBody>{alertContent}</ModalBody>}
                <ModalFooter>
                    <Button color="danger" onClick={this.deleteItem}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    oidc: state.oidc,
    deleteItem: state.apis.deleteItem,
    deleteItemError: (state.apis.deleteItem || {}).error,
});

const mapDispatchToProps = dispatch => ({
    doDeleteItem: (access_token, id) => deleteItem(dispatch, access_token, id),
    getItems: access_token => fetchItems(dispatch, access_token),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateItemModal);
