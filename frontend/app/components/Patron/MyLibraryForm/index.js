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
    /*
    TODO: DA FARE DOPO...
    TODO: aggiungere title_id e department_id alla request.
    Come? Alla change select della biblioteca da parte dell'utente triggeri il get della biblioteca: https://api.nilde.local/api/v1/libraries/8
    TODO: nel body della biblioteca troverai departments
         "departments": [
        {
            "id": 9,
            "name": "Dr. Sibilla Vitali"
        },
        {
            "id": 10,
            "name": "Dr. Renzo De rosa"
        },
        {
            "id": 11,
            "name": "Evita Milani"
        },
        {
            "id": 12,
            "name": "Davide Barone"
        }
    ]
    TODO: apri una nuova select e filli department_id con l'id del dipartimento selezionato dall'utente!
    TODO: titles ha il suo entrypoint, i titles pure saranno nel body della library, far apparirre una select altra e selezionare il title_id
    */
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
