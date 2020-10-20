import React from 'react';
import { render } from '@testing-library/react';
import LogoutContainer from './components/Logout';


test('renders without crashing', () => {
  const { getByText } = render(<LogoutContainer />);
  const linkElement = getByText(/Thank you/i);
  expect(linkElement).toBeInTheDocument();


});

test('renders button without crashing', () => {
  const { getByText } = render(<LogoutContainer />);

  const btnElement = getByText(/Login Again/i);
  expect(btnElement.closest('button')).not.toBeDisabled();
  expect(btnElement.closest('button').disabled).toBeFalsy();

});

test('renders button with specific text', () => {
  const { getByRole} = render(<LogoutContainer />);
  const button = getByRole('button')
  expect(button.innerHTML).toMatch(/login again/);

});