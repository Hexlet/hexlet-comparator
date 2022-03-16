import fsp from 'fs/promises';
import yaml from 'js-yaml';
import path from 'path';
// import { existsSync } from 'fs';

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

export const getScreenshots = async (school) => {
  const schoolScreenDir = path.join(process.cwd(), 'public', 'assets', 'schools', school.id, 'screenshots');
  const imageNames = await fsp.readdir(schoolScreenDir);
  const assetNames = imageNames.map((n) => n.replace('.jpg', ''));
  return assetNames;
};

// export const getSchoolsAssetsRouter = async () => {
//   const schoolsDir = path.join(process.cwd(), 'data', 'schools');
//   const schoolFileNames = await fsp.readdir(schoolsDir);
//   const schoolNames = schoolFileNames.map((name) => name.replace('.yml', ''));

//   const promises = schoolNames.map(async (name) => {
//     const schoolImageDir = path.join(process.cwd(), 'public', 'images', name);
//     const imageNames = await fsp.readdir(schoolImageDir);
//     const assetNames = imageNames.map((n) => n.replace('.png', ''));
//     const addedAssets = _.fromPairs(assetNames.map((n) => [n, true]));

//     const schoolAssets = {
//       id: name,
//       ...addedAssets,
//     };

//     return schoolAssets;
//   });

//   const assets = Promise.all(promises);
//   const assetsById = _.keyBy(assets, 'id');

//   return {
//     assetPath(schoolId, slug) {
//       if (!_.get(this.assetsById, schoolId, slug)) {
//         return `/assets/fallback/${slug}.png`;
//       }

//       return `/assets/schools/${schoolId}/${slug}.png`;
//     },
//     assetsById,
//   };
// const schoolsDir = path.join(process.cwd(), 'public', 'schools');
// const fileNames = await fsp.readdir(schoolsDir);
// const schoolPromises = fileNames.map(async (fileName) => {
//   const filePath = path.join(process.cwd(), 'data', 'schools', fileName);
//   // console.log(filePath);
//   const data = await fsp.readFile(filePath, 'utf-8');
//   return yaml.load(data);
// });

// const schools = await Promise.all(schoolPromises);
// return schools.sort();
// };

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
