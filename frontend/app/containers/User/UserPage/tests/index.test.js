import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import UserPage from '../index';

describe('<UserPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <UserPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
