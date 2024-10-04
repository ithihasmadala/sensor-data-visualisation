import {CSSProperties} from 'react'

export const footerStyle = (isDarkMode: boolean): CSSProperties => ({
    textAlign: 'center',
    color: isDarkMode ? '#ffffff' : '#000000',
    backgroundColor: isDarkMode ? '#141414' : '#f0f2f5',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export const textStyle = (isDarkMode: boolean): CSSProperties => ({
    color: isDarkMode ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)'
})
