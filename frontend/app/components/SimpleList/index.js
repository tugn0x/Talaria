import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import {CustomModal, ButtonPlus, Pagination, Loader} from 'components'
import { generatePath } from "react-router";


function SimpleList(props) {
    console.log('SimpleList', props)
    const {data, columns, 
          match, editPath, 
          pagination, createItem, 
          loading, formNewComponent, title} = props
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
            <h3 className="table-title">{title}</h3>
            <ButtonPlus
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNew)}
            />
            <div className="table libraries-list">
                <Row className="thead">
                  {
                    columns.map((item) =>
                      <Col xs={item.col}>
                        <span>{item.label}</span>
                      </Col>
                    )
                  }
                  <Col xs={2}>
                    <span>{intl.formatMessage(messages.edit)}</span>
                  </Col>
                </Row>
                <Loader show={loading}>
                  <div className="tbody">
                    {data.length > 0 && data.map(item => (
                        <Row key={`list-${item.id}`}>
                          {columns.map((field) =>
                              <Col xs={field.col}>
                                  {item[field.name]}
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
                      ))
                    }
                  </div>
                  {pagination && Object.keys(pagination).length > 0 &&
                      <Pagination
                          current_page={current_page}
                          total_pages={total_pages}
                          setPage={(page) => linkTo(generatePath(`${match.path}`, {
                            page: page
                          }))}
                      />
                  } 
                </Loader>
            </div>
            <CustomModal
                modal={modal}
                toggle={toggle}>
                {formNewComponent}
            </CustomModal>
          </>
    )
}

export default SimpleList
