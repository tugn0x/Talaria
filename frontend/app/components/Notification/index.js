import React, {useState, useEffect} from 'react'
import { Nav, DropdownItem, DropdownMenu, DropdownToggle,UncontrolledDropdown} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestNotifications, upadteNotificationsAsRead} from 'containers/App/actions'
import makeSelectApp, {makeSelectNotifications } from 'containers/App/selectors';
import {Loader} from 'components'
import messages from './messages'
import subStringer from 'utils/subStringer'
import {useIntl} from 'react-intl'
import './style.scss'

const Notification = (props) => {
    const {dispatch} = props
    const [notification, setNotification] = useState([])
    const [unreaded_total, setUnreaded_total] = useState(0)
    const page = props.notifications.pagination
    const loading = props.notifications.loading
    //const unreaded_total = props.notifications.unreaded_total
    const intl = useIntl()
    const lazyLoad = (event) => {
        const menuTop = event.target.scrollTop
        const menuHeight = event.target.clientHeight
        const itemHeight = event.target.children[0].offsetHeight
        const totalItemsHeight = notification.length*itemHeight
        const currPage = page ? page.current_page : 1
        const totalPages = page ? page.total_pages : 1
        if(menuTop >= totalItemsHeight - menuHeight && totalPages > currPage ){
            !props.app.loading && dispatch(requestNotifications(currPage+1))
        } 
    }

    useEffect(() => {
      !props.app.loading && dispatch(requestNotifications())
    }, [])

    useEffect(() => {
        if(props.notifications.data.length > 0){
            setNotification(state => [...state, ...props.notifications.data])
            setUnreaded_total(state => state+props.notifications.unreaded_total)
        }
    }, [props.notifications])
//
    return (
        <Nav className="notification" navbar>
        <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
                <i className="fa fa-bell d-table-cell">
                    {unreaded_total !== 0 &&
                    <span className="count">{unreaded_total}</span>
                    }
                </i>
            </DropdownToggle>
            <DropdownMenu right onScroll={lazyLoad} className="items-menu">
                <DropdownItem header tag="div" className="text-center">
                    {intl.formatMessage(messages.header)}
                    <div>
                        <a href="#" onClick={() => dispatch(upadteNotificationsAsRead())}>Mark all as read</a>
                    </div>
                </DropdownItem>
                {notification.map(notify => (
                        <DropdownItem 
                            tag="div" 
                            key={notify.id} 
                            onClick={() => console.log('click notification')} 
                            className={`item btn ${notify.read ? 'read' : ''}`}>
                            <div>
                                <h5>{notify.data.title}</h5>
                                <span>{subStringer(notify.data.message, 20)}</span>
                            </div>
                            <i className="fa fa-close"></i>
                        </DropdownItem>
                    )
                )}
                <Loader show={loading}></Loader>
            </DropdownMenu>   
        </UncontrolledDropdown>
        </Nav>
    )
}

const mapStateToProps = createStructuredSelector({
    app: makeSelectApp(),
    notifications: makeSelectNotifications()
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