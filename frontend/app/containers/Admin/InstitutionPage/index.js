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
// import {fields} from './fields';
// import messages from './messages';
import { FormattedMessage } from 'react-intl';
// import {requestGetLibrary, requestUpdateLibrary, requestPostLibrary} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {CustomForm, InstitutionForm} from 'components';
import { requestInstitutionTypeOptionList, requestPostInstitution, requestGetCountriesOptionList } from '../actions';


function InstitutionPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const institution = admin.institution
    const institutionsListSelect = admin.institutionsListSelect
    const countriesListSelect = admin.countriesListSelect
    useEffect(() => {
      if(!isLoading && !isNew) {
         // dispatch(requestGetLibrary(params.id))
      }else if(!isLoading && isNew){
        dispatch(requestInstitutionTypeOptionList())
        dispatch(requestGetCountriesOptionList())
      }
    }, [])


    return (
      <>
        {/* !isNew &&
            <LibraryForm
              library={library}
              loading={isLoading}
              updateLibrary={(formData) => dispatch(requestUpdateLibrary({...formData, id: params.id}, intl.formatMessage(messages.updateMessage)))}
            />  */
        }
        { isNew &&
            <InstitutionForm
              createInstitution={ (formData) => dispatch(requestPostInstitution(formData)) }
              loading={isLoading}
              institutionsListSelect={institutionsListSelect}
              countriesListSelect={countriesListSelect}
              // searchCustomSelect={(input) => dispatch(requestInstitutionTypeOptionList(input))}
              searches={{
                country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                institution_type_id: (input) => dispatch(requestInstitutionTypeOptionList(input)),
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
