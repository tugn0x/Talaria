import React, {useEffect} from 'react';
import {requestLibraryTagsOptionList, requestPostLibraryTag, requestUpdateLibraryTag, requestRemoveLibraryTag} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import EditTagItem from '../../../components/EditTagItem'
import messages from './messages';
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
import InputSearch from 'components/Form/InputSearch';
import SectionTitle from 'components/SectionTitle';
 
const TagsPage = (props) => {
     console.log('TagsPage', props)
    const {dispatch, library, isLoading,match} = props;
    
    const tagsOptionList=library.tagsOptionList
    
    const intl = useIntl();

    useEffect(() => {
        if(!isLoading) 
            dispatch(requestLibraryTagsOptionList(match.params.library_id))
    }, [])

    const updateItem = (label_id, name) => {
        dispatch(requestUpdateLibraryTag(match.params.library_id,label_id, name, intl.formatMessage({id:'app.global.updatedMessage'})))
    }
    
    const saveItem = (query) => {
        dispatch(requestPostLibraryTag(match.params.library_id,query, intl.formatMessage({id:'app.global.createdMessage'})))
        
    }

    const removeItem = (label_id) => {        
        dispatch(requestRemoveLibraryTag(match.params.library_id,label_id, intl.formatMessage({id:'app.global.removedMessage'}) ))
    } 

    return (
        <>
        <SectionTitle 
            title={messages.header}
        />
        <div className="LibraryTags tags-list">
            <InputSearch
                icon="fa-solid fa-floppy-disk"
                placeholder={intl.formatMessage({id:'app.containers.LibraryTags.tagCreateNew'})}
                submitCallBack={saveItem}
                className="w-50 mb-5"
            />
              
            <Loader show={isLoading}>
                {tagsOptionList.length > 0 && tagsOptionList.map((label, i) => (
                        <EditTagItem 
                            key={`${label.label}-${label.value}`}
                            data={label}
                            updateItem={(label_id, name) => updateItem(label_id, name)}
                            removeItem={(label_id)=> removeItem(label_id)}
                            loading={isLoading}
                        />
                    ))}
            </Loader>
        </div>
        </>
    );
};



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

export default compose(withConnect)(TagsPage);