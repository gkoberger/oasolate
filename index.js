const _ = require('lodash');
const OAS = require('./oas');

module.exports = (oasFile) => {
  const oas = new OAS(oasFile);

  return {
    path,
    list,
  };

  function path(method, path) {
    if (typeof method === 'object') {
      // This is the result of `.list()`
      path = method[1];
      method = method[0];
    }

    const refs = oas.listUsedRefs(method, path);

    _.each(oas.spec.components, (components, type) => {
      _.each(components, (details, component) => {
        const ref = `#/components/${type}/${component}`;
        if (refs.indexOf(ref) === -1) {
          const split = ref.split('/');
          delete oas.spec[split[1]][split[2]][split[3]];
        }
      });
    });

    const endpoint = oas.spec.paths[path][method];
    oas.spec.paths = {};
    oas.spec.paths[path] = {};
    oas.spec.paths[path][method] = endpoint;

    return oas.out();
  };

  function list() {
    const endpoints = [];
    _.each(oas.spec.paths, (methods, path) => {
      _.each(methods, (endpoint, method) => {
        endpoints.push([method, path, endpoint.operationId]);
      });
    });
    return endpoints;
  };
};

