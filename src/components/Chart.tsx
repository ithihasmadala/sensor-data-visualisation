import React, {useState, useEffect, useMemo} from 'react'
import {Empty, Button, Modal, Radio, Tooltip, Tag} from 'antd'
import {DownloadOutlined, InfoCircleOutlined} from '@ant-design/icons'
import {Line} from '@ant-design/charts'
import {SensorData} from '../api/sensorData'
import {cardStyle, BlinkingCard, FixedHeightSpace, WarningIcon} from '../styles/chart'
import {exportToCSV, exportToJSON} from '../utils/CommonUtils'
import {SensorType} from '../types/sensors'
import {ChartSummary} from './ChartSummary'

interface ChartProps {
    data: SensorData[]
    sensor: SensorType
    index: number
    isDarkMode: boolean
    threshold: [number, number]
    alertCount: number
}

export const Chart: React.FC<ChartProps> = ({data, sensor, isDarkMode, threshold, alertCount, index}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [exportType, setExportType] = useState<'csv' | 'json'>('csv')
    const [isBlinking, setIsBlinking] = useState(false)

    const latestReading = useMemo(() => data[data.length - 1] || null, [data])

    const lastThresholdBreach = useMemo(() => {
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].value < threshold[0] || data[i].value > threshold[1]) {
                return data[i];
            }
        }
        return null;
    }, [data, threshold])

    useEffect(() => {
        const recentValues = data.slice(-alertCount)
        const outOfThreshold = recentValues.some(
            (item: SensorData) => item.value < threshold[0] || item.value > threshold[1]
        )
        setIsBlinking(outOfThreshold)
    }, [data, threshold, alertCount])

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
            <BlinkingCard title={sensor} style={cardStyle(isDarkMode)} $isBlinking={false}>
                <Empty description="No data available" />
            </BlinkingCard>
        )
    }

    const config = {
        data,
        xField: 'timestamp',
        yField: 'value',
        height: 300,
        xAxis: {
            type: 'time',
            tickCount: 5,
            label: {
                formatter: (text: string) => {
                    const date = new Date(text);
                    return date.toLocaleTimeString('en-US', { hour12: false });
                },
            },
        },
        interaction: {
            tooltip: {
                marker: false
            }
        },
        point: {
            size: 2,
            shape: 'circle',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 1
            }
        },
        style: {
            lineWidth: 3
        },
        smooth: true,
        animation: false,
        responsive: true,
        theme: isDarkMode ? 'dark' : 'light'
    }

    return (
        <BlinkingCard
            title={
                <span>
                    {sensor}{' '}
                    <Tooltip title="Hover over data points for detailed information">
                        <InfoCircleOutlined style={{fontSize: '14px'}} />
                    </Tooltip>
                </span>
            }
            style={cardStyle(isDarkMode)}
            extra={<Button icon={<DownloadOutlined />} onClick={showModal}></Button>}
            $isBlinking={isBlinking}
        >
            <ChartSummary
                latestReading={latestReading}
                lastThresholdBreach={lastThresholdBreach}
                isBlinking={isBlinking}
            />
            <Line {...config} />
            <Modal
                title="Export Data"
                open={isModalVisible}
                onOk={handleExport}
                onCancel={handleCancel}
            >
                <Radio.Group onChange={e => setExportType(e.target.value)} value={exportType}>
                    <Radio value="csv">CSV</Radio>
                    <Radio value="json">JSON</Radio>
                </Radio.Group>
            </Modal>
        </BlinkingCard>
    )
}
