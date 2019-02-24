import React, {Component} from 'react';
import {ListGroupItem, Badge, ButtonGroup, Button} from "reactstrap";

class Slot extends Component {
    render() {
        return (
            
            <ListGroupItem className="drink-item" tag="a" href="#" disabled={this.props.slot.empty}>
                    {this.props.slot.item}

                <span class="pull-right">
                    <Badge pill color="info">{this.props.slot.price} credits</Badge>&nbsp;
                    <ButtonGroup size="sm" className="pull-right">
                        <Button disabled={this.props.slot.empty} color="primary">Drop</Button>
                        {this.props.isDrinkAdmin && <Button color="info">Edit</Button>}
                    </ButtonGroup>
                </span>
            </ListGroupItem>
        )
    }
}

export {Slot};
