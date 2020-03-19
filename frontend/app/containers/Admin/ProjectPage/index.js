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
import {requestGetProject, requestUpdateProject, requestPostProject} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {ProjectForm, Loader} from 'components';


function ProjectPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const project = admin.project
    // const projectsList = patron.projectsList
    
    useEffect(() => {
      if(!isLoading && !isNew) {
         dispatch(requestGetProject(params.id))
      }
      // console.log(isLoading)
     }, [])
  
     
    return (
    <Loader show={isLoading}>
        { !isNew && 
            <ProjectForm 
              project={project}
              loading={isLoading}
              updateProject={(formData) => dispatch(requestUpdateProject({...formData, id: params.id}, intl.formatMessage(messages.updateMessage)))}
            /> 
        }
        { isNew && 
            <ProjectForm 
              createProject={ (formData) => dispatch(requestPostProject(formData, intl.formatMessage(messages.createMessage))) } 
              loading={isLoading}
              titleNewProject={intl.formatMessage(messages.titleNewProject)}
            /> 
        }
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
  
  export default compose(withConnect)(ProjectPage);
  