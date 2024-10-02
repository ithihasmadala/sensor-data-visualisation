import React from "react";
import { Col, Result, Button } from "antd";
import { Line } from '@ant-design/charts'

type ChartData = {
    data: any[];
    xField: string;
    yField: string;
};
interface ChartProps {
    data: ChartData; // Use the ChartData type for chartData
    sensor: string; // Type for sensor
    index: string | number; // Type for key (can be string or number)
}


const Chart: React.FC<ChartProps> = ({ data, sensor, index }) => {
    console.log("entered chart component>", data);
    return (
        data.data && data.data.length ? (
        <Col
            style={{
                padding: '16px',
                margin: '16px',
                flex: '1',
                border: '1px solid #ccc',
                borderRadius: '12px'
            }}
        >
            <Line {...data} />
        </Col>
        ) : (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        )
    )
}
export default Chart;