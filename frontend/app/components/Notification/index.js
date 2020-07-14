import React, {useState, useEffect} from 'react'
import { Nav, DropdownItem, DropdownMenu, DropdownToggle,UncontrolledDropdown} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestNotifications, upadteNotificationsAsRead, clearNotifications} from 'containers/App/actions'
import makeSelectApp from 'containers/App/selectors';
import {Loader} from 'components'
import messages from './messages'
import subStringer from 'utils/subStringer'
import {useIntl} from 'react-intl'
import './style.scss'

const Notification = (props) => {
    // console.log('Notification', props)
    const {dispatch} = props
    const [notification, setNotification] = useState([])
    const [unreaded_total, setUnreaded_total] = useState(0)
    const page = props.app.notifications.pagination
    const loading = props.app.loading
   
    const intl = useIntl()
    const lazyLoad = (event) => {
        const menuTop = event.target.scrollTop
        const menuHeight = event.target.clientHeight
        const itemHeight = event.target.children[0].offsetHeight
        const totalItemsHeight = notification.length*itemHeight
        const currPage = page ? page.current_page : 1
        const totalPages = page ? page.total_pages : 1
        if(menuTop >= totalItemsHeight - menuHeight && totalPages > currPage ){
            !loading && dispatch(requestNotifications(currPage+1))
        } 
    }

    useEffect(() => {
        !loading && dispatch(requestNotifications())
      
        return () => {
          dispatch(clearNotifications())
        } 
      
    }, [])

    useEffect(() => {
        if(props.app.notifications.data.length > 0){
            setNotification(state => [...state, ...props.app.notifications.data])
            setUnreaded_total(state => state+props.app.notifications.unreaded_total)
        }else{
            setNotification([])
        }
    }, [props.app.notifications.data])
//
    return (
        <Nav className="notification" navbar>
        <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
                <i className="fas fa-bell d-table-cell">
                    {unreaded_total !== 0 &&
                    <span className="count">{unreaded_total}</span>
                    }
                </i>
            </DropdownToggle>
            <DropdownMenu right onScroll={lazyLoad} className="items-menu">
                <DropdownItem header tag="div" className="text-center">
                    <div>{intl.formatMessage(messages.header)}</div>
                    <div>
                        <a href="#" onClick={() => dispatch(upadteNotificationsAsRead())}>
                            {intl.formatMessage(messages.mark_all_as_read)}
                        </a>
                    </div>
                </DropdownItem>
                {notification && notification.map((notify, index) => (
                        <DropdownItem 
                            tag="div" 
                            key={notify.id} 
                            onClick={() => console.log('click notification')} 
                            className={`item btn ${notify.read ? 'read' : ''}`}>
                            <div>
                                <h6>{notify.data.title}</h6>
                                <span>{subStringer(notify.data.message, 20)}</span>
                            </div>
                            <i className="fas fa-close"></i>
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
    // notifications: makeSelectNotifications()
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