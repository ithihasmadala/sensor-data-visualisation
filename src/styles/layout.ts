import {CSSProperties} from 'react'

export const layoutStyle: CSSProperties = {
    minHeight: '100vh'
}

export const contentStyle: CSSProperties = {
    padding: '0 0 70px 0'
}

export const workspaceStyle = (isDarkMode: boolean): CSSProperties => ({
    padding: '16px',
    backgroundColor: isDarkMode ? '#141414' : '#f5f5f5',
    minHeight: 'calc(100vh - 64px - 70px)'
})

export const loadingContainerStyle = (isDarkMode: boolean): CSSProperties => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: isDarkMode ? '#141414' : '#f5f5f5'
})

export const rowStyle: CSSProperties = {
    marginBottom: '16px'
}
