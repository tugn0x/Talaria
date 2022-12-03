import React,{useState} from 'react';
import {useIntl} from 'react-intl';
import {NavLink } from 'react-router-dom';
import './style.scss';


export const matTypeIcon = (mat) => {
    switch (mat)
    {
      case 1: return 'simple_icon fas fa-file'; break;
      case 2: return 'simple_icon fas fa-book'; break;
      case 3: return 'simple_icon fas fa-scroll'; break;
      case 4: return 'simple_icon fas fa-map'; break;
      case 5: return 'simple_icon fas fa-bible'; break;          
    }
    return mat;
}

const ReferenceCitation = props => {
    const {data,customClass, referenceurl}=props;

    const intl=useIntl();
    
    const [showExtra,setShowExtra]=useState(false);

    return (data && 
        <div className={"referenceCit "+(customClass?customClass:'')}>
            <span className="mat_type"><i className={`${matTypeIcon(data.material_type)}`}></i></span>
            <div className="title">                
            {referenceurl && <NavLink to={`${referenceurl(data.id)}`}>
                <p><span className="pub_title">{data.pub_title}</span> &nbsp; 
                {data.material_type === 1 && <span className="part_title">{data.part_title}</span>}
                </p>
            </NavLink>}
            {!referenceurl && 
                <p><span className="pub_title">{data.pub_title}</span> &nbsp; 
                {data.material_type === 1 && <span className="part_title">{data.part_title}</span>}
                </p>
            }
            </div>            
            <span className="authors">
            {data.material_type != 1 && data.authors && <span className="authors">{intl.formatMessage({id: "app.references.authors"})}<span> {data.authors}</span></span>} 
            {(data.material_type === 1 || data.material_type === 2) && data.part_authors && <span className="authors">{intl.formatMessage({id: data.material_type === 1 ? "app.references.authors":"app.references.part_authors"})}<span> {data.part_authors}</span></span>}                  
            {data.pubyear && <span className="pubyear">{intl.formatMessage({id: "app.references.pubyear"})} <span>{data.pubyear}</span></span>}
            </span>
            {data.publisher && data.material_type === 3 &&
                <span className="university">{intl.formatMessage({id: "app.references.university"})}<span> {data.publisher}</span></span>
            }
            {data.publisher && data.material_type != 5 && 
                <span className="publisher">{data.material_type == 3?intl.formatMessage({id: "app.references.university"}):intl.formatMessage({id: "app.references.publisher"})}<span> {data.publisher}</span></span>                            
            }
            {data.geographic_area && data.material_type === 4 &&            
                <span className="geographic_area">{intl.formatMessage({id: "app.references.geographic_area"})}<span> {data.geographic_area}</span></span>
            }
            {/*<a className="toggle-extra-link" onClick={()=>setShowExtra(!showExtra)} title="show extra info">      
                    <i className={`fas ${showExtra?'fa-caret-square-up':'fa-caret-square-down'}`}></i> 
            </a>*/}            
            {/*showExtra && */ <div className='extra'>
                <div className='identifiers'>
                    {(data.isbn && (data.material_type === 2 || data.material_type=== 4 ) )&& 
                        <span className="isbn">{intl.formatMessage({id: "app.references.isbn"})} <span>{data.isbn}</span></span>
                    }
                    {(data.issn && (data.material_type === 1 || data.material_type === 2 || data.material_type=== 4 ) ) && 
                        <span className="issn">{intl.formatMessage({id: "app.references.issn"})} <span>{data.issn}</span></span>
                    }
                    {data.pmid && 
                        <span className="pmid">{intl.formatMessage({id: "app.references.pmid"})} <span><a href={"https://pubmed.ncbi.nlm.nih.gov/"+data.pmid} target="_blank"><i className="fas fa-external-link-alt"></i> {data.pmid}</a></span></span>
                    }
                    {data.doi && 
                        <span className="pmid">{intl.formatMessage({id: "app.references.doi"})} <span><a href={"https://doi.org/"+data.doi} target="_blank"><i className="fas fa-external-link-alt"></i> {data.doi}</a></span></span>
                    }
                </div>
            </div>}
        </div>
    )
}

export default ReferenceCitation;