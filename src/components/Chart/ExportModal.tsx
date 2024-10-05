import React from 'react'
import {Modal, Radio} from 'antd'

interface ExportModalProps {
    isVisible: boolean
    exportType: 'csv' | 'json'
    onExport: () => void
    onCancel: () => void
    onExportTypeChange: (type: 'csv' | 'json') => void
}

export const ExportModal: React.FC<ExportModalProps> = ({
    isVisible,
    exportType,
    onExport,
    onCancel,
    onExportTypeChange
}) => {
    return (
        <Modal title="Export Data" open={isVisible} onOk={onExport} onCancel={onCancel}>
            <Radio.Group onChange={e => onExportTypeChange(e.target.value)} value={exportType}>
                <Radio value="csv">CSV</Radio>
                <Radio value="json">JSON</Radio>
            </Radio.Group>
        </Modal>
    )
}
