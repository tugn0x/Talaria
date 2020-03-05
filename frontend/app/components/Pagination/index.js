import React from 'react'
import {Button} from 'reactstrap'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import './style.scss'

const Pagination = (props) => {
    const {current_page, last_page, setPage, url} = props
    
    return (
        <div className="pagination">
            
            <Button className="backward" color="link" onClick={() => setPage(1)} disabled={current_page !== 1 ? false : true}>
                <i className="fa fa-backward"></i>
            </Button>
            <Button className="step-backward" color="link" onClick={() => setPage(current_page-1)} disabled={current_page !== 1 ? false : true}>
                <i className="fa fa-step-backward"></i>
            </Button>
            <span>{current_page} di {last_page}</span>
            <Button className="step-forward" color="link" onClick={() => setPage(current_page+1)} disabled={current_page !== last_page ? false : true}>
                <i className="fa fa-step-forward"></i>
            </Button>
            <Button className="forward" color="link" onClick={() => setPage(last_page)} disabled={current_page !== last_page ? false : true}>
                <i className="fa fa-forward"></i>
            </Button>
        </div>
    )
}

Pagination.propTypes = {
    setPage: PropTypes.func.isRequired,
    current_page: PropTypes.number.isRequired,
    last_page: PropTypes.number.isRequired
};

export default Pagination