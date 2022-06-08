import React,{useState} from 'react';
import { generatePath } from "react-router";
import {Button,Card} from 'reactstrap';
import {useIntl} from 'react-intl';
import {Link } from 'react-router-dom';
import './style.scss';
import {isPatronRequest, canFulfillToPatron,isFile,isMail,isArticleExchange,isOther,isFAX,isURL,hasBeenDownloaded, canPatronReqDirectManaged,canPatronReqNotDirectManaged, canUnfillToPatron} from '../BorrowingItem'
import BorrowingRequestUnfillToPatron from '../BorrowingRequestUnfillToPatron';
import BorrowingRequestFulfillToPatron from '../BorrowingRequestFulfillToPatron';
import BorrowingRequestDeliverToDesk from '../BorrowingRequestDeliverToDesk';


const BorrowingRequestOperations = (props) => {
    const {data, sendRequestToLender,findLender,lendersList,unfillCallback,fulfillCallback,deliverCallback} = props

    const intl=useIntl();   

    const [fulfill,setFulfill]=useState(false);
    const [unfill,setUnfill]=useState(false);
    const [deliveryToDesk,setDeliveryToDesk]=useState(false);
    

    const enableFulfill=()=>{
        setFulfill(true);
        setUnfill(false);
        setDeliveryToDesk(false)
    }

    const enableUnfill=()=>{
        setUnfill(true);
        setFulfill(false);
        setDeliveryToDesk(false)
    }

    const setDelivery=()=>{
        setDeliveryToDesk(true)
        setUnfill(false);
        setFulfill(false);        
    }

    


         
    return ( 
        <div className="requestOperations">            
            {isPatronRequest(data) && 
            <Card className="patronDirectDelivery">
                <div className="d-flex justify-content-between operationButtons">                                        
                    {(canPatronReqDirectManaged(data) || canFulfillToPatron(data)) && <button disabled={deliveryToDesk} className="btn btn-info" onClick={()=>setDelivery()}>{intl.formatMessage({id: "app.requests.sendToDesk"})}</button>}
                    {(canPatronReqDirectManaged(data) || (canFulfillToPatron(data) && (isFile(data)||isURL(data) ) ) ) && <button disabled={fulfill} className="btn btn-success" onClick={()=>enableFulfill()}>{intl.formatMessage({id: "app.requests.fulfill"})}</button>}
                    {(canPatronReqDirectManaged(data) || canUnfillToPatron(data) ) &&<button disabled={unfill} className="btn btn-danger" onClick={()=>enableUnfill()}>{intl.formatMessage({id: "app.requests.unfill"})}</button>}
                </div>
                {deliveryToDesk && <BorrowingRequestDeliverToDesk data={data} deliverCallback={deliverCallback}/>}
                {fulfill && <BorrowingRequestFulfillToPatron data={data} fulfillCallback={fulfillCallback}/>}                                
                {unfill && <BorrowingRequestUnfillToPatron data={data} unfillCallback={unfillCallback}/>}                                
            </Card>
            }            
        </div>
    )
}

export default BorrowingRequestOperations