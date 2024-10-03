import React from 'react'
import {Space, Typography} from 'antd'
import {Footer as AntFooter} from 'antd/es/layout/layout'
import {GithubOutlined} from '@ant-design/icons'

const {Text, Link} = Typography

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#001529',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export const Footer: React.FC = () => (
    <AntFooter style={footerStyle}>
        <Space size="middle" align="center">
            <Text style={{color: 'inherit'}}>© {new Date().getFullYear()} - Freelance Project</Text>
            <Text type="secondary" style={{color: 'rgba(255, 255, 255, 0.45)'}}>|</Text>
            <Text style={{color: 'inherit'}}>v1.0.0</Text>
            <Text type="secondary" style={{color: 'rgba(255, 255, 255, 0.45)'}}>|</Text>
            <Link href="https://github.com/ithihasmadala" target="_blank" style={{color: 'inherit'}}>
                <GithubOutlined /> Ithihas Madala
            </Link>
            <Text type="secondary" style={{color: 'rgba(255, 255, 255, 0.45)'}}>|</Text>
            <Link href="https://github.com/ritvikPuranik" target="_blank" style={{color: 'inherit'}}>
                <GithubOutlined /> Ritvik Puranik
            </Link>
        </Space>
    </AntFooter>
)