import React, {useState, useEffect} from 'react'
import {Layout, ConfigProvider, theme} from 'antd'
import {Navbar} from './components/Navbar'
import {Workspace} from './components/Workspace'
import {Footer} from './components/Footer'
import {layoutStyle, contentStyle} from './styles/layout'
import './App.css'
import 'leaflet/dist/leaflet.css'

const {Content} = Layout

export const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode')
        return savedMode ? JSON.parse(savedMode) : false
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    const toggleDarkMode = (checked: boolean) => {
        setIsDarkMode(checked)
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <Layout style={layoutStyle}>
                <Navbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
                <Content style={contentStyle}>
                    <Workspace isDarkMode={isDarkMode} />
                </Content>
                <Footer isDarkMode={isDarkMode} />
            </Layout>
        </ConfigProvider>
    )
}
