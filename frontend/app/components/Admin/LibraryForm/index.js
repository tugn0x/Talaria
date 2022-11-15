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
            submitFormAction,libraryProjectsOptionList, institutionsOptionList, institutionTypesOptionList,institutionsByTypeCountryOptionList,
            countriesOptionList, librarySubjectOptionList,onChangeData} = props
    const intl = useIntl();
    
    const [requestData,setRequestData]=useState(null);

    useEffect ( ()=>{
        
        if(!loading)
        if(library && library.id>0)
        {
            setRequestData({
                ...library,
                'project_id': library.projects.data.map( ({id,name})=>{return id;}),
                'institution_type_id': library.institution.data?library.institution.data.institution_type_id:null,
                'institution_country_id': library.institution.data?library.institution.data.country_id:null
            })                    
        }

    },[library])


    
    return (
            //<SimpleForm loading={loading}>
                 <CustomForm 
                    submitCallBack={(formData) => submitFormAction(formData)} 
                    requestData={requestData}
                    fields={fields} 
                    fieldsGroups={fieldsGroups}
                    title={library && library.name ? library.name : intl.formatMessage(messages.header)}                                                            
                    country_id={countriesOptionList}
                    institution_type_id = {institutionTypesOptionList}                    
                    institution_country_id = {countriesOptionList}
                    institution_id={institutionsByTypeCountryOptionList}                    
                    project_id={libraryProjectsOptionList}   
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