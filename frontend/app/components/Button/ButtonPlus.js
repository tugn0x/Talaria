import React from 'react'
import {Button} from 'reactstrap'
import PropTypes from 'prop-types';
import './style.scss'

const ButtonPlus = (props) => {
    const {text, onClickHandle} = props
    return (
        <Button className="float-right btn-plus" onClick={onClickHandle}>
            <i className="fas fa-plus"></i>
            <span>
                {text}
            </span>
        </Button>
    )
}

ButtonPlus.propTypes = {
    onClickHandle: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};


export default ButtonPlus