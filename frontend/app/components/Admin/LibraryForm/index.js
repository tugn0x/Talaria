import React from 'react';
// import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
/* import Loader from 'components/Form/Loader.js';
*/
import {useIntl} from 'react-intl';
import SimpleForm from 'components/SimpleForm'

const LibraryForm = (props) => {
    console.log('LibraryForm', props)
    const { library, usersOptionList, 
            searches, loading, resources,
            submitFormAction, institutionsOptionList, 
            countriesOptionList, librarySubjectOptionList} = props
    const intl = useIntl();
    
    return (
            <SimpleForm loading={loading}>
                <CustomForm 
                    submitCallBack={(formData) => submitFormAction(formData)} 
                    requestData={library ? library : null}
                    fields={fields} 
                    fieldsGroups={fieldsGroups}
                    title={library && library.name ? library.name : intl.formatMessage(messages.header)}
                    usersOptionList={usersOptionList}
                    institution_id={institutionsOptionList} 
                    country_id={countriesOptionList}
                    subject_id={librarySubjectOptionList}
                    searchOptionList={searches} 
                    messages={{...messages, ...globalMessages}}
                    granted_permissions={
                        library ? library.granted_permissions : [] }
                    resources={resources}
                />
            </SimpleForm>
    )
}

export default LibraryForm