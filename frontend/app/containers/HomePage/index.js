/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useEffect} from 'react';
import messages from './messages';
/*
import { FormattedMessage } from 'react-intl';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux'; */
import {BasePage} from "components";
import userRoutes from "routes/userRoutes";
import history from 'utils/history';

function HomePage(props) {
  console.log('HomePage', props)  
    
  useEffect(() => {    
    //se l'utente è loggato e non ha abiities=>è solo un patron!
    //e redirect nella sua patron page=>bibliografia
    if(props.isLogged && props.auth && ( (!props.auth.permissions.resources || props.auth.permissions.resources.length==0) && (props.auth.permissions.roles && props.auth.permissions.roles.includes("patron")) ) )
      history.push('/patron/references');     
  },[]) 

  return (
    <>
      <BasePage {...props} routes={userRoutes} messages={messages} >
       <h1 style={{color: 'green'}}>TODO: homepage</h1>
      </BasePage>
    </>
  );
}
/* const mapStateToProps = createStructuredSelector({

});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
 */
// export default withRouter(withGoogleReCaptcha((SignupForm)));
export default HomePage;
