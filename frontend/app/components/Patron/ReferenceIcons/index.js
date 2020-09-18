import React from 'react';
import {NavLink } from 'react-router-dom';
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

    
    const oaurl=(id) => {
        return generatePath(`${referenceUrl}`, {
            id,
            op:'oa'
        });
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
                    {
                    canRequest(data) && <i className="fas fa-share"></i>
                    || 
                    <i className="fas fa-lock"></i> /*oppure sempre fa-share*/
                    }
                 </NavLink>
                }
                {data.oa==1 && visibleIcon('oa') && <NavLink to={`${oaurl(data.id)}`} className="btn btn-icon">
                    <i className="icon-oa"></i>
                </NavLink>}
                
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
                {canEdit(data) && visibleIcon('edit') && <NavLink to={`${editurl(data.id)}`}  className="btn btn-icon">
                    <i className="fas fa-edit"></i>
                </NavLink>}
                {canDelete(data) && visibleIcon('delete') && deleteReference && <a href="#" className="btn btn-icon"  onClick={() => deleteReference(data.id) }>
                    <i className="fas fa-trash"></i>
                </a> }
        
        </>
    )
}

export default ReferenceIcons