import React,{useEffect, useState} from 'react'
import {CustomInput, Row} from 'reactstrap'

const ListCheckBox = (props) => {
    const {data, type, handleChange, selectedData} = props
    
    const [formData, setFormData] = useState(selectedData)

    const handleFormData = (e) => {
        if(e.target.checked){
            setFormData([...formData, e.target.name ])
            handleChange([...formData, e.target.name])
        }else{
            setFormData(formData.filter(name => name !== e.target.name))
            handleChange(formData.filter(name => name !== e.target.name))
        }
        
      // console.log(e.target.value)
    }
    
    useEffect(() => {
       setFormData(selectedData ? selectedData : [])
    }, [selectedData])

    

    return (
        <>
           <Row className="">
                {selectedData && data.map(name => 
                    type === 'checkbox' &&
                    <CustomInput
                        key={name}
                        className="col-sm-4"
                        id={name}
                        type={type}
                        name={name}
                        label={name}
                       // value={name}
                        onChange={(e) => handleFormData(e)}
                        checked={!formData.length && selectedData.length ? selectedData.includes(name) : formData.includes(name) }
                    />   
                ) }
            </Row> 
        </>
    )
}

export default ListCheckBox