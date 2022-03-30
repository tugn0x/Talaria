import React from 'react';
import './style.scss';

const RequestTags = (props) => {

const {data,removeTag}=props;
    
return (data.length>0 &&                 
        <div className="request_tags">
                <span className="tags-row">
                    <i className="fas fa-tag"></i>
                    {data.map(tag => <span key={tag.id}>
                        {tag.name} 
                        {removeTag && <i className="fas fa-times"  onClick={() => removeTag(tag.id)}></i>}
                    </span>)}
                </span>
        </div>
        )               
}

export default RequestTags;