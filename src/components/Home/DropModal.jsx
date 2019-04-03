import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: this.props.modal,
        };

        this.drop = this.drop.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    drop() {
        // TODO: call API to drop
        this.props.toggle();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ modal: nextProps.modal });  
    }

    render() {
        return (
            <Modal size="sm" isOpen={this.state.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Drop a <b>{this.props.drink}</b>?</ModalHeader>
                <ModalFooter>
                    <Button color="success" onClick={this.drop}>Confirm</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalExample;