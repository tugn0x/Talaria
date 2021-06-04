import React, { useEffect,useRef } from 'react'
import './style.scss'
import { FormattedMessage } from 'react-intl';
import {useIntl} from 'react-intl'
import messages from 'routes/messages';
import {Row, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';

const ResourceHeaderBar = (props) => {
    const {auth,match}=props;

    return (
        auth && match && <div className="app-resourceheader">
        { match.params.library_id && auth.permissions.resources.libraries &&      
       ( 
         auth.permissions.resources.libraries.find(el => el.resource.id==match.params.library_id).resource.name
       )
       || match.params.institution_id && auth.permissions.resources.institutions &&      
       ( 
         auth.permissions.resources.institutions.find(el => el.resource.id==match.params.institution_id).resource.name
       )
       || match.params.project_id && auth.permissions.resources.projects &&      
       ( 
         auth.permissions.resources.projects.find(el => el.resource.id==match.params.project_id).resource.name
       )
       }
        </div>
    )
}


export default ResourceHeaderBar
