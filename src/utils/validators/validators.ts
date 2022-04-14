export const requiredField = (value: any) => {
    return (
        value ? undefined : 'required field'
    )
}

export const maxLength = (length: number) => {
    return (value: any) => {
        return value.length < length ? undefined : `max length ${length}`
    }
}