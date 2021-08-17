import React from 'react';
import {useIntl} from 'react-intl';
import './style.scss';

const Reference = props => {
    const {full,data,cssClass}=props;
    return (data && 
    <div className={"reference "+cssClass}>        
        <span>{data.pub_title}</span> <span>"{data.part_title}"</span>, <span>{data.pubyear}</span>, 
        <span>{data.part_authors}</span>
        <span>{data.authors}</span>
        {full && 
        <>

        </>}    
    </div>
    )
}

export default Reference;