import React from 'react';
import { render } from '@testing-library/react';
import LogoutContainer from './Logout';


test('renders without crashing', () => {
  const { getByText } = render(<LogoutContainer />);
  const linkElement = getByText(/Thank you/i);
  expect(linkElement).toBeInTheDocument();

});