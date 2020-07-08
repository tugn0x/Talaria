import React, {useState}  from 'react'
import {Button, Col} from 'reactstrap'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Dropdown, DropdownToggle, DropdownItem,DropdownMenu} from 'reactstrap'
import './style.scss'

const Pagination = (props) => {
    const {current_page, total_pages, setPage,total,count,per_page} = props
    
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);  

    return (
        total_pages > 1 && 
        (<Col md={6} className="pagination">
            <span>Mostra righe <Dropdown className="perPageDropdown" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="btn-link" caret>
                    {per_page}
                    </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>5</DropdownItem>
                    <DropdownItem>10</DropdownItem>
                    <DropdownItem>20</DropdownItem>
                    <DropdownItem>50</DropdownItem>
                    <DropdownItem>100</DropdownItem> 
                    <DropdownItem>200</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>ALL</DropdownItem>
                </DropdownMenu>
                </Dropdown>
            </span>
            <Button className="backward" color="link" onClick={() => setPage(1)} disabled={current_page !== 1 ? false : true}>
                <i className="fa fa-backward"></i>
            </Button>
            <Button className="step-backward" color="link" onClick={() => setPage(current_page-1)} disabled={current_page !== 1 ? false : true}>
                <i className="fa fa-step-backward"></i>
            </Button>
            <span>{(current_page-1)*per_page+1}-{(current_page-1)*per_page+count} di {total}</span>
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