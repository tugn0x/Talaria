import React, {useState} from 'react'
import {Row, Col} from 'reactstrap'
import messages from './messages'
import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {ReferencesForm} from 'components';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
import ButtonPlus from 'components/Button/ButtonPlus'

const ReferencesList = (props) => {
    console.log('ReferencesList', props)
    const {match, referencesList} = props
    const intl = useIntl();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

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
                                    <a href={`${match.url}/${reference.id}`}>
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
                                    <a href={`${match.url}/${reference.id}`} className="btn btn-link">
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
                <ReferencesForm 
                    loading={props.loading} 
                    createReferences={ (formData) => props.createReferences(formData) } />
            </CustomModal>
        </>
    )
}

export default ReferencesList