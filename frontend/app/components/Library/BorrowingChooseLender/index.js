import React,{useState} from 'react';
import {useIntl} from 'react-intl';
import './style.scss';

const BorrowingChooseLender = (props) => {
    console.log('BorrowingChooseLender', props)
    const catalog_filter_enabled=(process.env.CATALOG_SEARCH && process.env.CATALOG_SEARCH=="true")?true:false;
    const {selectLenderCb} = props
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

    return (<div className="BorrowingChooseLender">
                <h3>Choose the lender:</h3>                
                <br/><br/>                
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">   
                    <ul className="navbar-nav">
                      <li class="nav-item active">
                            <a class="nav-link" href="#">ALL<span class="sr-only">(current)</span></a>
                      </li>                      
                      {catalog_filter_enabled && <li class="nav-item">
                            <a class="nav-link" href="#">CATALOG1</a>
                      </li>}
                      {catalog_filter_enabled && <li class="nav-item">
                            <a class="nav-link" href="#">CATALOG2</a>
                      </li>}                      
                    </ul>
                </nav>             
                <ul className="librarylist">
                    <li><input name="lender" type="radio" value="0" onChange={e=>onChangeLibraryList(e.target.value)} />ALL libraries</li>
                    <li><input name="lender" type="radio" value="10" onChange={e=>onChangeLibraryList(e.target.value)} />TestBiblio</li>
                    <li><input name="lender" type="radio" value="11" onChange={e=>onChangeLibraryList(e.target.value)} />TestBiblio2</li>
                    <li><input name="lender" type="radio" value="12" onChange={e=>onChangeLibraryList(e.target.value)} />TestBiblio28</li>
                    <li><input name="lender" type="radio" value="13" onChange={e=>onChangeLibraryList(e.target.value)} />TestBiblio29</li>                    
                </ul>                
                {allselected && <button className="btn btn-secondary" onClick={()=>sendRequestToLender()}>Send request to ALL libraries</button>}                
                
                &nbsp;&nbsp;<button className="btn btn-primary" onClick={()=>sendRequestToLender()}>Send request to selected library</button>
            </div>
    );
};

export default BorrowingChooseLender;