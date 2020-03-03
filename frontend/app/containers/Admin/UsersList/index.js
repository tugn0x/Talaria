import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import UsersListTable from 'components/Admin/UsersListTable'

const UsersList = (props) => {
    console.log('UsersList', props)
    /* const {dispatch, isLoading, location, match, patron} = props
    const referencesList = patron.referencesList */
    
   /*  const [isNew, setIsNew] = useState(location.pathname.includes('new'))
    const [currentReference, setCurrentReference] = useState({}) */
    // const [isSingle, setIsSingle] = useState(match.params)
    const intl = useIntl();

   /*  useEffect(() => {
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
    }, [referencesList]) */
    
    return (
        <>
            <UsersListTable />    
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    // isLoading: isPatronLoading(),
   // patron: makeSelectPatron()
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
  
export default compose(withConnect)(UsersList);