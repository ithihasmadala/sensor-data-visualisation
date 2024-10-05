import React from 'react'
import {Modal, Typography, Space} from 'antd'

const {Title, Paragraph, Text} = Typography

interface AboutProps {
    isVisible: boolean
    onClose: () => void
}

export const About: React.FC<AboutProps> = ({isVisible, onClose}) => {
    return (
        <Modal
            title="About Sensor Data Viz"
            open={isVisible} // Changed from 'visible' to 'open'
            onOk={onClose}
            onCancel={onClose}
            footer={null}
        >
            <Space direction="vertical" size="middle">
                <Title level={4}>Welcome to Sensor Data Viz</Title>
                <Paragraph>
                    Sensor Data Viz is a web application designed to visualize data from various
                    sensors. It provides real-time charts and analytics for monitoring environmental
                    conditions.
                </Paragraph>
                <Title level={5}>Features:</Title>
                <ul>
                    <li>Real-time data visualization</li>
                    <li>Multiple sensor support</li>
                    <li>Interactive charts</li>
                    <li>Dark mode support</li>
                </ul>
                <Paragraph>
                    <Text strong>Version:</Text> 1.0.0
                </Paragraph>
                <Paragraph>
                    <Text strong>Developers:</Text>
                </Paragraph>
                <ul>
                    <li>Ithihas Madala</li>
                    <li>Ritvik Puranik</li>
                </ul>
                <Paragraph>For more information, please visit our GitHub repositories.</Paragraph>
            </Space>
        </Modal>
    )
}
