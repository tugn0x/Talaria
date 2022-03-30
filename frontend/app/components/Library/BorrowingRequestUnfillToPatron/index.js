import React from 'react';
import {Card, Form as FormContainer, FormGroup, Button} from 'reactstrap';
import Input from '../../Form/Input';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState,useEffect } from "react";
import {Label} from 'reactstrap';
import Select from 'react-select';
import { requestApplyLendingTagsToDDRequests } from '../../../containers/Library/actions';

const BorrowingRequestUnfillToPatron = props => {
    console.log('BorrowingRequestUnfillToPatron', props)
    const {unfillCallback}=props;    
    const intl = useIntl()


const notFulfillTypeOptions = [
    { value: 1, label: intl.formatMessage({id: "app.patronrequest.notfulfill_type.NotAvailable"})},
    /*{ value: 2, label: intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotEnabled"}) },
    { value: 3, label: intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotTake"}) },
    { value: 4, label: intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotAcceptCost"}) },
    { value: 5, label: intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotAnswerCost"}) },*/
    { value: 6, label: intl.formatMessage({id: "app.patronrequest.notfulfill_type.NotAvailableForFree"}) },
    { value: 7, label: intl.formatMessage({id: "app.patronrequest.notfulfill_type.WrongRef"}) },    
]
        
const [formData,setFormData]=useState({
    fromlibrary_note:'',  
    notfulfill_type:null,  
});

const [notFulFillTypeSelect,setNotFulFillTypeSelect]=useState(notFulfillTypeOptions[0]);

const handleChange = (value, field_name) =>{
    setFormData({ ...formData, [field_name]: value});        
}    

const onSubmit=(e)=>{     
    
    const form = e.target;            
    
    e.preventDefault();   
    
    if (form.checkValidity() ) 
        unfillCallback(formData)        
}


useEffect(() => {
    handleChange(notFulFillTypeSelect.value,'notfulfill_type');    
}, [notFulFillTypeSelect])

    
return (<div>
     <FormContainer onSubmit={onSubmit} className="was-validated" noValidate>                
                        <Card>
                                <FormGroup >   
                                    <Label for="notfulfilltype_select">{intl.formatMessage({id: "app.patronrequest.notfulfill_type"})}</Label>
                                    <Select
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={false}
                                        name="notfulfilltype_select"
                                        options={notFulfillTypeOptions}                                        
                                        value={notFulFillTypeSelect}  
                                        required                                      
                                        onChange={setNotFulFillTypeSelect}
                                        />                                                                                
                                </FormGroup >  
                                <FormGroup >                                
                                    <Input                                         
                                        type="textarea"                                         
                                        label={intl.formatMessage({id: "app.patronrequest.fromlibrary_note"})}
                                        handleChange={(value) => handleChange(value, 'fromlibrary_note')}                                        
                                        input={formData.fromlibrary_note ? formData.fromlibrary_note : ""}
                                    />
                                </FormGroup>                                                                                                             
                                <div className="d-flex justify-content-between">                                        
                                    <Button type="submit" className="mt-0" color="danger">
                                        {intl.formatMessage({id:"app.requests.unfill"})}
                                    </Button>                         
                                </div>
                        </Card>
                        </FormContainer>

</div>);

}

export default BorrowingRequestUnfillToPatron;