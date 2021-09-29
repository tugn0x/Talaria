import React, {useState}  from 'react'
import {Button} from 'reactstrap'
import PropTypes from 'prop-types'
import {useIntl} from 'react-intl'
// import {Link} from 'react-router'
import {Dropdown, DropdownToggle, DropdownItem,DropdownMenu} from 'reactstrap'
import './style.scss'


const Pagination = (props) => {
    const {current_page, total_pages, linkToPage,total,count,per_page} = props
    
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);  

    const intl=useIntl();

    

    return (
        total_pages >= 1 && 
        (<div className="pagination">
            <span>{intl.formatMessage({ id: 'app.components.Pagination.itemsPerPageDropdown' })}
                <Dropdown className="perPageDropdown"  direction="down" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className="btn-link" color="default" caret>
                        {per_page}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => linkToPage(current_page, 5)}>5</DropdownItem>
                        <DropdownItem onClick={() => linkToPage(current_page, 10)}>10</DropdownItem>
                        <DropdownItem onClick={() => linkToPage(current_page, 20)}>20</DropdownItem>
                        <DropdownItem onClick={() => linkToPage(current_page, 50)}>50</DropdownItem>
                        {/* <DropdownItem divider/>
                        <DropdownItem onClick={() => setPageSize(50)}>ALL</DropdownItem> */}
                    </DropdownMenu>
                </Dropdown>
            </span>
            <span>{(current_page-1)*per_page+1}-{(current_page-1)*per_page+count} {intl.formatMessage({ id: 'app.components.Pagination.of' })} {total}</span>
            {/* <Button className="backward" color="link" onClick={() => setPage(1)} disabled={current_page !== 1 ? false : true}>
                <i className="fas fa-backward"></i>
            </Button> */}
            <Button className="step-backward active" color="default" onClick={() => linkToPage(current_page-1, per_page)} disabled={current_page !== 1 ? false : true}>
                <i className="fas fa-angle-double-left"></i>
            </Button>
            <Button className="step-forward active" color="default" onClick={() => linkToPage(current_page+1, per_page)} disabled={current_page !== total_pages ? false : true}>
                <i className="fas fa-angle-double-right "></i>
            </Button>
            {/* <Button className="forward" color="link" onClick={() => setPage(total_pages)} disabled={current_page !== total_pages ? false : true}>
                <i className="fas fa-forward"></i>
            </Button> */}
        </div>)
        || null
    )
}

Pagination.propTypes = {
    linkToPage: PropTypes.func.isRequired,
    current_page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired
};

export default Pagination