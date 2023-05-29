import React, { useEffect, useRef, useState } from 'react';
import StackedGraph, {StackedBarGraph} from "./stackedGraph";
const StackedBarChart = () => {

    const allKeys = ['Google', 'Meta', 'Microsoft', 'Amazon', 'Salesforce', 'Paypal', 'Yahoo', 'Zoom', 'Doordash', 'Carvana', 'Cisco', 'Twitter', 'Better.com', 'Peloton', 'Gopuff', 'Snap', 'SeaGate', 'Katerra', 'Zillow', 'Instacart']
    const colors = {
        'Google': '#f08080',
        'Meta': '#bcc499',
        'Microsoft': '#133337',
        'Amazon': '#f7cac9',
        'Salesforce': '#5accd0',
        'Paypal': '#eea990',
        'Yahoo': '#66545e',
        'Zoom': '#d7e7d8',
        'Doordash': '#92a8d1',
        'Carvana': '#ff4040',
        'Cisco': '#facade',
        'Twitter': '#bada55',
        'Better.com': '#9c7c4f',
        'Peloton': '#6C3483',
        'Gopuff': '#B7950B',
        'Snap': '#707B7C',
        'SeaGate': '#3498DB',
        'Katerra': '#784212',
        'Zillow': '#212F3C',
        'Instacart': '#E59866'
    }

    const [database, setDatabase] = useState();
    const [keys, setKeys] = useState(allKeys)


    useEffect(() => {
        fetch('http://localhost:8080/api/companyData/')
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                throw res
            })
            .then(res => {
                console.log(res)
                setDatabase(res)
                return res
            })
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            <StackedGraph datasets={database} colors={colors} keys={keys} />
            <div className="fields" style={{ display: "flex", "flex-wrap": "wrap"}}>
                {allKeys.map((key) => (
                    <div key={key} className="field" style={{ display: "flex"}}>
                        <input
                            id={key}
                            type="checkbox"
                            checked={keys.includes(key)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setKeys(Array.from(new Set([...keys, key])));
                                } else {
                                    setKeys(keys.filter((_key) => _key !== key));
                                }
                            }}
                        />
                        <label htmlFor={key} style={{ color: colors[key] }}>
                            {key}
                        </label>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default StackedBarChart;