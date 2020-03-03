import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import CustomForm from 'components/Form/CustomForm';
import './style.scss'

function MyLibrariesList(props) {
    console.log('MyLibrariesList', props)
    const {my_libraries, match} = props
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();
    return (
        <>
            <ButtonPlus 
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewLibrary)}
            />
            <h4 className="table-title">{intl.formatMessage(messages.header)}</h4>
            <div className="table my-libraries-list">
                <Row className="thead">
                    <Col xs={6}>
                        <span>Titolo / Descrizione</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>ID</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Data</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Status</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                </Row>
                <div className="tbody">
                    {my_libraries.length > 0 && my_libraries.map(my_library => (
                        <Row key={`my_library-${my_library.id}`}>
                            <Col xs={6}>
                                <a href={`${match.url}/${my_library.id}`}>
                                    {my_library.name}
                                </a>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {my_library.id}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    Richiesta effettuata il<br></br>
                                    {formatDate(my_library.created_at, intl.locale)}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <div className={`status-point ${my_library.status === 0 ? 'pending' : 'success' }`}></div>
                            </Col>
                        </Row>
                      ))
                    }
                </div>
            </div> 
            <CustomModal 
                modal={modal} 
                toggle={toggle}>
                <CustomForm 
                    submitCallBack={ (formData) =>  props.requestAccessToLibrary(formData)} 
                    librariesList={props.librariesList} 
                    fields={props.fields}
                    messages={props.messages} 
                    title={props.title}
                    searchCustomSelect={(input) => props.searchCustomSelect(input)}
                />
            </CustomModal>
          </>
    )
}

export default MyLibrariesList