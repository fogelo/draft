import React, {useState} from 'react';
import './App.css';
import {UncontrolledRating} from './Rating/UncontrolledRating';
import {ControlledRating} from './Rating/ControlledRating';


export function App() {
    const [ratingValue, setRatingValue] = useState(0)
    return (
        <div className="App">
            <UncontrolledRating/>
            <ControlledRating value={ratingValue} setRatingValue={setRatingValue}/>
        </div>
    );
}

