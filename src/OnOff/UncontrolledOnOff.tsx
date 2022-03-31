import {useState} from 'react';

export const UncontrolledOnOff = () => {
    const [on, setOn] = useState(false)

    const styleOn = {
        backgroundColor: 'green'
    }
    const styleOff = {
        backgroundColor: 'red'
    }

    const styleIndicate = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: on ? 'green' : 'red',
        display: 'inline-block'
    }
    return (
        <div style={{display: 'flex'}}>
            <button style={on ? styleOn : {}} onClick={() => setOn(true)}>on</button>
            <button style={!on ? styleOff : {}} onClick={() => setOn(false)}>off</button>
            <div style={styleIndicate}></div>
        </div>
    )
}