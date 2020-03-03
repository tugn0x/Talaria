import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import ButtonPlus from 'components/Button/ButtonPlus'


function UsersListTable(props) {
    console.log('UsersListTable', props)
    const intl = useIntl();
    return (
        <>
            <h4 className="table-title">{intl.formatMessage(messages.header)}</h4>
            <div className="table admin-list">
                <Row className="thead">
                    <Col xs={6}>
                        <span>Username</span>
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
                        <span>Ruolo</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                </Row>
                <div className="tbody">
                </div>
            </div> 
            
          </>
    )
}

export default UsersListTable