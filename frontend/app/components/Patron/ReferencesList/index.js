import React, {useState} from 'react'
import {Row, Col} from 'reactstrap'
import messages from './messages'
import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
import ButtonPlus from 'components/Button/ButtonPlus'
import { generatePath } from "react-router";
import ReferencesPage from 'containers/Patron/ReferencesPage'
import { NavLink } from 'react-router-dom';
import ReferenceItem from '../ReferenceItem';
import './style.scss';

const ReferencesList = (props) => {
    console.log('ReferencesList', props)
    const {match, data, pagination, history, searchOptions} = props
    const {total_pages, current_page} = pagination
    const intl = useIntl();
    /*  const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal); */

    const [selectedReferences,setSelectedReferences]=useState([]);


    const linkTo = (path) => {
        history.push(path)
     };

    const toggleAllCheckbox = (e) => {
        console.log("TOGGLE ALL", e)
    }

    const toggleReference = (e) => {
        let newList = selectedReferences
        
        let pos=newList.indexOf(e.target.value);
        if(e.target.checked)
        {
            //add to array
            if(pos==-1)
                newList.push(e.target.value)
            
        }
        else if(!e.target.checked)
        {
            //remove from array
            if(pos>=0)
                newList.splice(pos, 1);
            
        }

        setSelectedReferences(newList);
    }

    return (
        <>
            <h3 className="table-title text-center"><FormattedMessage {...messages.header} /></h3>
           {/*  <ButtonPlus
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewReference)}
            /> */}
            <div className="search-filter-bar">
                <Row>
                    <Col md="4">
                        {searchOptions &&
                            <InputSearch
                                submitCallBack={(query) => searchOptions.getSearchList(query)}
                                searchOnChange={searchOptions.searchOnChange ? searchOptions.searchOnChange : false}
                            />
                        }
                    </Col>
                    <Col md="3">Categorie</Col>
                    <Col md="3">Etichette</Col>
                    <Col md="2">Cancella tutto</Col>
                </Row>
                <Row>
                    <Col md={12}>Filter Results</Col>
                </Row>
            </div>
            
            <div className="list-wrapper">
                <Row className="list-head">
                    <Col sm={10} className="select-checkbox">
                        <input type="checkbox" onChange={(e)=>toggleAllCheckbox(e)}/>
                        {<NavLink to='#'  className="btn btn-link">
                            <i className="fa fa-2x fa-print"></i>
                        </NavLink>}
                        {<NavLink to='#'  className="btn btn-link">
                            <i className="fa fa-2x fa-download"></i>
                        </NavLink>}
                        {<NavLink to='#'  className="btn btn-link">
                            <i className="fa fa-2x fa-tag"></i>
                        </NavLink>}
                        {<NavLink to='#'  className="btn btn-link">
                            <i className="fa fa-2x fa-folder"></i>
                        </NavLink>}
                    </Col>
                    <Col sm={2} className="select-counter">
                    {selectedReferences.length} di {data.length}
                    </Col>
                </Row>
                <div className="list-body">
                    {data.length > 0 &&
                        data.map(ref => (
                            <ReferenceItem 
                                key={`reference-${ref.id}`}
                                data={ref}
                                editPath={props.editPath}
                                toggleSelection={toggleReference}
                            />
                        ))
                    ||
                        <h5 className="text-center">
                            {intl.formatMessage(messages.ReferencesNotFound)}
                        </h5>
                    }
                </div>
            </div>
           {/*  <CustomModal
                modal={modal}
                toggle={toggle}>
                <ReferencesPage
                    match={match} />
            </CustomModal> */}
            {Object.keys(pagination).length &&
                <Pagination
                    current_page={current_page}
                    total_pages={total_pages}
                    setPage={(page) => linkTo(generatePath(`${match.path}`, {
                        page: page
                    }))}
                />
            }
        </>
    )
}

export default ReferencesList
