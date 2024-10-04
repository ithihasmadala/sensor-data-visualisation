import styled, {keyframes} from 'styled-components'
import {Card, Space} from 'antd'
import {WarningOutlined} from '@ant-design/icons'

export const cardStyle = (isDarkMode: boolean) => ({
    background: isDarkMode ? '#141414' : '#fff',
    borderColor: isDarkMode ? '#434343' : '#f0f0f0'
})

export const blinkAnimation = keyframes`
  0% { border-color: transparent; }
  50% { border-color: red; }
  100% { border-color: transparent; }
`

export const BlinkingCard = styled(Card)<{$isBlinking: boolean}>`
    animation: ${props => (props.$isBlinking ? blinkAnimation : 'none')} 1s linear infinite;
    border-width: 2px;
    border-style: solid;
`

export const FixedHeightSpace = styled(Space)`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 16px;
`

export const WarningIcon = styled(WarningOutlined)`
    color: red;
`
