import React from 'react';
import './style.scss';

const RequestTags = (props) => {

const {data,removeTag}=props;
    
return (data.length>0 &&                 
        <div className="request_tags">
                <span className="tags-row">
                    <i className="fa-solid fa-tag"></i>
                    {data.map(tag => <span key={tag.id} className="badge badge-light">
                        {tag.name} 
                        {removeTag && <i className="fa-solid fa-xmark remove_tag_icon"  onClick={() => removeTag(tag.id)}></i>}
                    </span>)}
                </span>
        </div>
        )               
}

export default RequestTags;