import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import {Pagination} from 'components';
import { generatePath } from "react-router";


function UsersList(props) {
    console.log('Library UsersList', props)
    const {usersList, match, editPath, pagination} = props
    const {total_pages, current_page} = pagination
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id: id,
        });
    }    

    return (
        <>
            <h3 className="table-title">{intl.formatMessage(messages.header)}</h3>
            {/* <ButtonPlus 
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewLibrary)}
            /> */}
            <div className="table library-users-list">
                <Row className="thead">
                    <Col xs={4}>
                        <span>Nome</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>ID</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Data</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Status</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>{intl.formatMessage(messages.editUser)}</span>
                    </Col>
                </Row>
                <div className="tbody">
                    {usersList.length > 0 && usersList.map(user => (
                        <Row key={`user-${user.id}`}>
                            <Col xs={4}>
                                <a href={`${editurl(user.user_id)}`}>
                                    {user.user.data.full_name}
                                </a>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {user.user_id}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    Registrato il<br></br>
                                    {formatDate(user.created_at, intl.locale)}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <div className={`status-point ${user.status === 0 ? 'pending' : 'success' }`}></div>
                            </Col>
                            <Col xs={2} className="edit-icons" >
                                <a href={`${editurl(user.user_id)}`} className="btn btn-link">
                                    <i className="fa fa-edit"></i>
                                </a>
                                <a href="#" onClick={() => console.log('delete user')} className="btn btn-link">
                                    <i className="fa fa-trash"></i>
                                </a>
                            </Col>
                        </Row>
                      ))
                    }
                </div>
            </div> 
            {/* <CustomModal 
                modal={modal} 
                toggle={toggle}>
                <MyLibraryForm 
                    librariesList={props.librariesList}
                    requestAccessToLibrary={ (formData) =>  props.requestAccessToLibrary(formData)} 
                    fields={props.fields}
                    messages={props.messages} 
                    searchCustomSelect={(input) => props.searchCustomSelect(input)}
                />  
            </CustomModal> */}
            {pagination && pagination.total > pagination.per_page && 
                <Pagination
                    current_page={current_page}
                    total_pages={total_pages}
                    setPage={(page) => linkTo(generatePath(`${match.path}`, {
                        page: page
                      }))}
                />
            } 
          </>
    )
}

export default UsersList