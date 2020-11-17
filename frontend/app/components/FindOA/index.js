import React from "react";
import './style.scss';

const FindOA = (props) => {

    const {reference,findOA/*,oaurl*/}=props;

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
                { (/* (oaurl && oaurl!="") || */(reference.oa_link && reference.oa_link!=''))&&
                    <div className="alert alert-success" role="alert">
                        <a href={/*oaurl||*/reference.oa_link} target="_new">
                            La pubblicazione è disponibile OA, clicca qui!
                        </a>
                    </div>}
                {/*(!oaurl || oaurl=="") &&*/ (!reference.oa_link||reference.oa_link=='') && reference && (reference.doi||reference.pmid||reference.pub_title) &&
                    <div className="alert alert-warning" role="alert">
                        Verifica se la pubblicazione esiste in versione OA.
                        <button type="button" onClick={ () => handleFindOA()}>Trova OA</button>  
                    </div>
                }
            </>            
        </div>
    )
}

export default FindOA;
