import React from 'react'
import {Flex, Layout} from 'antd'
import {Navbar} from './components/Navbar'
import {Workspace} from './components/Workspace'
import {Footer} from './components/Footer'
import './App.css'

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '50px'
}

export const App: React.FC = () => (
    <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
            <Navbar />
            <Workspace />
            <Footer />
        </Layout>
    </Flex>
)
