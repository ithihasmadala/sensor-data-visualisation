import React from "react";
import { Col } from "antd";
import { Line } from '@ant-design/charts'

type data = {
    xField: string,
    yField: string
}
const Chart = (props={}) =>{
    return(
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
    )
}
export default Chart;