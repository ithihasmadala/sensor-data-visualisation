type FieldsMapping = {
    [key: string]: string
}

export type SensorData = {
    timestamp: Date
    value: number
    entryId: string
}

export interface GpsData {
    latitude: number
    longitude: number
    timestamp: Date
}

export const fetchFieldsMapping = async (): Promise<FieldsMapping> => {
    try {
        const response = await fetch(
            'https://api.thingspeak.com/channels/2617252/fields/1.json?api_key=S7MH5E4KBNVDFCHY'
        )
        const result = await response.json()

        const newFieldsMapping: FieldsMapping = {}
        Object.keys(result.channel).forEach(item => {
            if (item.includes('field')) newFieldsMapping[item] = result.channel[item]
        })

        return newFieldsMapping
    } catch (error) {
        console.error('Error fetching fields mapping: ', error)
        throw error
    }
}

export const fetchSensorDataForField = async (
    sensorName: string,
    fieldNumber: number
): Promise<SensorData[]> => {
    try {
        const response = await fetch(
            `https://api.thingspeak.com/channels/2617252/fields/${fieldNumber}.json?api_key=S7MH5E4KBNVDFCHY`
        )
        const result = await response.json()

        return result.feeds.map((feed: any) => ({
            timestamp: new Date(feed.created_at),
            value: Number(feed[`field${fieldNumber}`]),
            sensorName,
            entryId: feed.entry_id
        }))
    } catch (error) {
        console.error(`Error fetching data for ${sensorName}:`, error)
        throw error
    }
}

export const fetchGpsData = async (): Promise<GpsData | null> => {
    try {
        const response = await fetch(
            'https://api.thingspeak.com/channels/2617252/feeds/last.json?api_key=S7MH5E4KBNVDFCHY'
        )
        const result = await response.json()

        const latitude = parseFloat(result.field7)
        const longitude = parseFloat(result.field8)

        if (isNaN(latitude) || isNaN(longitude)) {
            console.warn('Invalid GPS data received:', result)
            return null
        }

        return {
            latitude,
            longitude,
            timestamp: new Date(result.created_at)
        }
    } catch (error) {
        console.error('Error fetching GPS data:', error)
        return null
    }
}
