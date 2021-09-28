import React from 'react';
import './style.scss';

const RequestTags = (props) => {

const {data,removeTag}=props;
    
return (<div className="request_tags">
        {data.length>0 &&                 
                <span className="tags-row">
                    <i className="fas fa-tag"></i>
                    {data.map(tag => <span key={tag.id}>
                        {tag.name} 
                        {removeTag && <i className="fas fa-times"  onClick={() => removeTag(tag.id)}></i>}
                    </span>)}
                </span>
        }       
        </div>
)
}

export default RequestTags;