import React from 'react'
import {Table, Row, Col} from 'reactstrap'
import './style.scss'

const ResourceTable = (props) => {
    const {resources} = props
    return (
        <Table responsive className="resources-list">
            <thead>
                <tr>
                {Object.keys(resources).length && Object.keys(resources).map(resource =>
                    <td>
                       <span>{[resource]}</span> 
                    </td>
                )}
                </tr>
            </thead>
            <tbody>
                <tr>    
                {Object.keys(resources).length && Object.keys(resources).map(resource =>
                    <td>
                        <ul>
                    {resources[resource].map(permission => 
                        <li>{permission}</li>
                    )}
                    </ul>
                    </td>    
                )}
                </tr>
            </tbody>
        </Table>
    )
}

export default ResourceTable