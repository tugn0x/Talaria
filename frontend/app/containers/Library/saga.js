import { call, put, takeLatest, takeEvery, take } from 'redux-saga/effects';
import { REQUEST_USERS_LIST, REQUEST_UPDATE_USER, REQUEST_DELETE_USER,
         /*  REQUEST_POST_USER, */ REQUEST_USER, REQUEST_GET_LIBRARY,
          REQUEST_GET_LIBRARIES_LIST,
          REQUEST_UPDATE_LIBRARY,
          REQUEST_POST_LIBRARY,
          REQUEST_BORROWINGS_LIST,
          REQUEST_BORROWINGSTODELIVER_LIST,
          REQUEST_GET_LIBRARY_TAGS_OPTIONLIST,
          REQUEST_APPLY_TAGS_TO_DDREQUESTS,
        REQUEST_REMOVE_DDREQUEST_TAG,
        REQUEST_REMOVE_LENDINGDDREQUEST_TAG,
      REQUEST_POST_LIBRARY_TAG,
      REQUEST_UPDATE_LIBRARY_TAG,
      REQUEST_REMOVE_LIBRARY_TAG,
      REQUEST_POST_NEW_BORROWING,
      REQUEST_GET_BORROWING,
      REQUEST_GET_LENDING,
      REQUEST_UPDATE_BORROWING,
      REQUEST_FORWARD_BORROWING,
      REQUEST_FIND_UPDATE_BORROWING_OA,
      REQUEST_CHANGE_STATUS_BORROWING,
      REQUEST_CHANGE_STATUS_DELIVERY,
      REQUEST_GET_ISSN_ISBN,
      REQUEST_LENDINGS_LIST,
      REQUEST_CHANGE_STATUS_LENDING,
      //REQUEST_CHANGE_LENDING_ARCHIVED,
      REQUEST_APPLY_LENDING_TAGS_TO_DDREQUESTS,
      REQUEST_ACCEPT_ALLLENDER,
      REQUEST_GET_LIBRARY_DESKS_OPTIONLIST,
      REQUEST_GET_LIBRARY_DESKS,
    } from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestUsersListSuccess,
  requestUserSuccess,
  requestGetLibrarySuccess,
  requestGetLibrariesListSuccess,
  requestUsersList,
  requestBorrowingsListSuccess,
  requestBorrowingToDeliverListSuccess,
  requestLibraryTagsOptionList,
  requestLibraryTagsOptionListSuccess,
  requestBorrowingsList, 
  requestBorrowingToDeliverList, 
  requestGetBorrowingSuccess,
  requestLendingsList,
  requestLendingsListSuccess,
  requestUpdateBorrowingSuccess,
  requestFindUpdateOABorrowingReferenceSuccess,
  requestFindUpdateOABorrowingReferenceFail,
  requestFindISSNISBNSuccess,
  requestGetLendingSuccess,
  requestGetLibraryDesksOptionListSuccess,
  requestPickupListSuccess
} from './actions';

import { toast } from "react-toastify";
import { push } from 'connected-react-router';
import {getLibraryUsersList, updateLibraryUser, deleteLibraryUser, createUser,
        getLibraryUser, getLibrary, getLibrariesList, updateLibrary,
        createLibrary,getBorrowingsList,getBorrowingToDeliverList,
        getLibraryTagsOptionList,
        requestApplyTagsToBorrowingRequests,
        removeDDRequestTag,
        createLibraryTag,
      updateLibraryTag,
    deleteLibraryTag,
    createNewBorrowing,
    getBorrowingRequest,    
    updateBorrowing,
    changeStatusBorrowingRequest,
    changeStatusLendingRequest,
    getLendingsList,
    changeLendingArchivedRequest,
    requestApplyTagsToLendingRequests,
    acceptallLenderLendingRequest,
    getLendingRequest,
    getLibraryDeliveriesOptionList,
    getLibraryDeliveries
} from '../../utils/api'

