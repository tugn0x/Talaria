import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import globalMessages from 'utils/globalMessages'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import UserForm from 'components/Admin/UserForm/Loadable'
import './style.scss'

function UsersListTable(props) {
    console.log('UsersListTable', props)
    const {usersList, match, loading, createUser} = props
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();
    return (
        <>
            <ButtonPlus 
                onClickHandle={toggle}
                text={"Create new user"}
            />
            <h4 className="table-title">{intl.formatMessage(messages.header)}</h4>
            <div className="table admin-list">
                <Row className="thead">
                    <Col xs={3}>
                        <span>{intl.formatMessage(globalMessages.name)}</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>{intl.formatMessage(globalMessages.surname)}</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>{intl.formatMessage(globalMessages.email)}</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>{intl.formatMessage({id: 'app.components.UserForm.editUser'})}</span>
                    </Col>
                </Row>
                <div className="tbody">
                     {usersList.length > 0 && usersList.map(user => (
                        <Row key={`user-${user.id}`}>
                            <Col xs={3}>
                                <a href={`${match.url}/${user.id}`}>
                                    {user.name}
                                </a>
                            </Col>
                            <Col xs={3}>
                                <span>
                                    {user.surname}
                                </span>
                            </Col>
                            <Col xs={3}>
                                <span>
                                    {user.email}
                                </span>
                            </Col>
                            <Col xs={3} className="edit-icons" >
                                <a href={`${match.url}/${user.id}`} className="nav-link">
                                    <i className="fa fa-edit"></i>
                                </a>
                                <a href="#" onClick={() => console.log('delete user')} className="nav-link">
                                    <i className="fa fa-trash"></i>
                                </a>
                            </Col>
                        </Row>
                      ))
                    }
                </div>
            </div> 
            <CustomModal 
                modal={modal} 
                toggle={toggle}>
                 <UserForm 
                    loading={loading} 
                    createUser={ (formData) => createUser(formData) } />
            </CustomModal>
          </>
    )
}

export default UsersListTable