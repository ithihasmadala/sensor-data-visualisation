import {CSSProperties} from 'react'

export const cardStyle = (isDarkMode: boolean): CSSProperties => ({
    backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000'
})

export const spinnerContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px'
}

export const axisLabelStyle = (isDarkMode: boolean): CSSProperties => ({
    fill: isDarkMode ? '#ffffff' : '#000000'
})
