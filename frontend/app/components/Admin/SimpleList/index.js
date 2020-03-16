import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import { generatePath } from "react-router";
// import './style.scss'

function SimpleList(props) {
    console.log('SimpleList', props)
    const {data, columns, match, editPath, createItem, loading, formNewComponet, title} = props
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id: id,
        });
    }

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
                      <Col xs={3}>
                        <span>{item}</span>
                        {/*<i className="fa fa-sort"  onClick={() => console.log('sort') }></i>*/}
                      </Col>
                    )
                  }
                  <Col xs={2}>
                    <span>{intl.formatMessage(messages.edit)}</span>
                  </Col>
                </Row>
                <div className="tbody">
                    {data.length > 0 && data.map(item => (
                        <Row key={`list-${item.id}`}>
                          {
                            columns.map((field) =>
                              <Col xs={3}>
                                  {item[field]}
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
            </div>
            <CustomModal
                modal={modal}
                toggle={toggle}>
              {formNewComponet}
            </CustomModal>
           {/*  {pagination && Object.keys(pagination).length > 0 &&
                <Pagination
                    current_page={current_page}
                     total_pages={total_pages}
                    // setPage={(page) => linkTo(`${path}/?page=${page}`)}

                    setPage={(page) => linkTo(generatePath(`${props.match.path}`, {
                        page: page
                      }))}
                />
            } */}
          </>
    )
}

export default SimpleList
