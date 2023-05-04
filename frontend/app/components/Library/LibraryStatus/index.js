import React, {useEffect, useState} from 'react'
import { generatePath,Link } from 'react-router-dom';
import {Card, CardBody, CardTitle,CardHeader,Row, Col, Button} from 'reactstrap'
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
import './style.scss';
import messages from './messages.js';
import { checkPermissions } from '../../../utils/permissions';


const LibraryStatus = (props) => {
    console.log('LibraryStatus', props)
    const { loading, data,managePath,auth,resource} = props
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    

    useEffect(() => {
        setMounted(true)
     }, [])

     const alertClass = (data) => {
            let aclass="alert-success";

            switch (data.status) {
                case 1: aclass="alert-success"; break;
                case 2: aclass="alert-warning"; break;
                case 0: 
                case 3:
                case 4:
                case 5: aclass="alert-danger"; break;
                default: aclass="alert-info"; break;
            }
                    
            return aclass;        
     }
     
/*     const renewsubscriptionurl=(path,id,op) => {
        return generatePath(path+"/subscriptions/:op", {
            id,
            op
        });
    }
*/

    const show_upgrade_to_full_profile=(process.env.LIBRARY_DIFFERENT_PROFILES && process.env.LIBRARY_DIFFERENT_PROFILES=="true")?true:false;

    const upgradetofullurl=(path,id) => {
        return generatePath(path+"/upgrade", {
            id,            
        });
    } 

    const mapLink = (lat,lon) => {
        const openstreetmapURL='https://www.openstreetmap.org/?mlat=:lat&mlon=:lon';

        return generatePath(openstreetmapURL, {
            lat,lon
        });        
    }   
    
    return (
        mounted && 
          <div className="libraryStatusPanel">                
                <Loader show={loading}>
                    <Card className=''>
                        <CardHeader className={"alert "+ alertClass(data)}>                        
                            <strong>{intl.formatMessage({id:'app.libraries.status'})}: {intl.formatMessage({id:'app.libraries.status.'+data.status_key})}</strong>                            
                            {/* 
                            {data.status==2 && <Link className="btn-cta btn btn-default" to={renewsubscriptionurl(managePath,data.id,"renew")}>Renew subscription</Link>}                            
                            */                                                
                            }                                                                       
                        </CardHeader>
                        {data.status==1 && data.profile_type==1 && checkPermissions(auth,'manage',resource) && show_upgrade_to_full_profile && <Link className="btn btn-info" to={upgradetofullurl(managePath,data.id)}>{intl.formatMessage({id:'app.components.LibraryStatus.upgradeProfileButton'})}</Link>}                        
                        
                        <CardBody>
                            <CardTitle tag="h2">
                            {intl.formatMessage({id: 'app.components.LibraryStatus.profileData'})}<br/><br/>                            
                            </CardTitle>                            
                            {
                                Object.keys(data).map((key, index) => 
                                {                                    
                                    return (key!==null) &&  (key!='id' && key!=='institution' && key!="subject" && key!="country" && key!="created_at" && key!="created_by" && key!="updated_at" && key!="updated_by" && key!=='status' && key!=='status_key') &&  (key!=='external') &&
                                    ( 
                                     (data[key]!=null && typeof(data[key]) != 'object' && data[key]!==0) || (data[key] && data[key]!=null && typeof(data[key])== 'object' && data[key].data && data[key].data.length>0) 
                                    ) &&
                                    <Row key={index}>                                             
                                        <>
                                            <Col sm={4}><span><strong>{messages[key] && intl.formatMessage(messages[key])}</strong></span></Col> 
                                            <Col sm={8}>
                                                {(key=="profile_type") && data.profile_type && <>{data.profile_type==1?intl.formatMessage({id: 'app.libraries.profile_type.basic'}):data.profile_type==2?intl.formatMessage({id: 'app.libraries.profile_type.full'}):data.profile_type}</>}
                                                {(key=="subject_id") && data.subject && <>{data.subject.data.name}</>}                                                
                                                {(key=="country_id") && data.country && <>{data.country.data.name}</>}                                                
                                                {(key=="institution_id") && data.institution && <div className='institution'>
                                                    <i className="fa-solid fa-building"></i> 
                                                    <span className='badge badge-secondary'>{data.institution.data.name} ({data.institution.data.institution_type.data.name})</span>                
                                                </div>}    

                                                {(key=="lat"||key=="lon") && data.lat && data.lon &&  <span className='coords'>
                                                    <i className="fa-solid fa-map-location"></i> <a className="active" href={mapLink(data.lat,data.lon)} target='_blank'>{data[key]}</a>
                                                </span>}                                                
                                                                                                
                                                {key=="projects" && data.projects && data.projects.data && data.projects.data.length>0 && 
                                                        <span className='projects'>                                                       
                                                            <i className="fa-solid fa-diagram-project"></i>                                        
                                                            {data.projects.data.map(prj => 
                                                            <span key={prj.id} className="project-item badge badge-secondary">
                                                                {prj.name}
                                                            </span>)}                                        
                                                        </span>                                    
                                                }
                                                {key=="identifiers" && data.identifiers && data.identifiers.data && data.identifiers.data.length>0 && 
                                                    <span className='identifiers'>                    
                                                        <i className="fa-solid fa-key"></i>                     
                                                        {data.identifiers.data.map(ident => 
                                                        <span key={ident.id} className="identifier-item badge badge-info text-white">
                                                            {ident.name}: {ident.pivot.cod}
                                                        </span>)}                                    
                                                    </span>
                                                } 

                                                {/* TODO catalogs*/}

                                                {  (typeof(data[key]) != 'object' && key!="identifiers" && key!="projects" && key!="lat" && key!="lon" && key!="ill_IFLA_voucher" &&  key!="country_id" && key!="subject_id" && key!='institution_id' && key!="profile_type") && <span>{data[key]}</span> }   
                                                {key=="ill_IFLA_voucher"&& <span>{data[key]==1?intl.formatMessage({id: 'app.global.yes'}):intl.formatMessage({id: 'app.global.no'})}</span>}
                                            </Col>                                                                                                
                                        </>
                                    </Row>
                                })                                                                           
                            }
                        </CardBody>
                    </Card>                        
                </Loader>
            </div>            
       
    )
}

export default LibraryStatus
