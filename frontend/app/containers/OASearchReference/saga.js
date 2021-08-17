import { call, put, select, takeLatest, takeEvery,fork, take  } from 'redux-saga/effects';
import { 
  REQUEST_FIND_OA,  
} from './constants';
import {
  requestError,  
  requestFindOASuccess,  

} from './actions';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";


import {
        getOA,        
        } from '../../utils/apiExternal';        


export function* findOASaga(action) {
  const options = {
    method: 'get',
    refData: action.refData
  }
  try {
    const request = yield call(getOA, options);
    yield put(requestFindOASuccess(request));
  } catch(e) {
    console.log("OA ERROR",e)
    yield put(requestError(e.message));
  }
}





//////////////////// END EXTERNAL API /////////////////

/**
 * Root saga manages watcher lifecycle
 */
export default function* OASearchReferenceSaga() {  
  yield takeLatest(REQUEST_FIND_OA,findOASaga);    
}