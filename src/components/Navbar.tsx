import React, {useState} from 'react'
import {Layout, Typography, Button} from 'antd'
import {InfoCircleOutlined, SettingOutlined} from '@ant-design/icons'
import {Toggle} from './Toggle/Toggle'
import {About} from './About'
import {SettingsModal} from './SettingsModal'
import {
    headerStyle,
    titleStyle,
    buttonStyle,
    navItemsContainerStyle
} from '../styles/navbar'
import styled from 'styled-components'
import {SensorType} from '../types/sensors'

const {Header} = Layout
const {Title} = Typography

const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    padding: 0;
    margin-right: 16px;

    .anticon {
        font-size: 20px;
    }
`

const Logo = styled.img`
    height: 32px;
    margin-right: 16px;
`

type ThresholdSettings = {
    [key in SensorType]?: [number, number]
} & {
    alertCount: number
}

interface NavbarProps {
    isDarkMode: boolean
    onToggleDarkMode: (checked: boolean) => void
    onSaveSettings: (settings: ThresholdSettings) => void
    sensors: SensorType[]
    initialSettings: ThresholdSettings
}

export const Navbar: React.FC<NavbarProps> = ({
    isDarkMode,
    onToggleDarkMode,
    onSaveSettings,
    sensors,
    initialSettings
}) => {
    const [isAboutVisible, setIsAboutVisible] = useState(false)
    const [isSettingsVisible, setIsSettingsVisible] = useState(false)

    return (
        <>
            <Header style={headerStyle(isDarkMode)}>
                <div style={navItemsContainerStyle}>
                    <Logo src="/logo.svg" alt="Sensor Data Viz Logo" />
                    <Title level={3} style={titleStyle}>
                        Sensor Data Viz
                    </Title>
                </div>
                <div style={navItemsContainerStyle}>
                    <StyledButton
                        type="text"
                        icon={<InfoCircleOutlined />}
                        onClick={() => setIsAboutVisible(true)}
                        style={buttonStyle}
                        aria-label="About"
                    />
                    <StyledButton
                        type="text"
                        icon={<SettingOutlined />}
                        onClick={() => setIsSettingsVisible(true)}
                        style={buttonStyle}
                        aria-label="Settings"
                    />
                    <Toggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
                </div>
            </Header>
            <About isVisible={isAboutVisible} onClose={() => setIsAboutVisible(false)} />
            <SettingsModal
                isVisible={isSettingsVisible}
                onClose={() => setIsSettingsVisible(false)}
                sensors={sensors}
                onSave={onSaveSettings}
                initialSettings={initialSettings}
            />
        </>
    )
}
