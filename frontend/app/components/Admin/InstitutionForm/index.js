import React from 'react';
import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';

const InstitutionForm = (props) => {
    console.log('InstitutionForm', props)
    const { insitution, loading, createInstitution, institutionsListSelect, countriesListSelect, searches} = props
    const intl = useIntl();
    const formFields = Object.keys(fields).map((f)=>{
      return {...fields[f], search: f in searches ? searches[f] : null}
    })
  console.log(formFields)
  console.log(searches)
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    {/* library &&
                        <CustomForm
                            submitCallBack={(formData) => updateLibrary(formData)}
                            updateFormData={library}
                            fields={fields}
                            fieldsGroups={fieldsGroups}
                            title={library.name}
                            messages={{...messages, ...globalMessages}}
                        />
                    || */
                        <CustomForm
                            institution_type_id={institutionsListSelect}
                            country_id={countriesListSelect}
                            submitCallBack={(formData) => createInstitution(formData)}
                            // fields={fields}
                            fields={formFields}
                            fieldsGroups={fieldsGroups}
                            title={intl.formatMessage(messages.header)}
                            messages={{...messages, ...globalMessages}}
                        />
                    }
                </Col>
            </Row>
        </Loader>
    )
}

export default InstitutionForm
