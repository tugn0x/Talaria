import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {SimpleList} from 'components'
import {requestGetInstitutionTypeList, requestPostLibrary} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
// import queryString from 'query-string'
import {LibraryForm} from 'components';
import messages from "./messages";

const InstitutionTypeListPage = (props) => {
    console.log('InstitutionTypeListPage', props)
    const {dispatch, isLoading, admin, match, location, history} = props
    const {path} = match
    const intl = useIntl();
    const institutionTypes = admin.institutionTypes

    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetInstitutionTypeList())
        }
    }, [])

    return (
        <SimpleList
            data={institutionTypes}
            columns={[
              'id', 'name'
            ]}
            loading={isLoading}
            history={history}
            path={path}
            match={match}
            title={intl.formatMessage(messages.header)}
            editPath={'/admin/institutions/institution-types/type/:id?'}

            formNewComponet={
              <LibraryForm
                createItem={formData => dispatch(requestPostLibrary(formData, 'Institution type registered'))}
                loading={isLoading}
                titleNewLibrary={'New Library'}
              />}
        />
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

export default compose(withConnect)(InstitutionTypeListPage);
