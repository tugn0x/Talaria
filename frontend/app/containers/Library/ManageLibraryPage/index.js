/*
 * Library Page
 *
 * 
 *
 */

import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
// import {fields} from './fields';
import messages from './messages';
import { requestGetInstitutionsOptionList, requestGetLibrary, 
        requestUpdateLibrary, requestPostLibrary, requestGetRoles, 
        requestUsersOptionList, requestGetCountriesOptionList, requestLibrarySubjectOptionList} from 'containers/Admin/actions'
import makeSelectAdmin, {isAdminLoading} from 'containers/Admin/selectors';
import {LibraryForm, Loader} from 'components';

function ManageLibraryPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const library = admin.library
    // const libraryOptionList = patron.libraryOptionList
    
    useEffect(() => {
      if(!isLoading && !isNew) {
         dispatch(requestGetLibrary(params.id))
      }
      if(!isLoading){
        dispatch(requestGetRoles())
        dispatch(requestUsersOptionList())
        dispatch(requestGetInstitutionsOptionList())
        dispatch(requestGetCountriesOptionList())
        dispatch(requestLibrarySubjectOptionList())
      }
     }, [])
  
     
    return (
      <Loader show={isLoading}>
          <LibraryForm 
            library={!isNew ? library : null}
            loading={isLoading}
            usersOptionList={admin.usersOptionList}
            institutionsOptionList={admin.institutionsOptionList}
            countriesOptionList={admin.countriesOptionList}
            librarySubjectOptionList={admin.librarySubjectOptionList}
            searches={{ 
              usersOptionList: (input) => dispatch(requestUsersOptionList(input)),
              institution_type_id: (input) => dispatch(requestGetInstitutionsOptionList(input)), 
              country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
              subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)) 
            }}
            resources={admin.resources.libraries}
            titleNewLibrary={isNew ? intl.formatMessage(messages.titleNewLibrary) : ""}
            submitFormAction={
                !isNew ? (formData) => dispatch(requestUpdateLibrary({...formData, id: params.id}, intl.formatMessage(messages.updateMessage)))
                : (formData) => dispatch(requestPostLibrary(formData, intl.formatMessage(messages.createMessage)))
              }
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
  
  export default compose(withConnect)(ManageLibraryPage);
  