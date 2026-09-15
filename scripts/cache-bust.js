'use strict';
const fs = require('fs');
for (const f of ['scripts/build-pages.js', 'index.html']) {
  let s = fs.readFileSync(f, 'utf8');
  s = s.replace(/href="css\/([^"]+)\.css"/g, 'href="css/$1.css?v=2.1.1"');
  s = s.replace(/src="js\/app\.js"/g, 'src="js/app.js?v=2.1.1"');
  fs.writeFileSync(f, s);
  console.log('ok', f);
}
