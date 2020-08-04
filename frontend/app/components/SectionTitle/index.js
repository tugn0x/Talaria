import React from 'react';
import PropTypes from 'prop-types';
import ButtonBack from 'components/Button/ButtonBack/';
import {useIntl} from 'react-intl';
import './style.scss';

const SectionTitle = ({back, title}) => {
    const intl = useIntl();
    return (
        <div className="section-title">
            {back && <ButtonBack className="detail-back" />}
            <h1 className="large">{intl.formatMessage(title)}</h1>
        </div>
    );
};

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
    back: PropTypes.bool,
};

export default SectionTitle;