import React, {useEffect} from 'react';
import messages from 'utils/globalMessages'
import confirm from "reactstrap-confirm";
import {useIntl} from 'react-intl';

const useConfirmModal = ({confirmCallBack, params, message}) => {
    const intl = useintl();

    useEffect(() => {
        
    }, [])

    async function confirmAction (id,labelId, filter) {
        //console.log("DISPATCH removeLabelFromReference",id,labelId);
         let conf = await confirm({
             title: intl.formatMessage(messages.confirm),
             message: message,
             confirmText: intl.formatMessage(messages.yes),
             cancelText: intl.formatMessage(messages.no)
         }); //
         if(conf)
             dispatch(requestRemoveReferenceLabel(id,labelId,intl.formatMessage(messages.removedMessage), filter))
     }

    return  confirmAction
};

export default useConfirmModal;