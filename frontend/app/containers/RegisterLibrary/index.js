import React, {useState, useEffect} from 'react'
import Navigation from './Navigation'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import wizardMessages from './messages'
import globalMessages from 'utils/globalMessages';
import {fields, totalSteps, setNewSteps} from './fields'
import './style.scss'
import {Button} from 'reactstrap'
import {useIntl} from 'react-intl'
import {CustomForm, BasePage} from 'components'
import { requestGetCountriesOptionList,
    requestLibrarySubjectOptionList, requestPostPublicLibrary, requestGetProjectsOptionList, requestGetInstitutionsByTypeByCountryOptionList,
    requestGetInstitutionTypeOptionList, requestGetlibraryProjectsOptionList, requestGetlibraryidentifierTypesOptionList } from "./actions"
import {institutionsOptionListSelector,
    countriesOptionListSelector, librarySubjectOptionListSelector, projectsOptionListSelector,institutionsByTypeCountryOptionListSelector,
    institutionTypesOptionListSelector,
    placesSelector, 
    libraryProjectsOptionListSelector,
    identifierTypesOptionListSelector} from './selectors';
import { acceptallLenderLendingRequest } from '../../utils/api';

const ILL_REQUEST_PAYMENT=(process.env.ILL_REQUEST_PAYMENT && process.env.ILL_REQUEST_PAYMENT=="true")?true:false;
const LIBRARY_DIFFERENT_PROFILES = (process.env.LIBRARY_DIFFERENT_PROFILES && process.env.LIBRARY_DIFFERENT_PROFILES=="true")?true:false;

