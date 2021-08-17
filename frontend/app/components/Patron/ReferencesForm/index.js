import React, {useState, useEffect} from 'react'
import messages from './messages';
import FormContent from './FormContent';
import OASearchReference from '../../../containers/OASearchReference';
import SectionTitle from '../../SectionTitle';
const ReferencesForm = (props) => {
    console.log("REFERENCEFORM:",props);
    const {createReference, reference, updateReference, 
            labelsOptionList, applyLabels, groupsOptionList, 
    applyGroups, removeLabel, removeGroup, deleteReference,onFoundReference,importReference/*,findOA,OALink*/} = props
    
    const [goTo, setGoTo] = useState(false);
     
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
                    (goTo &&
                            <FormContent 
                            messages={messages} 
                            submitCallBack={(formData) => createReference(formData)}                            
                            />
                    || 

                        (importReference &&
                        <FormContent 
                                    messages={messages} 
                                    reference={importReference}
                                    submitCallBack={(formData) => createReference(formData)}
                                    /*findOA={findOA}
                                    OALink={OALink}*/
                                />
                        ||       
                            <>  
                                <SectionTitle 
                                    title={messages.headerNew}
                                />                           
                                <OASearchReference        
                                onFound={(reference)=>onFoundReference(reference)}        
                                goToForm={()=>setGoTo(true)}         
                                />
                            </>
                        )
                    )                    
            }
        </>
    )
}


export default ReferencesForm