/**
 *
 * OpenURLResolver
 *
 */

import React, {useEffect,useState} from 'react';
import { withRouter} from 'react-router-dom';

import { compose } from 'redux';
import {Redirect} from 'react-router-dom'
import resourcesMap from '../../routes/resources';
import {checkRole} from '../../utils/permissions'


export function OpenURLResolver(props) {
  console.log("OpenURLResolver:",props)

  const openurl=(props.history.location.search)? props.history.location.search:null

  console.log("Openurl redirect",openurl);
  //let newurl=null;

  const [redirUrl,setRedirUrl]=useState(null)

  const [mounted,setMounted]=useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {    

   let newurl="/login"

  //it comes from /openurl?xxxx and we want to go in the component specific for
  //the user depending on his roles (so in /patron/references or in library/<libid>/borrowing/)  
  //TODO: in case of multiple roles/resources we should load the "latest used"/preferred dashboard/database
  //otherwise it will be redirected to login page
  //Eventually we can redirect to landing page (with multiple roles) and let user to choose the preferred dashboard in which
  //import the reference
  if(props.isLogged && openurl!=null)
  {        
    //he's a patron
    if( (!props.auth.permissions.resources || props.auth.permissions.resources.length==0) && (props.auth.permissions.roles && props.auth.permissions.roles.length==2 && checkRole(props.auth,"patron")) ) 
        newurl="/patron/references/openurl"+openurl        
    else if (props.auth.permissions.resources && (Object.keys(props.auth.permissions.resources).length==1))    
    {      
        //if he has only one resources => redirect to "specific resource" dashboard
        let res="";
        let resid="";
        
        if(props.auth.permissions.resources.libraries)
        {
            res="libraries";
            resid=props.auth.permissions.resources.libraries[0].resource.id;        

            newurl=resourcesMap[res]+resid+"/borrowing/openurl"+openurl;
        }       
    }    

    //console.log("NEWURL:",newurl)    
    setRedirUrl(newurl)
  
   }         
  }, [props.isLogged])


  //main
  return (
    <>
    {mounted && props.isLogged && openurl!=null && redirUrl!=null && <Redirect to={redirUrl}/>
    }  
    </>
  )
    
}





export default compose(withRouter)(OpenURLResolver);
