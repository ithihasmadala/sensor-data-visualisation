import React from 'react'
import {Flex, Layout} from 'antd'
import {Navbar} from './components/Navbar'
import {Workspace} from './components/Workspace'
import './App.css'
import {Footer} from 'antd/es/layout/layout'

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%'
}

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '60px'
}

export const App: React.FC = () => (
    <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
            <Navbar />
            <Workspace />
            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    </Flex>
)
