import React from 'react';
import './style.scss'
import {DropdownItem} from "reactstrap";
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import resourcesMap from 'routes/resources'

function ResourceMenu(props) {

  console.log('ResourceMenu', props);
  const {resources} = props;
  const types = Object.keys(resources);


  return (
    types.map((resource) => (
      <div key={resource} className="resources-menu">
        <DropdownItem header tag="div" className="text-center">
          <div className={`icon-img ${resource} float-left`}></div>
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
