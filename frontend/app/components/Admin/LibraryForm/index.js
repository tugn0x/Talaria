import React from 'react';
import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';
import SimpleForm from 'components/SimpleForm'

const LibraryForm = (props) => {
    console.log('LibraryForm', props)
    const { library, usersOptionList, searches, loading, updateLibrary, createLibrary, titleNewLibrary, resources} = props
    const intl = useIntl();
    
    return (
            <SimpleForm loading={loading}>
                    {library && 
                        <CustomForm 
                            submitCallBack={(formData) => updateLibrary(formData)} 
                            requestData={library}
                            fields={fields} 
                            fieldsGroups={fieldsGroups}
                            title={library.name}
                            usersOptionList={usersOptionList}
                            searchOptionList={searches} 
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
                            searchOptionList={searches} 
                            fieldsGroups={fieldsGroups}
                            title={titleNewLibrary}
                            granted_permissions={[]}
                            messages={{...messages, ...globalMessages}}
                        />
                    }
            </SimpleForm>
    )
}

export default LibraryForm