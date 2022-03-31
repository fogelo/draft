import React from 'react';

type ControlledRatingPT = {
    value: number
    setRatingValue: (value: number) => void
}

export const ControlledRating = React.memo((props: ControlledRatingPT) => {
    console.log('Rating')
    return (
        <div>
            <Star bold={0 < props.value} setValue={() => props.setRatingValue(1)}/>
            <Star bold={1 < props.value} setValue={() => props.setRatingValue(2)}/>
            <Star bold={2 < props.value} setValue={() => props.setRatingValue(3)}/>
            <Star bold={3 < props.value} setValue={() => props.setRatingValue(4)}/>
            <Star bold={4 < props.value} setValue={() => props.setRatingValue(5)}/>
        </div>
    )
})

type StarPt = {
    bold: boolean
    setValue: () => void
}

const Star = (props: StarPt) => {
    return (
        <span onClick={props.setValue}>
            {props.bold ? <b>star </b> : 'star '}
        </span>
    )
}