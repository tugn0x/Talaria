import React, {useEffect} from 'react'
import ReferencesList from 'components/Patron/ReferencesList'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {requestPostReferences, requestReferencesList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

const ReferencesListPage = (props) => {
    console.log('ReferencesListPage', props)
    const {dispatch, isLoading, match, patron} = props
    const referencesList = patron.referencesList.data
    const pagination = patron.referencesList.pagination
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestReferencesList())
        }
    }, [])

    return (
        referencesList.length > 0 &&
        <ReferencesList 
            match={match} 
            referencesList={referencesList} 
            pagination={pagination}
            // loading={isLoading} 
            editPath={'/patron/references/reference/:id?'}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isPatronLoading(),
    patron: makeSelectPatron()
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

export default compose(withConnect)(ReferencesListPage);