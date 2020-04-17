import React, {useState, useEffect} from 'react'
import { Nav, DropdownItem, DropdownMenu, DropdownToggle,UncontrolledDropdown} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestGetLibrariesList} from 'containers/Admin/actions'
import makeSelectAdmin, {isAdminLoading} from 'containers/Admin/selectors';
import {Loader} from 'components'
import messages from './messages'
import {useIntl} from 'react-intl'
import './style.scss'

const Notification = (props) => {
    const {dispatch, isLoading, admin} = props
    const [notification, setNotification] = useState([])
    const page = admin.libraryOptionList.pagination
    const intl = useIntl()
    const lazyLoad = (event) => {
        const menuTop = event.target.scrollTop
        const menuHeight = event.target.clientHeight
        const itemHeight = event.target.children[0].offsetHeight
        const totalItemsHeight = notification.length*itemHeight
        const currPage = page ? page.current_page : 1
        const totalPages = page ? page.total_pages : 1
        if(menuTop >= totalItemsHeight - menuHeight && totalPages > currPage ){
            !isLoading && dispatch(requestGetLibrariesList(currPage+1))
        } 
    }

    useEffect(() => {
      //  !isLoading && dispatch(requestGetLibrariesList())
    }, [])

    useEffect(() => {
        if(admin.libraryOptionList.data.length > 0){
            setNotification(state => [...state, ...admin.libraryOptionList.data])
        }
    }, [admin.libraryOptionList])
//
    

    return (
        <Nav className="notification" navbar>
        <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
                <i className="fa fa-bell d-table-cell">
                    <span className="count">2</span>
                </i>
            </DropdownToggle>
            <DropdownMenu right onScroll={lazyLoad} className="items-menu">
                <DropdownItem header tag="div" className="text-center">
                    {intl.formatMessage(messages.header)}
                </DropdownItem>
                {notification.map(lib => (
                        <DropdownItem tag="div" key={lib.id} onClick={() => console.log('click notification')} className="d-table item btn">
                            <span>{lib.name}</span>
                            <i className="fa fa-close"></i>
                        </DropdownItem>
                    )
                )}
                <Loader show={isLoading}></Loader>
            </DropdownMenu>   
        </UncontrolledDropdown>
        </Nav>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isAdminLoading(),
    admin: makeSelectAdmin()
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(Notification);