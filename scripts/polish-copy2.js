'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const map = [
  ['怎么用这套站组织培训', '培训怎么安排'],
  ['可直接组织培训', '可直接拿来培训'],
  ['速查与模板', '查表与模板'],
  ['先选身份，再走路径', '按岗位选路径'],
  ['入门路径 · 建议先完成', '入门路径 · 先走这三天'],
  ['12 周能力线 · 入门后深化', '12 周能力线 · 入门之后'],
  ['知识库与工具 · 开会写材料直接用', '知识库与工具 · 开会写材料能直接用'],
  ['怎么用这张地图做培训', '培训里怎么用这张地图'],
  ['三类读者 · 角色导航', '三类岗位 · 各自路径'],
  ['培训使用说明', '培训安排'],
];

const files = [
  'index.html',
  'scripts/content-p1-pages.js',
  'scripts/content-p2.js',
  'scripts/build-pages.js',
];

for (const f of files) {
  const p = path.join(root, f);
  let s = fs.readFileSync(p, 'utf8');
  const before = s;
  for (const [a, b] of map) s = s.split(a).join(b);
  if (s !== before) {
    fs.writeFileSync(p, s, 'utf8');
    console.log('updated', f);
  }
}

// verify index
const idx = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
console.log('training h2:', (idx.match(/training-title">([^<]+)/) || [])[1]);
console.log('roles h2:', (idx.match(/roles-title">([^<]+)/) || [])[1]);
console.log('has 怎么用这套站:', idx.includes('怎么用这套站'));
