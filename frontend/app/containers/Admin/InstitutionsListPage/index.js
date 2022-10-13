import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {InstitutionsList} from 'components'
import {requestGetInstitutionsList,requestDeleteInstitution,requestStatusChangeInstitution} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import messages from './messages'
import confirm from "reactstrap-confirm";
// import queryString from 'query-string'

const InstitutionsListPage = (props) => {
    console.log('InstitutionsListPage', props)
    const {dispatch, isLoading, admin, history,match} = props
    const intl = useIntl();
    const institutionsList = admin.institutionsList.data
    const pagination = admin.institutionsList.pagination

    const editPath="/admin/institutions/:id/:op?"    
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetInstitutionsList())
        }
    }, [])

     async function deleteInstitution (inst,multifilter) {
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askDeleteMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
        if(conf)
            dispatch(requestDeleteInstitution(inst,intl.formatMessage(messages.deletedMessage)))
    }

    async function changeStatusInstitution (inst, status,multifilter)  {
        console.log("Changestatus: ",inst,"status:",status)
        
            let conf = await confirm({
                title: intl.formatMessage(messages.confirm),
                message: intl.formatMessage(messages.askChangeStatusMessage),
                confirmText: intl.formatMessage(messages.yes),
                cancelText: intl.formatMessage(messages.no)
            }); //
            if(conf)
                dispatch(requestStatusChangeInstitution(inst,status,intl.formatMessage(messages.statusAppliedMessage)))
        
    }

    return (        
        <InstitutionsList 
                sectionTitle={messages.header}
                data={institutionsList}                               
                loading={isLoading}
                pagination={pagination}
                history={history}                
                match={match}   
                editPath={editPath}             
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.url)
                        searchFilter={...searchFilter}
                        dispatch(requestGetInstitutionsList(page,pageSize,searchFilter))
                    },
                    searchOnChange: true
                }}
                deleteInstitution={deleteInstitution}    
                changeStatusInstitution={changeStatusInstitution}            
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

export default compose(withConnect)(InstitutionsListPage);
