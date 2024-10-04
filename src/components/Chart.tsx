import React, {useState} from 'react'
import {Card, Empty, Button, Modal, Radio} from 'antd'
import {DownloadOutlined} from '@ant-design/icons'
import {Line} from '@ant-design/charts'
import {SensorData} from '../api/sensorData'
import {cardStyle, axisLabelStyle} from '../styles/chart'
import {exportToCSV, exportToJSON} from '../utils/CommonUtils'

interface ChartProps {
    data: SensorData[]
    sensor: string
    index: number
    isDarkMode: boolean
}

export const Chart: React.FC<ChartProps> = ({data, sensor, isDarkMode}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [exportType, setExportType] = useState<'csv' | 'json'>('csv')

    const showModal = () => setIsModalVisible(true)
    const handleCancel = () => setIsModalVisible(false)

    const handleExport = () => {
        if (exportType === 'csv') {
            exportToCSV(data, sensor)
        } else {
            exportToJSON(data, sensor)
        }
        setIsModalVisible(false)
    }

    if (data.length === 0) {
        return (
            <Card title={sensor} style={cardStyle(isDarkMode)}>
                <Empty description="No data available" />
            </Card>
        )
    }

    const config = {
        data,
        xField: 'timestamp',
        yField: 'value',
        height: 300,
        xAxis: {
            type: 'time',
            label: {
                formatter: (v: string) => new Date(v).toLocaleDateString(),
                style: axisLabelStyle(isDarkMode)
            }
        },
        yAxis: {
            title: {
                text: sensor,
                style: axisLabelStyle(isDarkMode)
            },
            label: {
                style: axisLabelStyle(isDarkMode)
            }
        },
        tooltip: {
            showMarkers: true,
            formatter: (datum: SensorData) => ({
                name: new Date(datum.timestamp).toLocaleString(),
                value: datum.value,
                title: `${datum.value} ${sensor}`
            })
        },
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2
            }
        },
        lineStyle: {
            lineWidth: 3
        },
        slider: {
            start: 0,
            end: 1,
            trendCfg: {
                isArea: true
            }
        },
        responsive: true,
        theme: isDarkMode ? 'dark' : 'light'
    }

    return (
        <Card
            title={sensor}
            style={cardStyle(isDarkMode)}
            extra={
                <Button icon={<DownloadOutlined />} onClick={showModal}>
                    Download
                </Button>
            }
        >
            <Line {...config} />
            <Modal
                title="Export Data"
                open={isModalVisible} // Changed from 'visible' to 'open'
                onOk={handleExport}
                onCancel={handleCancel}
            >
                <Radio.Group onChange={e => setExportType(e.target.value)} value={exportType}>
                    <Radio value="csv">CSV</Radio>
                    <Radio value="json">JSON</Radio>
                </Radio.Group>
            </Modal>
        </Card>
    )
}
