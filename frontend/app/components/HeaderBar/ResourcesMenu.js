import React from 'react';
import './style.scss'
import {DropdownItem} from "reactstrap";
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import resourcesMap from 'routes/resources'

function ResourceMenu(props) {

  // console.log('ResourceMenu', props);
  const {resources} = props;
  const types = Object.keys(resources);

  const iconType = (res) => {
    let cl = ""
    
    switch (res) {
      case 'institutions': cl='fas fa-building';  break;
      case 'libraries': cl='fas fa-landmark'; break;
      case 'projects': cl='fas fa-project-diagram'; break;
      case 'consortium': cl='icon icon-consorzio'; break;
      
      default: cl='';
    }
    cl+=" resource-icon float-left"; 
    return cl;
  }


  return (
    types.map((resource) => (
      <div key={resource} className="resources-menu">
        <DropdownItem header tag="div" className="text-center">
          <i className={`${iconType(resource)}`}></i>
          <FormattedMessage {...messages[resource]} />
        </DropdownItem>
        {resources[resource].map((item) =>
          <NavLink to={`${resourcesMap[resource]}${item.resource.id}`}
                   key={item.resource.id}
                   className="dropdown-item btn"
                   activeClassName="current">
            {item.resource.name}
          </NavLink>
        )}
      </div>
    ))
  )
}

ResourceMenu.propTypes = {};

export default ResourceMenu;
