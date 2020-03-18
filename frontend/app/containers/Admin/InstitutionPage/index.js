/*
 * InstitutionPage
 *
 *
 *
 */

import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import messages from './messages';
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {InstitutionForm} from 'components';
import { requestGetInstitutionTypeOptionList, requestPostInstitution, 
  requestUpdateInstitution ,requestGetCountriesOptionList, requestGetInstitution } from '../actions';


function InstitutionPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const institution = admin.institution
    const institutionsListSelect = admin.institutionsListSelect
    const countriesListSelect = admin.countriesListSelect
    useEffect(() => {
      if(!isLoading){
        dispatch(requestGetInstitutionTypeOptionList())
        dispatch(requestGetCountriesOptionList())
      }
      if(!isLoading && !isNew) {
         dispatch(requestGetInstitution(params.id))
      }
    }, [])


    return (
      <>
        {!isNew && 
            <InstitutionForm 
              updateInstitution={ (formData) => dispatch(requestUpdateInstitution({...formData, id: params.id}, intl.formatMessage(messages.updateSuccess))) } 
              loading={isLoading}
              institution={institution}
              institutionsListSelect={institutionsListSelect}
              countriesListSelect={countriesListSelect}
              searches={{
                country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)),
              }}
            />
        }
        { isNew &&
            <InstitutionForm
              createInstitution={ (formData) => dispatch(requestPostInstitution(formData, intl.formatMessage(messages.createSuccess))) }
              loading={isLoading}
              institutionsListSelect={institutionsListSelect}
              countriesListSelect={countriesListSelect}
              searches={{
                country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)),
              }}
            />
        }
      </>
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

  export default compose(withConnect)(InstitutionPage);
