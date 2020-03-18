import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/formatDate'
import ButtonPlus from 'components/Button/ButtonPlus'
//import CustomModal from 'components/Modal/Loadable'
//import {ProjectForm} from 'components';
import { generatePath } from "react-router";
// import './style.scss'

function ProjectsList(props) {
    console.log('ProjectsList', props)
    const {projectsList, match, editPath, createProject, loading} = props
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id: id,
        });
    }    

    return (
        <>
            <h3 className="table-title">{intl.formatMessage(messages.header)}</h3>
            <ButtonPlus 
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewProject)}
            />
            <div className="table projects-list">
                <Row className="thead">
                    <Col xs={3}>
                        <span>Titolo / Descrizione</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>ID</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Aggiunta il</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Active</span>
                        <i className="fa fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>{intl.formatMessage(messages.editProject)}</span>
                    </Col>
                </Row>
                <div className="tbody">
                    {projectsList.length > 0 && projectsList.map(project => (
                        <Row key={`project-${project.id}`}>
                            <Col xs={3}>
                                <a href={`${editurl(project.id)}`}>
                                    {project.name}
                                </a>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {project.id}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {formatDate(project.created_at, intl.locale)}
                                </span>
                            </Col>
                            <Col xs={2}>
                            <div className={`status-point ${project.active === 0 ? 'disabled' : 'success' }`}></div>
                            </Col>
                            <Col xs={3} className="edit-icons" >
                                <a href={`${editurl(project.id)}`} className="btn btn-link">
                                    <i className="fa fa-edit"></i>
                                </a>
                                <a href="#" onClick={() => console.log('delete project')} className="btn btn-link">
                                    <i className="fa fa-trash"></i>
                                </a>
                            </Col>
                        </Row>
                      ))
                    }
                </div>
            </div> 
            {/*<CustomModal 
                modal={modal} 
                toggle={toggle}>
                <ProjectForm 
                    createProject={ (formData) => createProject(formData) } 
                    loading={loading}
                    titleNewProject={'New Project'}
                /> 
            </CustomModal> 
            */} 
          
          </>
    )
}

export default ProjectsList