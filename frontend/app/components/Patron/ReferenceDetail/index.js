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
                <ReferenceIcons 
                        customClass="list-head features-icons"
                        data={reference}
                        icons={icons ? icons : ['request','edit','print','export','delete']}
                        deleteReference={deleteReference}
                />
            }
            <FindOA reference={reference}/>
            <ReferenceTags data={reference}/>                            
            <ReferenceDetailContent canCollapse={false} collapsed={false} reference={reference} customClass="detail-body"/>
            
        </>
    );
};

export default ReferenceDetail;