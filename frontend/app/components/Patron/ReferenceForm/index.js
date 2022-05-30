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
                    {!reference.id && <FindOA reference={formData} /* findOA={findOA}*//>}
                    
                    <>
                        {reference.id && <Row className="list-head">                            
                                <ReferenceIcons 
                                    customClass="features-icons"
                                    data={formData}
                                    icons={['assignLabel', 'assignGroup', 'delete']}
                                    labelsOptionList={labelsOptionList}
                                    applyLabels={applyLabels}
                                    groupsOptionList={groupsOptionList}
                                    applyGroups={applyGroups}
                                    selectedReferences={[formData.id]}
                                    deleteReference={deleteReference}
                                />                            
                        </Row>}
                        <ReferenceTags data={formData} removeLabel={(labelId)=>removeLabel(labelId )} removeGroup={(groupId)=>removeGroup(groupId)}/>                                
                    </>
                    
                    <ReferenceFormContent                         
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
                            {reference && !reference.id && <FindOA reference={formData} /* findOA={findOA}*//>}
                            {reference &&
                                <>
                                    {reference.id && <Row className="list-head">                                        
                                            <ReferenceIcons 
                                                customClass="features-icons"
                                                data={formData}
                                                icons={['assignLabel', 'assignGroup', 'delete']}
                                                labelsOptionList={labelsOptionList}
                                                applyLabels={applyLabels}
                                                groupsOptionList={groupsOptionList}
                                                applyGroups={applyGroups}
                                                selectedReferences={[formData.id]}
                                                deleteReference={deleteReference}
                                            />                                        
                                    </Row>}
                                    <ReferenceTags data={formData} removeLabel={(labelId)=>removeLabel(labelId )} removeGroup={(groupId)=>removeGroup(groupId)}/>                                
                                </>
                            }                            
                            <ReferenceFormContent                             
                            submitCallBack={(formData) => createReference(formData)}                            
                            />
                        </>
                    || 

                        (importReference &&
                        <>
                        {!importReference.id && <FindOA reference={importReference} /* findOA={findOA}*//>}                        
                        <ReferenceFormContent                                     
                                    reference={importReference}
                                    submitCallBack={(formData) => createReference(formData)}
                                    /*findOA={findOA}
                                    OALink={OALink}*/
                                />
                        </>)
                        ||       
                        <OASearchReference        
                            onFound={(reference)=>onFoundReference(reference)}        
                            goToForm={()=>setGoTo(true)}         
                        />                            
                        
                    )                    
            }
        </>
    )
}


export default ReferenceForm