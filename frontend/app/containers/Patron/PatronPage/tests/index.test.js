import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import PatronPage from '../index';

describe('<PatronPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <PatronPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
