import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import messages from './messages';
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {InstitutionForm, Loader} from 'components';
import { requestGetInstitutionTypeOptionList, requestPostInstitution, 
  requestUpdateInstitution , 
  requestGetCountriesOptionList, requestGetInstitution } from '../actions';


function InstitutionPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const institution = admin.institution
    const institutionsTypesOptionList = admin.institutionsTypesOptionList
    const countriesOptionList = admin.countriesOptionList
    useEffect(() => {
      if(!isLoading && !isNew) 
        dispatch(requestGetInstitution(params.id))
      

      if(!isLoading){
        dispatch(requestGetInstitutionTypeOptionList())
        dispatch(requestGetCountriesOptionList())                
      }      
    }, [])


    return (
      <Loader show={isLoading}>
        <InstitutionForm 
          submitFormAction={
            !isNew ? (formData) => dispatch(requestUpdateInstitution({...formData, id: params.id}, intl.formatMessage(messages.updateSuccess)))
            : (formData) => dispatch(requestPostInstitution(formData, intl.formatMessage(messages.createSuccess)))
          }          
          institution={!isNew? institution : null}
          institutionsTypesOptionList={institutionsTypesOptionList}
          countriesOptionList={countriesOptionList}                    
          searches={{
            country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
            institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)),          
          }}
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

  export default compose(withConnect)(InstitutionPage);
