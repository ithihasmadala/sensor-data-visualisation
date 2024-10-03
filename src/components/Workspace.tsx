import React, {useEffect, useState} from 'react'
import {Row, Button, Result} from 'antd' // Assuming you're using Ant Design
import {Chart} from './Chart'

export const Workspace: React.FC<any> = () => {
    const [fetchedData, setFetchedData] = useState<{[key: string]: any[]}>({})
    const [fieldsMapping, setFieldsMapping] = useState<{[key: string]: string}>({})

    /*
    fields mapping template - 
    {
        field1: 'pH',
        field2: 'tds_value',
        field3: 'do_value',
        field4: 'turbidity_value',
    }

    fetchedData template - 
    {
        ph: [{}, {}...],
        tds_value: [{}, {}...],
        others
    }
    */

    // Fetch the fields mapping
    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await fetch(
                    'https://api.thingspeak.com/channels/2617252/fields/1.json?api_key=S7MH5E4KBNVDFCHY'
                )
                const result = await response.json()

                // Store the fields mapping
                const newFieldsMapping: {[key: string]: any} = {}
                Object.keys(result.channel).forEach(item => {
                    if (item.includes('field')) newFieldsMapping[item] = result.channel[item]
                })

                setFieldsMapping(newFieldsMapping)
                console.log('fields mapping>', newFieldsMapping)
            } catch (error) {
                console.error('Error fetching fields mapping: ', error)
            }
        }

        fetchFields()
    }, []) // Empty dependency array ensures this runs only on mount

    // Fetch the data once fieldsMapping is populated
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all(
                    Object.keys(fieldsMapping).map(async (item, index) => {
                        const response = await fetch(
                            `https://api.thingspeak.com/channels/2617252/fields/${index + 1}.json?api_key=S7MH5E4KBNVDFCHY`
                        )
                        const result = await response.json()

                        const mappedData = result.feeds.map((feed: any) => ({
                            timestamp: new Date(feed.created_at),
                            value: feed[`field${index + 1}`], // Ensure correct field access here
                            entryId: feed.entry_id
                        }))

                        const newKey = fieldsMapping[item]
                        setFetchedData(prevData => ({
                            ...prevData,
                            [newKey]: mappedData
                        }))
                    })
                )
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }

        if (Object.keys(fieldsMapping).length > 0) {
            fetchData()
        }
    }, [fieldsMapping]) // Only run this effect when fieldsMapping changes

    return fieldsMapping && Object.keys(fieldsMapping).length > 0 ? (
        <Row
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
            {Object.keys(fieldsMapping).map((field, index) => (
                <Chart
                    data={{
                        data: fetchedData[fieldsMapping[field]],
                        xField: 'timestamp',
                        yField: 'value'
                    }}
                    sensor={fieldsMapping[field]}
                    index={index}
                />
            ))}
        </Row>
    ) : (
        <Result
            status="404"
            title="404"
            subTitle="Data does not exist"
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}
