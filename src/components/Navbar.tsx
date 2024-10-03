import React from 'react'

export const Navbar: React.FC<any> = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '1rem'
                }}>
                <h1 style={{textAlign: 'left', margin: '0', color: '#333'}}>Sensor Data Viz</h1>
            </div>
        </>
    )
}
