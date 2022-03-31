import React from 'react';

type ControlledOnOffPT = {
    on: boolean
    setOn: (on: boolean) => void
}
export const ControlledOnOff = React.memo((props: ControlledOnOffPT) => {
    console.log('OnOff')
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
        backgroundColor: props.on ? 'green' : 'red',
        display: 'inline-block'
    }
    return (
        <div style={{display: 'flex'}}>
            <button style={props.on ? styleOn : {}} onClick={() => props.setOn(true)}>on</button>
            <button style={!props.on ? styleOff : {}} onClick={() => props.setOn(false)}>off</button>
            <div style={styleIndicate}></div>
        </div>
    )
})

