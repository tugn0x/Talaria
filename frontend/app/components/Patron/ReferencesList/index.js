import React from 'react'
import {Table, Row, Col,Button} from 'reactstrap'
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import './style.scss'

const ReferencesList = (props) => {
    const {match, referencesList} = props
    return (
        <>
            <a href={`${match.url}/new`} className="btn float-right btn-plus">
                <i className="fa fa-plus"></i>
                <span>
                    <FormattedMessage {...messages.createNewReference} />
                </span>
            </a>
            <h4 className="table-title"><FormattedMessage {...messages.header} /></h4>
            <div className="table referencesList">
                <Row className="thead">
                    <Col xs={6}>
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
                </Row>
                <div className="tbody">
                    {referencesList.length > 0 &&
                        referencesList.map(reference => (
                            <Row key={`reference-${reference.id}`}>
                                <Col xs={6}>
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
                            </Row>
                        ))
                    }
                </div>
            </div> 
        </>
    )
}

export default ReferencesList