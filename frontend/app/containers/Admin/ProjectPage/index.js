/*
 * Project Page
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
import { FormattedMessage } from 'react-intl';
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {ProjectForm, Loader} from 'components';
import { requestGetProject, requestUpdateProject, requestPostProject, 
  requestUsersOptionList, requestGetRoles } from '../actions';



function ProjectPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const project = admin.project
    
    useEffect(() => {
      if(!isLoading && !isNew) {
        dispatch(requestGetProject(params.id))
     }
     if(!isLoading){
        dispatch(requestGetRoles())
        dispatch(requestUsersOptionList())
      }
      // console.log(isLoading)
     }, [])
  
     
    return (
    <Loader show={isLoading}>
      <ProjectForm 
      project={!isNew ? project : null}
      loading={isLoading}
      usersOptionList={admin.usersOptionList}
      searches={{ 
        usersOptionList: (input) => dispatch(requestUsersOptionList(input)),
      }}
      resources={admin.resources.projects}
      titleNewProject={isNew ? intl.formatMessage(messages.titleNewProject) : ""}
      submitFormAction={
          !isNew ? (formData) => dispatch(requestUpdateProject({...formData, id: params.id}, intl.formatMessage(messages.updateMessage)))
          : (formData) => dispatch(requestPostProject(formData, intl.formatMessage(messages.createMessage)))
        }
    />
    </Loader>

    )
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
  
  export default compose(withConnect)(ProjectPage);
  