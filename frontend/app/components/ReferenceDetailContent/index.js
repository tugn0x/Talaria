import React, {useState} from 'react';
import {Card, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import { Link } from 'react-router-dom';
import './style.scss';

import ReferenceCitation from '../ReferenceCitation';

const renderMaterialType = (typ) => {
    const intl=useIntl();
    let mattype="";

    switch (typ) {
        case 1: mattype=intl.formatMessage({id: "app.references.article"}); break;
        case 2: mattype=intl.formatMessage({id: "app.references.book"}); break;
        case 3: mattype=intl.formatMessage({id: "app.references.thesis"}); break;
        case 4: mattype=intl.formatMessage({id: "app.references.cartography"}); break;
        case 5: mattype=intl.formatMessage({id: "app.references.manuscript"}); break;
    }

    return mattype;
}

const ReferenceDetailContent = props => {
    console.log('ReferenceDetailContent', props)
    const {reference,customClass,canCollapse=false,collapsed=false} = props
    const intl = useIntl()  

    const [showRef,setShowRef]=useState(canCollapse?!collapsed:true)  


return (    
<>

{canCollapse &&  
<Card>
    <ReferenceCitation data={reference}/>
    <Link className="toggle-ref-link" onClick={()=>setShowRef(!showRef)}>
        <i className={`fas ${showRef?'fa-toggle-on':'fa-toggle-off'}`}></i> 
    </Link>
</Card>}
{showRef && <div id="refID" className={customClass}>                
                    <h3>{intl.formatMessage({id: "app.references.materialTypeHead"})}</h3>
                    <Card>
                        <Row>
                            <Col sm={3}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.material_type"})}</p>
                                <p>{reference.material_type && renderMaterialType(reference.material_type)}</p>
                            </Col>
                        </Row>
                    </Card>                
                    <h3>{intl.formatMessage({id: "app.references.titleAuthorsHead"})}</h3>
                    <Card>
                        <Row>
                            <Col sm={12}>
                                <p className="text-brown">{reference.material_type === 1 ? intl.formatMessage({id: "app.references.pub_title"}) : intl.formatMessage({id: "app.references.title"})}</p>
                                <p>{reference.pub_title}</p>
                            </Col>
                        </Row>
                        {(reference.material_type === 1 || reference.material_type === 2 || reference.material_type === 3 || reference.material_type === 5) && 
                        <Row>
                        <Col sm={12}>
                                <p className="text-brown">{reference.material_type === 1 ? intl.formatMessage({id: "app.references.part_title"}) : reference.material_type === 2 ? intl.formatMessage({id: "app.references.section"}): intl.formatMessage({id: "app.references.chapter"})}</p>
                                <p>{reference.part_title}</p>
                        </Col>
                        </Row>}
                        <Row>
                        {(reference.material_type !== 1 ) && 
                        <Col sm={3}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.authors"})}</p>
                                <p>{reference.authors}</p>
                        </Col>
                        }
                        {(reference.material_type === 1 || reference.material_type === 2) && 
                        <Col sm={4}>
                            <p className="text-brown">{reference.material_type === 1? intl.formatMessage({id: "app.references.authors"}):intl.formatMessage({id: "app.references.part_authors"})}</p>
                            <p>{reference.part_authors}</p>
                        </Col>}
                        </Row>
                        <Row>                            
                        {(reference.material_type === 3) && 
                        <>
                        <Col sm={4}>
                            <p className="text-brown">{intl.formatMessage({id: "app.references.relator"})}</p>
                            <p>{reference.relator}</p>
                        </Col>
                        <Col sm={4}>
                            <p className="text-brown">{intl.formatMessage({id: "app.references.thesis_type"})}</p>
                            <p>{reference.thesis_type}</p>
                        </Col>
                        <Col sm={4}>
                        <p className="text-brown">{intl.formatMessage({id: "app.references.degree_course"})}</p>
                        <p>{reference.degree_course}</p>
                        </Col>                        
                        </>}    
                        </Row>
                        {(reference.material_type === 1 || reference.material_type === 2 || reference.material_type === 4) && 
                        <Row>
                        <Col sm={12}>
                                <p className="text-brown">{reference.material_type === 4? intl.formatMessage({id: "app.references.collection"}):intl.formatMessage({id: "app.references.series_title"})}</p>
                                <p>{reference.series_title}</p>
                        </Col>
                        </Row>
                        }
                        {(reference.material_type === 4) && 
                        <Row>
                        <Col sm={12}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.geographic_area"})}</p>
                                <p>{reference.geographic_area}</p>
                        </Col>
                        </Row>
                        }
                    </Card>
                    <h3>{intl.formatMessage({id: "app.references.institutionPlaceHead"})}</h3>
                    <Card>
                        <Row>
                        <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.pubyear"})}</p>
                                <p>{reference.pubyear}</p>
                        </Col>                    
                        {(reference.material_type === 1 || reference.material_type === 2) && 
                            <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.volume"})}</p>
                                <p>{reference.volume}</p>
                            </Col>
                        }
                        {(reference.material_type === 1) && 
                            <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.issue"})}</p>
                                <p>{reference.issue}</p>
                            </Col>
                        }
                        {(reference.material_type !== 4 ) && 
                            <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.pages"})}</p>
                                <p>{reference.pages}</p>
                            </Col>
                        }
                        </Row>
                        <Row>
                            {reference.material_type != 5 && 
                            <Col sm={4}>
                                <p className="text-brown">{reference.material_type === 3?intl.formatMessage({id: "app.references.university"}):intl.formatMessage({id: "app.references.publisher"})}</p>
                                <p>{reference.publisher}</p>
                            </Col>
                            }
                            {reference.material_type != 1 &&
                            <Col sm={4}>
                                <p className="text-brown">{intl.formatMessage({id: "app.references.publishing_place"})}</p>
                                <p>{reference.publishing_place}</p>
                            </Col>
                            }
                        </Row>                    
                    </Card>
                    <h3>{intl.formatMessage({id: "app.references.identificationHead"})}</h3>
                    <Card>                
                    <Row>
                    {(reference.material_type === 2 || reference.material_type === 4 )&& 
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage({id: "app.references.isbn"})}</p>
                            <p>{reference.isbn}</p>
                        </Col>
                    }
                    {(reference.material_type === 1 || reference.material_type === 2 || reference.material_type === 4 )&&                         
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage({id: "app.references.issn"})}</p>
                            <p>{reference.issn}</p>
                        </Col>
                    }
                    {reference.pmid && <Col sm={3}>
                        <p className="text-brown">{intl.formatMessage({id: "app.references.pmid"})}</p>
                        <a href={"https://pubmed.ncbi.nlm.nih.gov/"+reference.pmid} target="_blank"><i className="fas fa-external-link-alt"></i> {reference.pmid}</a>
                    </Col>}
                    {reference.doi && <Col sm={5}>
                        <p className="text-brown">{intl.formatMessage({id: "app.references.doi"})}</p>
                        <a href={"https://doi.org/"+reference.doi} target="_blank"><i className="fas fa-external-link-alt"></i> {reference.doi}</a>
                    </Col>}
                    </Row>
                    <Row>
                    {reference.oa_link && <Col sm={10}>
                        <p className="text-brown">{intl.formatMessage({id: "app.references.oa_link"})}</p>
                        <a href={reference.oa_link} target="_blank"><i className="fas fa-external-link-alt"></i> {reference.oa_link}</a>
                    </Col>}

                    </Row>
                    {reference.sid && <Row>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage({id: "app.references.sid"})}</p>
                            <p>{reference.sid}</p>
                        </Col>                        
                    </Row>}
                </Card>
                <h3>{intl.formatMessage({id: "app.references.abstract"})}</h3>
                <Card>                  
                    <Row>
                    <Col sm={12}>
                        <p className="text-brown">{intl.formatMessage({id: "app.references.abstract"})}</p>
                        <p>{reference.abstract}</p>
                    </Col>
                    </Row>
                </Card>
                <h3>{reference.material_type === 3?intl.formatMessage({id: "app.references.indications"}):reference.material_type === 4?intl.formatMessage({id: "app.references.mathnote"}):intl.formatMessage({id: "app.references.note"})}</h3>
                <Card>                   
                    <Row>                    
                    <Col sm={12}>
                        <p className="text-brown">{intl.formatMessage({id: "app.references.note"})}</p>
                        <p>{reference.note}</p>
                    </Col>                    
                    </Row>
                </Card>
                {/*    <Row>
                        <Col sm={5}>
                            {reference.labels && 
                                <>
                                    <p className="text-brown">{intl.formatMessage({id: "app.routes.Labels"})}</p>  
                                    <ul>    
                                        {reference.labels.data.map( el => 
                                            <li key={el.id}>{el.name}</li>
                                            ) 
                                        }
                                    </ul>
                                </>
                            }
                        </Col>
                        <Col sm={5}>
                            {reference.groups && 
                                <>
                                    <p className="text-brown">{intl.formatMessage({id: "app.routes.Categories"})}</p>  
                                    <ul>    
                                        {reference.groups.data.map( el => 
                                            <li key={el.id}>{el.name}</li>
                                            ) 
                                        }
                                    </ul>
                                </>
                            }
                        </Col>
                        </Row>*/}                    
    </div>}
</>
)

}

export default ReferenceDetailContent;