interface FieldsMapping {
    [key: string]: string
}

export interface SensorData {
    timestamp: Date
    value: number
    entryId: string
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
    field: string,
    fieldNumber: number
): Promise<SensorData[]> => {
    try {
        const response = await fetch(
            `https://api.thingspeak.com/channels/2617252/fields/${fieldNumber}.json?api_key=S7MH5E4KBNVDFCHY`
        )
        const result = await response.json()

        return result.feeds.map((feed: any) => ({
            timestamp: new Date(feed.created_at),
            value: feed[`field${fieldNumber}`],
            entryId: feed.entry_id
        }))
    } catch (error) {
        console.error(`Error fetching data for ${field}:`, error)
        throw error
    }
}
