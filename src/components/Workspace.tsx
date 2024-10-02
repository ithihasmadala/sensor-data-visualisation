import { Line } from '@ant-design/charts'
import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'

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

    const props = {
        data,
        xField: 'year',
        yField: 'value'
    }

    return (
        <Row
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}
        >
            <Col
                style={{
                    padding: '16px',
                    margin: '16px',
                    flex: '1',
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                }}
            >
                <Line {...props} />
            </Col>
            <Col
                style={{
                    padding: '16px',
                    margin: '16px',
                    flex: '1',
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                }}
            >
                <Line {...props} />
            </Col>
        </Row>
    )
}
