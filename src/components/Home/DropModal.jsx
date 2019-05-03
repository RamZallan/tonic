import React from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

import { dropDrink } from '../../actions';


class DropModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: this.props.modal,
        };

        this.drop = this.drop.bind(this);
    }

    drop() {
        this.props.dropDrink(this.props.oidc.user.access_token, this.props.machine, this.props.slot);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
          modal: nextProps.modal,
      });
    }

    render() {
        return (
            <Modal size="sm" isOpen={this.state.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Drop a <b>{this.props.drink}</b>?</ModalHeader>
                {this.props.dropError && (
                    <ModalBody>
                      <Alert color="danger">
                        <b>Error: </b>
                        {this.props.dropError}
                      </Alert>
                    </ModalBody>
                )}
                <ModalFooter>
                    <Button color="success" onClick={this.drop}>Confirm</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
  oidc: state.oidc,
});

const mapDispatchToProps = dispatch => ({
  dropDrink: (access_token, machine, slot) => dropDrink(dispatch, access_token, machine, slot),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropModal);
