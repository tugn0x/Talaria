import React, {useEffect} from 'react'

import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestUsersList, requestDeleteUser} from '../actions'
import {useIntl} from 'react-intl';
import messages from './messages';
import {columns} from './columns';
import {SimpleList} from 'components';
import confirm from "reactstrap-confirm";

const UsersListPage = (props) => {
    console.log('UsersListPage', props)
    const {dispatch, isLoading, library, match} = props
    const library_id = library.library.id
    const usersList = library.usersList.data
    const pagination = library.usersList.pagination
    const intl = useIntl()
    useEffect(() => {
        if(!isLoading && library_id) {
            dispatch(requestUsersList(library_id))
        }
    }, [library_id])

    async function deleteCallback (params) {
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askDeleteMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
        if(conf)
        //NB: in questo caso la library_id lo prendo da questo componente e non dalla SimpleList
        //percheè in tabella non viene visualizzato l'id 
            dispatch(requestDeleteUser(params.id,library_id,intl.formatMessage(messages.deletedMessage)))
    }

    return (
        <SimpleList 
            data={usersList}
            columns={columns}
            loading={isLoading}
            pagination={pagination}
            history={history}
            messages={messages}
            match={match}
            // title={library.library.name}
            title={intl.formatMessage(messages.header)}
            searchOptions={{
                getSearchList: (query) => dispatch(requestUsersList(library_id, null, query))
            }}
            editPath={`/library/${library_id}/patrons/patron/:id?`}
            deleteCallback={ deleteCallback }
            // modalComponent={ <UserPage match={match} />}
        />
    )
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(UsersListPage);