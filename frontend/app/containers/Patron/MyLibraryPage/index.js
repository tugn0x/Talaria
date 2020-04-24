/*
 * My Library Page
 *
 * 
 *
 */

import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
 import {useIntl} from 'react-intl';
import {fields, fieldsIsNew} from './fields';
import messages from './messages';
// import { FormattedMessage } from 'react-intl';
import {requestLibraryOptionList, requestAccessToLibrary, requestGetMyLibrary} from '../actions'
import makeSelectLibrary from 'containers/Library/selectors';
import {MyLibraryForm} from 'components';
import { CustomForm } from 'components';
import {requestUser, requestGetLibrary, requestGetLibrariesList} from 'containers/Library/actions';

function MyLibraryPage(props) {
  console.log('MyLibraryPage', props)
  const intl = useIntl();
  const {dispatch, match} = props
  const {params} = match
  const isNew = !params.id || params.id === 'new'
  const library = props.library.library
  const patron = props.library.user
  const departmentOptionList = props.library.departmentOptionList 
  const titleOptionList = props.library.titleOptionList
  const libraryOptionList = props.library.libraryOptionList && props.library.libraryOptionList.map(lib =>  {return {value: lib.id, label: lib.name}})
  

  const handleChangeData = (field_name, value) => {
    console.log(field_name, value)
  }

  useEffect(() => {
    if(!isNew) {
      dispatch(requestUser(params.library_id, params.id))
      dispatch(requestGetLibrary(params.library_id,('departments,titles')))
      //TODO chimare getLibraryUser(bib_id,user_id) x ottenere dati della associazione dell'utente alla biblio selezionata
      //e disattivare fields["preferred"] se status!=1
    }else if(isNew){
      dispatch(requestGetLibrariesList())
    }
  }, [])

  useEffect(() => {
    //disabilito la possibilità di modificare il preferred se status!=1
    Object.keys(patron).length > 0 && patron.status!==1 ? fields.preferred.disabled = true : null
  }, [patron])


  return (
    <>
      {!isNew &&
          <CustomForm 
            submitCallBack={(formData) => dispatch(requestUpdateUser({
                ...formData, 
                library_id: params.library_id, 
                id: params.id,
                message: `${intl.formatMessage(messages.statusUpdateMessage)}` })) } 
            requestData={{ 
              name: library.name, 
              label: patron.label,
              preferred: patron.preferred,
              department_id: patron.department_id,
              title_id: patron.title_id, 
              user_referent: patron.user_referent,
              user_mat:patron.user_mat,
              user_service_phone:patron.user_service_phone,
              user_service_email:patron.user_service_email
            }}
            department_id={departmentOptionList} 
            title_id={titleOptionList} 
            fields={fields}
            title={intl.formatMessage(messages.header)}
            messages={messages}
          /> 
      }{isNew && 
          <CustomForm 
            submitCallBack={() => null}
            fields={fieldsIsNew}
            title={intl.formatMessage(messages.header)}
            messages={messages}
            library_id={libraryOptionList}
            onChangeData={(field_name, value) => handleChangeData(field_name, value)}
          /> 
      }
    </>
  );
}

const mapStateToProps = createStructuredSelector({
   
  library: makeSelectLibrary()
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

export default compose(withConnect)((MyLibraryPage));
