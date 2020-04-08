import React,{useEffect, useState} from 'react'
import {CustomInput, Row} from 'reactstrap'

const ListCheckBox = (props) => {
    console.log('ListCheckBox', props)
    const {data, type, handleChange, selectedData} = props
    
    const [formData, setFormData] = useState(selectedData)

    const handleFormData = (e) => {
        if(e.target.checked){
           handleChange([...formData, e.target.name])
        }else{
           handleChange(formData.filter(name => name !== e.target.name))
        } 
    }
    
    useEffect(() => {
       setFormData(selectedData)
    }, [selectedData])

    return (
        <>
           <div className="d-flex flex-wrap">
                {formData && data.map(name => 
                    type === 'checkbox' &&
                    <CustomInput
                        key={name}
                        className="col-sm-4"
                        id={name}
                        type={type}
                        name={name}
                        label={name}
                        onChange={(e) => handleFormData(e)}
                        checked={formData.includes(name)}
                    />   
                ) }
            </div> 
        </>
    )
}

export default ListCheckBox