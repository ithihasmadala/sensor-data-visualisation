import {SensorData} from '../api/sensorData'

export const formatTimeString = (date: Date | null): string => {
    return date ? date.toLocaleTimeString() : 'N/A'
}

export const exportToCSV = (data: SensorData[], sensor: string) => {
    const headers = ['Timestamp', 'Value', 'Entry ID']
    const csvContent = [
        headers.join(','),
        ...data.map(item => `${item.timestamp.toISOString()},${item.value},${item.entryId}`)
    ].join('\n')

    downloadFile(csvContent, `${sensor}_data.csv`, 'text/csv')
}

export const exportToJSON = (data: SensorData[], sensor: string) => {
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
