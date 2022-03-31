import {useState} from 'react';

export default {
    title: 'Inputs'
}

export const InputText = () => {
    const [value, setValue] = useState<string>('')
    return (
        <div>
            <input value={value}
                   onChange={(e) => setValue(e.currentTarget.value)}
                   type="text"/>
        </div>
    )
}
export const InputCheckbox = () => {
    const [checked, setChecked] = useState<boolean>(false)
    return (
        <div>
            <input checked={checked}
                   onChange={(e) => setChecked(e.currentTarget.checked)}
                   type="checkbox"/>
        </div>
    )
}

export const Select = () => {
    const [checked, setChecked] = useState<boolean>(false)
    return (
        <div>
            <select value={'2'}>
                <option value="1">city1</option>
                <option value="2">city2</option>
                <option value="3">city3</option>
            </select>
        </div>
    )
}
export const CustomSelect = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const [selectMode, setSelectMode] = useState(true)
    const [select, setSelect] = useState('city1')

    const set = (o:any) => {
        setSelect(o)
        setSelectMode(!selectMode)
    }

    const options = ['city1', 'city2', 'city3']
    return (
        <div>
            <div style={{border: '1px solid black', padding: '5px', width: '50px'}}
                 onClick={() => setSelectMode(!selectMode)}
            >{select}</div>
            {selectMode
                ? <div style={{border: '1px solid black', display: 'inline-block', padding: '10px'}}>
                    {options.map(o => <Option option={o} set={() => set(o)}/>)}
                </div>
                : ''}
        </div>
    )
}

const Option = (props: any) => {
    const [hover, setHover] = useState(false)
    const hoverStyle = {
        backgroundColor: hover ? 'green' : ''
    }

    const select = () => {

    }

    return <div style={hoverStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={props.set}
    >
        {props.option}
    </div>
}