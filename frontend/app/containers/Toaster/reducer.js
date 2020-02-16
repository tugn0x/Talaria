import { ENQUEUE_TOASTER, CLOSE_TOASTER, REMOVE_TOASTER } from './actions';

const defaultState = {
    notifications: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ENQUEUE_TOASTER:
            return {
                notifications: [
                    ...state.notifications,
                    {
                        //key: action.key,
                        ...action.notification,
                    },
                ],
            };

        case CLOSE_TOASTER:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            }
        case REMOVE_TOASTER:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };
       /*  case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            }


 */
        default:
            return state;
    }
}
