/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ProjectsList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Projects list',
  },
  createNewProject: {
    id: `${scope}.createNewProject`,
    defaultMessage: 'Register new project',
  },
  ProjectCreateNew: {
    id: `${scope}.ProjectCreateNew`,
    defaultMessage: 'Register new project',
  },
  editProject: {
    id: `${scope}.editProject`,
    defaultMessage: 'Edit project',
  },
});