import {getOA,getPubmedReferenceByPMID,getFindISSN,getFindISBN, getFindISSN_ACNP} from '../../utils/apiExternal';

// import moment from 'moment';

export function* requestUserSaga(action) {
  const options = {
    method: 'get',
    user_id: action.user_id,
    library_id: action.library_id
  };
  try {
    const request = yield call(getLibraryUser, options);
    yield put(requestUserSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}


export function* requestUsersListSaga(action) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1',
    library_id: action.library_id,
    query: action.query ? action.query : ''
  };
  try {
    const request = yield call(getLibraryUsersList, options);
    yield put(requestUsersListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateUserSaga(action) {
  const library_id = action.request.library_id
  
  const options = {
    method: 'put',
    body: {
      status: action.request.status,
      library_id,
      id: action.request.id,
      department_id: action.request.department_id,
      title_id: action.request.title_id,
      user_referent: action.request.user_referent,
      user_mat: action.request.user_mat,
      user_service_phone: action.request.user_service_phone,
      user_service_email: action.request.user_service_email,
    },
  };

  try {
    const request = yield call(updateLibraryUser, options);
    // yield put(requestUsersList(null, library_id));
    yield put(requestSuccess());
    yield put(push(`/library/${library_id}/patrons`));
    yield call(() => toast.success(action.request.message)) 
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestDeleteUserSaga(action) {
  const options = {
    method: 'delete',
    body: {
      library_id:action.library_id,
      id: action.id,
    },
  };

  try {
    const request = yield call(deleteLibraryUser, options);
    yield call(requestUsersListSaga, {library_id: action.library_id});
    yield call(() => toast.success(action.message)) 
  } catch(e) {
    yield put(requestError(e.message));
  }
}

/* export function* requestPostUserSaga(action) {
  const options = {
    method: 'post',
    body: action.request
  };
  try {
    const request = yield call(createUser, options);
    yield call(requestUsersListSaga);
    yield put(push("/library/users"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
} */


export function* requestPostLibrarySaga(action) {
  const options = {
    method: 'post',
    body: {...action.request }
  };
  try {
    const request = yield call(createLibrary, options);
    yield call(requestGetLibrariesListSaga);
    yield put(push("/library/libraries"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetLibrarySaga(action) {
  const options = {
    method: 'get',
    id: action.id,
    includes: action.includes
  };
  try {
   const request = yield call(getLibrary, options);
   yield put(requestGetLibrarySuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateLibrarySaga(action) {
  const options = {
    method: 'put',
    body: action.request
  };
  try {
    const request = yield call(updateLibrary, options);
   // yield call(requestGetLibrariesListSaga);
    yield put(push("/library/"+action.request.id));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetLibrariesListSaga(action = {}) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1',
    query: action.query ? action.query : '',
    filterBy: action.filterBy ? action.filterBy : '',
    filterVal: action.filterBy ? action.filterVal : '',
  };
  try {
    const request = yield call(getLibrariesList, options);
    yield put(requestGetLibrariesListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestBorrowingsListSaga(action) {  
  const options = {
    method: 'get',
    library_id:action.library_id,
    page: action.page ? action.page : '1',
    query: action.query ? action.query : null,
    pageSize: action.pageSize ? action.pageSize : null
  };
  try {
   console.log(action)
    const request = yield call(getBorrowingsList, options);
    yield put(requestBorrowingsListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestBorrowingsToDeliverListSaga(action) {
  const options = {
    method: 'get',
    library_id:action.library_id,    
    page: action.page ? action.page : '1',
    filter: action.filter ? action.filter : null,
    pageSize: action.pageSize ? action.pageSize : null    
  };
  try {
   console.log(action)
    const request = yield call(getBorrowingToDeliverList, options);
    yield put(requestBorrowingToDeliverListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestLendingsListSaga(action) {
  const options = {
    method: 'get',
    library_id:action.library_id,
    page: action.page ? action.page : '1',
    query: action.query ? action.query : null,
    pageSize: action.pageSize ? action.pageSize : null
  };
  try {
   console.log(action)
    const request = yield call(getLendingsList, options);
    yield put(requestLendingsListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}


export function* requestLibraryTagsOptionListSaga(action) {
  const options = {
    method: 'get',
    library_id:action.library_id,
  }
  try {
    const request = yield call(getLibraryTagsOptionList, options);
    yield put(requestLibraryTagsOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestApplyTagsToDDRequestsSaga(action) {
  const options = {
    method: 'put',
    body: {
      requests: action.reqIds,
      tagIds: action.tagIds,      
    },
    library_id: action.library_id

  };
 
  try {
    const request = yield call(requestApplyTagsToBorrowingRequests, options);
           
    // Callback dopo il Crea nuova etichetta
    if(action.tagIds.some(tagId => typeof tagId === 'string' )){
      yield call(requestLibraryTagsOptionListSaga,action)
    }
    yield put (requestBorrowingsList(action.library_id,action.page,action.pageSize,action.filter))              
    yield call(() => toast.success(action.message)) 
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestApplyLendingTagsToDDRequests(action) {  
  const options = {
    method: 'put',
    body: {
      requests: action.reqIds,
      tagIds: action.tagIds,      
    },
    library_id: action.library_id

  };
 

  try {

    const request = yield call(requestApplyTagsToLendingRequests, options);
    
    yield put (requestLendingsList(action.library_id))
    // Callback dopo il Crea nuova etichetta
    if(action.tagIds.some(tagId => typeof tagId === 'string' )){
      yield call(requestLibraryTagsOptionListSaga,action)
    }
    yield call(() => toast.success(action.message)) 
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestRemoveTagToDDRequestsSaga (action) {
  const options = {
    method: 'delete',
    id: action.id,
    tagId: action.tagId,
    library_id: action.library_id
  };

  
  try {
    const request = yield call(removeDDRequestTag, options);
    yield put (requestBorrowingsList(action.library_id,action.page,action.pageSize,action.filter))        
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestRemoveTagToLendingDDRequestsSaga (action) {
  const options = {
    method: 'delete',
    id: action.id,
    tagId: action.tagId,
    library_id: action.library_id
  };

  
  try {
    const request = yield call(removeDDRequestTag, options);
    yield put (requestLendingsList(action.library_id))
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostLibraryTagSaga(action) {
  const options = {
    method: 'post',
    body: {
      name: action.tag_name,      
    },
    library_id: action.library_id
  };
  try {
    const request = yield call(createLibraryTag, options);
    yield put(requestLibraryTagsOptionList(action.library_id));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateLibraryTagSaga(action) {
  const options = {
    method: 'put',
    tag_id: action.tag_id,
    body: {
      name: action.tag_value
    },
    library_id: action.library_id
    
  };
  try {
    const request = yield call(updateLibraryTag, options);
    yield put(requestLibraryTagsOptionList(action.library_id));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}


export function* requestRemoveLibraryTagSaga(action) {
  const options = {
    method: 'delete', 
    tag_id: action.tag_id,    
    library_id: action.library_id
  };
  try {
    const request = yield call(deleteLibraryTag, options);
    yield put(requestLibraryTagsOptionList(action.library_id));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostNewBorrowingSaga(action){
  const options = {
    method: 'post',
    body: action.reference,
    borrowing_library_id: action.borrowing_library_id
  };
  try {
    const request = yield call(createNewBorrowing, options);
    //yield put (requestBorrowingsList(action.borrowing_library_id))    
    yield put(push("/library/"+action.borrowing_library_id+"/borrowing/"+request.data.id));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateBorrowingSaga(action) {
  const options = {
    method: 'put',
    body: action.borrowing,
    borrowing_library_id: action.borrowing_library_id,
    id: action.id,    
  };    
  try {
    const request = yield call(updateBorrowing, options);
    yield put (requestBorrowingsList(action.borrowing_library_id,action.page,action.pageSize,action.filter))        
    yield put (push("/library/"+action.borrowing_library_id+"/borrowing/"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestForwardBorrowingSaga(action) {
  const options = {
    method: 'put',
    body: action.borrowing,
    borrowing_library_id: action.borrowing_library_id,
    id: action.id,
  };
  try {
    const request = yield call(updateBorrowing, options);
    yield put (push("/library/"+action.borrowing_library_id+"/borrowing/"+request.data.id));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}


export function* requestGetBorrowingSaga(action) {
  const options = {
    method: 'get',
    id: action.id,
    library_id: action.library_id
  };
  try {
    const request = yield call(getBorrowingRequest, options);
    yield put(requestGetBorrowingSuccess(request))
    // yield call(() => toast.success(action.message))
  } catch(e) {    
    yield put(requestError(e.message));
  }
}

export function* requestGetLendingSaga(action) {
  const options = {
    method: 'get',
    id: action.id,
    library_id: action.library_id
  };
  try {
    const request = yield call(getLendingRequest, options);
    yield put(requestGetLendingSuccess(request))
    //yield call(() => toast.success(action.message))
  } catch(e) {    
    yield put(requestError(e.message));
  }
}

//chiamare api x trovare OA e aggiornare (POST) il riferimento in modo che ricarichi la pag
//La ricerca OA avviene x titolo della pubb (puo' essere titolo part o titolo book/thesi/...)
export function* findUpdateOABorrowingSaga(action) {
  console.log("FINDUPDATEBORROWINGOA_SAGA:", action);
  if(action.data && action.data!="")
  {
    const options = {
      method: 'get',    
      refData: action.data
    }
    try {
      const request = yield call(getOA, options);
      if(/*request.found &&*/ request.url)
      {
        console.log("TROVATO OA!:",request.url)    
        //yield call(() => toast.success("Versione OA trovata!"))
        yield put(requestFindUpdateOABorrowingReferenceSuccess(action.id));
        yield call(requestUpdateBorrowingSaga, {id: action.id,borrowing_library_id:action.borrowing_library_id, borrowing: {reference: {id: action.reference_id, oa_link: request.url} }, message:action.foundMessage,filter:action.filter })
      }
      else {
        console.log("NON TROVATO");
        yield put(requestFindUpdateOABorrowingReferenceFail(action.id));
        yield call(() => toast.error(action.notfoundMessage))
      }
  
    } catch(e) {
      console.log("OA FIND AND UPDATE ERROR",e)
      yield put(requestError(e.message));
      yield put(requestFindUpdateOABorrowingReferenceFail(action.id));
      yield call(() => toast.error(action.notfoundMessage))
    }
  }
  else {
    console.log("NON TROVATO-title mancante");
        yield put(requestFindUpdateOABorrowingReferenceFail(action.id));
        yield call(() => toast.error(action.notfoundMessage))
  }
  
}

export function* requestChangeStatusBorrowingSaga(action) {
  const options = {
    method: 'put',
    body: {'status': action.status,
     'extrafields': {...action.extrafields},    
    },
    id: action.id,
    borrowing_library_id: action.borrowing_library_id,
  };
  try {
  
    const request = yield call(changeStatusBorrowingRequest, options);    
    yield put (requestBorrowingsList(action.borrowing_library_id,action.page,action.pageSize,action.filter))        
    //aggiungo questa push altrimenti se vengo da una pagina diversa dalla lista (es: scelta lender), non ricaricherebbe tutto (mentre cosi' tiene anche i filtri)!
    yield put (push("/library/"+action.borrowing_library_id+"/borrowing/"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestChangeStatusDeliverySaga(action) {
  const options = {
    method: 'put',
    body: {'status': action.status,
     'extrafields': {...action.extrafields},    
    },
    id: action.id,
    borrowing_library_id: action.borrowing_library_id,    
    filter: action.filter
  };
  try {
  
    const request = yield call(changeStatusBorrowingRequest, options);    
    yield put (requestBorrowingToDeliverList(action.borrowing_library_id,action.page,action.pageSize,action.filter))    
    yield put (push("/library/"+action.borrowing_library_id+"/delivery"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

//TODO: update code in order to pass extrafields to reducer/action (lending)
//so we can use extrafields here!
//extrafields was already managed by Laravel LendingDDRequest so all the fields specified
//in extrafields will be updated correctly!
export function* requestChangeStatusLendingSaga(action) {
  
  const options = {
    method: 'put',
    body: {
      'status': action.status, 
      'extrafields': {...action.extrafields},
    }, 
    id: action.id,
    lending_library_id: action.lending_library_id
  }; 

  try {
    const request = yield call(changeStatusLendingRequest, options);    
    yield put (requestLendingsList(action.lending_library_id))    
    yield put (push("/library/"+action.lending_library_id+"/lending/"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

/*not used
export function* requestChangeLendingArchivedSaga(action) {
  
  const options = {
    method: 'put',
    body: {'lending_archived': 1},
    id: action.id,
    lending_library_id: action.lending_library_id,
  };
  try {
    const request = yield call(changeLendingArchivedRequest, options);    
    yield put (requestLendingsList(action.lending_library_id))    
    yield put (push("/library/"+action.lending_library_id+"/lending/"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}*/

export function* requestAcceptAllLenderLendingSaga(action) {
  const options = {
    method: 'put',
    body: {'all_lender':0,'lending_library_id': action.lending_library_id},
    id: action.id,
  };
  try {
    const request = yield call(acceptallLenderLendingRequest, options);    
    yield put (requestLendingsList(action.lending_library_id))    
    yield put (push("/library/"+action.lending_library_id+"/lending/"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestLibraryDesksOptionListSaga(action) {
  const options = {
    method: 'get',
    library_id:action.library_id,
  }
  
  try {
    const request = yield call(getLibraryDeliveriesOptionList, options);
    yield put(requestGetLibraryDesksOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestLibraryDesksSaga(action) {
  const options = {
    method: 'get',
    id:action.library_id,
    page: action.page ? action.page : '1',
    query: action.query ? action.query : null,
    pageSize: action.pageSize ? action.pageSize : null
  }

  try {
    const request = yield call(getLibraryDeliveries, options);
    yield put(requestPickupListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestFindISSNISBNsaga(action) {
  
  //data { material_type: 1..5, issn:xxx, title:xxxx, isbn:xxxx}
  //if article => search on ISSN_REGISTRY OR ACNP to get correct title and ISSN+ISSN_L
  //otherwise => search on SBN matching title and get ISBN  
  const issn_search=(process.env.ISSN_SEARCH && process.env.ISSN_SEARCH=="true")?true:false;
  const isbn_search=(process.env.ISBN_SEARCH && process.env.ISBN_SEARCH=="true")?true:false;
  const issn_registry=(process.env.ISSN_SEARCH_REGISTRY && process.env.ISSN_SEARCH_REGISTRY=="true")?true:false;
  const issn_acnp=(process.env.ISSN_SEARCH_ACNP && process.env.ISSN_SEARCH_ACNP=="true")?true:false;
  const isbn_sbn=(process.env.ISBN_SEARCH_SBN && process.env.ISBN_SEARCH_SBN=="true")?true:false;

  
  try{
    let result=[]

    if(action.data.material_type==1)    
    {
      if(issn_search && issn_registry)
        result = yield call(getFindISSN, action.data);    
      else if(issn_search && issn_acnp)
        result = yield call(getFindISSN_ACNP, action.data);            
      else 
        result = [];
    }
    else        
    {
      if(isbn_search && isbn_sbn)
        result = yield call(getFindISBN, action.data);    
      else 
        result = [];  
    }
    
    console.log("requestFindISSNISBNsaga res:",result)  
    yield put (requestFindISSNISBNSuccess(result))      
      
  }
  catch (e) {
    console.log("ERROR",e)
    yield put(requestError(e.message));
  }
  
}




/**
 * Root saga manages watcher lifecycle
 */
export default function* librarySaga() {
  yield takeLatest(REQUEST_USERS_LIST, requestUsersListSaga);
  yield takeLatest(REQUEST_UPDATE_USER, requestUpdateUserSaga);
  yield takeLatest(REQUEST_DELETE_USER, requestDeleteUserSaga);
  // yield takeLatest(REQUEST_POST_USER, requestPostUserSaga);
  yield takeLatest(REQUEST_USER, requestUserSaga);
  yield takeEvery(REQUEST_GET_LIBRARY, requestGetLibrarySaga);
  yield takeLatest(REQUEST_GET_LIBRARIES_LIST, requestGetLibrariesListSaga);
  yield takeLatest(REQUEST_UPDATE_LIBRARY, requestUpdateLibrarySaga);
  yield takeLatest(REQUEST_POST_LIBRARY, requestPostLibrarySaga);
  yield takeLatest(REQUEST_BORROWINGS_LIST,requestBorrowingsListSaga);
  yield takeLatest(REQUEST_BORROWINGSTODELIVER_LIST,requestBorrowingsToDeliverListSaga);

  yield takeLatest(REQUEST_LENDINGS_LIST, requestLendingsListSaga);

  yield takeLatest(REQUEST_GET_LIBRARY_TAGS_OPTIONLIST,requestLibraryTagsOptionListSaga);
  
  yield takeLatest(REQUEST_APPLY_TAGS_TO_DDREQUESTS,requestApplyTagsToDDRequestsSaga);
  yield takeLatest(REQUEST_APPLY_LENDING_TAGS_TO_DDREQUESTS,requestApplyLendingTagsToDDRequests);

  yield takeLatest(REQUEST_REMOVE_DDREQUEST_TAG,requestRemoveTagToDDRequestsSaga);
  yield takeLatest(REQUEST_REMOVE_LENDINGDDREQUEST_TAG, requestRemoveTagToLendingDDRequestsSaga)
  yield takeLatest(REQUEST_POST_LIBRARY_TAG,requestPostLibraryTagSaga);
  yield takeLatest(REQUEST_UPDATE_LIBRARY_TAG,requestUpdateLibraryTagSaga);
  yield takeLatest(REQUEST_REMOVE_LIBRARY_TAG,requestRemoveLibraryTagSaga);
  yield takeLatest(REQUEST_POST_NEW_BORROWING,requestPostNewBorrowingSaga);
  yield takeLatest(REQUEST_GET_BORROWING,requestGetBorrowingSaga)
  yield takeLatest(REQUEST_UPDATE_BORROWING,requestUpdateBorrowingSaga)  
  yield takeLatest(REQUEST_FORWARD_BORROWING,requestForwardBorrowingSaga)

  yield takeLatest(REQUEST_GET_LIBRARY_DESKS_OPTIONLIST,requestLibraryDesksOptionListSaga);
  yield takeLatest (REQUEST_GET_LIBRARY_DESKS,requestLibraryDesksSaga);
  
  yield takeLatest(REQUEST_GET_LENDING,requestGetLendingSaga)

  yield takeLatest(REQUEST_CHANGE_STATUS_BORROWING,requestChangeStatusBorrowingSaga);
  yield takeLatest(REQUEST_CHANGE_STATUS_LENDING,requestChangeStatusLendingSaga);
  yield takeLatest(REQUEST_CHANGE_STATUS_DELIVERY,requestChangeStatusDeliverySaga);
  //yield takeLatest(REQUEST_CHANGE_LENDING_ARCHIVED,requestChangeLendingArchivedSaga);

  yield takeLatest(REQUEST_ACCEPT_ALLLENDER, requestAcceptAllLenderLendingSaga)

  yield takeLatest(REQUEST_GET_ISSN_ISBN,requestFindISSNISBNsaga);
  yield takeEvery(REQUEST_FIND_UPDATE_BORROWING_OA,findUpdateOABorrowingSaga);
}
