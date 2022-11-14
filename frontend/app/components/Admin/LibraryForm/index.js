import React, { useEffect,useState } from 'react';
// import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
/* import Loader from 'components/Form/Loader.js';
*/
import {useIntl} from 'react-intl';

const LibraryForm = (props) => {
    console.log('LibraryForm', props)
    const { library, 
            searches, loading, resources,
            submitFormAction,libraryProjectsOptionList, institutionsOptionList, identifiertypesOptionList, identifierTypesOptionList, institutionsTypesOptionList,institutionsByTypeCountryOptionList,
            countriesOptionList, librarySubjectOptionList, identifiersOptionList, identifierTypeSelected, onChangeData} = props
    const intl = useIntl();

    const [requestData,setRequestData]=useState(null);
    const [listLength, setListLength] = useState(null);

    useEffect ( ()=>{

        if(!loading)
        if(library && library.id>0)
        {
            setListLength(library.identifiers.data.length)
            setRequestData({
                ...library,
                'project_id': library.projects.data.map( ({id,name})=>{return id;}),
                'institution_type_id': library.institution.data?library.institution.data.institution_type_id:null,
                'institution_country_id': library.institution.data?library.institution.data.country_id:null
            })                    
        }

    },[library])


    const AddNewIdentifier = (field_name,value,newList) => {
        fields.library_identifier_list.hidden = newList.length>0 ? false : true;
        //setData({...data, 'identifiers_id': newList})
        console.log("identifier_id" + JSON.stringify(newList))

    }

    const RemoveIdentifier = (field_name,value,newList) => {
        fields.library_identifier_list.hidden = newList.length>0 ? false : true;
        //setData({...data, 'identifier_id': newList})
        console.log(JSON.stringify(newList))
    }


    useEffect ( ()=>{
        if(identifierTypeSelected)
            fields.library_identifier_add.disabled = !identifierTypeSelected
        
    },[identifierTypeSelected])

    
    useEffect ( ()=>{
        if(identifierTypeSelected)
            fields.library_identifier_add.disabled = !identifierTypeSelected
        
    },[library])

    useEffect ( ()=>{
        fields.library_identifier_list.hidden = listLength>0 ? false : true;
    },[listLength])

    

    return (
            //<SimpleForm loading={loading}>
                 <CustomForm 
                    submitCallBack={(formData) => submitFormAction(formData)} 
                    requestData={requestData}
                    fields={fields} 
                    fieldsGroups={fieldsGroups}
                    title={library && library.name ? library.name : intl.formatMessage(messages.header)}                                                            
                    country_id={countriesOptionList}
                    institution_type_id = {institutionsTypesOptionList}                    
                    institution_country_id = {countriesOptionList}
                    institution_id={institutionsByTypeCountryOptionList}                    
                    project_id={libraryProjectsOptionList}   

                    identifier_type_id = {identifiersOptionList}
                    AddNewIdentifier={AddNewIdentifier}
                    RemoveIdentifier={RemoveIdentifier}

                    subject_id={librarySubjectOptionList}
                    searchOptionList={searches} 
                    messages={{...messages, ...globalMessages}}
                    resources={resources}
                    onChangeData={(field_name, value) => onChangeData(field_name, value)}
                /> 
            //</SimpleForm>
    )
}

export default LibraryForm