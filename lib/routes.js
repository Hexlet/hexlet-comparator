const routes = {
  professionsPath: () => '/professions',
  professionCompetitorPath: (professionId, schoolIds) => `/professions/${professionId}/competitors/${schoolIds.join('-vs-')}`,
  schoolsPath: () => '/schools',
  professionPath: (id) => `/professions/${id}`,
  schoolPath: (id) => `/schools/${id}`,
};

export default routes;
