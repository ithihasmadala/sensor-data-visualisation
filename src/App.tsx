import React, {useState, useEffect} from 'react'
import {Layout, ConfigProvider, theme} from 'antd'
import {Navbar} from './components/Navbar'
import {Workspace} from './components/Workspace'
import {Footer} from './components/Footer'
import {layoutStyle, contentStyle} from './styles/layout'
import './App.css'
import 'leaflet/dist/leaflet.css'
import {SensorType, ThresholdSettings, DEFAULT_SETTINGS} from './types/sensors'

const {Content} = Layout

export const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode')
        return savedMode ? JSON.parse(savedMode) : false
    })

    const [settings, setSettings] = useState<ThresholdSettings>(() => {
        const savedSettings = localStorage.getItem('sensorSettings')
        return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS
    })

    const [sensors, setSensors] = useState<SensorType[]>([])

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    useEffect(() => {
        localStorage.setItem('sensorSettings', JSON.stringify(settings))
    }, [settings])

    const toggleDarkMode = (checked: boolean) => {
        setIsDarkMode(checked)
    }

    const handleSaveSettings = (newSettings: ThresholdSettings) => {
        setSettings(newSettings)
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <Layout style={layoutStyle}>
                <Navbar
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={toggleDarkMode}
                    onSaveSettings={handleSaveSettings}
                    sensors={sensors}
                    initialSettings={settings}
                />
                <Content style={contentStyle}>
                    <Workspace
                        isDarkMode={isDarkMode}
                        settings={settings}
                        onSensorsUpdate={setSensors}
                    />
                </Content>
                <Footer isDarkMode={isDarkMode} />
            </Layout>
        </ConfigProvider>
    )
}
