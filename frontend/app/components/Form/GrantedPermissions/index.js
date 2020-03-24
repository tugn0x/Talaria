import React, {useState, useEffect} from 'react';
import {Row, Col, CustomInput} from 'reactstrap'
import './style.scss'

const GrantedPermissions = (props) => {
    console.log('GrantedPermissions', props)
    const {usersData, resources, sendData} = props
    
    const [formData, setFormData] = useState()
    let outputData = []
    const handleChange = (e, index) => {
        if(e.target.checked){
            outputData = formData.map((elem) => {
                if(elem.user_id === Number(e.target.value)){
                    elem.permissions.push(e.target.name)
                }
                return elem
            })
        }else {
            outputData = formData.map((elem) => {
                if(elem.user_id === Number(e.target.value)){
                    elem.permissions=elem.permissions.filter(perm => perm !== e.target.name)
                }
                return elem
            })
        }
        sendData(outputData)     
        // setFormData(outputData)     
        console.log(outputData)
    }

    useEffect(() => {
      // console.log(formData)
    },[formData])

    useEffect(() => {
        setFormData( usersData)
    },[usersData])

    return (
        <div className="user-permissions-list">
            <div className="tbody">
            {formData && formData.length > 0 && formData.map((user,index) => (  
               <Row key={`${user.user_id}-${index}`}>
                    <Col sm={4} xs={12}>
                        <span>{user.full_name}</span> 
                    </Col>
                    <Col sm={8} xs={12}>
                        {resources.map(name => 
                            <CustomInput
                                key={`${name}-${user.user_id}`}
                                className="col-sm-4"
                                id={`${name}-${user.user_id}`}
                                type="checkbox"
                                name={name}
                                label={name}
                                value={user.user_id}
                                onChange={(e) => handleChange(e, index)}
                                checked={user.permissions && user.permissions.includes(name) ? true : false}
                            />   
                        ) }
                    </Col>
                </Row>
            ))
            
            }
            </div>
        </div>
    )
}

export default GrantedPermissions