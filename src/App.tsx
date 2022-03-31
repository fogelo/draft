import React, {useState} from 'react';
import './App.css';
import {UncontrolledRating} from './Rating/UncontrolledRating';
import {ControlledRating} from './Rating/ControlledRating';
import {UncontrolledOnOff} from './OnOff/UncontrolledOnOff';
import {ControlledOnOff} from './OnOff/ControlledOnOff';


export function App() {
    const [ratingValue, setRatingValue] = useState(0)
    const [on, setOn] = useState(false)
    return (
        <div className="App">
            <UncontrolledRating/>
            <ControlledRating value={ratingValue} setRatingValue={setRatingValue}/>

            <UncontrolledOnOff/>
            <ControlledOnOff on={on} setOn={setOn}/>
        </div>
    );
}

