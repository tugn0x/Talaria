const subStringer = (text, length) => {
    if(text.length > length && typeof text === 'string'){
        return `${text.substr(0, length)}...`
    } else {
        return text
    }
}

export default subStringer