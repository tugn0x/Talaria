import React, {useState} from 'react'
import {Row, Col} from 'reactstrap'
import messages from './messages'
import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {Pagination} from 'components';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
import ButtonPlus from 'components/Button/ButtonPlus'
import { generatePath } from "react-router";
import ReferencesPage from 'containers/Patron/ReferencesPage'
import { NavLink } from 'react-router-dom';


const ReferenceItem = (props) => {
    console.log('ReferenceItem', props)
    const {match, reference} = props
    const intl = useIntl();

    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'fa-file'; break;
          case 2: return 'fa-book'; break;
          case 3: return 'fa-graduation-cap'; break;
        }
        return mat;
      }

    return (
        <div className="referenceItem" key={reference.id}>
            <div className="icons">
                <input type="checkbox" name="rif"></input> 
                <i className={`fa ${matTypeIcon(reference.material_type)}`}></i>
            </div>
            <div className="metadata">
                <p className="pub_title">{reference.pub_title}</p>
                <p className="part_title">{reference.part_title}</p>
                {reference.first_author && <div className="authors">Author: <span className="first_author">{reference.first_author}</span></div> }
                
                {reference.pubyear && <span className="pubyear">{reference.pubyear}</span>}
                
                {reference.labels.data && <div className="labels">
                    {reference.labels.data.map(label => <span>{label.name}</span>)}
                </div>}
                
                {reference.groups.data && <div className="groups">
                    {reference.groups.data.map(grp => <span>{grp.name}</span>)}
                </div>}
                
            </div>
            <div className="operations">
            <NavLink  key={reference.id} className="btn btn-link">
                <i className="fa fa-edit"></i>
            </NavLink>
            <a href="#" onClick={() => console.log('delete reference')} className="btn btn-link">
                <i className="fa fa-trash"></i>
            </a>
            </div>
        </div>
    )

}

export default ReferenceItem