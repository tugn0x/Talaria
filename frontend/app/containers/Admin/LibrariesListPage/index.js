import React, {useEffect} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {LibrariesList} from 'components'
import {requestGetLibrariesList, requestPostLibrary} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
// import queryString from 'query-string'

const LibrariesListPage = (props) => {
    console.log('LibrariesListPage', props)
    const {dispatch, isLoading, admin, match} = props
    const intl = useIntl();
    const librariesList = admin.librariesList.data
    const pagination = admin.librariesList.pagination
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetLibrariesList())
        }
    }, [])

    return (
        <LibrariesList 
            librariesList={librariesList}
            pagination={pagination}
            history={history}
            match={match}
            editPath={'/admin/libraries/library/:id?'}
            getSearchList={(query) => dispatch(requestGetLibrariesList(null, query))}
            createLibrary={formData => dispatch(requestPostLibrary(formData, 'Library registered'))}
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

export default compose(withConnect)(LibrariesListPage);
