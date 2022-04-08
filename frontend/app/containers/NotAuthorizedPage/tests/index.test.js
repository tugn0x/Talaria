import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import NotAuthorizedPage from '../index';

describe('<NotAuthorizedPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <NotAuthorizedPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
