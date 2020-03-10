import React from 'react';
import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';


const MyLibraryForm = (props) => {
    const { library, loading} = props
    const intl = useIntl();
    
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    <CustomForm 
                        submitCallBack={(formData) => null} 
                        updateFormData={library}
                        fields={fields} 
                        fieldsGroups={fieldsGroups}
                        //   title={`${intl.formatMessage(messages.update)}`} 
                        messages={{...messages, ...globalMessages}}
                        // submitText={intl.formatMessage(messages.updateSubmitText)}
                    /> 
                </Col> 
            </Row>
        </Loader>
    )
}

export default MyLibraryForm