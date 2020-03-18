import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import MyLibraryPage from 'containers/Patron/MyLibraryPage';
import {Pagination} from 'components';
import { generatePath } from "react-router";
import './style.scss'

function MyLibrariesList(props) {
    console.log('MyLibrariesList', props)
    const {my_libraries, match, editPath, pagination, history} = props
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id: id,
        });
    }    

    const linkTo = (path) => {
        history.push(path)
    };

    return (
        <>
            <h3 className="table-title">{intl.formatMessage(messages.header)}</h3>
            <ButtonPlus 
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewLibrary)}
            />
            <div className="table my-libraries-list">
                <Row className="thead">
                    <Col xs={4}>
                        <span>Titolo / Descrizione</span>
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
                        <span>{intl.formatMessage(messages.editLibrary)}</span>
                    </Col>
                </Row>
                <div className="tbody">
                    {my_libraries.length > 0 && my_libraries.map(my_library => (
                        <Row key={`my_library-${my_library.id}`}>
                            <Col xs={4}>
                                <a href={`${editurl(my_library.id)}`}>
                                    {my_library.name}
                                </a>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {my_library.id}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    Richiesta effettuata il<br></br>
                                    {formatDate(my_library.created_at, intl.locale)}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <div className={`status-point ${my_library.status === 0 ? 'pending' : 'success' }`}></div>
                            </Col>
                            <Col xs={2} className="edit-icons" >
                                <a href={`${editurl(my_library.id)}`} className="btn btn-link">
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
                <MyLibraryPage 
                    match={match}
                />
            </CustomModal>
            {Object.keys(pagination).length && 
                <Pagination
                    current_page={current_page}
                    total_pages={total_pages}
                    setPage={(page) => linkTo(generatePath(`${props.match.path}`, {
                        page: page
                      }))}
                />
            } 
          </>
    )
}

export default MyLibrariesList