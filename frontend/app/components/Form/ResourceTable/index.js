import React from 'react'
import {Table, Row, Col} from 'reactstrap'
import './style.scss'

const ResourceTable = (props) => {
    console.log('ResourceTable', props)
    const {resource, head} = props
    return (
        <>
        <h4>{head}</h4>
        <div className="table user-resources-list">
            <div className="tbody">
                {resource.map((res, i) =>
                    <Row key={`${res}-${i}`}>
                        <Col xs={6}>
                            <span>{res.resource.name}</span>
                        </Col>
                        <Col xs={6}>
                            <ul>
                                {res.permissions.map((permission, i) => 
                                    <li key={`${permission}-${i}`}>
                                        <span>{permission}</span>
                                    </li>
                                )}
                            </ul>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
        </>
    )
}

export default ResourceTable