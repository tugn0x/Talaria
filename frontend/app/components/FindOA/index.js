import React from "react";
import './style.scss';
import {useIntl} from 'react-intl';

const FindOA = (props) => {

    const intl=useIntl();

    const {reference,findOA}=props;

    const handleFindOA = () => {
        console.log("handleFindOA",reference);
        if (typeof findOA === "function" && reference!=null)
        {
            console.log("chiamo la API findOA");
            findOA(reference);
        }
    }
    
    return  (
        reference &&
        <div className="findOA">
            <>
                { ((reference.oa_link && reference.oa_link!=''))&&
                    <div className="alert alert-success" role="alert">
                        <a href={reference.oa_link} target="_blank" className={`${reference.oa_link && reference.oa_link!=''?'btn btn-icon':'btn btn-icon disabled'}`}><i className="icon-oa"></i></a> 
                        <a href={reference.oa_link} target="_blank">
                        {intl.formatMessage({ id: 'app.components.findOA.oapubfound' })}
                        </a>
                    </div>}
                { (!reference.oa_link||reference.oa_link=='') && reference && (reference.doi||reference.pmid||reference.pub_title) &&
                    <div className="alert alert-warning" role="alert">
                        {findOA && 
                        <>
                            {intl.formatMessage({ id: 'app.components.findOA.oapubverify' })}
                            <button type="button" className="btn-success" onClick={ () => handleFindOA()}><i className="fa-solid fa-magnifying-glass"> {intl.formatMessage({ id: 'app.components.findOA.oafindButton' })}</i></button>
                        </>
                        }
                        {!findOA && 
                        <>{intl.formatMessage({ id: 'app.components.findOA.oapubnotfound' })}</>
                        }
                    </div>
                }
            </>            
        </div>
    )
}

export default FindOA;
