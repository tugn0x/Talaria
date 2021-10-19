import React,{useEffect} from "react";
import './style.scss';
import {useIntl} from 'react-intl';

const ISSNISBNItem = (props) => {
    const {data,chooseItem}=props;

    return (<li>
        {data.issn && <span>ISSN: {data.issn} ISSN_L: {data.issn_l} Title: {data.pub_title}</span>}
        {data.isbn && <span>ISBN: {data.isbn} SBNDOCID: {data.sbn_docid} Title: {data.pub_title}</span>}
        <button className="btn btn-primary btn-sm" onClick={(ev)=>chooseItem(data)}>Update reference</button>
    </li>)
}

const FindISSNISBN = (props) => {

    const intl=useIntl();

    const {reqdata,findCB,updateISSNISBNcallback,results}=props;

    useEffect(() => {
        if (typeof findCB === "function" && reqdata!=null)
            findCB(reqdata);        
    }, [reqdata])    

    const updateReference=(values) => {
        if (typeof updateISSNISBNcallback === "function")
        {
            /*console.log("ISSN Selected -> updateCallback!", values)
            let data={                
                [typ]: value //issn:xxx, o isbn:xxx
            }            
            if(title)
                data.pub_title=title*/

            updateISSNISBNcallback(values);
        }
    }
    
    return  (
        reqdata &&
        <div className="findISSNISBN"> 
                <h3>Choose the correct ISSN/ISBN</h3>               
                {results.loading && 
                <span>searching for ISSN... <i className="fas fa-spinner fa-pulse"></i></span>}
                
                {!results.loading && results!=null && results.data && results.data.length > 0 &&
                    (<ul className="issnisbn_list">
                    {results.data.map( (row,index)=>
                        <ISSNISBNItem key={index} data={row} chooseItem={()=>updateReference(row)}/> 
                    )}                                    
                    </ul>) || (
                    <span className="alert alert-warning">No matching results or ISSN/ISBN search not available</span>
                    )  
                }                                

        </div>
    )
}

export default FindISSNISBN;
