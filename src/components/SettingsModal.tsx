import React, {useEffect} from 'react'
import {Modal, Form, Slider, InputNumber, Row, Col, Space, Button, Typography, Divider} from 'antd'
import {SensorType, sensorRanges, ThresholdSettings, DEFAULT_SETTINGS} from '../types/sensors'
import styled from 'styled-components'

const {Text, Title, Paragraph} = Typography

const StyledModal = styled(Modal)`
    .ant-modal-content {
        padding: 24px;
    }

    .ant-modal-header {
        margin-bottom: 16px;
    }

    .ant-form-item {
        margin-bottom: 24px;
    }

    @media (max-width: 768px) {
        .ant-modal-content {
            padding: 16px;
        }

        .ant-modal-header {
            margin-bottom: 8px;
        }

        .ant-form-item {
            margin-bottom: 16px;
        }
    }
`

const SensorTitle = styled(Title)`
    margin-bottom: 8px !important;
    font-size: 16px !important;

    @media (max-width: 768px) {
        font-size: 14px !important;
    }
`

const StyledInputNumber = styled(InputNumber)`
    width: 70px;

    @media (max-width: 768px) {
        width: 60px;
    }
`

interface SettingsModalProps {
    isVisible: boolean
    onClose: () => void
    sensors: SensorType[]
    onSave: (settings: ThresholdSettings) => void
    initialSettings: ThresholdSettings
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isVisible,
    onClose,
    sensors,
    onSave,
    initialSettings
}) => {
    const [form] = Form.useForm<ThresholdSettings>()

    useEffect(() => {
        const formValues: ThresholdSettings = {...initialSettings}
        sensors.forEach(sensor => {
            if (!formValues[sensor]) {
                formValues[sensor] = [
                    sensorRanges[sensor].defaultMin,
                    sensorRanges[sensor].defaultMax
                ]
            }
        })
        if (!formValues.alertCount) {
            formValues.alertCount = 5
        }
        form.setFieldsValue(formValues)
    }, [form, initialSettings, sensors])

    const handleValuesChange = (_: any, allValues: ThresholdSettings) => {
        onSave(allValues)
    }

    const handleResetToDefault = () => {
        form.setFieldsValue(DEFAULT_SETTINGS)
        onSave(DEFAULT_SETTINGS)
    }

    return (
        <StyledModal
            title={<Title level={4}>Sensor Settings</Title>}
            open={isVisible}
            onCancel={onClose}
            width="90%"
            style={{ maxWidth: '600px' }}
            footer={[
                <Button key="reset" onClick={handleResetToDefault}>
                    Reset to Default
                </Button>
            ]}
        >
            <Paragraph style={{marginBottom: 16}}>
                Adjust the threshold ranges for each sensor and set the number of consecutive
                out-of-bounds values to trigger an alert.
            </Paragraph>
            <Divider style={{margin: '16px 0'}} />
            <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
                {sensors.map(sensor => {
                    const range = sensorRanges[sensor]
                    return (
                        <Form.Item key={sensor}>
                            <SensorTitle level={5}>{sensor} Threshold Range</SensorTitle>
                            <Row gutter={[8, 8]} align="middle">
                                <Col xs={24} sm={16}>
                                    <Form.Item name={sensor} noStyle>
                                        <Slider
                                            range
                                            min={range.min}
                                            max={range.max}
                                            step={(range.max - range.min) / 100}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Space size="small">
                                        <Form.Item name={[sensor, 0]} noStyle>
                                            <StyledInputNumber
                                                min={range.min}
                                                max={range.max}
                                                step={(range.max - range.min) / 100}
                                            />
                                        </Form.Item>
                                        <Text>-</Text>
                                        <Form.Item name={[sensor, 1]} noStyle>
                                            <StyledInputNumber
                                                min={range.min}
                                                max={range.max}
                                                step={(range.max - range.min) / 100}
                                            />
                                        </Form.Item>
                                    </Space>
                                </Col>
                            </Row>
                        </Form.Item>
                    )
                })}
                <Form.Item>
                    <Space align="baseline" wrap>
                        <Text>Alert after</Text>
                        <Form.Item name="alertCount" noStyle>
                            <StyledInputNumber min={1} max={20} />
                        </Form.Item>
                        <Text>consecutive out-of-bounds values</Text>
                    </Space>
                </Form.Item>
            </Form>
        </StyledModal>
    )
}
