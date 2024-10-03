import React from 'react'
import {Col, Result, Button} from 'antd'
import {Line} from '@ant-design/charts'

type ChartData = {
    data: any[]
    xField: string
    yField: string
}
interface ChartProps {
    data: ChartData // Use the ChartData type for chartData
    sensor: string // Type for sensor
    index: string | number // Type for key (can be string or number)
}

export const Chart: React.FC<ChartProps> = ({data, sensor, index}) => {
    return data.data && data.data.length ? (
        <Col
            span={12}
            style={{
                flex: '1 1 calc(50% - 48px)',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '12px',
                margin: '24px'
            }}>
            <Line style={{width: '100%'}} {...data} />
        </Col>
    ) : (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}
