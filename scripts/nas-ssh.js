'use strict';
const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');

// 口令不入库：优先 NAS_PASSWORD，其次仓库外的 10.20.30.203.txt
function resolvePassword() {
  if (process.env.NAS_PASSWORD) return process.env.NAS_PASSWORD;
  const candidates = [
    'F:\\AIwork\\10.20.30.203.txt',
    path.join(__dirname, '..', '..', '10.20.30.203.txt'),
  ];
  for (const p of candidates) {
    try {
      const text = fs.readFileSync(p, 'utf8');
      const m = text.match(/password\s*[:：]\s*(\S+)/i);
      if (m) return m[1];
    } catch (_) {}
  }
  throw new Error('缺少 NAS 口令：请设置 NAS_PASSWORD，或提供 F:/AIwork/10.20.30.203.txt');
}

const CONFIG = {
  host: process.env.NAS_HOST || '10.20.30.203',
  port: Number(process.env.NAS_PORT || 22),
  username: process.env.NAS_USER || 'alec',
  password: resolvePassword(),
};

function connect() {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn.on('ready', () => resolve(conn));
    conn.on('error', reject);
    conn.connect({ ...CONFIG, readyTimeout: 20000 });
  });
}

function execCmd(conn, command, { sudoPassword = CONFIG.password, timeoutMs = 120000 } = {}) {
  // JSON.stringify 的 \n 会被远端 sh 吃成字母 n，改用 base64 传脚本
  const b64 = Buffer.from(command, 'utf8').toString('base64');
  const remote = `echo ${b64} | base64 -d | sh`;
  return new Promise((resolve, reject) => {
    conn.exec(`sudo -S -p '' -- sh -c ${JSON.stringify(remote)}`, (err, stream) => {
      if (err) return reject(err);
      let stdout = '', stderr = '';
      const timer = setTimeout(() => stream.close(), timeoutMs);
      stream.on('close', (code) => { clearTimeout(timer); resolve({ code, stdout, stderr }); })
        .on('data', (d) => { stdout += d; });
      stream.stderr.on('data', (d) => { stderr += d; });
      stream.stdin.write(`${sudoPassword}\n`);
      stream.stdin.end();
    });
  });
}

function sftpUpload(conn, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      sftp.fastPut(localPath, remotePath, (e) => (e ? reject(e) : resolve()));
    });
  });
}

module.exports = { connect, execCmd, sftpUpload, CONFIG };
