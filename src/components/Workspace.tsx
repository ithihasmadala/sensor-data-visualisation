import React, {useEffect} from 'react'
import {Row, Col, Spin, Typography} from 'antd'
import {Chart} from './Chart'
import {GpsMap} from './GpsMap'
import {workspaceStyle, loadingContainerStyle, rowStyle} from '../styles/layout'
import {useSensorData} from '../hooks/useSensorData'
import {formatTimeString} from '../utils/CommonUtils'
import {SensorType} from '../types/sensors'

const {Text} = Typography

type ThresholdSettings = {
    [key in SensorType]?: [number, number]
} & {
    alertCount: number
}

interface WorkspaceProps {
    isDarkMode: boolean
    settings: ThresholdSettings
    onSensorsUpdate: (sensors: SensorType[]) => void
}

export const Workspace: React.FC<WorkspaceProps> = ({isDarkMode, settings, onSensorsUpdate}) => {
    const {fieldsMapping, sensorData, loading, lastUpdated, gpsData} = useSensorData()

    useEffect(() => {
        onSensorsUpdate(Object.values(fieldsMapping) as SensorType[])
    }, [fieldsMapping, onSensorsUpdate])

    if (loading) {
        return (
            <div style={loadingContainerStyle(isDarkMode)}>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div style={workspaceStyle(isDarkMode)}>
            <Row justify="space-between" align="middle" style={rowStyle}>
                <Col>
                    <Text strong>Last Updated: {formatTimeString(lastUpdated)}</Text>
                </Col>
                <Col>
                    <Text>Updates every 2 minutes. Refresh page for manual update.</Text>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {Object.entries(fieldsMapping).map(([field, sensor], index) => (
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} key={field}>
                        <Chart
                            data={sensorData[sensor] || []}
                            sensor={sensor as SensorType}
                            index={index}
                            isDarkMode={isDarkMode}
                            threshold={settings[sensor as SensorType] || [0, 100]}
                            alertCount={settings.alertCount}
                        />
                    </Col>
                ))}
            </Row>
            <Row style={{marginTop: '20px'}}>
                <Col span={24}>
                    <GpsMap
                        latitude={gpsData?.latitude ?? null}
                        longitude={gpsData?.longitude ?? null}
                        isDarkMode={isDarkMode}
                    />
                </Col>
            </Row>
        </div>
    )
}
