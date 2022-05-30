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
import libroutes from "routes/libraryRoutes";
import {requestGetLibrary} from '../actions'
import {getAuthResource} from "utils/permissions";

function LibraryPage(props) {
  console.log('LibraryPage', props)
  const {isLoading, match, dispatch,library} = props;

  const resource = getAuthResource(props.auth, {
    type: 'libraries',
    id: match.params.library_id,
  })

  const [filteredRoutes,setFilteredRoutes]=useState(libroutes)

  const [mounted,setIsMounted]=useState(false);

  useEffect(() => {
    //if(!isLoading){
      dispatch(requestGetLibrary(match.params.library_id,'titles,departments'))
    //}
  }, [match.params.library_id])


  //filter library dashboard menu/route based on profile type (1=borrow, 2=borrow+lending)
  useEffect(() => { 
    console.log("libraryRoutes routes",libroutes)
    let libraryRoutes=libroutes    
    
    console.log("libraryRoutes PRIMA",libraryRoutes)
      if(library.library.profile_type==1) //only borrowing
      {
        //remove lending
        libraryRoutes=libraryRoutes.filter( (route)=> {        
          return route.path!="/lending" 
        });                                     
      }  
      
      /* TODO FIX: this doesn't work after switch to another library and back to another) but we've to implement manage_patron field*/
      if(library.library.manage_patrons==0) //not manage patrons
      {      
        //remove patrons related menu items
        libraryRoutes=libraryRoutes.filter( (route)=> {
          return (
            route.path!="/delivery" &&
            route.path!="/patrons"
          )}
        );

        libraryRoutes.forEach(function(route, index) {
        console.log("libraryRoutes DENTRO",route)  
        if (route.path == '/manage' && route.children) {          
          let route2=route;
          route2.children=route2.children.filter ( (subroute) => 
          {
            return (
              subroute.path!="/departments" &&
              subroute.path!="/pickup"              
            )
          })
          libraryRoutes[index]=route2
        }        
      }) 
      console.log("libraryRoutes DOPO",libraryRoutes)                                
      }
      
      setFilteredRoutes(libraryRoutes);            
      setIsMounted(true)
    
  }, [library && library.library.id])

  

  

  return (
    <>
      {mounted && <BasePage {...props} routes={filteredRoutes} messages={messages} resource={resource} />}
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
