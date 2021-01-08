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
import makeSelectLibrary from 'containers/Library/selectors';
import { CustomForm } from 'components';
import {requestUser,requestGetLibrary, requestGetLibrariesList} from 'containers/Library/actions';
import {requestAccessToLibrary,requestUpdateAccessToLibrary} from '../actions';

function MyLibraryPage(props) {
  console.log('MyLibraryPage', props)
  const intl = useIntl();
  const {dispatch, match} = props
  const {params} = match
  const isNew = !params.id || params.id === 'new'
  const library = props.library.library
  const patron = props.library.user;
  const user_id = props.auth.user.id;
  const departmentOptionList = props.library.departmentOptionList 
  const titleOptionList = props.library.titleOptionList
  const libraryOptionList = props.library.libraryOptionList && props.library.libraryOptionList.map(lib =>  {return {value: lib.id, label: lib.name}})
  

  const handleChangeData = (field_name, value) => {
    if(field_name==="library_id" && value)
      dispatch(requestGetLibrary(value.value,('departments,titles')))
    //NOTA: le tendine dipartimenti e titles dovrebbero essere REQUIRED solo se sono piene
    //Stiamo valutando come implementarlo xke' al momento anche se si modifica il fields.x.required
    //al volo, non viene renderizzato nuovamente il componente, inoltre
    //le tendine sono generate usando un plugin quindi non è immediato modificarne il required
    //tramite DOM JS vanilla  
    /*if(isNew)
    {
      //Faccio comparire le tendine di selezione Department_id e Title_id
      fieldsIsNew.department_id.hidden=false;

      //if (library.departments.length>0)
      //fieldsIsNew.department_id.required=true;

      fieldsIsNew.title_id.hidden=false;
      //if (library.titles.length>0)
      //fieldsIsNew.title_id.required=true;    
    
    }*/
  }

  useEffect(() => {
    if(!isNew) {
      dispatch(requestUser(params.library_id, params.id))
      dispatch(requestGetLibrary(params.library_id,('departments,titles')))      
    }else if(isNew){
      dispatch(requestGetLibrariesList())
    }
  }, [])

  useEffect(() => {
    //disabilito la possibilità di modificare il preferred 
    //Object.keys(patron).length > 0 ? fields.preferred.disabled = true : null
  }, [patron])

  
  /*useEffect(() => {
    //console.log("DIP",document.getElementsByName('department_id'));
    //getElById([name=department_id).required=true
  }, [library])*/

  return (
    <>
      {!isNew &&
          <CustomForm 
            submitCallBack={(formData) => dispatch(requestUpdateAccessToLibrary({
                ...formData, 
                library_id: params.library_id, 
                id: params.id,
                message: `${intl.formatMessage(messages.libraryUpdateMessage)}` })
                ) } 
            requestData={{ 
              name: library.name, 
              label: patron.label,
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
            submitCallBack={(formData) => dispatch(requestAccessToLibrary(
            {...formData, user_id},intl.formatMessage(messages.libraryCreateMessage)))} 
            fields={fieldsIsNew}
            department_id={departmentOptionList} 
            title_id={titleOptionList} 
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
