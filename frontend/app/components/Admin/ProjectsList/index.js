import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import {formatDate} from 'utils/dates'
import ButtonPlus from 'components/Button/ButtonPlus'
import CustomModal from 'components/Modal/Loadable'
import {Pagination, InputSearch} from 'components';
import { generatePath } from "react-router";
import ProjectPage from 'containers/Admin/ProjectPage'
import { NavLink } from 'react-router-dom';

function ProjectsList(props) {
    console.log('ProjectsList', props)
    const {projectsList, editPath, history, match, pagination} = props
    const [modal, setModal] = useState(false);
    const {total_pages, current_page,total,count,per_page} = pagination
    const toggle = () => setModal(!modal);
    const intl = useIntl();

    const linkTo = (path) => {
        history.push(path)
     };

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
                        <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>ID</span>
                        <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Aggiunta il</span>
                        <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={2}>
                        <span>Active</span>
                        <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                    </Col>
                    <Col xs={3}>
                        <span>{intl.formatMessage(messages.editProject)}</span>
                    </Col>
                </Row>
                <div className="tbody">
                    {projectsList.length > 0 && projectsList.map(project => (
                        <Row key={`project-${project.id}`}>
                            <Col xs={3}>
                                <NavLink to={`${editurl(project.id)}`} key={project.id}>
                                    {project.name}
                                </NavLink>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {project.id}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span>
                                    {formatDate(project.created_at)}
                                </span>
                            </Col>
                            <Col xs={2}>
                            <div className={`status-point ${project.active === 0 ? 'disabled' : 'success' }`}></div>
                            </Col>
                            <Col xs={3} className="edit-icons" >
                                <NavLink to={`${editurl(project.id)}`} key={project.id} className="btn btn-link">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </NavLink>
                                <a href="#" onClick={() => console.log('delete project')} className="btn btn-link">
                                    <i className="fa-solid fa-trash"></i>
                                </a>
                            </Col>
                        </Row>
                      ))
                    }
                </div>
            </div>
            <CustomModal
                modal={modal}
                toggle={toggle}>
                <ProjectPage
                    match={match}
                />
            </CustomModal>
            {Object.keys(pagination).length > 0 &&
                <Pagination
                    current_page={current_page}
                     total_pages={total_pages}
                    // setPage={(page) => linkTo(`${path}/?page=${page}`)}
                    linkTopage={(page,pageSize)=>linkTo(generatePath(`${match.path}`, {
                        page: page
                      }))}
                    setPage={(page) => linkTo(generatePath(`${props.match.path}`, {
                        page: page
                      }))}
                />
            }

          </>
    )
}

export default ProjectsList
