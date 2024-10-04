import React from 'react'
import {Row, Col, Spin, Typography} from 'antd'
import {Chart} from './Chart'
import {workspaceStyle, loadingContainerStyle, rowStyle} from '../styles/layout'
import {useSensorData} from '../hooks/useSensorData'
import {formatTimeString} from '../utils/CommonUtils'

const {Text} = Typography

interface WorkspaceProps {
    isDarkMode: boolean
}

export const Workspace: React.FC<WorkspaceProps> = ({isDarkMode}) => {
    const {fieldsMapping, sensorData, loading, lastUpdated} = useSensorData()

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
                            sensor={sensor}
                            index={index}
                            isDarkMode={isDarkMode}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
