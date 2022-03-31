import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {UncontrolledRating} from './Rating/UncontrolledRating';
import {ControlledRating} from './Rating/ControlledRating';
import {UncontrolledOnOff} from './OnOff/UncontrolledOnOff';
import {ControlledOnOff} from './OnOff/ControlledOnOff';


const reducerApp = (state: any, action: any) => {
    switch (action.type) {
        case 'SET-ON': {
            return {...state, on: action.on}
        }
        case 'SET-RATING': {
            return {...state, ratingValue: action.ratingValue}
        }
        default: {
            return state
        }
    }
}

export function App() {
    const [state, dispatch] = useReducer(reducerApp, {on: false, ratingValue: 0})

    const setRatingValue = useCallback(dispatch,[])

    return (
        <div className="App">
            <UncontrolledRating/>
            <ControlledRating value={state.ratingValue}
                              setRatingValue={setRatingValue}/>

            <UncontrolledOnOff/>
            <ControlledOnOff on={state.on} setOn={(on)=>dispatch({type: 'SET-ON', on: on})}/>
        </div>
    );
}

