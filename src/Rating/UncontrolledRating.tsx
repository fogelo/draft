import React, {useState} from 'react';

export const UncontrolledRating = (props: any) => {
    const [value, setValue] = useState(0)
    return (
        <div>
            <Star bold={0 < value} setValue={() => setValue(1)}/>
            <Star bold={1 < value} setValue={() => setValue(2)}/>
            <Star bold={2 < value} setValue={() => setValue(3)}/>
            <Star bold={3 < value} setValue={() => setValue(4)}/>
            <Star bold={4 < value} setValue={() => setValue(5)}/>
        </div>
    )
}

const Star = (props: any) => {
    return (
        <span onClick={props.setValue}>
            {props.bold ? <b>star </b> : 'star '}
        </span>
    )
}