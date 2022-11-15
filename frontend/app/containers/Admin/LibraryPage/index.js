import React, {useEffect,useState} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import messages from './messages';
import {requestGetLibrary, 
        requestUpdateLibrary, requestPostLibrary, requestGetRoles, 
        requestGetCountriesOptionList, requestLibrarySubjectOptionList,requestGetInstitutionTypeOptionList,requestGetInstitutionsByTypeByCountryOptionList, requestGetlibraryProjectsOptionList,
        requestGetlibraryIdentifiersOptionList} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {LibraryForm, Loader} from 'components';

function LibraryPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const library = admin.library    
    
    const [projectsIds,setProjectsIds]=useState(null)
    const [instype,setInstitutiontypeid]=useState(null)
    const [instcountry,setInstitutionCountryid]=useState(null)
    const [identifierTypeSelected, setidentifierTypeSelected] = useState(false);

     
    useEffect(() => {
      if(!isLoading && !isNew)         
         dispatch(requestGetLibrary(params.id))
        
     if(!isLoading) {
         dispatch(requestGetCountriesOptionList())
         dispatch(requestGetInstitutionTypeOptionList())         
         dispatch(requestLibrarySubjectOptionList())   
         dispatch(requestGetlibraryProjectsOptionList()) 
         dispatch(requestGetlibraryIdentifiersOptionList()) 
      }
     }, [])     

     useEffect(()=>{
        if(!isLoading) 
          if(library && library.id>0) {  
            setInstitutiontypeid(library.institution.data.institution_type_id);        
            setInstitutionCountryid(library.institution.data.country_id);                
          }            
     },[library])

     useEffect(()=>{
      if(!isLoading) 
          dispatch(requestGetInstitutionsByTypeByCountryOptionList(null,instcountry,instype));                   
      },[instype,instcountry])
     
 
     const onChangeData = (field_name, value) => {
      
         console.log("LibraryForm onChangeData()",field_name,value);
 
         if (field_name === "institution_type_id")
             setInstitutiontypeid(value.value);                     
         
         if (field_name === "institution_country_id")
             setInstitutionCountryid(value.value);                      

          if (field_name === "project_id")
            setProjectsIds(value)      
                
          if (field_name === "identifier_type_id" && value!==0)
            setidentifierTypeSelected(true)
          else
            setidentifierTypeSelected(false)
     }
  
     
    return (
      <Loader show={isLoading}>
          <LibraryForm 
            library={!isNew ? library : null}
            loading={isLoading}                    
            institutionTypesOptionList={admin.institutionTypesOptionList}
            institutionsOptionList={admin.institutionsOptionList}            
            institutionsByTypeCountryOptionList={admin.institutionsByTypeCountryOptionList}
            countriesOptionList={admin.countriesOptionList}
            libraryProjectsOptionList={admin.libraryProjectsOptionList}
            librarySubjectOptionList={admin.librarySubjectOptionList}
            identifiersOptionList={admin.identifiersOptionList}
            identifierTypeSelected={identifierTypeSelected}
            searches={{ 
              institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)),               
              country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
              subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)),                                                         
              institution_country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
            }}
            resources={admin.resources.libraries}
            titleNewLibrary={isNew ? intl.formatMessage(messages.titleNewLibrary) : ""}
            submitFormAction={
                !isNew ? (formData) => dispatch(requestUpdateLibrary({ ...formData, id: params.id, project_id:projectsIds}, intl.formatMessage(messages.updateMessage)))
                : (formData) => dispatch(requestPostLibrary(formData, intl.formatMessage(messages.createMessage)))
              }
            onChangeData={onChangeData}  
          /> 
      </Loader>
    );
  }
  
  const mapStateToProps = createStructuredSelector({
    isLoading: isAdminLoading(),
    admin: makeSelectAdmin()
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(withConnect)(LibraryPage);
  