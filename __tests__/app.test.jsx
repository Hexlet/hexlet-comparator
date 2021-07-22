import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Home from 'pages/index.jsx';
import { getSchools, getProfessions } from 'lib/api.js';
import Ajv from 'ajv';

// import SchoolsHome from 'pages/schools/index.jsx';

describe('App', () => {
  it('/', async () => {
    const schools = await getSchools();

    render(<Home schools={schools} />);
    expect(
      screen.getByRole('heading', { name: /школ/ }),
    ).toBeInTheDocument();
  });

  it('professions schema', async () => {
    const ajv = new Ajv();
    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          programmingLanguage: { type: 'string' },
        },
        required: ['id', 'name', 'description', 'programmingLanguage'],
      },
    };
    const validate = ajv.compile(schema);
    const proffesions = await getProfessions();
    expect(validate(proffesions)).toBeTruthy();
  });
  // it('/professions', async () => {
  //   const professions = await getProfessions();

  //   render(<SchoolsHome />);
  //   expect(
  //     screen.getByRole('heading', { name: 'hay' }),
  //   ).toBeInTheDocument();
  // });
});
