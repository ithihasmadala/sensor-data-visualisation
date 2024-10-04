import {CSSProperties} from 'react'

export const layoutStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
}

export const contentStyle: CSSProperties = {
    flex: 1,
    overflow: 'auto',
    paddingTop: '64px', // Height of the Navbar
    paddingBottom: '70px' // Height of the Footer
}

export const workspaceStyle = (isDarkMode: boolean): CSSProperties => ({
    padding: '16px',
    backgroundColor: isDarkMode ? '#141414' : '#f5f5f5',
    minHeight: '100%'
})

export const loadingContainerStyle = (isDarkMode: boolean): CSSProperties => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: isDarkMode ? '#141414' : '#f5f5f5'
})

export const rowStyle: CSSProperties = {
    marginBottom: '16px'
}
