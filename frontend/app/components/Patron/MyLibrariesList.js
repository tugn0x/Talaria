import React from 'react';
import {Row, Col, Card, CardBody,Button} from 'reactstrap';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import './style.scss'


function MyLibrariesList(props) {
    const {my_libraries} = props
    return (
        my_libraries.length > 0 &&
            <Row className="my-4 p-4 my-libraries-list">
              <Col xs={12}>
                <h2><FormattedMessage {...messages.header} /></h2>
              </Col>
              {my_libraries.map(my_library => (
                <Col key={my_library.id} xs={12} sm={6} id={`my-library-${my_library.id}`}>
                  <Card>
                    <CardBody>
                      <Button 
                        disabled={my_library.status === 0 ? true : false} 
                        onClick={() => alert(`you clicked library ${my_library.name}`) }
                      >
                      {my_library.name}
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}  
            </Row>
          
    )
}

export default MyLibrariesList