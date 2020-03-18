/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProjectPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Project Page',
  },
  updateMessage: {
    id: `${scope}.updateMessage`,
    defaultMessage: 'Project updated',
  },
  createMessage: {
    id: `${scope}.createMessage`,
    defaultMessage: 'Project created',
  },
  titleNewProject: {
    id: `${scope}.titleNewProject`,
    defaultMessage: 'Register new project',
  },
});
