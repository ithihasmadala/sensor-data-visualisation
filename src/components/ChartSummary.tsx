import React from 'react'
import { Tag, Card } from 'antd'
import { SensorData } from '../api/sensorData'
import { WarningIcon } from '../styles/chart'

interface ChartSummaryProps {
    latestReading: SensorData | null
    lastThresholdBreach: SensorData | null
    isBlinking: boolean
}

const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
};

const formatValue = (value: number) => {
    return typeof value === 'number' ? value.toFixed(2) : 'N/A'
}

export const ChartSummary: React.FC<ChartSummaryProps> = ({ latestReading, lastThresholdBreach, isBlinking }) => {
    if (!latestReading) return null

    return (
        <Card size="small" style={{ marginBottom: '16px' }}>
            {isBlinking && (
                <div style={{ marginBottom: '8px' }}>
                    <WarningIcon /> Threshold breached!
                </div>
            )}
            <div style={{ marginBottom: '8px' }}>
                Latest reading:{' '}
                <Tag color={isBlinking ? 'red' : 'green'}>
                    {formatValue(latestReading.value)}
                </Tag>
                at {formatDate(latestReading.timestamp)}
            </div>
            <div>
                Last threshold breach reading:{' '}
                <Tag color="red">
                    {lastThresholdBreach ? formatValue(lastThresholdBreach.value) : 'N/A'}
                </Tag>
                {lastThresholdBreach && (
                    <>
                        at {formatDate(lastThresholdBreach.timestamp)}
                    </>
                )}
            </div>
        </Card>
    )
}