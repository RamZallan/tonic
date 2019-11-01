import React, {Component} from 'react';
import {Toast as BootstrapToast, ToastHeader, ToastBody} from "reactstrap";

import InfoSpinner from "../InfoSpinner";

class Toast extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: true,
        };

        this.hide = this.hide.bind(this);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.dropResult && this.props.dropResult.isLoading) {
            // make sure new toast cycles are shown when new request is sent
            this.setState({
                show: true,
            });
        }
    }

    hide() {
        this.setState({
            show: false,
        });
    }

    render() {
        if (this.props.slot.dropStatus.isLoading) {
            return (
                <BootstrapToast isOpen={this.state.show}>
                    <ToastHeader icon={<InfoSpinner />} toggle={this.hide}>
                        {this.props.machineName} - {this.props.slot.item.name}
                    </ToastHeader>
                    <ToastBody>
                        Dropping {this.props.slot.item.name}
                    </ToastBody>
                </BootstrapToast>
            );
        } else if (this.props.slot.dropStatus.error) {
            setTimeout(() => {
                this.setState({ show: false });
            }, 5000);
            return (
                <BootstrapToast isOpen={this.state.show}>
                    <ToastHeader icon="danger" toggle={this.hide}>
                        {this.props.machineName} - {this.props.slot.item.name}
                    </ToastHeader>
                    <ToastBody>
                        {this.props.slot.dropStatus.error}
                    </ToastBody>
                </BootstrapToast>
            );
        } else if (this.props.slot.dropStatus.message) {
            setTimeout(() => {
                this.setState({ show: false });
            }, 5000);
            return (
                <BootstrapToast isOpen={this.state.show}>
                    <ToastHeader icon="success" toggle={this.hide}>
                        {this.props.machineName} - {this.props.slot.item.name}
                    </ToastHeader>
                    <ToastBody>
                        {this.props.slot.dropStatus.message}
                    </ToastBody>
                </BootstrapToast>
            );
        }
    }
}


export default Toast;
