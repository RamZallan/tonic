import React, {Component} from 'react';
import {Col} from "reactstrap";
import { connect } from "react-redux";

import Toast from "./Toast";

class Toasts extends Component {
    render() {
        const toasts = []
        for (const machine of Object.keys(this.props.drops)) {
            for (const slot of this.props.drops[machine].slots) {
                if (!slot.dropStatus) continue;
                toasts.push(
                    <Toast
                        key={machine + slot.number}
                        machineName={this.props.drops[machine].display_name}
                        slot={slot}
                    />
                );
            }
        }
        return <Col xs="12" id="toasts">{toasts}</Col>;
    }
}

const mapStateToProps = state => ({
    drops: state.apis.drops,
});

export default connect(
    mapStateToProps
)(Toasts);
