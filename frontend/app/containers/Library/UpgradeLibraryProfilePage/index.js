/*
 * LibraryStatusPage
 */

import React, {useEffect,useState} from 'react';
import {useIntl} from 'react-intl'
import {createStructuredSelector} from "reselect";
import makeSelectLibrary,{isLibraryLoading} from "../selectors";
import {compose} from "redux";
import { connect } from 'react-redux';
import UpgradeLibraryProfile from '../../../components/Library/UpgradeLibraryProfile';
import {requestGetLibrary} from '../actions';
import confirm from "reactstrap-confirm";
import {requestUpdateLibrary} from '../actions'


function UpgradeLibraryProfilePage(props) {
  console.log('UpgradeLibraryProfilePage', props)
  const {isLoading, match, dispatch,library} = props;

  let intl=useIntl()


  
  useEffect(() => {         
    if(!isLoading){
        dispatch(requestGetLibrary(match.params.library_id))          
    }}, [match.params.library_id])
    
  async function  upgradeProfileCallback  () {
        let conf = await confirm({
       title: intl.formatMessage({id: 'app.global.confirm'}),
        message: intl.formatMessage({id: "app.containers.UpgradeLibraryProfilePage.upgradeProfileConfirm"}),
        confirmText: intl.formatMessage({id: 'app.global.yes'}),
        cancelText: intl.formatMessage({id: 'app.global.no'})
    }); 
    
   //NOTA: questa non va !! + tradurre messaggio  
   if(conf)             
    dispatch(requestUpdateLibrary({profile_type:2, id: match.params.library_id}, intl.formatMessage({id:'app.containers.UpgradeLibraryProfilePage.upgradeProfileSuccessfully'})))
  }
  

  

  return (    
        <UpgradeLibraryProfile auth={props.auth} resource={props.resource} data={library.library} loading={isLoading} upgradeProfileCallback={upgradeProfileCallback}/>    
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

export default compose(withConnect)(UpgradeLibraryProfilePage);

