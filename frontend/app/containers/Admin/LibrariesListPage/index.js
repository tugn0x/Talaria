import React, {useEffect} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {SimpleList} from 'components'
import messages from './messages'
import {columns} from './columns'
import {requestGetLibrariesList,deleteLibrary /* , requestPostLibrary */ } from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import LibraryPage from '../LibraryPage'
import confirm from "reactstrap-confirm";


const LibrariesListPage = (props) => {
    console.log('LibrariesListPage', props)
    const {dispatch, isLoading, admin,  match, history} = props
    const intl = useIntl();
    const libraryOptionList = admin.libraryOptionList
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetLibrariesList())
        }
    }, [])

    async function deleteCallback (params) {
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askDeleteMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
        if(conf)
            dispatch(deleteLibrary(params.id,intl.formatMessage(messages.deletedMessage)))
    }

    

    return (
        <>
            <SimpleList 
                data={libraryOptionList.data}
                columns={columns}
                loading={isLoading}
                pagination={libraryOptionList.pagination}
                history={history}
                messages={messages}
                match={match}
                title={intl.formatMessage(messages.header)}
                searchOptions={{
                    getSearchList: (query) => dispatch(requestGetLibrariesList(null, query)),
                    searchOnChange: true
                }}
                editPath={'/admin/libraries/library/:id?'}
                deleteCallback={deleteCallback}
                modalComponent={ <LibraryPage match={match} />}
            />
        </>
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
