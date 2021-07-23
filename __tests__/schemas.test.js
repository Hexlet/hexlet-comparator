import Ajv from 'ajv';
import path from 'path';
import fsp from 'fs/promises';

import { getSchools, getProfessions } from 'lib/api.js';

const getSchemaValidator = async (schema) => {
  const ajv = new Ajv();
  const schemaPath = path.join(process.cwd(), 'data', 'schemas', `${schema}.json`);
  const schemaData = await fsp.readFile(schemaPath, 'utf-8');
  const validate = ajv.compile(JSON.parse(schemaData));

  return validate;
};

describe('Data schemas', () => {
  it('professions schema', async () => {
    const validate = await getSchemaValidator('profession');
    const professions = await getProfessions();
    expect(validate(professions)).toBeTruthy();
  });

  it('school schema', async () => {
    const validate = await getSchemaValidator('school');
    const schools = await getSchools();
    expect(validate(schools)).toBeTruthy();
  });
});
