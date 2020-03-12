import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import LibraryPage from '../index';

describe('<LibraryPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <LibraryPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
