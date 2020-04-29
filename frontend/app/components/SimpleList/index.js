import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';
// import messages from './messages';
// import globalMessages from 'utils/globalMessages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import {CustomModal, ButtonPlus, Pagination, Loader, InputSearch} from 'components'
import { generatePath } from "react-router";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import subStringer from 'utils/subStringer'

function SimpleList(props) {
    console.log('SimpleList', props)
    const {data, columns, history,
          match, editPath, messages,
          pagination, searchOptions, 
          loading, modalComponent, title, subtitle,deleteCallback} = props
    
    const {total_pages, current_page} = pagination
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

   /*  const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id
        });
    }  */

    //passandogli un oggetto che specifica i params
    //li estrae (tramite chiave) dall'item passato
    //ritorna l'oggetto con i params richiesti valorizzati dai valori dell'item
    //se non viene passato un oggetto (quindi non vengono specificati parametri), 
    //estrae dall'item solo l'id
    const filterItemFieldByObjectParams = (obj,item) => {
      if(!item){
        return
      }
      let ParamsObj = {}
      if(typeof obj === 'object'){
        obj.params &&
        Array.isArray(obj.params) ? 
        obj.params.map((param,i) =>  {
          ParamsObj = {...ParamsObj, [param]: item[param]}
        }) : console.warn('obj with params must be an array')
      }else {
        ParamsObj = {id: item.id}
      }

      return ParamsObj;
      

    }


    // editurl genera l url per il bottone edit (si possono passare piu parametri)
    // usando la Prop editPath. 
    // editPath puo essere una stringa (passi solo l url e il parametro sara' solo l id)
    // editPath puo' essere un oggetto, dove passi url e parametri
    //NB: al momento i param possono essere letti da item solo se sono presenti come colonne!
    const editurl = (item) => {
      let ParamsObj = {}

      ParamsObj=filterItemFieldByObjectParams(editPath,item);
      if(ParamsObj)
      {
        const url = editPath.url ? editPath.url : editPath
        return generatePath(url, ParamsObj)
      }
      return
    } 

    //sulla falsariga dell'editPath :)
    //NB: se cb è una normale funzione allora la chiamo pasando item.id
    //altrimenti se è un oggetto deve essere della forma {callback: funz, params: [array di param name]}
    //e in questo caso chiamero' funz passandogli un oggetto con i valori presi dai campi (indicati nell'array) dellitem 
    const getDeleteParamsAndCall = (cb, item) => {
      let ParamsObj={}
     ParamsObj=filterItemFieldByObjectParams(cb,item);
     if(ParamsObj)
     {
        if(cb.callback)
          cb.callback(ParamsObj);  
        else cb(ParamsObj);  
     }
     return
    }

    
    const linkTo = (path) => {
      history.push(path)
    };

    const statusClass = (status) => {
      switch (status)
      {
        case 0: return 'disabled'; break;
        case 1: return 'success'; break;
        case 2: return 'pending'; break;
      }
      return status;
    }
    const preferredStarClass = (pref) => {
      switch (pref)
      {
        case 0: return 'notpreferred'; break;
        case 1: return 'preferred'; break; 
        default: return 'notpreferred'; break;
      }
      return pref;
    }

    const checkIcon = (chk) => {
      switch (chk)
      {
        case 1: return 'check'; break;
        case 0: return 'ban'; break; 
      }
      return chk;
    }
    
    return (
        <>
            {title && <h4 className="table-title">{title}</h4> }
            {subtitle && <h5 className="table-subtitle">{subtitle}</h5> }
            <Row className="align-items-center">
              {searchOptions && 
                <Col md={8}>
                  <InputSearch 
                    submitCallBack={(query) => searchOptions.getSearchList(query)}
                    searchOnChange={searchOptions.searchOnChange ? searchOptions.searchOnChange : false} 
                  />
                </Col>
              }
              {modalComponent &&
                <Col md={4} className="my-4">
                <ButtonPlus
                    onClickHandle={toggle}
                    text={intl.formatMessage(messages.createNew)}
                />
                </Col>
              }
            </Row>
            <div className="table libraries-list">
             {/*  <Loader show={loading}>  */}
                <Row className="thead">
                  {columns.map((item) =>
                    <Col key={item.name} xs={item.col}>
                      <span>{intl.formatMessage({id: item.label})}</span>
                    </Col>
                  )
                  }
                  <Col xs={2}>
                    <span>{intl.formatMessage(messages.edit)}</span>
                  </Col>
                </Row>
                <TransitionGroup className="tbody">
                        {data.length > 0 && data.map(item => (
                        <CSSTransition
                          key={item.id}
                          timeout={500}
                          classNames="fade"
                        >
                          <Row>
                              {columns.map((field) =>
                                  <Col key={field.name} xs={field.col}>
                                      <span>
                                        {
                                          field.type === 'date' &&
                                            formatDate(item[field.name], intl.locale)
                                          ||
                                          field.type === 'status' &&
                                            <div className={`status-point ${statusClass(item[field.name])}`}></div>
                                          ||
                                          field.type === 'check' &&
                                            <i className={`fa fa-${checkIcon(item[field.name])} }`}></i>
                                            ||
                                          field.type === 'preferred' &&
                                            <i className={`fa fa-star preferred-star ${preferredStarClass(item[field.name])} }`}></i>
                                          ||
                                            subStringer(item[field.name], 30) 
                                        }
                                      </span>
                                  </Col>
                                )
                              }
                            <Col xs={2} className="edit-icons" >
                              <a href={`${editurl(item)}`} className="btn btn-link">
                                <i className="fa fa-edit"></i>
                              </a>

                              {deleteCallback && <a href="#" onClick={() => getDeleteParamsAndCall(deleteCallback,item)} className="btn btn-link">
                                <i className="fa fa-trash"></i>
                              </a>}
                            </Col>
                          </Row>
                        </CSSTransition>
                      ))
                      }
                      </TransitionGroup>
                  {pagination && Object.keys(pagination).length > 0 &&
                      <Pagination
                          current_page={current_page}
                          total_pages={total_pages}
                          setPage={(page) => linkTo(generatePath(`${match.path}`, {
                            page: page
                          }))}
                      />
                  } 
              {/* </Loader>  */}
            </div>
            {modalComponent &&
              <CustomModal
                  modal={modal}
                  toggle={toggle}>
                  {modalComponent}
              </CustomModal>  
            }
          </>
    )
}

SimpleList.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  editPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};


export default SimpleList
