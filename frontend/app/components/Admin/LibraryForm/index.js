import React from 'react';
import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';

const LibraryForm = (props) => {
    console.log('LibraryForm', props)
    const { library, usersOptionList, searches, loading, updateLibrary, createLibrary, titleNewLibrary, resources} = props
    const intl = useIntl();
    
    return (
       /*  <Loader show={loading} > */
            <Row className="justify-content-center">
                <Col md="10">
                    {library && 
                        <CustomForm 
                            submitCallBack={(formData) => updateLibrary(formData)} 
                            updateFormData={library}
                            fields={fields} 
                            fieldsGroups={fieldsGroups}
                            title={library.name}
                            usersOptionList={usersOptionList}
                            searchCustomSelect={searches} 
                            messages={{...messages, ...globalMessages}}
                            granted_permissions={library.granted_permissions}
                            resources={resources}
                        />
                    ||
                        <CustomForm 
                            submitCallBack={(formData) => createLibrary(formData)} 
                            fields={fields}
                            resources={resources}
                            usersOptionList={usersOptionList}
                            searchCustomSelect={searches} 
                            fieldsGroups={fieldsGroups}
                            title={titleNewLibrary}
                            granted_permissions={[]}
                            messages={{...messages, ...globalMessages}}
                        />
                    }
                </Col> 
            </Row>
        /* </Loader> */
    )
}

export default LibraryForm