/*
 * My Library Page
 *
 * 
 *
 */

import React, {useEffect,useState} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
 import {useIntl} from 'react-intl';
import {fields, fieldsIsNew} from './fields';
import messages from './messages';
import makeSelectLibrary from 'containers/Library/selectors';
import SectionTitle from 'components/SectionTitle';
import { CustomForm } from 'components';
import {requestUser,requestGetLibrary} from 'containers/Library/actions';
import {requestAccessToLibrary,requestUpdateAccessToLibrary,requestSearchPlacesByText,requestGetLibraryListNearTo} from '../actions';
import { placesSelector,libraryListSelector } from '../selectors';

import {NavLink} from 'react-router-dom';

//TODO: 

//1. find a way to pass library_id for "new registration"
//in order to let user to subscribe directly to that library already setted
//(display library name, not map)

//2. find a way to allow search library by name (calling getLibraryOptionList)
//and store the selected library in the library_id field

function MyLibraryPage(props) {
  console.log('MyLibraryPage', props)
  const intl = useIntl();
  const {dispatch, match} = props
  const {params} = match
  const isNew = !params || !params.id || params.id === 'new'
  const library = props.library.library
  const patron = props.library.user;
  const user_id = props.auth.user.id;
  const departmentOptionList = props.library.departmentOptionList 
  const titleOptionList = props.library.titleOptionList
  //const libraryOptionList = props.libraryOptionList && props.libraryOptionList.map(lib =>  {return {value: lib.id, label: lib.name}})  

  const handleChangeData = (field_name, value) => {
    //Usato per aggiornare le tendine con dipartimenti/... un base alla biblio scelta
    if(field_name==="library_id" && value)
      dispatch(requestGetLibrary(value,('departments,titles')))
    
    //NOTA: le tendine dipartimenti e titles dovrebbero essere REQUIRED solo se sono piene
    //Stiamo valutando come implementarlo xke' al momento anche se si modifica il fields.x.required
    //al volo, non viene renderizzato nuovamente il componente, inoltre
    //le tendine sono generate usando un plugin quindi non è immediato modificarne il required
    //tramite DOM JS vanilla  
    /*if(isNew)
    {
      //Faccio comparire le tendine di selezione Department_id e Title_id
      fieldsIsNew.department_id.hidden=false;

      //if (library.departments.length>0)
      //fieldsIsNew.department_id.required=true;

      fieldsIsNew.title_id.hidden=false;
      //if (library.titles.length>0)
      //fieldsIsNew.title_id.required=true;    
    
    }*/
  }

  const [selectedMarker,setSelectedMarker]=useState({});

  useEffect(() => {
    if(params && params.library_id)
    {
      console.log("GET LIB:",params.library_id)
      dispatch(requestGetLibrary(params.library_id,('departments,titles')))      
    }
    if(!isNew && params && params.library_id) {
      dispatch(requestUser(params.library_id, params.id))
      //dispatch(requestGetLibrary(params.library_id,('departments,titles')))      
    }
  }, [])

  useEffect(() => {
      let obj={
        'id': library.id,
        'name': library.name,
        'address': library.address,
        'lat': library.lat,
        'lon': library.lon,
      }
      setSelectedMarker(obj)
  }, [library])

  useEffect(() => {
    //disabilito la possibilità di modificare il preferred 
    //Object.keys(patron).length > 0 ? fields.preferred.disabled = true : null
  }, [patron])

  
  /*useEffect(() => {
    //console.log("DIP",document.getElementsByName('department_id'));
    //getElById([name=department_id).required=true
  }, [library])*/

  return (
    <>
      <SectionTitle 
                        back={true}
                        title={isNew?messages.headerNew:messages.header}
      /> 
      {!isNew &&
          <CustomForm 
            submitCallBack={(formData) => dispatch(requestUpdateAccessToLibrary({
                ...formData, 
                library_id: params.library_id, 
                id: params.id,
                message: `${intl.formatMessage(messages.libraryUpdateMessage)}` })                
                ) } 
            requestData={{ 
              name: library.name, 
              label: patron.label,
              department_id: patron.department_id,
              title_id: patron.title_id, 
              user_referent: patron.user_referent,
              user_mat:patron.user_mat,
              user_service_phone:patron.user_service_phone,
              user_service_email:patron.user_service_email
            }}
            department_id={departmentOptionList} 
            title_id={titleOptionList} 
            fields={fields}            
            messages={messages}
            cancelButton={false}
          /> 
      }{isNew && 
          <CustomForm 
            submitCallBack={(formData) => dispatch(requestAccessToLibrary(              
            {...formData, user_id},intl.formatMessage(messages.libraryCreateMessage)))} 
            submitText={intl.formatMessage(messages.librarySubmit)}
            fields={fieldsIsNew}
            selectedMarker={selectedMarker}  
            department_id={departmentOptionList} 
            title_id={titleOptionList}             
            messages={messages}
            cancelButton={false}
            onChangeData={(field_name, value) => handleChangeData(field_name, value)}
            onPlacesSearch={(search)=>dispatch(requestSearchPlacesByText(search))}
            places={props.places}
            placesFreeSearchPlaceholder={intl.formatMessage(messages.placesFreeSearchPlaceholder)}
            getMarkers={(pos)=>dispatch(requestGetLibraryListNearTo(pos))}
            markers={props.libraryList}
            onMarkerClick={console.log("onMarkerClick")}
            markerPopupComponent={(marker,chooseMarkerFromMap)=>
              <div className="libraryPopup">
                <div className="card-body">
                  <h5 className="card-title">{marker.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{marker.address}</h6>
                  <NavLink className="btn btn-info" to={"/public/library/"+marker.id}>Library detail</NavLink>
                  <NavLink className="btn btn-primary" to="#" onClick={()=>chooseMarkerFromMap(marker)}>Subscribe to this library</NavLink>
                </div>
              </div>  
            }
          /> 
      }
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
  places: placesSelector(),
  libraryList: libraryListSelector()
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

export default compose(withConnect)((MyLibraryPage));
