import React,{useState,useEffect} from 'react';
import {FormattedHTMLMessage, useIntl} from 'react-intl';
import {Card, Form as FormContainer, FormGroup, Button} from 'reactstrap';
import CustomCheckBox from '../../Form/CustomCheckBox';
import Input from '../../Form/Input';
import LibraryInformations from '../LibraryInformations';

import './style.scss';

const BorrowingChooseLender = (props) => {
    console.log('BorrowingChooseLender', props)
    const catalog_filter_enabled=(process.env.CATALOG_SEARCH && process.env.CATALOG_SEARCH=="true")?true:false;
    const {selectLenderCb,findLender,lendersList} = props
    const intl = useIntl()

    const [allselected,setAllSelected]=useState(false);

    //const [lender,setLender]=useState(null)

    const [formData,setFormData]=useState({
        borrowing_protnr:'',
        request_special_delivery: 0,
        request_pdf_editorial:0,
        lending_library_id: null
    });

    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});        
    } 

    const setLender = (lender) => {
        //set it as array or 0 (=all lender)

        let lenderArr=lender;        
        
        if(lenderArr && lenderArr>0 && !Array.isArray(lenderArr)) //unique lender
            lenderArr=[lender];  
        
        setFormData({ ...formData, lending_library_id: lenderArr[0]}) //ATTUALMENTE PRENDO SOLO 1 BIBLIO   
    }


    const onSubmit=(e)=>{     
                
            e.preventDefault();
            /*const form = e.target;
            if (form.checkValidity() === false) {
                console.log("Dont Send Form")
                const errorTarget = document.querySelectorAll('.was-validated .form-control:invalid')[0]
                scrollTo(errorTarget.offsetParent, true)
                
                return
            } else {
                // Tutto ok invia Form!
                selectLenderCb(formData)
                console.log("Send Form", formData)
            }*/
            selectLenderCb(formData)
    }

    const onChangeLibraryList=(v)=>{
        setAllSelected(v==0);        
        setLender(v)
    }

    const findLenderByCat=(catid) => {
        //todo: select catalog
        //call findLender api (filtered by cat or ALL)
        findLender(catid);
    }

    useEffect(() => {
        findLenderByCat(0)        
    }, [])

    return (<div className="BorrowingChooseLender">
                <h3>To send request choose a lender from list below:</h3>                                          
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">   
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                            <a className="nav-link" onClick={()=>findLenderByCat(0)}>ALL<span className="sr-only">(current)</span></a>
                      </li>                      
                      {catalog_filter_enabled && <li className="nav-item">
                            <a className="nav-link" onClick={()=>findLenderByCat(1)}>CATALOG1</a>
                      </li>}
                      {catalog_filter_enabled && <li className="nav-item">
                            <a className="nav-link" onClick={()=>findLenderByCat(2)}>CATALOG2</a>
                      </li>}                      
                    </ul>
                </nav>                             
                {lendersList.loading && <div className="w-50 mx-auto my-3 text-center"><i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i></div>}
                {lendersList.data && lendersList.data.length>0 &&
                <>
                    <ul className="librarylist">
                        <li key="alllibraries" className="alllibraries"><input name="lender" type="radio" value="0" onChange={e=>onChangeLibraryList(e.target.value)} /> <i class="fa-solid fa-cloud"></i> {intl.formatMessage({id: "app.global.alllibraries"})}</li>
                        {lendersList.data.map ( (lib) => 
                            <li key={lib.id}><input name="lender" type="radio" value={lib.id} onChange={e=>onChangeLibraryList(e.target.value)} />
                                <LibraryInformations data={lib} showILLInfo={true}/>
                            </li>    
                        )}                                        
                    </ul>                    
                    {(allselected || (formData.lending_library_id && !allselected) ) && 
                    <div className="requestFieldsBlock">  
                        <FormContainer onSubmit={onSubmit} className="was-validated" noValidate>                
                        <Card>
                                <FormGroup >
                                    <Input 
                                        label={intl.formatMessage({id: "app.requests.borrowing_protnr"})}
                                        handleChange={(value) => handleChange(value, 'borrowing_protnr')}
                                        required={false}
                                        input={formData.borrowing_protnr ? formData.borrowing_protnr : ""}
                                    />
                                </FormGroup>
                                <FormGroup >
                                    <CustomCheckBox
                                        label={intl.formatMessage({id: "app.requests.request_special_delivery"})} 
                                        checked={formData.request_special_delivery === 1 ? true : false}
                                        handleChange={(e) =>  handleChange(e.target.checked?1:0, 'request_special_delivery')}
                                    />
                                </FormGroup>
                                <FormGroup >
                                    <CustomCheckBox
                                        label={intl.formatMessage({id: "app.requests.request_pdf_editorial"})} 
                                        checked={formData.request_pdf_editorial === 1 ? true : false}
                                        handleChange={(e) =>  handleChange(e.target.checked?1:0, 'request_pdf_editorial')}
                                    />
                                </FormGroup>                            
                                <FormGroup>
                                    <Input 
                                        label={intl.formatMessage({id: "app.requests.request_note"})}
                                        handleChange={(value) => handleChange(value, 'request_note')}
                                        input={formData.request_note ? formData.request_note : ""}
                                        type="textarea"
                                        required={false}
                                    />
                                </FormGroup>
                                <div className="alert alert-primary copyrightstatement">                                                
                                            <FormattedHTMLMessage id="app.requests.borrowingCopyrightStatement" defaultMessage="borrowingCopyrightStatement" />
                                </div>                                
                                {allselected && 
                                    <div className="alert alert-warning">
                                        <i className="fa-solid fa-triangle-exclamation"></i> 
                                        <FormattedHTMLMessage id="app.requests.sendToAllLibrariesWarning"/>
                                    </div>                                
                                }                                                                               
                                <div className="d-flex justify-content-between sendTolenderButtons">                                        
                                    <Button type="submit" className="mt-0" color="warning">
                                        {intl.formatMessage({id:"app.requests.sendRequest"})}
                                    </Button>                         
                                </div>
                        </Card>
                        </FormContainer>
                    </div>                     
                    }                    
                </>}
            </div>
    );
};

export default BorrowingChooseLender;