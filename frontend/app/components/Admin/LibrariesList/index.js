import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import {LibraryForm, InputSearch} from 'components';
import { generatePath } from "react-router";
// import './style.scss'


function LibrariesList(props) {
    console.log('LibrariesList', props)
    const {librariesList, editPath, createLibrary, loading} = props
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
            <InputSearch />
            <ButtonPlus 
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewLibrary)}
            />
            <div className="table libraries-list">
                <Row className="thead">
                    <Col xs={3}>
                        <span>Titolo / Descrizione</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>ID</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Aggiunta il</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Email</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>{intl.formatMessage(messages.editLibrary)}</span>
                    </Col>
                </Row>
                <div className="tbody">
                    {librariesList.length > 0 && librariesList.map(library => (
                        <Row key={`library-${library.id}`}>
                            <Col xs={3}>
                                <a href={`${editurl(library.id)}`}>
                                    {library.name}
                                </a>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {library.id}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {formatDate(library.created_at, intl.locale)}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>{library.email}</span>
                            </Col>
                            <Col xs={3} className="edit-icons" >
                                <a href={`${editurl(library.id)}`} className="btn btn-link">
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
                <LibraryForm 
                    createLibrary={ (formData) => createLibrary(formData) } 
                    loading={loading}
                    titleNewLibrary={'New Library'}
                /> 
            </CustomModal>  
           {/*  {pagination && Object.keys(pagination).length > 0 &&
                <Pagination
                    current_page={current_page}
                     total_pages={total_pages}
                    // setPage={(page) => linkTo(`${path}/?page=${page}`)}

                    setPage={(page) => linkTo(generatePath(`${props.match.path}`, {
                        page: page
                      }))}
                />
            } */}
          </>
    )
}

export default LibrariesList