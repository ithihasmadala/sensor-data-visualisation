import React from 'react'
import {Card, Tag} from 'antd'
import {CheckCircleOutlined} from '@ant-design/icons'
import {SensorData} from '../../api/sensorData'
import {formatValue, formatDate} from '../../utils/CommonUtils'
import {WarningIcon} from '../../icons/WarningIcon'

interface ChartSummaryProps {
    latestReading: SensorData | null
    lastThresholdBreach: SensorData | null
    isBlinking: boolean
}

export const ChartSummary: React.FC<ChartSummaryProps> = ({
    latestReading,
    lastThresholdBreach,
    isBlinking
}) => {
    if (!latestReading) return null

    return (
        <Card size="small" style={{marginBottom: '16px', height: '120px', overflow: 'auto'}}>
            <div style={{marginBottom: '8px'}}>
                {isBlinking ? (
                    <>
                        <WarningIcon /> Threshold breached!
                    </>
                ) : (
                    <>
                        <CheckCircleOutlined style={{color: 'green', marginRight: '8px'}} /> In
                        Threshold
                    </>
                )}
            </div>
            <div style={{marginBottom: '8px'}}>
                Latest reading:{' '}
                <Tag color={isBlinking ? 'red' : 'green'}>{formatValue(latestReading.value)}</Tag>
                at {formatDate(latestReading.timestamp)}
            </div>
            <div>
                Last threshold breach reading:{' '}
                <Tag color="red">
                    {lastThresholdBreach ? formatValue(lastThresholdBreach.value) : 'N/A'}
                </Tag>
                {lastThresholdBreach && <>at {formatDate(lastThresholdBreach.timestamp)}</>}
            </div>
        </Card>
    )
}
