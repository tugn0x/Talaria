import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import InputSearch from 'components/Form/InputSearch';

const PreForm = ({goToForm, messages}) => {
    
    const intl = useIntl();

    return (
        <>
            <div className="section-title">
                <h1 className="large">
                    {intl.formatMessage(messages.header)}
                </h1>
            </div>
            <Card>
                <p className="big">{intl.formatMessage(messages.bodySearch)}</p>
                <InputSearch
                    submitCallBack={(query) => console.log(query)}
                />
                <p className="big">{intl.formatMessage(messages.goToForm)}</p>
                <Button className="btn-cta" onClick={() => goToForm(true)}>go to form</Button>
            </Card>
        </>
    );
};

PreForm.propTypes = {
    
};

export default PreForm;