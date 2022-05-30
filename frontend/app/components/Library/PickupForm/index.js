import React from 'react';
// import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
/* import Loader from 'components/Form/Loader.js';
*/
import {useIntl} from 'react-intl';
import SimpleForm from 'components/SimpleForm'

const PickupForm = (props) => {
//console.log('MyLibraryForm', props)
    const { library, loading,
            submitFormAction,
            countriesOptionList} = props
    const intl = useIntl();

    return (
            <CustomForm
                submitCallBack={(formData) => submitFormAction(formData)}
                requestData={data ? data : null}
                fields={fields}
                title={data && data.name ? data.name : intl.formatMessage(messages.header)}
                country_id={countriesOptionList}                    
                messages={{...messages, ...globalMessages}}                    
            />
            
    )
}

export default PickupForm
