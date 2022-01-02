const YAML = require("js-yaml");

class OAS {
  constructor(file) {
    this.spec = file;
    this.format = "json";
    if (typeof file === "string") {
      if (file.trim()[0] === '{') {
        this.format = "json_string";
        this.spec = JSON.parse(file);
      } else {
        this.format = "yaml";
        this.spec = YAML.load(file);
      }
    }
  }

  listUsedRefs(method, path) {
    const endpoint = this.spec.paths[path][method];

    const iterate = (obj) => {
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] == "object") {
            iterate(obj[property]);
          } else {
            if (property === "$ref") {
              if (!refs[obj[property]]) {
                // We haven't seen this yet, so let's transverse it
                iterate(this.getByRef(obj[property]));
              }
              refs[obj[property]] = true;
            }
          }
        }
      }
    };

    const refs = {};
    iterate(endpoint);
    return Object.keys(refs);
  }

  // Get an object from '#/component/schema/whatever'
  getByRef(ref) {
    const split = ref.split("/");
    return this.spec[split[1]][split[2]][split[3]];
  }

  out(format) {
    if (this.format === 'yaml') {
      return YAML.dump(this.spec);
    }
    if (this.format === 'json_string') {
      return JSON.stringify(this.spec);
    }
    return this.spec;
  }
}

module.exports = OAS;
