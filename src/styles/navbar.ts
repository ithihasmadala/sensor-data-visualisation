import {CSSProperties} from 'react'

export const headerStyle = (isDarkMode: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: isDarkMode ? '#141414' : '#001529',
    padding: '0 20px'
})

export const logoStyle: CSSProperties = {
    fontSize: '24px',
    color: '#fff',
    marginRight: '10px'
}

export const titleStyle: CSSProperties = {
    margin: 0,
    color: '#fff'
}

export const buttonStyle: CSSProperties = {
    color: '#fff',
    marginRight: '10px'
}

export const navItemsContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center'
}
