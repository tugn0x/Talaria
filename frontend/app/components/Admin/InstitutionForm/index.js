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
    const { institution, updateInstitution, loading, createInstitution, searches, institutionsListSelect, countriesListSelect} = props
    const intl = useIntl();
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    { institution &&
                        <CustomForm 
                            submitCallBack={(formData) => updateInstitution(formData)} 
                            updateFormData={institution}
                            fields={fields} 
                            institution_type_id={institutionsListSelect} 
                            country_id={countriesListSelect}
                            fieldsGroups={fieldsGroups}
                            title={institution.name}
                            messages={messages}
                            searchCustomSelect={searches}
                        />
                    || 
                        <CustomForm
                            institution_type_id={institutionsListSelect}
                            country_id={countriesListSelect}
                            submitCallBack={(formData) => createInstitution(formData)}
                            fields={fields}
                            fieldsGroups={fieldsGroups}
                            searchCustomSelect={searches}
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
