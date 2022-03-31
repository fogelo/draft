import {ControlledOnOff} from '../OnOff/ControlledOnOff';
import {action} from '@storybook/addon-actions';
import {useState} from 'react';

export default {
    title: 'Rating',
    component: ControlledOnOff
}

const OnCallback = action('on pressed')
const OffCallback = action('off pressed')

export const OnExample = () => {
    return <ControlledOnOff on={true} setOn={OnCallback}/>
}

export const OffExample = () => {
    return <ControlledOnOff on={false} setOn={OffCallback}/>
}


export const BaseExample = () => {
    const [on, setOn] = useState(false)
    return <ControlledOnOff on={on} setOn={setOn}/>
}