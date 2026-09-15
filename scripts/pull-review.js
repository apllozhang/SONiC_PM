'use strict';
const fs = require('fs');
const path = require('path');
const { connect, execCmd, sftpUpload } = require('./nas-ssh');

const REMOTE = '/vol1/1000/docker/sonic-pm-academy/site/review';
const LOCAL = path.join(__dirname, '..', 'review');

function sftpDownload(conn, remotePath, localPath) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
      sftp.fastGet(remotePath, localPath, (e) => (e ? reject(e) : resolve()));
    });
  });
}

(async () => {
  const conn = await connect();
  try {
    const list = await execCmd(conn, `ls -la ${REMOTE}; echo '---'; find ${REMOTE} -type f`);
    console.log(list.stdout);
    const files = list.stdout.split('\n').filter((l) => l.includes(REMOTE) || /^\S+$/.test(l.trim()));
    // download known files + any found
    const names = new Set(['index.html', '2026-09-15-content-review.md']);
    for (const line of list.stdout.split('\n')) {
      const m = line.match(/(\/vol1\/1000\/docker\/sonic-pm-academy\/site\/review\/\S+)/);
      if (m) names.add(path.basename(m[1]));
    }
    fs.mkdirSync(LOCAL, { recursive: true });
    for (const name of names) {
      const remotePath = `${REMOTE}/${name}`;
      const localPath = path.join(LOCAL, name);
      try {
        await sftpDownload(conn, remotePath, localPath);
        console.log('saved', localPath, fs.statSync(localPath).size);
      } catch (e) {
        console.log('skip', name, e.message);
      }
    }
  } finally { conn.end(); }
})().catch((e) => { console.error(e); process.exit(1); });
