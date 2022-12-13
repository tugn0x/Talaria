/*
 * LibraryStatusPage
 */

import React, {useEffect,useState} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {createStructuredSelector} from "reselect";
import makeSelectLibrary,{isLibraryLoading} from "../selectors";
import {compose} from "redux";
import { connect } from 'react-redux';
import LibraryStatus from '../../../components/Library/LibraryStatus';
import {requestGetLibrary} from '../actions';


function LibraryStatusPage(props) {
  console.log('LibraryStatusPage', props)
  const {isLoading, match, dispatch,library} = props;

  const managePath='/library/'+match.params.library_id+"/manage";

  
  useEffect(() => {         
    if(!isLoading){
        dispatch(requestGetLibrary(match.params.library_id))          
    }}, [match.params.library_id])

  

  

  return (    
        <LibraryStatus managePath={managePath} data={library.library} loading={isLoading}/>    
  );
}
const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
  isLoading: isLibraryLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LibraryStatusPage);

