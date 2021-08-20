import React from 'react';
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
    const {full,data,cssClass, referenceurl}=props;

    const intl=useIntl();

    return (data && 
        <div className={"referenceCit "+cssClass}>
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
        <div className="authors">
           {data.material_type != 1 && data.authors && <span className="authors">{intl.formatMessage({id: "app.references.authors"})}<span> {data.authors}</span></span>} 
           {(data.material_type === 1 || data.material_type === 2) && data.part_authors && <span className="authors">{intl.formatMessage({id: data.material_type === 1 ? "app.references.authors":"app.references.part_authors"})}<span> {data.part_authors}</span></span>}                  
           {data.pubyear && <span className="pubyear">{intl.formatMessage({id: "app.references.pubyear"})} <span>{data.pubyear}</span></span>}
        </div>
        {data.material_type === 3 &&
        <div className="university">
            <span className="university">{intl.formatMessage({id: "app.references.university"})}<span> {data.publisher}</span></span>
        </div>}
        {data.material_type === 4 &&
        <div className="geographic_area">
            <span className="geographic_area">{intl.formatMessage({id: "app.references.geographic_area"})}<span> {data.geographic_area}</span></span>
        </div>}

        {full && 
        <>

        </>}    
    </div>
    )
}

export default ReferenceCitation;