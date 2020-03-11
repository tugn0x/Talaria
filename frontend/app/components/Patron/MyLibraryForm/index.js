import React from 'react';
import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';


const MyLibraryForm = (props) => {
    const { library, loading, librariesList} = props
    const intl = useIntl();
    
    return (
        <>
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    {library &&
                        <ul>
                        {Object.keys(library).map((key) =>
                            (
                                library[key] &&
                                <li><span>{key}</span> <span>{library[key]}</span></li>
                            )
                        )}
                        {/* <CustomForm 
                            submitCallBack={(formData) => null} 
                            updateFormData={library}
                            fields={fields} 
                            fieldsGroups={fieldsGroups}
                            messages={{...messages, ...globalMessages}}
                            // submitText={intl.formatMessage(messages.updateSubmitText)}
                        /> */}
                        </ul>
                    }
                    {librariesList &&
                        <CustomForm 
                            submitCallBack={ (formData) =>  props.requestAccessToLibrary(formData) } 
                            librariesList={librariesList} 
                            fields={props.fields}
                            messages={props.messages} 
                            searchCustomSelect={(input) => props.searchCustomSelect(input) }
                        />
                    }
                     
                </Col> 
            </Row>
        </Loader> 
        </>
    )
}

export default MyLibraryForm