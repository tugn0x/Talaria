import React, { useEffect } from 'react'
import {Button} from 'reactstrap'
import PropTypes from 'prop-types'
import './style.scss'

const ButtonClose = (props) => {
    return (
        <Button className={`${props.className && props.className} btn-close`} 
            onClick={props.handleClick}>
            <i className="fas fa-close" />
        </Button>
    )
}


ButtonClose.propTypes = {
    handleClick: PropTypes.func.isRequired,
}

export default ButtonClose