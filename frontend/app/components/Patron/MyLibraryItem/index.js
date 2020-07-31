import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'reactstrap';
import { generatePath } from "react-router";
import './style.scss';

const MyLibraryItem = props => {
    console.log('MyLibraryItem', props);
    const {data, editPath, setFavorite, deleteCallBack} = props;
   // const [favoriteStar, setFavoriteStar] = useState(data.preferred);
    const editurl = (library_id, id) => {
        return generatePath(`${editPath}`, {
            library_id,
            id
        });
    }  

    const statusClass = (status) => {
        switch (status)
        {
            case 0: return 'disabled'; break;
            case 1: return 'success'; break;
            case 2: return 'pending'; break;
        }
        return status;
    }

    const favouriteStarClass = (pref) => {
        switch (pref)
        {
          case 0: return 'notpreferred'; break;
          case 1: return 'preferred'; break;
          default: return 'notpreferred'; break;
        }
        return pref;
    }
  

    return (
        <Row className="list-row my-libraries-item justify-content-between">
            <Col sm={3} className="">
                <i onClick={setFavorite} 
                    className={`fas fa-star preferred-star ${favouriteStarClass(data.preferred)}`}></i>
                <div className="status-block">
                    <div className={`status-point ${statusClass(data.status)}`}></div>
                    {data.created_at && <p>{data.created_at}</p>}
                    {!data.created_at && <p>26/6/2020</p>}
                </div>
            </Col>
            <Col sm={2} className="info">
                <p className="font-weight-bold">Etichetta </p>
                <p>{data.label}</p>
            </Col>
            <Col sm={5} className="info">
                {data.department_name && <div><span className="font-weight-bold">Dipartimento </span><span>{data.department_name}</span></div>}
                {data.title_name && <div><span className="font-weight-bold">Qualifica </span><span>{data.title_name}</span></div>}
                {data.user_referent && <div><span className="font-weight-bold">Referente </span><span>{data.user_referent}</span></div> }
                {data.user_service_phone && <div><span className="font-weight-bold">Telefono </span><span>{data.user_service_phone}</span></div> }
                {data.user_service_email && <div><span className="font-weight-bold">Email </span><span>{data.user_service_email}</span></div> }
            </Col>
            <Col sm={2} className="icons align-self-center">
                <a href={`${editurl(data.library_id, data.id)}`} className="btn btn-icon">
                    <i className="fas fa-edit"></i>
                </a>
                <Button color="icon" onClick={deleteCallBack}>
                    <i className="fas fa-trash"></i>
                </Button>
            </Col>  
        </Row>
    );
};

MyLibraryItem.propTypes = {
    
};

export default MyLibraryItem;