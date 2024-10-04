export enum SensorType {
    pH = 'pH',
    TDS = 'tds_value',
    DO = 'do_value',
    Turbidity = 'turbidity_value'
}

export const sensorRanges: {
    [key in SensorType]: {min: number; max: number; defaultMin: number; defaultMax: number}
} = {
    [SensorType.pH]: {min: 0, max: 14, defaultMin: 6.5, defaultMax: 8.5},
    [SensorType.TDS]: {min: 0, max: 1000, defaultMin: 300, defaultMax: 600}, // Total Dissolved Solids (ppm)
    [SensorType.DO]: {min: 0, max: 20, defaultMin: 6, defaultMax: 10}, // Dissolved Oxygen (mg/L)
    [SensorType.Turbidity]: {min: 0, max: 1000, defaultMin: 200, defaultMax: 500} // Turbidity (NTU)
}

export type ThresholdSettings = {
    [key in SensorType]?: [number, number]
} & {
    alertCount: number
}

export const DEFAULT_SETTINGS: ThresholdSettings = {
    [SensorType.pH]: [sensorRanges[SensorType.pH].defaultMin, sensorRanges[SensorType.pH].defaultMax],
    [SensorType.TDS]: [sensorRanges[SensorType.TDS].defaultMin, sensorRanges[SensorType.TDS].defaultMax],
    [SensorType.DO]: [sensorRanges[SensorType.DO].defaultMin, sensorRanges[SensorType.DO].defaultMax],
    [SensorType.Turbidity]: [sensorRanges[SensorType.Turbidity].defaultMin, sensorRanges[SensorType.Turbidity].defaultMax],
    alertCount: 5
}
