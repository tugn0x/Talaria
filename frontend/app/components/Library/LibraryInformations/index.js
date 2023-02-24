import React,{useState} from 'react';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import { formatDate } from '../../../utils/dates';
import './style.scss';
import { Link } from 'react-router-dom';

export const LibraryExtraInfo = (props) => {

    let intl=useIntl();

    const {data,showILLInfo,showPaymentInfo}=props;

    const openstreetmapURL='https://www.openstreetmap.org/?mlat=:lat&mlon=:lon';

    const mapLink = (lat,lon) => {
        return generatePath(openstreetmapURL, {
            lat,lon
        });        
    }


    return (
        <div className={"library_extra_info"}>            
            {/*<span className="status-text">{data.borrowing_status ? intl.formatMessage({id: "app.requests."+data.borrowing_status}):'xxx'}</span>*/}                    
            <div className='address'>
                <i className="fas fa-map-marker"></i> {data.address} {data.postcode} {data.town} {data.district} {data.state}
                <span className='country_id'>({data.country.data.name})</span>
                
                {data.lat && data.lon && <span className='coords'>
                    <i className="fas fa-map-marked"></i> <a className="active" href={mapLink(data.lat,data.lon)} target='_blank'>{data.lat},{data.lon}</a>
                </span>}
            </div>                        
            {(data.ill_phone||data.ill_email) && <div className='contact'>
                <span className='header'>ILL Service contacts</span>
                {data.ill_phone && <span><i className="fas fa-phone"></i> {data.ill_phone} </span>}
                {data.ill_email && <span><i className="fas fa-envelope"></i> {data.ill_email}</span>}                                                       
            </div>}  

            {showILLInfo && <div className='ill_info'>  
                <span className='header'>Supply coditions</span>                                                                                                                    
                {data.subject_id && data.subject && <span className="subject_id"><span className='label'>{intl.formatMessage({id:'app.libraries.subject_id'})}:</span> {data.subject.data.name}</span>}
                {data.ill_supply_conditions && <span className="ill_supply_conditions"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_supply_conditions'})}:</span> {data.ill_supply_conditions}</span>}
                {data.ill_imbalance &&<span className="ill_imbalance"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_imbalance'})}:</span> {data.ill_imbalance}</span>}
                {data.ill_susp_date_start && <span className="ill_susp_date"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_susp_date'})}:</span> {formatDate(data.ill_susp_date_start)} - {formatDate(data.ill_susp_date_end)}</span>}
                {data.ill_susp_date_start && data.ill_susp_notification_days &&<span className="ill_susp_notification_days"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_susp_notification_days'})}:</span> {data.ill_susp_notification_days}</span>}
                {data.ill_cost &&<span className="ill_cost"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_cost'})}:</span> {data.ill_cost}</span>}
                {data.ill_user_cost &&<span className="ill_user_cost"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_user_cost'})}:</span> {data.ill_user_cost}</span>}
                {data.ill_IFLA_voucher &&<span className="ill_IFLA_voucher"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_IFLA_voucher'})}:</span> {data.ill_IFLA_voucher?'SI':'NO'}</span>}
                {data.ill_cost_in_voucher &&<span className="ill_cost_in_voucher"><span className='label'>{intl.formatMessage({id:'app.libraries.ill_cost_in_voucher'})}:</span> {data.ill_cost_in_voucher}</span>}
            </div>}
            {showPaymentInfo && <div className='payment_info'>
            <span className='header'>Payment</span>
                vat,fiscalcode,invoice_header,email_pec,ccu,administrative,administrative_email,administrative_phone
            </div>}
        </div>
    )
}



const LibraryInformations =(props) => {

    const {data,detailUrl,showILLInfo=false,showPaymentInfo=false,customClass} = props

    const [showLibraryExtraInfo,setShowLibraryExtraInfo]=useState(false);

    return (


        <div className={`libraryInformations ${customClass?customClass:''}`}>
            <div className='library_name'>
            <a className="toggle-library-info" onClick={()=>setShowLibraryExtraInfo(!showLibraryExtraInfo)} title="show extra info">      
                <i className={`active fas ${showLibraryExtraInfo?'fa-caret-square-up':'fa-caret-square-down'}`}></i> 
            </a> 
            {detailUrl && <Link to={detailUrl} className="active">
                <span>{data.id} - {data.name}</span>
            </Link>||
                <span>{data.id} - {data.name}</span>
            }

            </div>
            {data.institution && <div className='institution'>
            <i className="fas fa-building"></i> 
            <span className=''>{data.institution.data.name} {data.institution.data.status!==1? <span className='text-danger'><i className="fas fa-exclamation-triangle"></i></span>:''} <span className='institutionType'>({data.institution.data.institution_type.data.name})</span></span>                            
            </div>}                            
            {data.projects && data.projects.data && data.projects.data.length>0 && 
                <span className='projects'>
                    <i className="fas fa-project-diagram"></i>                                        
                    {data.projects.data.map(prj => 
                    <span key={prj.id} className="project-item badge badge-secondary text-white">
                        {prj.name}
                    </span>)}                                        
                </span>                                    
            }
            {data.identifiers && data.identifiers.data && data.identifiers.data.length>0 && 
            <span className='identifiers'>                    
                <i className="fas fa-key"></i>                     
                {data.identifiers.data.map(ident => 
                <span key={ident.id} className="identifier-item badge badge-info text-white">
                    {ident.name}: {ident.pivot.cod}
                </span>)}                                    
            </span>
            }          
            {showLibraryExtraInfo && <LibraryExtraInfo data={data} showILLInfo={showILLInfo} showPaymentInfo={showPaymentInfo}/>}                           
        
        </div>

    )

}

export default LibraryInformations;

