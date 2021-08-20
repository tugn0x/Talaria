import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceIcons from '../ReferenceIcons';
import FindOA from '../../FindOA';
import ReferenceTags from '../ReferenceTags';
import ReferenceDetailContent from '../../ReferenceDetailContent';

const ReferenceDetail = props => {
    console.log('ReferenceDetail', props)
    const {reference, icons,deleteReference} = props
    const intl = useIntl()

    return (
        <>  {!(icons && icons.length==0) && 
                <div className="list-head features-icons">
                <ReferenceIcons 
                        data={reference}
                        icons={icons ? icons : ['request','edit','print','export','delete']}
                        deleteReference={deleteReference}
                />
                </div>}
                <FindOA reference={reference}/>
                <ReferenceTags data={reference}/>                
                <ReferenceDetailContent reference={reference} customClass="detail-body"/>
            
        </>
    );
};

export default ReferenceDetail;