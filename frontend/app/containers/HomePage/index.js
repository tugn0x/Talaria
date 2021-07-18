/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useEffect,useState} from 'react';
import messages from './messages';
/*
import { FormattedMessage } from 'react-intl';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux'; */
import {BasePage} from "components";
import userRoutes from "routes/userRoutes";
import history from 'utils/history';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../Patron/selectors';
//import MyLibrariesList from '../../components/Patron/MyLibrariesList';
import MyLibrariesListPage from '../Patron/MyLibrariesListPage/Loadable';
import libmessages from '../Patron/MyLibrariesListPage/messages'; 
import { NavLink } from 'react-router-dom';
import resourcesMap from '../../routes/resources';
import {useIntl} from 'react-intl';
import RegisterLibrary from '../RegisterLibrary'
import MyLibraryPage from '../Patron/MyLibraryPage'

function HomePage(props) {
  console.log('HomePage', props)  
  const {dispatch, isLoading, patron,match} = props;
  const librariesList = patron.my_libraries.data;
  const DisplayPatronTab=(process.env.MANAGE_PATRONS && process.env.MANAGE_PATRONS=="true")?true:false; 
  const [PatronReg,setPatronReg]=useState (true);
  const togglePatronReg = () => {setPatronReg(true); setLibraryReg(false);}
  const [LibraryReg,setLibraryReg]=useState (!DisplayPatronTab);

  
  const toggleLibraryReg = () => {setLibraryReg(true); setPatronReg(false);}

  const intl=useIntl();
    
  useEffect(() => { 
    //if super-admin       
    if(props.isLogged && props.auth && ( props.auth.permissions.roles && props.auth.permissions.roles.includes("super-admin")) )  
      history.push('/admin'); 
    //if user has no abilities=>is just a patron
    //so redirect in patron home page (bibliography)
    else  if(props.isLogged && props.auth && ( (!props.auth.permissions.resources || props.auth.permissions.resources.length==0) && (props.auth.permissions.roles && props.auth.permissions.roles.length==2 && props.auth.permissions.roles.includes("patron")) ) )
      history.push('/patron/references');         
    else if (props.auth.permissions.resources && (Object.keys(props.auth.permissions.resources).length==1))    
    {      
      //if it has only one resources redirect to "specific resource" dashboard
      let res="";
      let resid="";
      
      if(props.auth.permissions.resources.libraries)
      {
        res="libraries";
        resid=props.auth.permissions.resources.libraries[0].resource.id;        
      }
      else if(props.auth.permissions.resources.institutions)
      {
        res="institutions";
        resid=props.auth.permissions.resources.institutions[0].resource.id;        
      }
      //else if (projects,consortiums ....)
      
      if(res!="")
        history.push(resourcesMap[res]+resid);
    }
  },[]) 
libmessages
  return ( //if registered or has many roles/abilities
    <>
      <BasePage {...props} routes={userRoutes} messages={messages} >
       <h1 style={{color: 'green'}}>{intl.formatMessage({id:'app.containers.HomePage.header'})}</h1>
       <h3 style={{color: 'gray'}} className="mb-5">{intl.formatMessage({id:'app.containers.HomePage.subHeader'})}</h3>
       {props.auth.permissions.roles.includes("registered") && 
       (!props.auth.permissions.resources || props.auth.permissions.resources.length==0) && 
       <>
       <p>{intl.formatMessage({id:'app.containers.HomePage.intro1'})}</p>       
       <p>{intl.formatMessage({id:'app.containers.HomePage.intro2'})}</p>       
       <p>{intl.formatMessage({id:'app.containers.HomePage.intro3'})}</p>       
       <nav>
       { DisplayPatronTab === true ? (
       <NavLink
              className="btn btn-primary mx-3"
              key="associateLib"                                            
              isActive={()=>PatronReg}         
              onClick={(e)=>togglePatronReg()}      
              to="#"        
        >{intl.formatMessage({id:'app.global.patron'})}</NavLink>
        ):(<span></span>)}<NavLink
              className="btn btn-primary mx-3"
              key="registernewlibrary"                                          
              isActive={()=>LibraryReg}        
              to="#"        
              onClick={(e)=>toggleLibraryReg()}            
        >{intl.formatMessage({id:'app.global.librarian'})}</NavLink>           
        </nav>
        {/* TODO 
          - must be able to preselect library reading from url (also for patrons and new users without roles)
        */}
         {PatronReg && DisplayPatronTab && <MyLibraryPage match={match}  auth={props.auth}/>}
         {LibraryReg && <RegisterLibrary {...props.auth} headermenu={false} /> }  
         
        
        </>
       ||
       <>
       <p>You've multiple roles, please choose one from below</p>
        Roles List:
        <ul>
          <li>Role 1</li>
          <li>Role 2</li>
          <li>Role 3</li>
        </ul>
      </>}



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
//export default HomePage;


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

export default compose(withConnect)(HomePage);
