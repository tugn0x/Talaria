import React, {useState, useEffect} from 'react'
/* import {CustomForm} from 'components';
import {fields} from './fields'; */
// import messages from './messages';
// import Loader from 'components/Form/Loader.js';
// import {useIntl} from 'react-intl';
import formMessages from './messages';
import FormContent from './FormContent';
import PreForm from './PreForm';

const ReferencesForm = (props) => {
    const {createReference, reference, updateReference, messages, 
            labelsOptionList, applyLabels, groupsOptionList, 
            applyGroups, removeLabel, removeGroup, deleteReference,findReference,importReference} = props
    const [goToForm, setGoToForm] = useState(false);
        
    return (
        <>
                {reference  && 
                    <FormContent 
                        messages={messages} 
                        submitCallBack={(formData) => updateReference(formData)}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabels}
                        applyGroups={applyGroups}
                        removeLabel={removeLabel}
                        removeGroup={removeGroup}
                        reference={reference}
                        deleteReference={deleteReference}
                    />
                ||
                    <>
                    {console.log("impref",importReference)}
                    
                    {goToForm &&
                            <FormContent 
                            messages={messages} 
                            submitCallBack={(formData) => createReference(formData)}
                            />
                    ||    
                    importReference &&
                    <FormContent 
                                messages={messages} 
                                reference={importReference}
                                submitCallBack={(formData) => createReference(formData)}
                            />
                    ||        
                            <PreForm 
                                goToForm={setGoToForm}
                                messages={formMessages}
                                searchCallBack={(query) => findReference(query)}
                            />
                    }
                    </>
                }
        </>
    )
}


export default ReferencesForm