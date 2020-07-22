import React from 'react';
import './style.scss'
import {Row} from "reactstrap";
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
    
    return cl;
  }


  return (
    types.map((resource) => (
      <div key={resource} className="resources-menu">
         <Row className="head item">
            <i className={`${iconType(resource)}`}></i>
            <span><FormattedMessage {...messages[resource]} /></span>
        </Row>
        {resources[resource].map((item) =>
          <Row className="item">
              <NavLink to={`${resourcesMap[resource]}${item.resource.id}`}
                    key={item.resource.id}
                    activeClassName="current">
              {item.resource.name}
            </NavLink>   
          </Row>
        )}
      </div>
    ))
  )
}

ResourceMenu.propTypes = {};

export default ResourceMenu;
