import {useState, useEffect, useCallback, useRef} from 'react'
import {fetchFieldsMapping, fetchSensorDataForField, fetchGpsData, GpsData} from '../api/sensorData'

const UPDATE_INTERVAL = 2 * 60 * 1000 // 2 minutes in milliseconds

export const useSensorData = () => {
    const [fieldsMapping, setFieldsMapping] = useState<{[key: string]: string}>({})
    const [sensorData, setSensorData] = useState<{[key: string]: any[]}>({})
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
    const [gpsData, setGpsData] = useState<GpsData | null>(null)
    const initialFetchRef = useRef(false)

    const fetchData = useCallback(async () => {
        try {
            const [mapping, gpsData] = await Promise.all([fetchFieldsMapping(), fetchGpsData()])
            setFieldsMapping(mapping)
            setGpsData(gpsData)

            const dataPromises = Object.entries(mapping).map(([_, sensor], index) =>
                fetchSensorDataForField(sensor, index + 1)
            )
            const results = await Promise.all(dataPromises)

            const newSensorData: {[key: string]: any[]} = {}
            Object.keys(mapping).forEach((field, index) => {
                newSensorData[mapping[field]] = results[index]
            })

            setSensorData(newSensorData)
            setLastUpdated(new Date())
        } catch (error) {
            console.error('Error fetching sensor data:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!initialFetchRef.current) {
            initialFetchRef.current = true
            fetchData()
        }

        const intervalId = setInterval(fetchData, UPDATE_INTERVAL)
        return () => clearInterval(intervalId)
    }, [fetchData])

    return {fieldsMapping, sensorData, loading, lastUpdated, gpsData}
}
