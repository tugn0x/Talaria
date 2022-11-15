import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import messages from './messages';
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {InstitutionTypeForm, Loader} from 'components';
import { requestPostInstitutionType, 
  requestUpdateInstitutionType , 
  requestGetInstitutionType } from '../actions';


function InstitutionTypePage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const institutiontype = admin.institutiontype
    
    useEffect(() => {
      if(!isLoading && !isNew) 
        dispatch(requestGetInstitutionType(params.id))            
    }, [])


    return (
      <Loader show={isLoading}>
        <InstitutionTypeForm 
          submitFormAction={
            !isNew ? (formData) => dispatch(requestUpdateInstitutionType({...formData, id: params.id}, intl.formatMessage(messages.updateSuccess)))
            : (formData) => dispatch(requestPostInstitutionType(formData, intl.formatMessage(messages.createSuccess)))
          }          
          institutiontype={!isNew? institutiontype : null}                              
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

  export default compose(withConnect)(InstitutionTypePage);
