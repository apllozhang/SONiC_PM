'use strict';
const fs = require('fs');
const p = 'scripts/build-pages.js';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/path-chart\.js\?v=[^"']+/g, 'path-chart.js?v=2.1.6');
fs.writeFileSync(p, s);
console.log('ok');
