/*
 * Library Page
 *
 *
 *
 */

import React, {useEffect,useState} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import messages from './messages';

import {requestUpdateLibrary,requestGetLibrary,requestPostLibrary,requestGetCountriesOptionList,requestLibrarySubjectOptionList,
  requestGetInstitutionsOptionList} from '../actions';

import makeSelectLibrary,{isLibraryLoading,countriesOptionListSelector, librarySubjectOptionListSelector,institutionsOptionListSelector} from '../selectors';
import {MyLibraryForm, Loader} from 'components';

//NB sto usando reducer/saga/action dell'ADMIN !

function ManageLibraryPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, data,match,countriesOptionList,librarySubjectOptionList,institutionsOptionList} = props
    const {params} = match
    const isNew = !params.library_id || params.library_id === 'new'
    const library = data.library
    // const libraryOptionList = patron.libraryOptionList

    useEffect(() => {
      if(!isLoading){
        if(!isNew) {
          dispatch(requestGetLibrary(params.library_id))
        }
        dispatch(requestGetCountriesOptionList())        
        dispatch(requestGetInstitutionsOptionList())
        dispatch(requestLibrarySubjectOptionList())
      }
     }, [])


    return (
      <Loader show={isLoading}>
          <MyLibraryForm
            library={!isNew ? library : null}
            loading={isLoading}
            institutionsOptionList={props.institutionsOptionList}
            countriesOptionList={props.countriesOptionList}
            librarySubjectOptionList={props.librarySubjectOptionList}
            searches={{             
              institution_id: (input) => dispatch(requestGetInstitutionsOptionList(input)),
              country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
              subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input))
            }}
            //resources={data.resources.libraries}
            titleNewLibrary={isNew ? intl.formatMessage(messages.titleNewLibrary) : ""}
            submitFormAction={
                !isNew ? (formData) => dispatch(requestUpdateLibrary({...formData, id: params.library_id}, intl.formatMessage(messages.updateMessage)))
                : (formData) => dispatch(requestPostLibrary(formData, intl.formatMessage(messages.createMessage)))
              }
          />
      </Loader>
    );
  }


  const mapStateToProps = createStructuredSelector({
    isLoading: isLibraryLoading(),
    data: makeSelectLibrary(),
    countriesOptionList: countriesOptionListSelector(),
    librarySubjectOptionList: librarySubjectOptionListSelector(),
    institutionsOptionList: institutionsOptionListSelector(),
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
