import React from 'react'
import messages from './messages'
import { FormattedMessage } from 'react-intl';

const ReferencesList = (props) => {
    const {match, referencesList} = props
    return (
        <>
            <a href={`${match.url}/new`} className="text-link">
                <FormattedMessage {...messages.createNewReference} />
            </a>
            <h3><FormattedMessage {...messages.header} /></h3>
            <div className="referencesList">
                <ul>
                    {referencesList.length > 0 &&
                        referencesList.map(reference => (
                            <li key={reference.id}>
                                <a href={`${match.url}/${reference.id}`}>
                                    {reference.pub_title}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div> 
        </>
    )
}

export default ReferencesList