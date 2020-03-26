import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {ProjectsList} from 'components'
import {requestGetProjectsList, requestPostProject} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
// import queryString from 'query-string'

const ProjectsListPage = (props) => {
    console.log('ProjectsListPage', props)
    const {dispatch, isLoading, admin, match} = props
    const intl = useIntl();
    const projectsList = admin.projectsList.data
    const pagination = admin.projectsList.pagination
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetProjectsList())
        }
    }, [])

    return (
        <>
        {projectsList.length > 0 &&   
        <ProjectsList 
            projectsList={projectsList}
            pagination={pagination}
            loading={isLoading}
            history={history}
            match={match}
            editPath={'/admin/projects/project/:id?'}
            createProject={formData => dispatch(requestPostProject(formData, 'Project registered'))}
        />
        }
        </>
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

export default compose(withConnect)(ProjectsListPage);
