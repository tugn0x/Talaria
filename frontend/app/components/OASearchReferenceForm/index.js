import React from 'react';
import {Card, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import InputSearch from 'components/Form/InputSearch';
import messages from './messages';
import FindOA from '../FindOA'
import './style.scss';
import Reference from '../Reference';

const OASearchReferenceForm = (props) => {
    const {goToForm, showReference,searchCallBack,isLoading,oareference}=props;
    console.log("OASEARCHREFFORM",props)
    
    const intl = useIntl();    
 
    return (
        <>       
            <Card className="pb-5">
                <p className="big text-center pt-4">{intl.formatMessage(messages.bodySearch)}</p>                                
                <InputSearch
                    submitCallBack={(query) => searchCallBack(query)}
                    className="w-50 m-auto"                    
                    placeholder={intl.formatMessage(messages.inputPlaceHolder)}
                />         
                {isLoading && <div className="w-50 mx-auto my-3 text-center"><i className="fas fa-spinner fa-pulse fa-2x"></i></div>}                  
                
                {oareference && Object.keys(oareference).length>0 && 
                <>                    
                    {showReference && 
                    <div className="alert alert-primary w-50 mx-auto my-2">
                        <strong>{intl.formatMessage({ id: 'app.components.OASearch.referenceFound' })}</strong>
                        <Reference data={oareference} full={false} cssClass="oaPreview"/>
                    </div>}
                    <div className="w-50 mx-auto my-2"><FindOA reference={oareference}/></div>
                </>    
                }
                
                {(oareference && Object.keys(oareference).length==0) &&  <div className="alert alert-danger w-50 mx-auto my-2" role="alert">{intl.formatMessage({id:'app.components.OASearch.referenceNotFound'})}</div>}              
                
                <p className="big text-center mt-4 pb-4">{intl.formatMessage(messages.goToForm)}</p>
                <Button color="default" className="btn-cta mb-5" onClick={()=>goToForm(oareference)}>
                    {intl.formatMessage(messages.goToFormButton)}
                </Button>    
            </Card>
        
        </>
    );
};


export default OASearchReferenceForm;