import React, {useState, useRef, useEffect} from 'react'
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet'
import {Card, Typography, Button, message, Space, Dropdown} from 'antd'
import {DownloadOutlined, CopyOutlined, CameraOutlined} from '@ant-design/icons'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import styled from 'styled-components'
import html2canvas from 'html2canvas'

const {Text, Title} = Typography

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

interface GpsMapProps {
    latitude: number | null
    longitude: number | null
    isDarkMode: boolean
}

const DEFAULT_LATITUDE = 15.392833 // 15°23'34.2"N
const DEFAULT_LONGITUDE = 73.880389 // 73°52'49.4"E

const StyledCard = styled(Card)<{$isDefault: boolean; $isDarkMode: boolean}>`
    border: ${props => (props.$isDefault ? '2px solid #ff4d4f' : 'none')};
    background-color: ${props => (props.$isDarkMode ? '#141414' : '#ffffff')};
    color: ${props => (props.$isDarkMode ? '#ffffff' : '#000000')};
`

const MetadataItem = styled(Text)<{$isDarkMode: boolean}>`
    display: block;
    margin-bottom: 8px;
    color: ${props => (props.$isDarkMode ? '#ffffff' : '#000000')};
`

const MapLoader: React.FC<{onLoad: () => void}> = ({onLoad}) => {
    const map = useMap()
    useMapEvents({
        load: () => {
            onLoad()
        },
        tileload: () => {
            onLoad()
        }
    })
    return null
}

export const GpsMap: React.FC<GpsMapProps> = ({latitude, longitude, isDarkMode}) => {
    const [messageApi, contextHolder] = message.useMessage()
    const mapRef = useRef<HTMLDivElement>(null)
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const validLatitude = latitude !== null && !isNaN(latitude) ? latitude : DEFAULT_LATITUDE
    const validLongitude = longitude !== null && !isNaN(longitude) ? longitude : DEFAULT_LONGITUDE

    const isDefault = latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)

    const metadata = {
        latitude: validLatitude,
        longitude: validLongitude,
        timestamp: new Date().toISOString(),
        isDefault: isDefault
    }

    const metadataString = `Latitude: ${validLatitude.toFixed(6)}, Longitude: ${validLongitude.toFixed(6)}, Timestamp: ${metadata.timestamp}`
    const googleMapsFormat = `${validLatitude},${validLongitude}`

    const downloadMetadata = (format: 'text' | 'json' | 'csv') => {
        let content: string
        let fileName: string
        let contentType: string

        switch (format) {
            case 'json':
                content = JSON.stringify(metadata, null, 2)
                fileName = 'gps_metadata.json'
                contentType = 'application/json'
                break
            case 'csv':
                content = `Latitude,Longitude,Timestamp,IsDefault\n${validLatitude},${validLongitude},${metadata.timestamp},${isDefault}`
                fileName = 'gps_metadata.csv'
                contentType = 'text/csv'
                break
            default:
                content = metadataString
                fileName = 'gps_metadata.txt'
                contentType = 'text/plain'
        }

        const element = document.createElement('a')
        const file = new Blob([content], {type: contentType})
        element.href = URL.createObjectURL(file)
        element.download = fileName
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const copyMetadata = () => {
        navigator.clipboard.writeText(googleMapsFormat).then(
            () => {
                messageApi.success('Coordinates copied to clipboard')
            },
            err => {
                messageApi.error('Failed to copy coordinates')
                console.error('Could not copy text: ', err)
            }
        )
    }

    const downloadMapImage = async () => {
        if (mapRef.current) {
            try {
                const canvas = await html2canvas(mapRef.current, {
                    useCORS: true,
                    allowTaint: true,
                    logging: true
                })
                const image = canvas.toDataURL('image/png')
                const link = document.createElement('a')
                link.href = image
                link.download = 'map_image.png'
                link.click()
            } catch (error) {
                console.error('Error generating map image:', error)
                messageApi.error('Failed to download map image')
            }
        } else {
            messageApi.error('Map container not found. Please try again.')
        }
    }

    const downloadItems = [
        {
            key: '1',
            label: 'Download as Text',
            onClick: () => downloadMetadata('text')
        },
        {
            key: '2',
            label: 'Download as JSON',
            onClick: () => downloadMetadata('json')
        },
        {
            key: '3',
            label: 'Download as CSV',
            onClick: () => downloadMetadata('csv')
        }
    ]

    return (
        <StyledCard
            title={<Title level={4} style={{color: isDarkMode ? '#ffffff' : '#000000'}}>GPS Location</Title>}
            extra={
                <Space>
                    <Dropdown menu={{items: downloadItems}} placement="bottomLeft" arrow>
                        <Button icon={<DownloadOutlined />}>Download Metadata</Button>
                    </Dropdown>
                    <Button icon={<CopyOutlined />} onClick={copyMetadata}>
                        Copy Coordinates
                    </Button>
                    <Button icon={<CameraOutlined />} onClick={downloadMapImage}>
                        Download Map
                    </Button>
                </Space>
            }
            $isDefault={isDefault}
            $isDarkMode={isDarkMode}
            style={{marginBottom: 16}}
        >
            {contextHolder}
            <div ref={mapRef}>
                <MapContainer
                    center={[validLatitude, validLongitude]}
                    zoom={13}
                    style={{height: '400px', width: '100%', marginBottom: 16}}
                >
                    <TileLayer
                        url={isDarkMode 
                            ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        }
                        attribution={isDarkMode
                            ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }
                    />
                    <Marker position={[validLatitude, validLongitude]}>
                        <Popup>
                            Latitude: {validLatitude.toFixed(6)}
                            <br />
                            Longitude: {validLongitude.toFixed(6)}
                            {isDefault && (
                                <>
                                    <br />
                                    <strong>Note:</strong> Location not available. Showing last known
                                    location.
                                </>
                            )}
                        </Popup>
                    </Marker>
                    <MapLoader onLoad={() => setIsMapLoaded(true)} />
                </MapContainer>
            </div>
            <MetadataItem $isDarkMode={isDarkMode}>{metadataString}</MetadataItem>
            {isDefault && (
                <MetadataItem $isDarkMode={isDarkMode} strong style={{color: '#ff4d4f'}}>
                    Note: Location not available. Showing last known location.
                </MetadataItem>
            )}
        </StyledCard>
    )
}