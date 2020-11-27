import React, {useState, useEffect} from 'react'
import formMessages from './messages';
import FormContent from './FormContent';
import PreForm from './PreForm';
import SectionTitle from 'components/SectionTitle';

const ReferencesForm = (props) => {
    const {createReference, reference, updateReference, messages, 
            labelsOptionList, applyLabels, groupsOptionList, 
    applyGroups, removeLabel, removeGroup, deleteReference,findReference,importReference/*,findOA,OALink*/} = props
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
                        history={props.history}
                        /*findOA={findOA}
                        OALink={OALink}*/
                    />
                ||
                    <>
                    {console.log("impref",importReference)}
                    
                    {goToForm &&
                            <FormContent 
                            messages={messages} 
                            submitCallBack={(formData) => createReference(formData)}
                            /*findOA={findOA}
                            OALink={OALink}*/
                            />
                    ||    
                    importReference &&
                    <FormContent 
                                messages={messages} 
                                reference={importReference}
                                submitCallBack={(formData) => createReference(formData)}
                                /*findOA={findOA}
                                OALink={OALink}*/
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