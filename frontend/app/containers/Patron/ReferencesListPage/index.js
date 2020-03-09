import React, {useEffect} from 'react'
import ReferencesList from 'components/Patron/ReferencesList'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {requestPostReferences, requestReferencesList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

const ReferencesListPage = (props) => {
    const {dispatch, isLoading, match, patron} = props
    const referencesList = patron.referencesList

    useEffect(() => {
        if(!isLoading) {
            dispatch(requestReferencesList())
        }
    }, [])

   /*  useEffect(() => {
        if(!isLoading && match.params) {
            dispatch(requestReferencesList(match.params.page))
        }
    }, [match.params]) */

    return (
        <ReferencesList 
            match={match} 
            referencesList={referencesList} 
            pagination={patron.pagination}
            loading={isLoading} 
            editPath={'/patron/references/reference/:id?'}
            createReferences={ (formData) => dispatch(requestPostReferences(formData, "Reference added!")) }
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