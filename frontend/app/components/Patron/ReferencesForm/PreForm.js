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
            <Card className="pb-5">
                <p className="big text-center pt-4">{intl.formatMessage(messages.bodySearch)}</p>
                <InputSearch
                    submitCallBack={(query) => console.log(query)}
                    className="w-50 m-auto"
                    placeholder={intl.formatMessage(messages.inputPlaceHolder)}
                />
                <p className="big text-center mt-4 pt-5 pb-4">{intl.formatMessage(messages.goToForm)}</p>
                <Button color="default" className="btn-cta mb-5" onClick={() => goToForm(true)}>
                    {intl.formatMessage(messages.goToFormButton)}
                </Button>
            </Card>
        </>
    );
};

PreForm.propTypes = {
    
};

export default PreForm;