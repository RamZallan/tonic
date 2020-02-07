import React, { Component } from 'react';
import C3Chart from 'react-c3js';

class TempChart extends Component {
    render() {
        const d = {
            x: 'time',
            columns: [
                [
                    'Temperature',
                    ...this.props.data.map(entry => {
                        return entry.temp;
                    }),
                ],
                [
                    'time',
                    ...this.props.data.map(entry => {
                        return entry.time;
                    }),
                ],
            ],
        };
        return (
            <div>
                <C3Chart
                    axis={{
                        x: {
                            type: 'timeseries',
                            label: 'Time',
                            tick: {
                                format: '%b %d, %-I:%M %p',
                                culling: {
                                    max: 2,
                                },
                            },
                        },
                        y: {
                            label: 'Fahrenheit',
                        },
                    }}
                    data={d}
                />
            </div>
        );
    }
}

export default TempChart;
