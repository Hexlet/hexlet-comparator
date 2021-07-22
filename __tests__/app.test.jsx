import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import fsp from 'fs/promises';
import Home from 'pages/index.jsx';
import { getSchools, getProfessions } from 'lib/api.js';
import Ajv from 'ajv';
import path from 'path';

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
    const schemaPath = path.join(process.cwd(), 'data', 'schemas', 'profession.json');
    const schema = await fsp.readFile(schemaPath, 'utf-8');
    const validate = ajv.compile(JSON.parse(schema));
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
