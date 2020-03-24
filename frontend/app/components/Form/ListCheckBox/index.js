import React,{useEffect, useState} from 'react'
import {CustomInput, Row} from 'reactstrap'

const ListCheckBox = (props) => {
    const {data, type, handleChange, selectedData} = props
    
    const [formData, setFormData] = useState()

    const handleFormData = (e) => {
        if(e.target.checked){
            setFormData([...formData, e.target.name ])
        }else{
            setFormData(formData.filter(name => name !== e.target.name))
        }
      // console.log(e.target.value)
    }
    
    useEffect(() => {
        setFormData(selectedData ? selectedData : [])
    }, [selectedData])


    useEffect(() => {
        if(selectedData !== formData){
            handleChange(formData)
        }
    }, [formData])

    /* useEffect(() => {
        console.log(data)
        console.log(formData)
    }) */

    return (
        <>
           <Row className="">
                {formData && data.map(name => 
                    type === 'checkbox' &&
                    <CustomInput
                        key={name}
                        className="col-sm-4"
                        id={name}
                        type={type}
                        name={name}
                        label={name}
                       // value={formData}
                        onChange={(e) => handleFormData(e)}
                        checked={formData.length && formData.includes(name)}
                    />   
                ) }
            </Row> 
        </>
    )
}

export default ListCheckBox