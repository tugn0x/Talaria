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
      dispatch(requestGetLibrary(match.params.library_id,'departments'))
    //}
  }, [match.params.library_id])


  useEffect(() => { 
        
    if(library && library.library.id>0) 
    {    
      let libraryRoutes=libroutes               
      
      console.log("libraryRoutes PRIMA",libraryRoutes)          
      console.log("libraryRoutes CHECK",library.library.status )          

        //filter library dashboard menu/route based on profile type (1=borrow, 2=borrow+lending)  
        if(library.library.profile_type==1) //only borrowing 
        {
          //remove lending
          libraryRoutes=libraryRoutes.filter( (route)=> {        
            return route.path!="/lending" 
          });                                     
        }     

        //filter library dashboard menu/route based on status + block route
        //BUG: Questo filtro non funziona xke' arriva qui che library è null!!!
        if(library.library.status!=1 && library.library.status!=2) //enabled or renewing
        {
          //remove all but not MyLibrary menu-item        
          libraryRoutes=libraryRoutes.filter( (route)=> {        
            return route.name=="MyLibrary" 
          });                    

          //remove all MyLibrary sub-items except LibraryStatus
          if(libraryRoutes.length==1 && libraryRoutes[0].name=="MyLibrary") 
            libraryRoutes[0].children=libraryRoutes[0].children.filter( (child) => {
              return (child.name=="LibraryStatus"||child.name=="Subscriptions")
            })
          
        }

        //console.log("libraryRoutes DOPO",libraryRoutes)      
        
        setIsMounted(true)    
        setFilteredRoutes(libraryRoutes);                 
    
      }  
    
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
