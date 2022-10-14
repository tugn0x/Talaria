import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {LibrariesList} from 'components'
import {requestGetLibrariesList,requestDeleteLibrary,requestStatusChangeLibrary} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import messages from './messages'
import confirm from "reactstrap-confirm";
// import queryString from 'query-string'

const LibrariesListPage = (props) => {
    console.log('LibrariesListPage', props)
    const {dispatch, isLoading, admin, history,match} = props
    const intl = useIntl();
    const librariesList = admin.libraryOptionList.data
    const pagination = admin.libraryOptionList.pagination

    const editPath="/admin/libraries/:id/:op?"    
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetLibrariesList())
        }
    }, [])

     async function deleteLibrary (lib,multifilter) {
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askDeleteMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
        if(conf)
            dispatch(requestDeleteLibrary(lib,intl.formatMessage(messages.deletedMessage)))
    }

    async function changeStatusLibrary (lib, status,multifilter)  {
        console.log("Changestatus: ",lib,"status:",status)
        
            let conf = await confirm({
                title: intl.formatMessage(messages.confirm),
                message: intl.formatMessage(messages.askChangeStatusMessage),
                confirmText: intl.formatMessage(messages.yes),
                cancelText: intl.formatMessage(messages.no)
            }); //
            if(conf)
                dispatch(requestStatusChangeLibrary(lib,status,intl.formatMessage(messages.statusAppliedMessage)))
        
    }

    return (        
        <LibrariesList 
                sectionTitle={messages.header}
                data={librariesList}                               
                loading={isLoading}
                pagination={pagination}
                history={history}                
                match={match}   
                editPath={editPath}             
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.url)
                        searchFilter={...searchFilter}
                        dispatch(requestGetLibrariesList(page,pageSize,searchFilter))
                    },
                    searchOnChange: true
                }}
                deleteLibrary={deleteLibrary}    
                changeStatusLibrary={changeStatusLibrary}            
            />        
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

export default compose(withConnect)(LibrariesListPage);
