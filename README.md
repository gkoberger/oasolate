### OASolate

Isolate a single endpoint from an OpenAPI Spec file, for easier debugging!

Currently, it's pretty simplistic. It just removes all paths and components not used. It's possible it'll break a few OAS files or cause unintented errors!

```
$ npm install oasolate --save
```

Here's how to use it:

```javascript
const oasolate = require('oasolate');
const file = /* get the OAS file */;

// Get all endpoints in the OAS file
// (This is a helper function!)
console.log(oasolate(file).list());

// Isolate a single endpoint
console.log(oasolate(file).path('get', '/pets'));
```

Future support, maybe:

  - [ ] Remove unused auth schemas, etc
  - [ ] Remove unused servers, etc
  - [ ] Have error messages

