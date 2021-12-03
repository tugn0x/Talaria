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
//import userRoutes from "routes/userRoutes";
import history from 'utils/history';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import OASearchReference from '../OASearchReference';
import {generateOpenURL} from '../../utils/openurl';

//import FindOA from '../../components/FindOA'

function HomePage(props) {
  console.log('HomePage', props)  
  const intl=useIntl();

  const foundOA=(reference)=> {
    console.log("OA import:",reference)
  }

  //import reference data by creating a "custom OpenURL" (openurl with extra parameters)
  const customImportURL = (refdata) => {
    console.log("customImportURL",refdata)
    let customURL="/newreference";   //if no data=>will go to empty form             
    if(refdata && refdata!=null && Object.keys(refdata).length>0)
    {
      //if data, builds new URL to import 
      
      customURL=generateOpenURL(refdata);    
        
        //extraparams
        if(refdata.oa_link && refdata.oa_link!="" && refdata.oa_link!=null)
          customURL+="&oa_link="+encodeURIComponent(refdata.oa_link);
    }
    
    history.push(customURL);
}

  
  return ( //if registered or has many roles/abilities
    <>
      <BasePage {...props} routes={[]} messages={messages} >
       <h1 style={{color: 'green'}}>{intl.formatMessage({id:'app.containers.HomePage.header'})}</h1>
       <h3 style={{color: 'gray'}} className="mb-5">{intl.formatMessage({id:'app.containers.HomePage.subHeader'})}</h3>
       
      <br/>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      <br/>      
      <a className="btn btn-secondary" href={"https://"+process.env.FRONTEND_DOMAIN+"/openurl?url_ver=Z39.88-2004&url_ctx_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Actx&rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&rft.atitle=Acoustic%2C+volumetric%2C+and+spectroscopic+studies+of+formamide+with+2-alkoxyethanols+at+different+temperatures&rft.aufirst=Anjali&rft.aulast=Awasthi&rft.date=2012&rft.epage=151&rft.genre=article&rft.issn=0021-9614&rft.jtitle=JOURNAL+OF+CHEMICAL+THERMODYNAMICS&rft.pages=144-151&rft.spage=144&rft.stitle=J+CHEM+THERMODYN&rft.volume=53&rfr_id=info%3Asid%2Fwww.isinet.com%3AWoK%3AWOS&rft.au[]=Awasthi%2C+Aashees&rft_id[]=info%3Adoi%2F10.1016%2Fj.jct.2012.04.024"}>TEST OPENURL</a> <a className="btn btn-secondary" href={"https://"+process.env.FRONTEND_DOMAIN+"/openurl?sid=Entrez:PubMed&id=pmid:29120751"}>TEST PUBMED</a><br/>
      <br/>
      <OASearchReference           
        onFound={(reference)=>foundOA(reference)}        
        showReference={true}
        goToForm={(oareference)=>customImportURL(oareference)}         
      />      
      <br/>      

      </BasePage>
    </>
  );
}


const mapStateToProps = createStructuredSelector({  
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
