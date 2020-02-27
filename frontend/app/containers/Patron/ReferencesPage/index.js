import React, {useEffect, useState} from 'react'
import {requestReferencesList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm} from 'components';
import {requestPostReferences} from '../actions'

const ReferencesPage = (props) => {
    const {dispatch, isLoading, location, match, patron} = props
    const referencesList = patron.referencesList
    
    const [isNew, setIsNew] = useState(location.pathname.includes('new'))
    // const [isSingle, setIsSingle] = useState(match.params)

    useEffect(() => {
        setIsNew(location.pathname.includes('new'))
    }, [location.pathname])


    useEffect(() => {
        if(!isLoading) {
            dispatch(requestReferencesList())
        }
       // console.log(match)
    }, [])


    useEffect(() => {
        
       // console.log(location)
    })

    return (
        <>
            <h1>References Page</h1>
            { isNew && 
                <ReferencesForm 
                    loading={isLoading} 
                    createReferences={ (formData) => dispatch(requestPostReferences(formData)) } />
            ||
                <>
                    <a href={`patron/references/new`} className="text-link">
                        Create new Reference
                    </a>
                    <h3>References List</h3>
                    <div className="referencesList">
                        <ul>
                        {referencesList.length > 0 &&
                            referencesList.map(reference => (
                                <li key={reference.id}>
                                    <a href={`patron/references/${reference.id}`}>
                                        {reference.pub_title}
                                    </a>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
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