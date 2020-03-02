import React from 'react';
import {Row, Col, Card, CardBody,Button} from 'reactstrap';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import './style.scss'

function MyLibrariesList(props) {
    const {my_libraries, match} = props
    return (
        my_libraries.length > 0 &&
          <>
            <h4 className="table-title"><FormattedMessage {...messages.header} /></h4>
            <div className="table my-libraries-list">
                <Row className="thead">
                    <Col xs={6}>
                        <span>Titolo / Descrizione</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>ID</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>Anno di pubblicazione</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                </Row>
                <div className="tbody">
                    { my_libraries.map(my_library => (
                        <Row key={`my_library-${my_library.id}`}>
                            <Col xs={6}>
                                <a href={`${match.url}/${my_library.id}`}>
                                    {my_library.name}
                                </a>
                            </Col>
                            <Col xs={3}>
                                <span>
                                    {my_library.id}
                                </span>
                            </Col>
                            <Col xs={3}>
                            </Col>
                        </Row>
                      ))
                    }
                </div>
            </div> 
          </>
    )
}

export default MyLibrariesList