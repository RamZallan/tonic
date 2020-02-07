import React, { Component } from 'react';
import Log from './Log';
import {
    Form,
    FormGroup,
    Input,
    Table,
    Label,
    Button,
    Collapse,
} from 'reactstrap';

const LogData = [
    {
        machine: 'Little Drink',
        uid: 'ram',
        item: "Drink's Choice",
        time: '1546300800',
    },
    {
        machine: 'Big Drink',
        uid: 'zach',
        item: 'Bawls',
        time: '1546333200',
    },
    {
        machine: 'Snack',
        uid: 'markarub',
        item: 'Soylent',
        time: '1550593277',
    },
    {
        machine: 'Big Drink',
        uid: 'jmf',
        item: 'Sweet Vermouth',
        time: '1550593277',
    },
    {
        machine: 'Little Drink',
        uid: 'jsultan',
        item: 'Canada Dry',
        time: '1550593277',
    },
    {
        machine: 'Little Drink',
        uid: 'squables',
        item: 'Mt. Dew',
        time: '1556668800',
    },
    {
        machine: 'Snack',
        uid: 'eero',
        item: 'Swiss Miss',
        time: '1588291200',
    },
];

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            machineFilters: ['Little Drink', 'Big Drink', 'Snack'],
            dateStart: new Date(1900, 0, 1),
            dateEnd: new Date(3000, 0, 1),
            curr: null,
            showFilters: false,
        };
    }

    unixToTimestamp(unixTime) {
        const d = new Date(unixTime * 1000);
        return d.toLocaleString();
    }

    updateFilters(machineName) {
        if (this.state.machineFilters.includes(machineName)) {
            // toggle off
            this.setState({
                machineFilters: this.state.machineFilters.filter(
                    machine => machine !== machineName
                ),
            });
        } else {
            this.setState(prevState => ({
                machineFilters: [...prevState.machineFilters, machineName],
            }));
        }
    }

    newDateObj(dateStr) {
        const pieces = dateStr.split('-');
        return new Date(
            parseInt(pieces[0], 10), // Y
            parseInt(pieces[1], 10) - 1, // M (0-indexed)
            parseInt(pieces[2], 10) // D
        );
    }

    toggleFilters() {
        this.setState(prevState => ({
            showFilters: !prevState.showFilters,
        }));
    }

    render() {
        const logs = LogData.filter(log => {
            let d = new Date(log.time * 1000);
            return (
                this.state.machineFilters.includes(log.machine) &&
                d > new Date(this.state.dateStart) &&
                d < new Date(this.state.dateEnd)
            );
        }).map((log, index) => {
            return (
                <Log
                    key={index}
                    {...log}
                    time={this.unixToTimestamp(log.time)}
                />
            );
        });
        return (
            <div>
                <h1>Logs</h1>
                <Button
                    className="collapse-filters"
                    size="sm"
                    color="info"
                    onClick={this.toggleFilters.bind(this)}
                >
                    Show filters
                </Button>
                <Collapse isOpen={this.state.showFilters}>
                    <Form className="log-filters">
                        <h4>Filter by machine</h4>
                        <FormGroup check inline>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    defaultChecked
                                    onClick={() =>
                                        this.updateFilters('Little Drink')
                                    }
                                />
                                {''}
                                Little Drink
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    defaultChecked
                                    onClick={() =>
                                        this.updateFilters('Big Drink')
                                    }
                                />
                                {''}
                                Big Drink
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    defaultChecked
                                    onClick={() => this.updateFilters('Snack')}
                                />
                                {''}
                                Snack
                            </Label>
                        </FormGroup>

                        <h4>Filter by date</h4>
                        <FormGroup inline>
                            <Label inline for="startDate">
                                Start
                            </Label>
                            <Input
                                inline
                                type="date"
                                id="startDate"
                                onChange={e =>
                                    this.setState({
                                        dateStart: this.newDateObj(
                                            e.target.value
                                        ),
                                    })
                                }
                            />
                        </FormGroup>
                        <FormGroup inline>
                            <Label inline for="endDate">
                                End
                            </Label>
                            <Input
                                inline
                                type="date"
                                id="endDate"
                                onChange={e =>
                                    this.setState({
                                        dateEnd: this.newDateObj(
                                            e.target.value
                                        ),
                                    })
                                }
                            />
                        </FormGroup>
                    </Form>
                </Collapse>
                {logs.length ? (
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Machine</th>
                                <th>Item</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>{logs}</tbody>
                    </Table>
                ) : (
                    <div>No results matching selcted filters.</div>
                )}
            </div>
        );
    }
}

export default UserList;
