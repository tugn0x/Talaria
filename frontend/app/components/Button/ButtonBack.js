import React, { useEffect } from 'react'
import {Button} from 'reactstrap'
import './style.scss'
import {withRouter} from 'react-router-dom'
import {useIntl} from 'react-intl'
import messages from './messages'


const ButtonBack = (props) => {
    const intl = useIntl()

    return (
        <Button className="btn-back" onClick={props.history.goBack}>
            <i className="fa fa-arrow-left" />
            <span>
                {intl.formatMessage(messages.goBackText)}
            </span>
        </Button>
    )
}


export default withRouter(ButtonBack)