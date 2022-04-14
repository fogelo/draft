export const Input = ({
                          input,
                          label,
                          type,
                          meta: {touched, error, warning}
                      }: any) => {

    const errorStyle = {
        color: 'red'
    }
    return (
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched &&
                ((error && <div style={errorStyle}>{error}</div>))}
        </div>
    )
}