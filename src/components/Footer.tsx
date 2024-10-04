import React from 'react'
import {Space, Typography} from 'antd'
import {Footer as AntFooter} from 'antd/es/layout/layout'
import {GithubOutlined} from '@ant-design/icons'
import {footerStyle, textStyle} from '../styles/footer'
import styled from 'styled-components'

const {Text, Link} = Typography

const StyledLink = styled(Link)`
    .anticon {
        svg {
            path {
                fill: currentColor;
            }
        }
    }
`

interface FooterProps {
    isDarkMode: boolean
}

export const Footer: React.FC<FooterProps> = ({isDarkMode}) => (
    <AntFooter style={footerStyle(isDarkMode)}>
        <Space size="middle" align="center">
            <Text style={{color: 'inherit'}}>
                © {new Date().getFullYear()} - Freelance Project
            </Text>
            <Text type="secondary" style={textStyle(isDarkMode)}>
                |
            </Text>
            <Text style={{color: 'inherit'}}>v1.0.0</Text>
            <Text type="secondary" style={textStyle(isDarkMode)}>
                |
            </Text>
            <StyledLink
                href="https://github.com/ithihasmadala"
                target="_blank"
                style={{color: 'inherit'}}
            >
                <GithubOutlined /> Ithihas Madala
            </StyledLink>
            <Text type="secondary" style={textStyle(isDarkMode)}>
                |
            </Text>
            <StyledLink
                href="https://github.com/ritvikPuranik"
                target="_blank"
                style={{color: 'inherit'}}
            >
                <GithubOutlined /> Ritvik Puranik
            </StyledLink>
        </Space>
    </AntFooter>
)
