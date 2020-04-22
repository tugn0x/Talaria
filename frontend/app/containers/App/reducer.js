import produce from 'immer';
// import moment from "moment";
import { REQUEST_GET_NOTIFICATION_LIST, REQUEST_GET_NOTIFICATION_LIST_SUCCESS,
    MARK_ALL_AS_READ} from './constants';
export const initialState = {
    loading: false,
    notifications: {
      data: [],
      pagination: [],
      unreaded_total: 0,
    },
    error: null,
    
  };

const appReducer = (state = initialState, action) =>
produce(state, ( draft ) => {
  switch (action.type) {
    case REQUEST_GET_NOTIFICATION_LIST:
       draft.loading = true;
       draft.notifications.error = action.error;
       break;
    case REQUEST_GET_NOTIFICATION_LIST_SUCCESS:
       draft.loading = false;
       draft.error = initialState.error;
       draft.notifications.data = action.result.data;
       draft.notifications.pagination = action.result.meta.pagination;
       draft.notifications.unreaded_total = action.result.meta.unreaded_total;
     break;
    case MARK_ALL_AS_READ:
       draft.loading = true;
       draft.notifications.error = action.error;
       break;
  }
})

export default appReducer;