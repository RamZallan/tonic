import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import TempChart from './TempChart';

export default ({ name, data }) => {
    return (
        <Card>
            <CardHeader>{name}</CardHeader>
            <CardBody>
                <TempChart data={data} />
            </CardBody>
        </Card>
    );
};
