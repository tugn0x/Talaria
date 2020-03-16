import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import globalMessages from 'utils/globalMessages'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import UserForm from 'components/Admin/UserForm/Loadable'
import Pagination from 'components/Pagination/Loadable'
import { generatePath } from "react-router";
// import './style.scss;

function UsersListTable(props) {
    console.log('UsersListTable', props)
    const {usersList, pagination, match, loading, createUser, history, path} = props
    const {current_page, total_pages} = pagination
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const linkTo = (path) => {
       // history.push(generatePath(path, { page: page }))
       history.push(path)
    };

    const editurl = (id) => {
      return generatePath(`${props.editPath}`, {
        id: id,
      });
    }
    const pageNumUrl = (id) => {
      return generatePath(`${props.editPath}`, {
        id: id,
      });
    }

    return (
        <>
            <h3 className="table-title">{intl.formatMessage(messages.header)}</h3>
            <ButtonPlus
                onClickHandle={toggle}
                text={intl.formatMessage({id: 'app.routes.UserNew'})}
            />
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
                                <a href={`${editurl(user.id)}`}>
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
                                <a href={`${editurl(user.id)}`} className="btn btn-link">
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
            <CustomModal
                modal={modal}
                toggle={toggle}>
                <UserForm
                    loading={loading}
                    createUser={ (formData) => createUser(formData) } />
            </CustomModal>
            {pagination && Object.keys(pagination).length > 0 &&
                <Pagination
                    current_page={current_page}
                    total_pages={total_pages}
                    // setPage={(page) => linkTo(`${path}/?page=${page}`)}
                    setPage={(page) => linkTo(generatePath(`${props.match.path}`, {
                        page: page
                      }))}
                />
            }
          </>
    )
}

export default UsersListTable
