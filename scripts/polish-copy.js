'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const map = [
  // 主标语
  ['把“开源 NOS”变成<em>可定义、可交付、可经营</em>的交换机产品', '把“开源 NOS”变成<em>能说清、能交付、能长期服务</em>的交换机产品'],
  ['把“开源 NOS”变成可定义、可交付、可经营的交换机产品', '把“开源 NOS”变成能说清、能交付、能长期服务的交换机产品'],
  ['可定义、可交付、可经营', '能说清、能交付、能长期服务'],
  // 生硬词
  ['知识底座', '知识库'],
  ['版本与生态坐标系', '版本与生态怎么对上'],
  ['建立 SONiC 产品坐标系', '建立 SONiC 产品参照框架'],
  ['先把坐标系立起来', '先把参照框架立起来'],
  ['产品坐标系', '产品参照框架'],
  ['坐标系', '参照框架'],
  ['泛化成相同支持状态', '笼统当成同一种支持状态'],
  ['泛化为相同支持状态', '笼统当成同一种支持状态'],
  ['不能泛化', '不能笼统'],
  ['外推为', '推成'],
  ['外推到', '推到'],
  ['不能外推', '不能推'],
  ['控制面链路', '控制面路径'],
  ['依赖链', '依赖关系'],
  ['harden 版', '加固版'],
  ['供应商 harden', '厂商加固'],
  ['做 harden', '做加固'],
  ['的 harden', '的加固'],
  ['hardening 追溯链', '加固过程追溯'],
  ['hardening 路径', '加固路径'],
  ['harden', '加固'],
  ['Hardening', '加固'],
  // 语气
  ['铁律：', '硬性原则：'],
  ['收束：', '本阶段验收：'],
  ['训练重点', '学习重点'],
  ['闭环验证', '完整验证'],
  ['测试闭环', '测试完成'],
  ['生态声明不能替代', '生态声明不能代替'],
];

const files = [
  'index.html',
  'scripts/content-days.js',
  'scripts/content-tracks.js',
  'scripts/content-p1-pages.js',
  'scripts/content-p2.js',
  'scripts/content-quiz.js',
  'scripts/site-meta.js',
  'scripts/build-pages.js',
];

let total = 0;
for (const f of files) {
  const p = path.join(root, f);
  let s = fs.readFileSync(p, 'utf8');
  const before = s;
  for (const [a, b] of map) s = s.split(a).join(b);
  if (s !== before) {
    fs.writeFileSync(p, s, 'utf8');
    total++;
    console.log('updated', f);
  }
}
console.log('files changed', total);
