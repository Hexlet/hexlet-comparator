import fsp from 'fs/promises';
import yaml from 'js-yaml';
import path from 'path';

export const getProfessions = async () => {
  const professionsPath = path.join(process.cwd(), 'data', 'professions.yml');
  const data = await fsp.readFile(professionsPath, 'utf-8');
  const professions = yaml.load(data);
  return professions;
};

export const getSchools = async () => {
  const schoolsDir = path.join(process.cwd(), 'data', 'schools');
  const fileNames = await fsp.readdir(schoolsDir);
  const schoolPromises = fileNames.map(async (fileName) => {
    const filePath = path.join(process.cwd(), 'data', 'schools', fileName);
    // console.log(filePath);
    const data = await fsp.readFile(filePath, 'utf-8');
    return yaml.load(data);
  });

  const schools = await Promise.all(schoolPromises);
  return schools.sort();
};

// export const getSchool = async (id) => {
//   // const schoolsDir = path.join(process.cwd(), 'data', 'schools');
//   // const fileNames = await fsp.readdir(schoolsDir);
//   // const schools = fileNames.map(async (fileName) => {
//   //   const filePath = path.join(process.cwd(), 'data', 'schools', fileName);
//   //   const data = await fsp.readFile(filePath, 'utf-8');
//   //   return yaml.load(data);
//   // });

//   return id;
// };
