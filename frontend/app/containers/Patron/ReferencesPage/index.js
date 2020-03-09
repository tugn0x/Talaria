import React, {useEffect, useState} from 'react'
import {requestReferencesList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm, ReferencesList} from 'components';
import {requestPostReferences,requestUpdateReferences} from '../actions'
import messages from './messages'
import {useIntl} from 'react-intl';


const ReferencesPage = (props) => {
    const {dispatch, isLoading, location, match, patron} = props
    const referencesList = patron.referencesList
    
    const [isNew, setIsNew] = useState(location.pathname.includes('new'))
    const [currentReference, setCurrentReference] = useState({})
    // const [isSingle, setIsSingle] = useState(match.params)
    const intl = useIntl();

    useEffect(() => {
        setIsNew(location.pathname.includes('new'))
    }, [location.pathname])


    useEffect(() => {
        if(!isLoading && !isNew) {
            dispatch(requestReferencesList())
        }
    }, [])

    useEffect(() => {
        if(!isNew && match.params.id){
            setCurrentReference(referencesList.filter(reference => reference.id === parseInt(match.params.id))[0])
        }
    }, [referencesList])
    
    return (
        <>
            {isNew && 
                <ReferencesForm 
                    loading={isLoading} 
                    createReferences={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) } />
            ||  !isNew && match.params.id && 
                <>
                    { currentReference && Object.keys(currentReference).length > 0 &&
                        <ReferencesForm 
                            currentReference={currentReference}
                            loading={isLoading} 
                            updateReferences={ (formData) => dispatch(requestUpdateReferences(formData, match.params.id, `${intl.formatMessage(messages.referenceUpdate)}`)) } />
                    }
                </>
            ||
                <ReferencesList 
                    match={match} 
                    referencesList={referencesList} 
                    loading={isLoading} 
                    createReferences={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) }
                />
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