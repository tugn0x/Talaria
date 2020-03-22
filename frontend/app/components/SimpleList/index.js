import React, {useState} from 'react';
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
import './style.scss'

function SimpleList(props) {
    console.log('SimpleList', props)
    const {data, columns, history,
          match, editPath, messages,
          pagination, searchOptions, 
          loading, modalComponent, title, subtitle} = props
    
    const {total_pages, current_page} = pagination
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id: id,
        });
    }


    const linkTo = (path) => {
      history.push(path)
    };
    
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
                          <Row key={`list-${item.id}`}>
                              {columns.map((field) =>
                                  <Col key={field.name} xs={field.col}>
                                      <span>
                                        {
                                          field.type === 'date' &&
                                            formatDate(item[field.name], intl.locale)
                                          ||
                                          field.type === 'status' &&
                                            <div className={`status-point ${item[field.name] === 0 ? 'pending' : 'success' }`}></div>
                                          ||
                                            item[field.name] 
                                        }
                                      </span>
                                  </Col>
                                )
                              }
                            <Col xs={2} className="edit-icons" >
                              <a href={`${editurl(item.id)}`} className="btn btn-link">
                                <i className="fa fa-edit"></i>
                              </a>
                              <a href="#" onClick={() => console.log('delete user')} className="btn btn-link">
                                <i className="fa fa-trash"></i>
                              </a>
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
  editPath: PropTypes.string.isRequired,
};

export default SimpleList
