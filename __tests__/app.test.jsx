import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Home from 'pages/index.jsx';
import { getSchools } from 'lib/api.js';

// import SchoolsHome from 'pages/schools/index.jsx';

describe('App', () => {
  it('/', async () => {
    const schools = await getSchools();

    render(<Home schools={schools} />);
    expect(
      screen.getByRole('heading', { name: /школ/ }),
    ).toBeInTheDocument();
  });

  // it('/professions', async () => {
  //   const professions = await getProfessions();

  //   render(<SchoolsHome />);
  //   expect(
  //     screen.getByRole('heading', { name: 'hay' }),
  //   ).toBeInTheDocument();
  // });
});
