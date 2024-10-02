import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Chart from './Chart';

export const Workspace: React.FC<any> = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
    ]

    const data = {
        data,
        xField: 'year',
        yField: 'value'
    }

    const sensors = ['ph', 'turbity']

    return (
        <Row
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}
        >
            {sensors.map((sensor, index) => (
                <Chart data={data} sensor={sensor} key={index}/>
            ))}
        </Row>
    )
}
