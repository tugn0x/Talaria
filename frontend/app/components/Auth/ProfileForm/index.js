import React from 'react';
import { Col, Row } from 'reactstrap';
/* import { FormattedMessage } from 'react-intl';
import messages from './messages'; */
// import globalMessages from '../../../utils/globalMessages'
import {useIntl} from 'react-intl';
import Loader from 'components/Form/Loader.js';

import {CustomForm} from 'components';
import {fields} from './fields';

const ProfileForm = (props) => {
    const {user, updateProfile, loading} = props
    const intl = useIntl();
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                    <CustomForm 
                        submitCallBack={(formData) => updateProfile(formData) } 
                        user={user}  
                        fields={fields} 
                        title={intl.formatMessage({ id: 'app.containers.UserProfile.header' })} 
                        submitText={intl.formatMessage({ id: 'app.containers.UserProfile.subtitle' })}
                        /> 
                </Col>
            </Row>
        </Loader>
    )
}

export default ProfileForm
