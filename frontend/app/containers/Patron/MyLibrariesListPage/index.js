import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
// import {fields} from './fields';
import messages from './messages'; 
import {requestMyLibraries,requestDeleteAccessToLibrary, requestUpdateAccessToLibrary} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
/* import MyLibraryPage from '../MyLibraryPage';
import {SimpleList} from 'components' */
import MyLibrariesList from 'components/Patron/MyLibrariesList';
// import {columns} from './columns'
import confirm from 'reactstrap-confirm'

const MyLibrariesListPage = (props) => {
    console.log('MyLibrariesListPage', props)
    const {dispatch, isLoading, patron, match} = props
    const intl = useIntl();
   
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestMyLibraries())
        }
    }, [])

    async function deleteCallback (params) {
        console.log('deleteCallback')
        console.log('deleteCallback')
        console.log('deleteCallback')
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askDeleteMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
        if(conf)
            dispatch(requestDeleteAccessToLibrary(params.id,params.library_id,intl.formatMessage(messages.deletedMessage)))
    }
   
    return (
        <>
            <MyLibrariesList 
                data={patron.my_libraries.data}
                loading={isLoading}
                pagination={patron.my_libraries.pagination}
                messages={messages}
                editPath={`/patron/:library_id?/my-libraries/library/:id?` }
                setFavorite={(fav, library_id, id) =>  dispatch(requestUpdateAccessToLibrary({
                    ...fav, 
                    library_id, 
                    id })
                )}
                deleteCallback={(library_id, id) => deleteCallback({library_id: library_id, id: id})}  
            />
        {/*  <SimpleList 
            data={patron.my_libraries.data}
            columns={columns}
            loading={isLoading}
            pagination={patron.my_libraries.pagination}
            history={history}
            messages={messages}
            match={match}
            title={intl.formatMessage(messages.header)}
            searchOptions={{
                getSearchList: (query) => dispatch(requestMyLibraries(null, query)),
                searchOnChange: true
            }}
            // editPath={`/patron/my-libraries/library/:id?`}
            editPath={`/patron/:library_id?/my-libraries/library/:id?` } 
            deleteCallback={ {callback: deleteCallback, params: ['library_id', 'id'] } }
            modalComponent={ <MyLibraryPage match={match}/>}
        />  */}
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isPatronLoading(),
    patron: makeSelectPatron()
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

export default compose(withConnect)(MyLibrariesListPage);
