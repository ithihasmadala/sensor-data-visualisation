import {SensorData} from '../api/sensorData'
import {SensorType} from '../types/sensors'

export const formatTimeString = (date: Date | null): string => {
    return date ? date.toLocaleTimeString() : 'N/A'
}

export const exportToCSV = (data: any[], sensor: SensorType) => {
    const headers = ['Timestamp', 'Value', 'Entry ID']
    const csvContent = [
        headers.join(','),
        ...data.map(item => `${item.timestamp.toISOString()},${item.value},${item.entryId}`)
    ].join('\n')

    downloadFile(csvContent, `${sensor}_data.csv`, 'text/csv')
}

export const exportToJSON = (data: any[], sensor: SensorType) => {
    const jsonContent = JSON.stringify(data, null, 2)
    downloadFile(jsonContent, `${sensor}_data.json`, 'application/json')
}

const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement('a')
    const file = new Blob([content], {type: contentType})
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
    URL.revokeObjectURL(a.href)
}

export const formatDate = (timestamp: Date): string => {
    return timestamp.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
}

export const formatValue = (value: number): string => {
    return value.toFixed(2)
}
