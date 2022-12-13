import React, {useEffect, useState} from 'react'
import { generatePath } from 'react-router-dom';
import {Card, CardBody, CardTitle,CardHeader,Row, Col, Button} from 'reactstrap'
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
import './style.scss';
import messages from './messages.js';


const LibraryStatus = (props) => {
    console.log('LibraryStatus', props)
    const { loading, data,managePath} = props
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

    const editurl=(path,id) => {
        return generatePath(path+"/edit", {
            id,            
        });
    } */

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
                            {data.status==1 && <Link className="btn-cta btn btn-default" to={editurl(managePath,data.id)}>Edit profile data</Link>}
                            */                                                
                            }                                           
                        </CardHeader>
                        
                        <CardBody>
                            <CardTitle tag="h2">
                            Profile data<br/><br/>                            
                            </CardTitle>
                            {
                                Object.keys(data).map((key, index) => 
                                {
                                    return (key!==null) &&  (key!='id' && key!=='institution' && key!="subject" && key!="country" && key!="created_at" && key!="created_by" && key!="updated_at" && key!="updated_by" && key!=='status' && key!=='status_key') &&  (key!=='external') &&
                                    data[key]!==null && data[key]!==0 &&
                                    <Row key={index}>                                             
                                        <>
                                            <Col sm={4}><span><strong>{messages[key] && intl.formatMessage(messages[key])}</strong></span></Col> 
                                            <Col sm={8}>
                                                {(key=="profile_type") && data.profile_type && <>{data.profile_type==1?intl.formatMessage({id: 'app.libraries.profile_type.basic'}):data.profile_type==2?intl.formatMessage({id: 'app.libraries.profile_type.full'}):data.profile_type}</>}
                                                {(key=="subject_id") && data.subject && <>{data.subject.data.name}</>}                                                
                                                {(key=="country_id") && data.country && <>{data.country.data.name}</>}                                                
                                                {(key=="institution_id") && data.institution && <div className='institution'>
                                                    <i className="fas fa-building"></i> 
                                                    <span className='badge badge-secondary'>{data.institution.data.name} ({data.institution.data.institution_type.data.name})</span>                
                                                </div>}    

                                                {(key=="lat"||key=="lon") && data.lat && data.lon &&  <span className='coords'>
                                                    <i className="fas fa-map-marked"></i> <a className="active" href={mapLink(data.lat,data.lon)} target='_blank'>{data[key]}</a>
                                                </span>}
                                                                                                                                                                                             
                                                {key=="projects" && data.projects && data.projects.data && data.projects.data.length>0 && 
                                                        <span className='projects'>
                                                            <i className="fas fa-project-diagram"></i>                                        
                                                            {data.projects.data.map(prj => 
                                                            <span key={prj.id} className="project-item badge badge-secondary">
                                                                {prj.name}
                                                            </span>)}                                        
                                                        </span>                                    
                                                }
                                                {key=="identifiers" && data.identifiers && data.identifiers.data && data.identifiers.data.length>0 && 
                                                    <span className='identifiers'>                    
                                                        <i className="fas fa-key"></i>                     
                                                        {data.identifiers.data.map(ident => 
                                                        <span key={ident.id} className="identifier-item badge badge-info text-white">
                                                            {ident.name}: {ident.pivot.cod}
                                                        </span>)}                                    
                                                    </span>
                                                } 

                                                {/* TODO catalogs*/}

                                                {  (typeof(data[key]) != 'object' && key!="lat" && key!="lon" && key!="ill_IFLA_voucher" &&  key!="country_id" && key!="subject_id" && key!='institution_id' && key!="profile_type") && <span>{data[key]}</span> }   
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
