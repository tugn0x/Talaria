import React, {useState, useEffect} from 'react'
import {Row} from 'reactstrap';
import messages from './messages';
import ReferenceFormContent from '../../ReferenceFormContent';
import OASearchReference from '../../../containers/OASearchReference';
import SectionTitle from '../../SectionTitle';
import ReferenceIcons from '../ReferenceIcons';
import FindOA from '../../FindOA';
import ReferenceTags from '../ReferenceTags';

const ReferenceForm = (props) => {
    console.log("REFERENCEFORM:",props);
    const {createReference, reference, updateReference, 
            labelsOptionList, applyLabels, groupsOptionList, 
    applyGroups, removeLabel, removeGroup, deleteReference,onFoundReference,importReference/*,findOA,OALink*/} = props
    
    const [goTo, setGoTo] = useState(false);

    const [formData, setFormData] = useState(() => {
        if(!reference)
            return {material_type: 1, pubyear: "", authors: "", volume: "", pages: ""}
        else return {...reference}    
        
    })

    useEffect(() => {        
        reference && Object.keys(reference.length > 0) ?  setFormData({...formData, ...reference}) : null
    },[reference])
     
    return (
        <>
            {reference  && 
                <>
                    <SectionTitle 
                        title={reference.id?messages.headerEdit:messages.headerNew}
                    />
                    {reference && !reference.id && <FindOA reference={formData} /* findOA={findOA}*//>}
                    {reference &&
                        <>
                            {reference.id && <Row className="list-head">
                                <div className="features-icons">
                                    <ReferenceIcons 
                                        data={formData}
                                        icons={['assignLabel', 'assignGroup', 'delete']}
                                        labelsOptionList={labelsOptionList}
                                        applyLabels={applyLabels}
                                        groupsOptionList={groupsOptionList}
                                        applyGroups={applyGroups}
                                        selectedReferences={[formData.id]}
                                        deleteReference={deleteReference}
                                    />
                                </div>
                            </Row>}
                            <ReferenceTags data={formData} removeLabel={(labelId)=>removeLabel(labelId )} removeGroup={(groupId)=>removeGroup(groupId)}/>                                
                        </>
                    }
                    <ReferenceFormContent 
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
                </>
                ||                     
                    (goTo &&
                            <>
                            <SectionTitle 
                                title={(reference && reference.id)?messages.headerEdit:messages.headerNew}
                            />
                            {reference && !reference.id && <FindOA reference={formData} /* findOA={findOA}*//>}
                            {reference &&
                                <>
                                    {reference.id && <Row className="list-head">
                                        <div className="features-icons">
                                            <ReferenceIcons 
                                                data={formData}
                                                icons={['assignLabel', 'assignGroup', 'delete']}
                                                labelsOptionList={labelsOptionList}
                                                applyLabels={applyLabels}
                                                groupsOptionList={groupsOptionList}
                                                applyGroups={applyGroups}
                                                selectedReferences={[formData.id]}
                                                deleteReference={deleteReference}
                                            />
                                        </div>
                                    </Row>}
                                    <ReferenceTags data={formData} removeLabel={(labelId)=>removeLabel(labelId )} removeGroup={(groupId)=>removeGroup(groupId)}/>                                
                                </>
                            }                            
                            <ReferenceFormContent 
                            messages={messages} 
                            submitCallBack={(formData) => createReference(formData)}                            
                            />
                        </>
                    || 

                        (importReference &&
                        <>
                        <SectionTitle 
                                title={importReference.id?messages.headerEdit:messages.headerNew}
                        />
                        {importReference && !importReference.id && <FindOA reference={importReference} /* findOA={findOA}*//>}                        
                        <ReferenceFormContent 
                                    messages={messages} 
                                    reference={importReference}
                                    submitCallBack={(formData) => createReference(formData)}
                                    /*findOA={findOA}
                                    OALink={OALink}*/
                                />
                        </>
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


export default ReferenceForm