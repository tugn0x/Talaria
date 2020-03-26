import React from 'react';
import {Row, Col} from 'reactstrap';
import {ButtonBack} from 'components';
/* import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages'; */
import Loader from 'components/Form/Loader.js';

// import {useIntl} from 'react-intl';

const SimpleForm = (props) => {
    const {loading} = props
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    <ButtonBack className="float-left" />
                    <div className="clearfix"></div>
                    {props.children}
                </Col>
            </Row>
        </Loader>
    )
}

export default SimpleForm