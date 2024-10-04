import React, {useState} from 'react'
import {Layout, Typography, Button} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'
import {Toggle} from './Toggle/Toggle'
import {About} from './About'
import {
    headerStyle,
    logoStyle,
    titleStyle,
    buttonStyle,
    navItemsContainerStyle
} from '../styles/navbar'
import styled from 'styled-components'

const {Header} = Layout
const {Title} = Typography

const StyledButton = styled(Button)`
    .ant-btn-icon {
        .anticon {
            svg {
                path {
                    fill: transparent;
                }
            }
        }
    }
`

const Logo = styled.img`
    height: 32px;
    margin-right: 10px;
`

interface NavbarProps {
    isDarkMode: boolean
    onToggleDarkMode: (checked: boolean) => void
}

export const Navbar: React.FC<NavbarProps> = ({isDarkMode, onToggleDarkMode}) => {
    const [isAboutVisible, setIsAboutVisible] = useState(false)

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
                    >
                        About
                    </StyledButton>
                    <Toggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
                </div>
            </Header>
            <About isVisible={isAboutVisible} onClose={() => setIsAboutVisible(false)} />
        </>
    )
}
