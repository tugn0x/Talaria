import React from 'react';
import {NavLink} from 'react-router-dom';
import { generatePath } from "react-router";
import ApplyReferencesTag from '../ApplyReferencesTag';

const ReferenceIcons = (props) => {
    const {data,deleteReference,icons, labelsOptionList, groupsOptionList , applyGroups, applyLabels, selectedReferences,findAndUpdateOA} = props
    

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

    const findOA = (ev,id) => {       
        ev.preventDefault();

        if(findAndUpdateOA)
            findAndUpdateOA(id);
    }


    return ( 
        icons && icons.length>0 && 
        <>
                {visibleIcon('request') && 
                 <NavLink to={`${requesturl(data.id)}`}  className="btn btn-icon">
                    <i className="fas fa-share"></i>                    
                 </NavLink>
                }
                {visibleIcon('oa') && data.oa_link && <a href={data.oa_link} target="_blank" className='btn btn-icon'><i className="icon-oa"></i></a>} 
                {visibleIcon('oa') && !data.oa_link && <a target="_blank" className='btn btn-icon' onClick={(ev) => findAndUpdateOA(ev,data.id) }><i className="fas fa-search"></i>OA</a>}
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
                <NavLink to={canEdit(data)?editurl(data.id):'#'} className={`${canEdit(data)?'btn btn-icon':'btn btn-icon disabled'}`}>
                    <i className="fas fa-edit"></i>
                </NavLink>}               
                {visibleIcon('delete') && data.id && 
                (                                           
                        <NavLink to='#' className={canDelete(data) && deleteReference?"btn btn-icon":"btn btn-icon disabled"} onClick={() => deleteReference(data.id) }>
                            <i className="fas fa-trash"></i>
                        </NavLink>
                )
                }                
        </>
    )
}

export default ReferenceIcons