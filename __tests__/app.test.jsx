import '@testing-library/jest-dom';

import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Home from 'pages/index.jsx';
import SchoolsHome from 'pages/schools/index.jsx';

describe('App', () => {
  it('/', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: 'jopa' }),
    ).toBeInTheDocument();
  });

  it('/schools', () => {
    render(<SchoolsHome />);
    expect(
      screen.getByRole('heading', { name: 'hay' }),
    ).toBeInTheDocument();
  });
});
