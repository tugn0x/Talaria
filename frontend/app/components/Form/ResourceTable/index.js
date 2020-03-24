import React from 'react'
import {Table, Row, Col} from 'reactstrap'
import './style.scss'

const ResourceTable = (props) => {
    const {resources} = props
    return (
        <>
        <h3>Resources</h3>
        <Table responsive className="resources-list">
            <thead>
                <tr>
                {Object.keys(resources).length && Object.keys(resources).map((resource, i) =>
                    <td key={`${resource}-${i}`}>
                       <span>{[resource]}</span> 
                    </td>
                )}
                </tr>
            </thead>
            <tbody>
                <tr>    
                {Object.keys(resources).length && Object.keys(resources).map((resource, i) =>
                    <td key={`${resource}-${i}`}>
                        <ul>
                            {resources[resource].map((permission, i) => 
                                <li key={`${permission}-${i}`}>{permission}</li>
                            )}
                        </ul>
                    </td>    
                )}
                </tr>
            </tbody>
        </Table>
        </>
    )
}

export default ResourceTable