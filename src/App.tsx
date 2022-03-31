import React, {useEffect, useState} from 'react';
import './App.css';


export function App() {
    return (
        <div className="App">
            <Clock/>
        </div>
    );
}

const standartValue = (value: any) => {
    return value < 10 ? '0' + value : value
}

const Clock = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [])
    return (
        <div>
            {standartValue(date.getHours())}:
            {standartValue(date.getMinutes())}:
            {standartValue(date.getSeconds())}
        </div>
    )
}