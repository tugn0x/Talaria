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
import {fields} from './fields';
import messages from './messages';
// import { FormattedMessage } from 'react-intl';
import {requestLibraryOptionList, requestAccessToLibrary, requestGetMyLibrary} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {MyLibraryForm} from 'components';
import { CustomForm } from 'components';
import {requestUser} from '../../Library/actions';

function MyLibraryPage(props) {
  console.log("MyLibraryPage",props)
  const intl = useIntl();
  const {isLoading, dispatch, patron, match} = props
  const {params} = match
  const isNew = !params.id || params.id === 'new'
  const library = patron.library
  //const libraryOptionList = patron.libraryOptionList
  
  //NB: in params c'e' l'id della relazione library_users
  useEffect(() => {
    if(!isLoading && !isNew) {

      if(patron.status!==1) 
        fields.preferred.disabled=true; //disattivo la modifica del preferito se lo stato nn è attivo
      
        //dispatch(requestGetMyLibrary(params.id))
        dispatch(requestUser(library.id, params.id))
      
      //TODO chimare getLibraryUser(bib_id,user_id) x ottenere dati della associazione dell'utente alla biblio selezionata
      //e disattivare fields["preferred"] se status!=1
    }/*else if(!isLoading && isNew){
      dispatch(requestLibraryOptionList())
    }*/
  }, [])

   
  return (
    
    <>
    {console.log("FIELD:",fields)}
    {patron && Object.keys(patron).length && !isLoading &&
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
          // qui si carica la lista della option list. Se vuoi una lista che venga dal back.
          // E nei fields.js in options: del campo metti lo stesso nome della prop quindi department_id
          department_id={library.departmentOptionList} 
          title_id={library.titleOptionList} 
          fields={fields}
          title={intl.formatMessage(messages.header)}
          messages={messages}
        />
      }
      {/* !isNew && 
        <MyLibraryForm 
          library={library}
          loading={isLoading}
        /> */
      }
  </>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: isPatronLoading(),
  patron: makeSelectPatron()
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
