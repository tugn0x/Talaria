import React from 'react';
import {NavLink,Link } from 'react-router-dom';
import { generatePath } from "react-router";
import ApplyReferencesTag from '../ApplyReferencesTag';

const ReferenceIcons = (props) => {
    const {data,deleteReference,icons, labelsOptionList, groupsOptionList , applyGroups, applyLabels, selectedReferences} = props

    const referenceUrl='/patron/references/:id?/:op?';
    
    const editurl = (id) => {
        return generatePath(`${referenceUrl}`, {
            id,
            op: "edit"
        });
    }
    const requesturl = (id) => {
        return generatePath(`${referenceUrl}`, {
            id,
            op: "request"
        });
    }

    
    const oaurl=(data) => {
        /*return generatePath(`${referenceUrl}`, {
            id,
            op:'oa'
        });*/
        return data.oa_link;
    }
   
    const canEdit = (data) => {
        if(data.patronrequests==0) return true;
        return false;
    }

    const canRequest = (data) => {
        if(data.active_patronrequests==0) return true;
        return false;
    }

    const canDelete = (data) => {
        return canRequest(data);
    }

    const visibleIcon = (icon) => {
        return icons && icons.indexOf(icon)>=0;
    }


    return ( 
        icons && icons.length>0 && 
        <>
                {visibleIcon('request') && 
                 <NavLink to={`${requesturl(data.id)}`}  className="btn btn-icon">
                    <i className="fas fa-share"></i>                    
                 </NavLink>
                }
                {visibleIcon('oa') &&
                 <a href={data.oa_link} target="_new" className={`${data.oa_link && data.oa_link!=''?'btn btn-icon':'btn btn-icon disabled'}`}><i className="icon-oa"></i></a>
                }
                
                {visibleIcon('print') && <a className="btn btn-icon" onClick={() => console.log("print") }>
                    <i className="fas fa-print"></i>
                </a>}
                {visibleIcon('export') && <a className="btn btn-icon" onClick={() => console.log("export") }>
                    <i className="fas fa-file-export"></i>
                </a>}
                { visibleIcon('assignLabel') && applyLabels &&  
                    <ApplyReferencesTag
                        type="label"
                        submitCallBack={(id) => applyLabels(id, selectedReferences)}
                        options={labelsOptionList} 
                    /> 
                }
                {visibleIcon('assignGroup') && applyGroups &&
                    <ApplyReferencesTag
                        type="group"
                        submitCallBack={(ids) => applyGroups(ids, selectedReferences)}
                        options={groupsOptionList} 
                    /> 
                }
                {visibleIcon('edit') && data.id && 
                <NavLink to={canEdit(data)?editurl(data.id):'#'} className={`${canEdit(data)?"btn btn-icon":"btn btn-icon disabled"}`}>
                    <i className="fas fa-edit"></i>
                </NavLink>}               
                {visibleIcon('delete') && data.id && 
                (                   
                        (canDelete(data) && deleteReference && 
                        <a href="#" className="btn btn-icon"  onClick={() => deleteReference(data.id) }>
                            <i className="fas fa-trash"></i>
                        </a>)||
                        (!canDelete(data) &&
                        <a href="#" className="btn btn-icon disabled">
                            <i className="fas fa-trash"></i>
                        </a>)
                )
                }



        
        </>
    )
}

export default ReferenceIcons