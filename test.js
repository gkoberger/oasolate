const oasolate = require('./index');
const fs = require('fs');
const file = fs.readFileSync('./test.yaml', 'utf8');

console.log(JSON.stringify(oasolate(file).list(), undefined, 2));

console.log('----------');

console.log(oasolate(file).path('get', '/pets'));
