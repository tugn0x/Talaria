import React from 'react'
import {Button, Col} from 'reactstrap'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import './style.scss'

const Pagination = (props) => {
    const {current_page, total_pages, setPage, url} = props
    
    return (
        total_pages > 1 && 
        (<Col md={3} className="pagination">
            <Button className="backward" color="link" onClick={() => setPage(1)} disabled={current_page !== 1 ? false : true}>
                <i className="fa fa-backward"></i>
            </Button>
            <Button className="step-backward" color="link" onClick={() => setPage(current_page-1)} disabled={current_page !== 1 ? false : true}>
                <i className="fa fa-step-backward"></i>
            </Button>
            <span>{current_page} di {total_pages}</span>
            <Button className="step-forward" color="link" onClick={() => setPage(current_page+1)} disabled={current_page !== total_pages ? false : true}>
                <i className="fa fa-step-forward"></i>
            </Button>
            <Button className="forward" color="link" onClick={() => setPage(total_pages)} disabled={current_page !== total_pages ? false : true}>
                <i className="fa fa-forward"></i>
            </Button>
        </Col>)
        || null
    )
}

Pagination.propTypes = {
    setPage: PropTypes.func.isRequired,
    current_page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired
};

export default Pagination