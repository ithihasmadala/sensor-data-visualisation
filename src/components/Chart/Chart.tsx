import React, {useState, useEffect, useMemo} from 'react'
import {Empty, Button, Modal, Radio, Tooltip, Tag} from 'antd'
import {DownloadOutlined, InfoCircleOutlined} from '@ant-design/icons'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer
} from 'recharts'
import {SensorData} from '../../api/sensorData'
import {cardStyle, BlinkingCard} from '../../styles/chart'
import {exportToCSV, exportToJSON} from '../../utils/CommonUtils'
import {SensorType} from '../../types/sensors'
import {ChartSummary} from './ChartSummary'

interface ChartProps {
    data: SensorData[]
    sensor: SensorType
    index: number
    isDarkMode: boolean
    threshold: [number, number]
    alertCount: number
}

export const Chart: React.FC<ChartProps> = ({
    data,
    sensor,
    isDarkMode,
    threshold,
    alertCount,
    index
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [exportType, setExportType] = useState<'csv' | 'json'>('csv')
    const [isBlinking, setIsBlinking] = useState(false)

    const latestReading = useMemo(() => data[data.length - 1] || null, [data])

    const lastThresholdBreach = useMemo(() => {
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].value < threshold[0] || data[i].value > threshold[1]) {
                return data[i]
            }
        }
        return null
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

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem)
        return date.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'})
    }

    const CustomTooltip = ({active, payload, label}: any) => {
        if (active && payload && payload.length) {
            const date = new Date(label)
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: isDarkMode ? '#333' : '#fff',
                        padding: '5px',
                        border: '1px solid #ccc',
                        fontSize: '12px'
                    }}
                >
                    <p style={{margin: '0'}}>{`Time: ${date.toLocaleString()}`}</p>
                    <p style={{margin: '0'}}>{`${sensor} Value: ${payload[0].value}`}</p>
                    <p style={{margin: '0'}}>{`Entry ID: ${payload[0].payload.entryId}`}</p>
                </div>
            )
        }
        return null
    }

    if (data.length === 0) {
        return (
            <BlinkingCard title={sensor} style={cardStyle(isDarkMode)} $isBlinking={false}>
                <Empty description="No data available" />
            </BlinkingCard>
        )
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
            <ResponsiveContainer width="100%" height={400 - 120 - 32}>
                <LineChart data={data} margin={{top: 5, right: 10, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        style={{fontSize: '10px'}}
                        tick={{fill: isDarkMode ? '#fff' : '#000'}}
                        tickCount={5}
                        type="category"
                    />
                    <YAxis 
                        style={{fontSize: '10px'}} 
                        tick={{fill: isDarkMode ? '#fff' : '#000'}}
                        width={30}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{r: 1}}
                        activeDot={{r: 4}}
                        animationDuration={300}
                    />
                </LineChart>
            </ResponsiveContainer>
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
