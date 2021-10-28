import React,{useState} from 'react';
import {useIntl} from 'react-intl';
import './style.scss';

const BorrowingChooseLender = (props) => {
    console.log('BorrowingChooseLender', props)
    const catalog_filter_enabled=(process.env.CATALOG_SEARCH && process.env.CATALOG_SEARCH=="true")?true:false;
    const {selectLenderCb,findLender,lendersList} = props
    const intl = useIntl()

    const [allselected,setAllSelected]=useState(false);

    const [lender,setLender]=useState(null)


    const sendRequestToLender=()=>{
        let lenderArr=lender;
        
        if(lenderArr && lenderArr>0 && !Array.isArray(lenderArr)) //unique lender
            lenderArr=[lender];          
        selectLenderCb(lenderArr)//set it as array or 0 (=all lender)
    }

    const onChangeLibraryList=(v)=>{
        setAllSelected(v==0);        
        setLender(v)
    }

    const findLenderByCat=(catid) => {
        //todo: select catalog
        //call findLender api (filtered by cat or ALL)
        findLender(catid);
    }

    return (<div className="BorrowingChooseLender">
                <h3>Choose the lender:</h3>                                          
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">   
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                            <a className="nav-link" onClick={()=>findLenderByCat(0)}>ALL<span className="sr-only">(current)</span></a>
                      </li>                      
                      {catalog_filter_enabled && <li className="nav-item">
                            <a className="nav-link" onClick={()=>findLenderByCat(1)}>CATALOG1</a>
                      </li>}
                      {catalog_filter_enabled && <li className="nav-item">
                            <a className="nav-link" onClick={()=>findLenderByCat(2)}>CATALOG2</a>
                      </li>}                      
                    </ul>
                </nav>                             
                {lendersList.loading && <div className="w-50 mx-auto my-3 text-center"><i className="fas fa-spinner fa-pulse fa-2x"></i></div>}
                {lendersList.data && lendersList.data.length>0 &&
                <>
                    <ul className="librarylist">
                        <li className="alllibraries"><input name="lender" type="radio" value="0" onChange={e=>onChangeLibraryList(e.target.value)} />ALL libraries</li>
                        {lendersList.data.map ( (lib) => 
                            <li><input name="lender" type="radio" value={lib.id} onChange={e=>onChangeLibraryList(e.target.value)} />{lib.name}</li>    
                        )}                                        
                    </ul>
                    {allselected && <button className="btn btn-warning" onClick={()=>sendRequestToLender()}>Send request to ALL libraries</button>}                
                
                    &nbsp;&nbsp;<button className="btn btn-primary" onClick={()=>sendRequestToLender()}>Send request to selected library</button>
                </>}
            </div>
    );
};

export default BorrowingChooseLender;