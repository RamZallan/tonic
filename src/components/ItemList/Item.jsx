import React from 'react';
import {ButtonGroup, Button, Badge} from "reactstrap";


function getMachineName(abbrev) {
    switch(abbrev) {
        case 'bigdrink':
            return 'Big Drink';
        case 'littledrink':
            return 'Little Drink';
        case 'snack':
            return 'Snack';
        default:
            return 'Unknown Machine'
    }
}

export default ({id, name, price, machines}) => {
    return (
                <tr>
                    <td>
                        {name}
                        {machines && machines.map((machine, index) => {
                            switch(machine) {
                                case "bigdrink":
                                    return <Badge key={index} id="machine-label" color="info" pill>{getMachineName(machine)}</Badge>
                                case "snack":
                                    return <Badge key={index} id="machine-label" color="warning" pill>{getMachineName(machine)}</Badge>
                                default:
                                case "littledrink":
                                    return <Badge key={index} id="machine-label" color="success" pill>{getMachineName(machine)}</Badge>
                            }
                        })}
                    </td>
                    <td>
                        {price}
                    </td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button color="info">Edit</Button>
                            <Button color="danger">Delete</Button>
                        </ButtonGroup>
                    </td>
                    
                </tr>
    );
};

