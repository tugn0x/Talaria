import { REQUEST_GET_NOTIFICATION_LIST, REQUEST_GET_NOTIFICATION_LIST_SUCCESS,
  REQUEST_GET_NOTIFICATION, REQUEST_GET_NOTIFICATION_SUCCESS, MARK_ALL_AS_READ
} from './constants';


export function requestNotifications(page = "") {
    return {
      type: REQUEST_GET_NOTIFICATION_LIST,
      page
    };
  }
  
  export function requestNotificationsSuccess(result) {
    return {
      type: REQUEST_GET_NOTIFICATION_LIST_SUCCESS,
      result
    };
  }


  export function requestNotification(id, setToRead) {
    return {
      type: REQUEST_GET_NOTIFICATION,
      id,
      setToRead
    };
  }
  
  export function requestNotificationSuccess(result) {
    return {
      type: REQUEST_GET_NOTIFICATION_SUCCESS,
      result
    };
  }
  
  export function upadteNotificationsAsRead() {
    return {
      type: MARK_ALL_AS_READ,
    };
  }