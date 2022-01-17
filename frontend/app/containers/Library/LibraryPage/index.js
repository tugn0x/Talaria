/*
 * LibraryPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect,useState} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {createStructuredSelector} from "reselect";
import makeSelectLibrary,{isLibraryLoading} from "../selectors";
import {compose} from "redux";
import { connect } from 'react-redux';
import {BasePage} from "components";
import libraryRoutes from "routes/libraryRoutes";
import {requestGetLibrary} from '../actions'
import {getAuthResource} from "utils/permissions";

function LibraryPage(props) {
  console.log('LibraryPage', props)
  const {isLoading, match, dispatch,library} = props;

  const resource = getAuthResource(props.auth, {
    type: 'libraries',
    id: match.params.library_id,
  })

  const [filteredRoutes,setFilteredRoutes]=useState(libraryRoutes)

  useEffect(() => {
    if(!isLoading){
      dispatch(requestGetLibrary(match.params.library_id,'titles,departments'))
    }
  }, [match.params.library_id])


  //filter library dashboard menu/route based on profile type (1=borrow, 2=borrow+lending)
  useEffect(() => {        
    if(library.library.profile_type==1) //only borrowing
    {
      //remove lending
      setFilteredRoutes(libraryRoutes.filter( (route)=> {
        return route.name!="Lending"
      }));            
    }    
  }, [library])

  

  return (
    <>
      <BasePage {...props} routes={filteredRoutes} messages={messages} resource={resource} />
    </>
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

// export default withRouter(withGoogleReCaptcha((SignupForm)));
export default compose(withConnect)(LibraryPage);
