import React from 'react';
import {Row, Col, CustomInput} from 'reactstrap'
import Select from 'react-select';
import ButtonClose from 'components/Button/ButtonClose'
import './style.scss'
import {uniq} from 'lodash'

const GrantedPermissions = (props) => {
    console.log('GrantedPermissions', props)
    const {usersData,usersOptionList, searchOptionList, resources, sendData} = props
    
    // const [formData, setFormData] = useState()
    
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

    const handleChangeOptionList = (input) => {
        const newData = [{
            user_id: input.value,
            full_name: input.label,
            permissions: []
        }, ...usersData];
        sendData(newData) 
    }

    const handleSearchOptionList = (newValue, name) => {
        const inputValue = newValue.replace(/\W/g, '');
        searchOptionList[name](inputValue)
    };

    const removeUserFromList = (user_id) => {
        sendData(usersData.filter(user => user.user_id !== user_id)) 
    }

  /*   useEffect(() => {
      console.log(usersData)
    },[usersData]) */

   /*  useEffect(() => {
        setFormData( usersData)
    },[usersData])   */

    return (
        <>
            <Select
                className="option-list"
                type="custom-select"
                // value={formData[field.name]}
                name="usersOptionList"
                onChange={(input) => handleChangeOptionList(input)}
                onInputChange={(input) =>  searchOptionList ? handleSearchOptionList(input, "usersOptionList") : input}
                options={usersOptionList}
                required
            />
            <div className="users-permissions-list">
                <div className="tbody">
                {usersData && usersData.length > 0 && usersData.map((user,index) => (  
                <Row key={`${user.user_id}-${index}`} className="position-relative">
                        <ButtonClose 
                            handleClick={() => removeUserFromList(user.user_id)}
                        />
                        <Col sm={4} xs={12}>
                            <span>{user.full_name}</span> 
                        </Col>
                        <Col sm={8} xs={12}>
                            <Row>
                            {resources && resources.length > 0 && resources.map(name => 
                                <CustomInput
                                    key={`${name}-${user.user_id}`}
                                    className="col-sm-6 col-lg-4"
                                    id={`${name}-${user.user_id}`}
                                    type="checkbox"
                                    name={name}
                                    label={name}
                                    value={user.user_id}
                                    onChange={(e) => handleChange(e, index)}
                                    checked={user.permissions && user.permissions.includes(name) ? true : false}
                                />
                            ) }
                            </Row>
                        </Col>
                    </Row>
                ))
                
                }
                </div>
            </div>
        </>
    )
}

export default GrantedPermissions