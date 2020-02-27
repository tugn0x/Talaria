import React, {useEffect, useState} from 'react'
import {requestReferencesList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm} from 'components';
import {requestPostReferences} from '../actions'

const ReferencesPage = (props) => {
    const {dispatch, isLoading, location, match} = props
    
    const [isNew, setIsNew] = useState(location.pathname.includes('new'))

    useEffect(() => {
        setIsNew(location.pathname.includes('new'))
    }, [location.pathname])


    useEffect(() => {
        if(!isLoading) {
            // dispatch(requestReferencesList())
        }
    }, [])

    return (
        <>
            <h1>References Page</h1>
            { isNew && 
                <ReferencesForm 
                    loading={isLoading} 
                    createReferences={ (formData) => dispatch(requestPostReferences(formData)) } />
            ||
                <>
                    <h3>References List</h3>
                    <a href={`${match.path}/new`} className="text-link">
                        Create new Reference
                    </a>
                </>
            }
        </>
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
  
export default compose(withConnect)((ReferencesPage));