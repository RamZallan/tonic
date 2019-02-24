import React from 'react';
import {ButtonGroup, Button, Badge} from "reactstrap";

export default ({id, name, price, machines}) => {
    return (
                <tr>
                    <td>
                        {name}
                        {machines && machines.map(machine => {
                            switch(machine) {
                                case "Big Drink":
                                    return <Badge id="machine-label" color="info" pill>{machine}</Badge> 
                                case "Snack":
                                    return <Badge id="machine-label" color="warning" pill>{machine}</Badge>
                                default:
                                case "Little Drink":
                                    return <Badge id="machine-label" color="success" pill>{machine}</Badge> 
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

