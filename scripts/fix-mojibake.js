'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function tryFix(s) {
  // UTF-8 bytes misread as latin1/binary then stored as UTF-8
  const a = Buffer.from(s, 'binary').toString('utf8');
  if (!a.includes('�') && /[\u4e00-\u9fff]{4,}/.test(a)) {
    const sample = a.match(/[\u4e00-\u9fff]{6,}/);
    if (sample && !/鍏|鎴|閾|鏂|璺/.test(sample[0])) return a;
  }
  // UTF-8 bytes misread as gbk then stored — harder; try win1252
  try {
    const b = Buffer.from(s, 'latin1').toString('utf8');
    if (!b.includes('�') && /[\u4e00-\u9fff]{4,}/.test(b)) {
      const sample = b.match(/[\u4e00-\u9fff]{6,}/);
      if (sample && !/鍏|鎴|閾|鏂|璺/.test(sample[0])) return b;
    }
  } catch (_) {}
  return null;
}

const files = fs.readdirSync(root).filter((f) => f.endsWith('.html'));
for (const f of files) {
  const p = path.join(root, f);
  const s = fs.readFileSync(p, 'utf8');
  const bad = /鍏|鎴|閾|鏂|璺|鍙|缁|璁/.test(s);
  console.log(f, bad ? 'MOJIBAKE' : 'ok');
  if (!bad) continue;
  const fixed = tryFix(s);
  if (fixed) {
    const still = /鍏|鎴|閾|鏂|璺/.test(fixed);
    console.log('  ->', still ? 'still bad' : 'FIXED', fixed.slice(0, 80).replace(/\n/g, ' '));
    if (!still) fs.writeFileSync(p, fixed, 'utf8');
  } else {
    console.log('  -> cannot auto-fix');
  }
}
