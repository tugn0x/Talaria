import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {requestPickupList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PickupsList from '../../../components/Library/PickupsList';
import messages from './messages'
import confirm from "reactstrap-confirm";
 
const PickupsPage = (props) => {
    console.log('PickupsPage', props)
    const {dispatch, isLoading, match, library, history} = props    
    const pickupsList = library.pickupsList.data
    const pagination = library.pickupsList.pagination       

    const editPath='/library/'+match.params.library_id+"/manage/pickup/:id/:op?";

    const intl = useIntl()
    
    useEffect(() => {          
            dispatch(requestPickupList(match.params.library_id))                        
    }, [])

    async function deletePickup (id,filter) {
        alert("TODO deletePickup!");
         /*let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askDownloadedMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //

         let data={
            id: id,
            'download':1,
         }

         if(conf)
             dispatch(requestUpdateBorrowing(id,match.params.library_id,data,intl.formatMessage({id: "app.requests.setDownloadedMessage"}),filter))         
        */
     } 
     
          
    return (
            <PickupsList 
                sectionTitle={messages.header}
                data={pickupsList}                               
                loading={isLoading}
                pagination={pagination}
                history={history}                
                match={match}   
                editPath={editPath}                                                        
                deletePickup={deletePickup}
                changePickupStatus={()=>alert("changePickupStatus()!")}
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.url)
                        searchFilter={searchFilter}
                        dispatch(requestPickupList(match.params.library_id,page, pageSize, searchFilter))
                    },
                    searchOnChange: true
                }}   
            />        
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isLibraryLoading(),
    library: makeSelectLibrary(),        
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

export default compose(withConnect)(PickupsPage);