import React, {useState} from 'react'
import {Row, Col} from 'reactstrap'
import messages from './messages'
import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {Pagination} from 'components';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
import ButtonPlus from 'components/Button/ButtonPlus'
import { generatePath } from "react-router";
import ReferencesPage from 'containers/Patron/ReferencesPage'


const ReferencesList = (props) => {
    console.log('ReferencesList', props)
    const {match, referencesList, pagination, history} = props
    const {total_pages, current_page} = pagination
    const intl = useIntl();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const editurl = (id) => {
        return generatePath(`${props.editPath}`, {
            id: id,
        });
    }

    const linkTo = (path) => {
        history.push(path)
     };

    return (
        <>
            <h3 className="table-title"><FormattedMessage {...messages.header} /></h3>
            <ButtonPlus 
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewReference)}
            />
            <div className="table referencesList">
                <Row className="thead">
                    <Col xs={4}>
                        <span>Titolo / Descrizione</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>Autore</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>Anno di pubblicazione</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>{intl.formatMessage(globalMessages.update)}</span>
                    </Col>
                </Row>
                <div className="tbody">
                    {referencesList.length > 0 &&
                        referencesList.map(reference => (
                            <Row key={`reference-${reference.id}`}>
                                <Col xs={4}>
                                    <a href={`${editurl(reference.id)}`}>
                                        {reference.pub_title}
                                    </a>
                                </Col>
                                <Col xs={3}>
                                    <span>
                                        {reference.first_author}
                                    </span>
                                </Col>
                                <Col xs={3}>
                                    <span>
                                        {reference.pubyear}
                                    </span>
                                </Col>
                                <Col xs={2} className="edit-icons" >
                                    <a href={`${editurl(reference.id)}`} className="btn btn-link">
                                        <i className="fa fa-edit"></i>
                                    </a>
                                    <a href="#" onClick={() => console.log('delete reference')} className="btn btn-link">
                                        <i className="fa fa-trash"></i>
                                    </a>
                                </Col>
                            </Row>
                        ))
                    ||
                        <h5 className="text-center">
                            {intl.formatMessage(messages.ReferencesNotFound)}
                        </h5>
                    }
                </div>
            </div> 
            <CustomModal 
                modal={modal} 
                toggle={toggle}>
                <ReferencesPage 
                    match={match} />
            </CustomModal>
            {Object.keys(pagination).length && 
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

export default ReferencesList