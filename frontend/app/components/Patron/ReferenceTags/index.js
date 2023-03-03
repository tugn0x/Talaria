import React from 'react';
import './style.scss';

const ReferenceTags = (props) => {

const {data,removeLabel,removeGroup}=props;
    
return (<div className="reference_tags">
        {( (data.labels && data.labels.data.length>0) ||(data.groups && data.groups.data.length>0) ) &&         
        <>
                {data.labels.data && data.labels.data.length>0 && <span className="labels-row">
                    {<i className="fa-solid fa-tag"></i>}
                    {data.labels.data.map(label => <span key={label.id}>
                        {label.name} 
                        {removeLabel && <i className="fa-solid fa-xmark"  onClick={() => removeLabel(label.id)}></i>}
                    </span>)}
                </span>}
                
                {data.groups.data && data.groups.data.length>0 && <span className="groups-row">
                    {<i className="fa-solid fa-folder"></i>}
                    {data.groups.data.map(grp => <span key={grp.id}>
                        {grp.name} 
                        {removeGroup && <i className="fa-solid fa-xmark"  onClick={() => removeGroup(grp.id) }></i>}
                    </span>)}
                </span>}
         </>}       
        </div>
)
}

export default ReferenceTags;