'use strict';
// Deploy sonic-pm-atlas static site to NAS :8788 (replaces sonic-pm-academy site/)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { connect, execCmd, sftpUpload, CONFIG } = require('./nas-ssh');

const LOCAL = path.join(__dirname, '..');
const REMOTE_DIR = '/vol1/1000/docker/sonic-pm-academy';
const REMOTE_TGZ = '/tmp/sonic-pm-atlas-deploy.tgz';

function pack() {
  const relative = '.deploy-sonic-pm-atlas.tgz';
  const out = path.join(LOCAL, relative);
  if (fs.existsSync(out)) fs.unlinkSync(out);
  const files = [
    'index.html',
    'day-01.html', 'day-02.html', 'day-03.html',
    'track-01.html', 'track-02.html', 'track-03.html',
    'track-04.html', 'track-05.html', 'track-06.html',
    'css', 'js', 'assets',
  ];
  execSync(`tar -czf ${relative} ${files.join(' ')}`, { cwd: LOCAL, stdio: 'pipe' });
  if (!fs.existsSync(out)) throw new Error('pack failed: ' + out);
  console.log('packed', out, (fs.statSync(out).size / 1024).toFixed(1) + ' KB');
  return out;
}

(async () => {
  const localTgz = pack();
  const conn = await connect();
  try {
    console.log('uploading…');
    await sftpUpload(conn, localTgz, REMOTE_TGZ);

    // safety one-shot tar of old site into /tmp only (not kept on volume)
    const script = [
      `set -e`,
      `cd ${REMOTE_DIR}`,
      `tar -czf /tmp/sonic-pm-academy-site-backup-${Date.now()}.tgz site 2>/dev/null || true`,
      `rm -rf site/* site/.[!.]* 2>/dev/null || true`,
      `mkdir -p site`,
      `tar -xzf ${REMOTE_TGZ} -C site`,
      `chown -R node:node site 2>/dev/null || chown -R 1000:1000 site 2>/dev/null || true`,
      `find site -type f | head -30`,
      `echo '--- rebuild ---'`,
      `docker compose build`,
      `docker compose up -d`,
      `sleep 3`,
      `docker ps --filter name=sonic-pm-academy --format '{{.Names}} {{.Status}} {{.Ports}}'`,
      `curl -sS -o /tmp/sonic-home.html -w 'HTTP %{http_code} bytes=%{size_download}\\n' http://127.0.0.1:8788/`,
      `head -c 400 /tmp/sonic-home.html; echo`,
      `curl -sS -o /dev/null -w 'health %{http_code}\\n' http://127.0.0.1:8788/health`,
      `curl -sS -o /dev/null -w 'css %{http_code}\\n' http://127.0.0.1:8788/css/atlas.css`,
      `curl -sS -o /dev/null -w 'day %{http_code}\\n' http://127.0.0.1:8788/day-01.html`,
      `rm -f ${REMOTE_TGZ}`,
    ].join('\n');

    console.log('executing deploy…');
    const r = await execCmd(conn, script, { timeoutMs: 600000 });
    console.log(r.stdout);
    if ((r.stderr || '').trim()) console.log('STDERR:\n' + r.stderr.trim());
    console.log('exit', r.code);
  } finally {
    conn.end();
  }
  // cleanup local tarball
  try { fs.unlinkSync(localTgz); } catch (_) {}
})().catch((e) => { console.error('DEPLOY FAIL', e); process.exit(1); });