const RegisterLibrary = (props) => {
    console.log('RegisterLibrary', props)
    const messages= {...wizardMessages,...globalMessages}
    
    let [institutionPresent, setInstitutionPresent] = useState(false)
    let [currentStep, setCurrentStep] = useState(1)
    const intl = useIntl()
    const {dispatch} = props
    const [data, setData] = useState({})
    const [currentFields, setCurrentFields] = useState({})
    const [steps, setSteps] = useState(setNewSteps)
    const [countryid, setCountryid] = useState(0);
    const [institutiontypeid, setInstitutiontypeid] = useState(0);
    const[projectsarrname, setprojectsarrname]=useState([]) // functional component
    const Selectedprojectsnamearr = [];
    const [basicProfile,setBasicProfile]=useState(LIBRARY_DIFFERENT_PROFILES);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [countryname, setCountryName] = useState(null);
    const [subjectname, setSubjectName] = useState(null);
    const [institutiontypename, setInstitutionTypeName] = useState(null);
    const [institutionname, setInstitutionName] = useState(null);
    const [identifierType, setIdentifiertype] = useState(null);
    const [identifierTypeSelected, setidentifierTypeSelected] = useState(false);
    let [buttonStopPressed, setbuttonStopPressed] = useState(false)
    const [arrprojectName, setarrProjectName] = useState([]);
    const [printStatus, setPrintStatus] = useState(false)
    const [disabled, setdisabled] = useState(false)

    const [itemsreport, setItemsreport] = useState([]);
    const [sortingcount, setSortingcount] = useState(0);

    const getLocation = () => {
        if (!navigator.geolocation) {
          setStatus(intl.formatMessage(wizardMessages.geolocationNotSupported));
        } else {
            setStatus(intl.formatMessage(wizardMessages.locatingLibraryLocation));
            if (lng===null)  
            {
                fields.geolocation_spinner.hidden=false;
                fields.library_coordinates.label=intl.formatMessage(wizardMessages.stopEnterManually)  
                fields.library_coordinates.color="orange"
            }
            navigator.geolocation.getCurrentPosition((position) => {
                    setLat(position.coords.latitude); setLng(position.coords.longitude);
                    setData({...data, 'lon': position.coords.longitude, ['order_lon']:2, 'lat': position.coords.latitude, ['order_lat']:3})
                
            }, () => {
                setStatus(intl.formatMessage(wizardMessages.unableRetriveLocation));
            });
        }
      }
   
      useEffect(() => {
        fields.geolocation_spinner.hidden=true;
        fields.library_coordinates.label=intl.formatMessage(wizardMessages.clicktoGetRecords) 
     }, [lng])

     const GetBrowserCoordinates = (ev) => {
        setdisabled(disabled+1)
    }

    useEffect(() => {

       if(disabled >0 && disabled%2===0) //stop button pressed
       {
            fields.library_coordinates.label=intl.formatMessage(wizardMessages.clicktoGetRecords) 
            setStatus(null);
            fields.geolocation_spinner.hidden=true;
            setLng(0);setLat(0)
       }
       else if (disabled > 0 && disabled%2!==0)
       {
                setStatus(null);
                fields.library_coordinates.label=intl.formatMessage(wizardMessages.stopEnterManually) 
                setLng(0);setLat(0)
                getLocation()
                fields.geolocation_spinner.hidden=false

                if (lng===null && lat===null)
                {    setLng(0);setLat(0)   }
       }
    },[disabled])

    // Fai le chiamate per le option list
    useEffect(() => {
        dispatch(requestGetCountriesOptionList())
        dispatch(requestGetInstitutionTypeOptionList())
        dispatch(requestGetlibraryProjectsOptionList())
        dispatch(requestLibrarySubjectOptionList())
        dispatch(requestGetlibraryidentifierTypesOptionList())

        if (ILL_REQUEST_PAYMENT===false) //RSCVD
        {
            fields.ill_user_cost.hidden=true;
            fields.ill_service_conditions.hidden=true;
            fields.ill_service_conditions_other.hidden=true;
            fields.ill_cost.hidden=true;
            fields.ill_imbalance.hidden=true;
            fields.ill_supply_conditions.hidden=true
        }
        if (LIBRARY_DIFFERENT_PROFILES===false)
        {
            setData({...data, "ill_user_cost": "0", "ill_cost": "0"})                
            fields.volunteer_library_label.hidden = true;
            fields.opac_label.hidden=false;
            fields.opac.hidden=false;
            //fields.subject_label.hidden=false;
            //fields.subject_id.hidden=false;
            fields.showfullProfile.hidden = true;                             
        }
        fields.geolocation_spinner.hidden=true;
        fields.opac.required=false;
        //fields.subject_id.required=false;
        //set profile
        //setData({...data, 'profile_type': basicProfile?1:2})
        setBasicProfile(1)
        setData({...data, ['profile_type']: basicProfile?1:2, ['order_profile_type']:0})
        setData({...data, ['profile_type_name']: basicProfile?"Basic Profile":"Full Profile", ['order_profile_type_name']:1})
        setData({...data, ['lon']: 0, ['order_lon']:3})
        setData({...data, ['lat']: 0, ['order_lat']:4})

    },[])

    // Filtra i CAMPI / Fields da mostrare a seconda dello step in cui ti trovi
    useEffect(() => {
        let Fields = {}
        Object.keys(fields)
            .filter(key => fields[key].group === `step_${currentStep}` )
            .map(key =>  Fields = {[key]: fields[key], ...Fields})
        setCurrentFields(Fields)
    }, [currentStep])
    
    useEffect(()=> {
        Object.keys(props.libraryProjectsOptionList).forEach(key => 
            projectsarrname.push(props.libraryProjectsOptionList[key].value))
    })


    useEffect(() => {
       //set profile
       //setData({...data, ['profile_type']: basicProfile?1:2, ['order_profile_type']:0})
       setData({...data, ['profile_type']: basicProfile?1:2, ['order_profile_type']:0, ['profile_type_name']: basicProfile?intl.formatMessage(messages['basicprofile']):intl.formatMessage(messages['fullprofile']), ['order_profile_type_name']:1})
    }, [basicProfile])


    useEffect(() => {
       if (sortingcount===1)
        {
            console.log(JSON.stringify("new sorted array " + JSON.stringify(itemsreport)))
            const sorting = itemsreport.sort((a, b) => {
                if (a.order < b.order) return -1;
                if (a.order > b.order) return 1;
                return 0;
              });
              setItemsreport(sorting)
        }
     }, [sortingcount])

    useEffect(() => {
        setData({...data, ['country_name']: countryname, ['order_country_name']:10})
     }, [countryname])


     useEffect(() => {
        setData({...data, ['subject_name']: subjectname, ['order_subject_name']:36})
     }, [subjectname])

     useEffect(() => {
        setData({...data, ['institution_type_name']: institutiontypename, ['order_institution_type_name']:20})
     }, [institutiontypename])


     useEffect(() => {
        setData({...data, ['institution_name']: institutionname, ['order_institution_name']:22})
     }, [institutionname])

     useEffect(() => {
        console.log("props.libraryProjectsOptionList.length: " + props.libraryProjectsOptionList.length)
        if (props.libraryProjectsOptionList.length > 0) {
            fields.projects_label.hidden = false;
        } else {
            fields.projects_label.hidden = true;
        }
    }, [props.libraryProjectsOptionList]);

     // Cambia Step
    const onChangeStep = (formData, newStep) => {

        if (data.project_id && data.project_id.length > 0)
        {   
            arrprojectName.length = 0
            data.project_id.forEach((projectid) => {
                const project = props.libraryProjectsOptionList.find(obj => {
                    return obj.value === projectid;
                  });

                  if (!arrprojectName.includes(project.label)) 
                    arrprojectName.push(project.label)
              });
        }

        if (newStep==1)        
        {
            setData({...data, 'backbuttonPressed': true})
            fields.library_identifier_list.hidden = false
            setCurrentStep(parseInt(1))
            fields.library_identifier_add.disabled = true
            if (data.identifiers_id!==undefined && data.identifiers_id.length>0)
                fields.library_identifier_list.hidden = false
            else
                fields.library_identifier_list.hidden = true 
        }
        setData({...data, ...formData})
        //Resorting when fire next step
        setSortingcount(1)       
        setCurrentStep(parseInt(newStep))
        setSteps({...steps, [parseInt(newStep)]: {active: true} })      
    }
    

    const onBackPressed = (field_name,value,newList) => {
        itemsreport.length=0
        setSortingcount(0)
        setData({...data, 'backbuttonPressed': true})
        fields.library_identifier_list.hidden = false
        setCurrentStep(parseInt(1))
        fields.library_identifier_add.disabled = true
        if (data.identifiers_id!==undefined && data.identifiers_id.length>0)
            fields.library_identifier_list.hidden = false
        else
            fields.library_identifier_list.hidden = true 
    }
    
    // Aggiorna dati nei campi *handle change*
    const onChangeData = (field_name, value, order) => {
        
        // setData({...data, [field_name]: value, ['order_'+field_name]:order})

        if (field_name === "identifier_type_id")
            setIdentifiertype(value.value);
        
        if (field_name === "institution_type_id")
        {
            setInstitutiontypeid(value.value);
            setInstitutionTypeName(value.label);
            setInstitutiontypeid((institutiontypeid) => {
                console.log("institution type id: " + institutiontypeid); 
                fields.suggested_institution_name.hidden = true;
                return institutiontypeid;
              });
        }
        if (field_name === "institution_country_id")
        {
            setCountryid(value.value);
            setCountryid((countryid) => {
            setData({...data, "institution_country_name": value.label,['order_institution_country_name']:21 })
            setData({...data, [field_name]: value, ['order_'+field_name]:order})

            fields.suggested_institution_name.hidden = true;
                if (countryid!==0 && institutiontypeid!==0)
                {
                    setInstitutionPresent(true);
                    console.log("Institution not present")
                    setInstitutionName(null) 
                   
                }
                return countryid;
            });
        }

        if (field_name === "country_id" && value.value !== 0)
        {
            setCountryName(value.label)
            setData({...data, [field_name]: value, ['order_'+field_name]:order})
        }

        if (field_name === "subject_id" && value.value !== 0)
            setSubjectName(value.label)   

        if (field_name === "institution_type_id" && value.value !== 0)
        {
            setInstitutionTypeName(value.label) 
            setData({...data, [field_name]: value, ['order_'+field_name]:order})
        }

        if (field_name === "institution_id" && value.value !== -1)
        {
            setInstitutionName(value.label) 
            fields.suggested_institution_name.hidden=true
            fields.suggested_institution_name.required = false
        }

        if (field_name === "institution_id" && value.value === -1)
        {
            fields.suggested_institution_name.hidden = false
            fields.suggested_institution_name.required = true

            setInstitutionName (null)
        }

        if (field_name === "identifier_type_id" && value!==0)
                setidentifierTypeSelected(true)
        
        
        if (field_name === "library_identifiers_txt" && value !== 0 && identifierTypeSelected)
            fields.library_identifier_add.disabled = false
            
        if (field_name === "library_identifiers_txt" && value.length === 0)
            fields.library_identifier_add.disabled = true

        setData({...data, [field_name]: value, ['order_'+field_name]:order})
    }


    useEffect(()=>{
        if(countryid!==0 && institutiontypeid!==0)
            dispatch(requestGetInstitutionsByTypeByCountryOptionList(null,countryid,institutiontypeid));                   
        },[countryid,institutiontypeid])
     
        
    const AddNewIdentifier = (field_name,value,newList) => {
        fields.library_identifier_list.hidden = newList.length>0 ? false : true;
        setData({...data, 'identifiers_id': newList, ['order_identifiers_id']:31})
        console.log("identifier_id" + JSON.stringify(newList))
    }

    const RemoveIdentifier = (field_name,value,newList) => {
        fields.library_identifier_list.hidden = newList.length>0 ? false : true;
        setData({...data, 'identifier_id': newList})
        console.log(JSON.stringify(newList))
    }

    const toggleLibraryProfile = (ev) => {
        setBasicProfile(!basicProfile);
        if (fields.opac.hidden===false)
        {
            fields.opac.required = false;
            //fields.subject_id.required = false;
            //fields.subject_id.value = 1
            fields.opac.hidden=true;
            fields.opac_label.hidden=true;
            //fields.subject_id.hidden=true;
            fields.subject_label.hidden=true;
            fields.showfullProfile.label=intl.formatMessage(wizardMessages.switchToFullProfile)
        }
        else
        {                        
            //fields.subject_id.required = true;
            fields.opac.required = true;
            fields.opac.hidden=false;
            fields.opac_label.hidden=false;
            //fields.subject_id.hidden=false;
            fields.subject_label.hidden=false;
            fields.showfullProfile.label=intl.formatMessage(wizardMessages.switchToBasicProfile)            
        }
    }

    // Check validation on change input
    const checkValidation = (validation) => {
     
        if(!validation){
            let objSteps = {}
            Object.keys(steps).map(key => {
                objSteps = {...objSteps, [key]: {active: key > currentStep ?  false : true } }
            })
            setSteps(objSteps)
        }  
    }

  
    // const Print = () =>{     
    //     let printContents = document.getElementById('printablediv').innerHTML;
    //     let originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents; 
    //     setPrintStatus(true)
    // }

    return (
        /*<BasePage {...props} routes={[]} messages={wizardMessages} headermenu={false}>*/
        <>
            <h2>{intl.formatMessage(wizardMessages.header)}</h2>
            <br></br>
              <Navigation 
                step={currentStep} 
                totalSteps={totalSteps}
                steps={steps}
                messages={wizardMessages}
                changeStep={(newStep) => onChangeStep({}, newStep) }/> 
            {/* CARICA TUTTI GLI STEP DEL FORM SECONDO I FIELDS FILTRATI per STEP */}
            {Object.keys(currentFields).length > 0 && 
             currentStep <= totalSteps - 1 &&
                (<CustomForm 
                    submitCallBack={(formData) => onChangeStep(formData, totalSteps > currentStep ? currentStep+1 : currentStep )} 
                    requestData={data ? data : null}
                    onChangeData={(field_name, value, order) => onChangeData(field_name, value, order)}
                    fields={currentFields}
                    title={intl.formatMessage(wizardMessages[`step_${currentStep}`])}
                    submitText={intl.formatMessage(globalMessages.continue)}
                    className="wizard-form"
                    institution_type_id = {props.institutionTypesOptionList}
                    country_id={props.countriesOptionList}
                    institution_country_id = {props.countriesOptionList}
                    institution_id={props.institutionsByTypeCountryOptionList}
                    subject_id={props.librarySubjectOptionList}
                    project_id = {props.libraryProjectsOptionList}
                    identifier_type_id = {props.identifierTypesOptionList}
                    onClickData={toggleLibraryProfile}
                    RetrievePositionData = {GetBrowserCoordinates}
                    AddNewIdentifier={AddNewIdentifier}
                    RemoveIdentifier={RemoveIdentifier}
                    searchOptionList={{ 
                        institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)), 
                        country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                        subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)), 
                        project_id: (input) => dispatch(requestGetProjectsOptionList(input)),
                        institution_country_id: (input) => dispatch(requestGetlibraryidentifierTypesOptionList(input)),
                        identifier_type_id: (input) => dispatch(requestGetIdentifierTypesOptionList(input)),
                    }}
                    messages={messages}
                    getValidation={(validation) => checkValidation(validation) }
                />)
            }

            {/* FINITI GLI STEP CARICA IL RIEPILOGO E FAI IL SUBMIT */}
            {currentStep === totalSteps && 
                <div  id="printablediv">
                    <h3>{intl.formatMessage(wizardMessages.step_4)}</h3>
                   {/* <div className="container_summary ">  */}
                <div> 
                    
                   <div className="container-fluid">
                        <div className="row">
                        {
                            (
                            Object.keys(data).map((key, index) => {
                              if (!key.includes("order_"))
                                {
                                    var itemexists = itemsreport.findIndex(x => x.field_name==key && x.value==data[key]); 
                                    if (itemexists < 0)
                                    {
                                        itemsreport.push({
                                            field_name: key,
                                            value: data[key],
                                            order: data["order_" + key]
                                        }) 
                                    }
                                }
                            })
                            )
                        }

                        {
                            itemsreport.length>0 && sortingcount === 0 ? setSortingcount(sortingcount+1):""
                        }
          
                        {
                             (
                                 Object.keys(itemsreport).map( (item, i) => {
                                        return (itemsreport[i].field_name!=='profile_type') && itemsreport[i].field_name!=='identifier_id' && itemsreport[i].field_name!=='institution_type_id' 
                                        //return itemsreport[i].field_name!=='identifier_id' && itemsreport[i].field_name!=='institution_type_id' 
                                        && itemsreport[i].field_name!=='country_id' && itemsreport[i].field_name!=='library_identifiers_txt' && itemsreport[i].field_name!=='identifier_type_id' 
                                        && itemsreport[i].field_name!=='subject_id' && itemsreport[i].field_name!=='institution_country_id' && itemsreport[i].field_name!=='institution_id' 
                                        && itemsreport[i].field_name!=='order' && itemsreport[i].field_name!=='backbuttonPressed'
                                        && (fields.suggested_institution_name.hidden ? itemsreport[i].field_name!=='suggested_institution_name' : itemsreport[i].field_name!=='institution_name')
                                        && (fields.opac.hidden ? itemsreport[i].field_name!=='opac' : itemsreport[i].field_name!=='')
                                        &&
                                        <div key={item}  className="report_summary"> 
                                        { 
                                            <div> 
                                                <div className="font-weight-bold">{messages[itemsreport[i].field_name] && intl.formatMessage(messages[itemsreport[i].field_name])}</div>
                                                    {/* to display all fields name*/}
                                                    {(itemsreport[i].field_name!=='identifiers_id' && itemsreport[i].field_name!=='project_id') && 
                                                    <div>{itemsreport[i].value}</div>}
                                                    
                                                    {/* to display all identifiers name*/}
                                                    {(itemsreport[i].field_name==='identifiers_id')&&<div>
                                                    {itemsreport[i].value.map((item) => (<div><b>{item[2]}: </b>{item[1]}</div>))}
                                                    </div>}

                                                    {/* to display all project name */}
                                                    {(itemsreport[i].field_name==='project_id')&&<div>
                                                        {arrprojectName.map((item) => (<div><li>{item}</li></div>))}
                                                    </div>}

                                            </div>
                                        }   
                                        </div>
                                   })
                            )
                            //     itemsreport.map( ({key, counter}) => {
                            //   //  setItemsreport(sorted)
                            //      return (key!==null) && (key!=='profile_type') && key!=='identifier_id' && key!=='institution_type_id' && key!=='country_id' && key!=='library_identifiers_txt' && key!=='identifier_type_id' && key!=='subject_id'
                            //      && key!=='institution_country_id' && key!=='institution_id' && key!=='project_id' &&
                            //      data[key]!==null && data[key]!==0 && 
                            //     <div key={counter} className="report_summary"> 
                            //          <>
                            //          { 
                            //              <div> 
                            //                  <div className="font-weight-bold">{messages[itemsreport[counter].field_name] && intl.formatMessage(messages[itemsreport[counter].field_name])}</div>
                            //                  {(key!=='identifiers_id') && <div>{itemsreport[counter].value}</div>}
                            //                  {(itemsreport[counter].field_name==='identifiers_id')&&<div>
                            //                      {itemsreport[counter].value.map((item) => (<div><b>{item[2]}: </b>{item[1]}</div>))}
                            //                  </div>}
                            //              </div>
                            //          }   
                            //          </>
                            //      </div>
                            //      }
                            //  )
                            // )
                        }
                       
                      </div>
                    </div>
                </div>
                <div className="vertical-center" id="noprint"> 
                    <Button onClick={onBackPressed} className='backButton'> 
                        {intl.formatMessage(globalMessages.back)} 
                    </Button>
                    <Button color="brown" className="rightAlignButton" onClick={() => dispatch(requestPostPublicLibrary(data, intl.formatMessage(wizardMessages.createMessage)))}>
                        {intl.formatMessage(globalMessages.submit)} 
                    </Button>
                    </div>
                </div>
            }
        {/*</BasePage>*/}
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    institutionsOptionList: institutionsOptionListSelector(),
    institutionsByTypeCountryOptionList: institutionsByTypeCountryOptionListSelector(),
    libraryProjectsOptionList: libraryProjectsOptionListSelector(),
    countriesOptionList: countriesOptionListSelector(),
    librarySubjectOptionList: librarySubjectOptionListSelector(),
    projectsOptionList: projectsOptionListSelector(),
    identifierTypesOptionList: identifierTypesOptionListSelector(),
    institutionTypesOptionList: institutionTypesOptionListSelector(),
    places: placesSelector(),

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
  

export default compose(withConnect)(RegisterLibrary)