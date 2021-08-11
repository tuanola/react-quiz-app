import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
});

it('renders Quiz header', () => {
  render(<App />);
  const header = screen.getByText(/Quiz/i);

  expect(header).toBeInTheDocument();
});
