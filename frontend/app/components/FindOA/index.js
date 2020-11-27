import React from "react";
import './style.scss';

const FindOA = (props) => {

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
        <div className="findOA">
            <>
                { ((reference.oa_link && reference.oa_link!=''))&&
                    <div className="alert alert-success" role="alert">
                        <a href={reference.oa_link} target="_blank" className={`${reference.oa_link && reference.oa_link!=''?'btn btn-icon':'btn btn-icon disabled'}`}><i className="icon-oa"></i></a> 
                        <a href={reference.oa_link} target="_blank">
                            La pubblicazione è disponibile OA, clicca qui!
                        </a>
                    </div>}
                { findOA && (!reference.oa_link||reference.oa_link=='') && reference && (reference.doi||reference.pmid||reference.pub_title) &&
                    <div className="alert alert-warning" role="alert">
                        Verifica se la pubblicazione esiste in versione OA.
                        <button type="button" className="btn-success" onClick={ () => handleFindOA()}><i className="fas fa-search"> Trova OA</i></button>  
                    </div>
                }
            </>            
        </div>
    )
}

export default FindOA;
