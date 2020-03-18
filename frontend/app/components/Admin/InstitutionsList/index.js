import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import {Pagination} from 'components';
import { generatePath } from "react-router";
import InstitutionPage from 'containers/Admin/InstitutionPage'

function InstitutionsList(props) {
    console.log('InstitutionsList', props)
    const {
        institutionsList, editPath, 
        pagination,  match} = props
    const {current_page, total_pages} = pagination
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const linkTo = (path) => {
        history.push(path)
     };

    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id: id,
        });
    }    

    return (
        <>
            <h3 className="table-title">{intl.formatMessage(messages.header)}</h3>
            <ButtonPlus 
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewInstitution)}
            />
            <div className="table institutions-list">
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
                        <span>Institution type ID</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>{intl.formatMessage(messages.editInstitution)}</span>
                    </Col>
                </Row>
                <div className="tbody">
                    {institutionsList.length > 0 && institutionsList.map(institution => (
                        <Row key={`library-${institution.id}`}>
                            <Col xs={3}>
                                <a href={`${editurl(institution.id)}`}>
                                    {institution.name}
                                </a>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {institution.id}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {formatDate(institution.created_at, intl.locale)}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>{institution.institution_type_id}</span>
                            </Col>
                            <Col xs={3} className="edit-icons" >
                                <a href={`${editurl(institution.id)}`} className="btn btn-link">
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
                <InstitutionPage 
                    match={match}
                /> 
            </CustomModal>   
            {Object.keys(pagination).length && 
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

export default InstitutionsList