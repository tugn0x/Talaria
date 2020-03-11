import React from 'react';
import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';

const LibraryForm = (props) => {
    const { library, loading, updateLibrary, createLibrary, titleNewLibrary} = props
    const intl = useIntl();
    
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    {library &&
                        <CustomForm 
                            submitCallBack={(formData) => updateLibrary(formData)} 
                            updateFormData={library}
                            fields={fields} 
                            fieldsGroups={fieldsGroups}
                            title={library.name}
                            messages={{...messages, ...globalMessages}}
                        />
                    ||
                        <CustomForm 
                            submitCallBack={(formData) => createLibrary(formData)} 
                            fields={fields} 
                            fieldsGroups={fieldsGroups}
                            title={titleNewLibrary}
                            messages={{...messages, ...globalMessages}}
                        />
                    }
                </Col> 
            </Row>
        </Loader>
    )
}

export default LibraryForm