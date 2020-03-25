import React, {useState, useEffect} from 'react';
import {Row, Col, CustomInput} from 'reactstrap'
import './style.scss'
import {uniq} from 'lodash'

const GrantedPermissions = (props) => {
    console.log('GrantedPermissions', props)
    const {usersData, resources, sendData} = props
    
    //const [formData, setFormData] = useState()
    
    const handleChange = (e, index) => {
        let newData = usersData
        if(e.target.checked){
            newData[index].permissions = uniq([...newData[index].permissions, e.target.name])
        }else {
            newData[index].permissions = newData[index].permissions.filter(perm => perm !== e.target.name)
        }
        // console.log(usersData)
        sendData(newData)
    }

    /* useEffect(() => {
      console.log(formData)
    },[formData]) */

   /*  useEffect(() => {
        setFormData( usersData)
    },[usersData])  */

    return (
        <div className="user-permissions-list">
            <div className="tbody">
            {usersData && usersData.length > 0 && usersData.map((user,index) => (  
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