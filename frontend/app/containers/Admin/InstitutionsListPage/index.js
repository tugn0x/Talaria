import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {InstitutionsList} from 'components'
import {requestGetInstitutionsList, requestPostInstitution} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';

const InstitutionsListPage = (props) => {
    console.log('InstitutionsListPage', props)
    const {dispatch, isLoading, admin, match} = props
    const intl = useIntl();
    const institutionsList = admin.institutionsList.data
    const pagination = admin.institutionsList.pagination
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetInstitutionsList())
        }
    }, [])

    return (
        <>
            {institutionsList.length > 0 &&
                <InstitutionsList 
                    institutionsList={institutionsList}
                    pagination={pagination}
                    match={match}
                    editPath={'/admin/institutions/institution/:id?'}
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

export default compose(withConnect)(InstitutionsListPage);


