import { call, put, select, takeLatest, takeEvery,fork, take  } from 'redux-saga/effects';
import { 
  REQUEST_GET_REFERENCE,REQUEST_FIND_REFERENCE_BY_ID} from './constants';
import {
  requestError,
  requestGetReferenceSuccess,  
  requestFindReferenceByIdSuccess,
  

} from './actions';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";
import {  
          getReference,           
        } from '../../utils/api';

import {
        getOAReferenceByID,        
        } from '../../utils/apiExternal';        

export function* requestGetReferenceSaga(action) {
    const options = {
      method: 'get',
      id: action.id
    };
    try {
      const request = yield call(getReference, options);
      yield put(requestGetReferenceSuccess(request))
      // yield call(() => toast.success(action.message))
    } catch(e) {
      yield put(requestError(e.message));
    }
  }

//Find reference metadata by PMID  
export function* requestOAReferenceByIdSaga(action) {
    const options = {
      method: 'get',
      id: action.id
    }
    try {
      const request = yield call(getOAReferenceByID, options);    
      yield put(requestFindReferenceByIdSuccess(request));    
    } catch(e) {
      console.log("PMID ERR",e)
      yield put(requestError(e.message));
    }
}

export default function* referenceSaga() {
    yield takeLatest(REQUEST_GET_REFERENCE, requestGetReferenceSaga);
    yield takeLatest(REQUEST_FIND_REFERENCE_BY_ID,requestOAReferenceByIdSaga);
}