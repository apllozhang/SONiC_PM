'use strict';
// 一键部署：打包 → SFTP 上传 → 替换 site/ → 镜像重建 → 容器重建 → 健康检查
// 用法：NODE_PATH=../nvci-lite/node_modules node scripts/deploy-nas.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { connect, execCmd, sftpUpload } = require('./nas-ssh');

const LOCAL = path.join(__dirname, '..');
const REMOTE_DIR = process.env.NAS_SITE_DIR || '/vol1/1000/docker/sonic-pm-academy';
const REMOTE_TGZ = '/tmp/sonic-pm-atlas-deploy.tgz';
const CONTAINER = 'sonic-pm-academy';
const PORT = 8788;

const RUNTIME_FILES = [
  'index.html',
  'day-01.html', 'day-02.html', 'day-03.html',
  'track-01.html', 'track-02.html', 'track-03.html',
  'track-04.html', 'track-05.html', 'track-06.html',
  'glossary.html', 'checklist.html', 'cases.html',
  'css', 'js', 'assets',
];

function step(name, fn) {
  console.log(`\n[${name}]`);
  return fn();
}

function pack() {
  const relative = '.deploy-sonic-pm-atlas.tgz';
  const out = path.join(LOCAL, relative);
  if (fs.existsSync(out)) fs.unlinkSync(out);
  // cwd=LOCAL，避免路径空格导致 tar 失败
  execSync(`tar -czf ${relative} ${RUNTIME_FILES.join(' ')}`, { cwd: LOCAL, stdio: 'pipe' });
  if (!fs.existsSync(out)) throw new Error('打包失败: ' + out);
  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`本地包 ${out}（${kb} KB）`);
  return out;
}

async function must(conn, label, script, timeoutMs = 600000) {
  const r = await execCmd(conn, script, { timeoutMs });
  console.log((r.stdout || '').trim());
  if ((r.stderr || '').trim()) console.log('stderr:', r.stderr.trim());
  if (r.code !== 0) throw new Error(`${label} 失败 exit=${r.code}`);
  return r;
}

(async () => {
  const localTgz = step('打包', pack);

  const conn = await step('连接', () => connect());
  try {
    await step('上传', () => sftpUpload(conn, localTgz, REMOTE_TGZ).then(() => {
      console.log(`已上传 → ${REMOTE_TGZ}`);
    }));

    await step('替换 site/', () => must(conn, 'replace', `
set -e
cd "${REMOTE_DIR}"
test -f docker-compose.yml
test -f Dockerfile
tar -czf /tmp/sonic-pm-academy-site-prev.tgz site 2>/dev/null || true
rm -rf site
mkdir -p site
tar -xzf "${REMOTE_TGZ}" -C site
chown -R 1000:1000 site 2>/dev/null || true
echo "site 文件数: $(find site -type f | wc -l)"
ls site | head
`));

    await step('构建镜像', () => must(conn, 'build', `
set -e
cd "${REMOTE_DIR}"
docker compose build
`));

    await step('重建容器', () => must(conn, 'up', `
set -e
cd "${REMOTE_DIR}"
docker rm -f "${CONTAINER}" 2>/dev/null || true
docker compose up -d
sleep 6
docker ps --filter name="${CONTAINER}" --format '{{.Names}} {{.Image}} {{.Status}} {{.Ports}}'
`));

    await step('验收', () => must(conn, 'verify', `
set -e
curl -sS -o /tmp/sonic-home.html -w 'HOME %{http_code} bytes=%{size_download}\\n' http://127.0.0.1:${PORT}/
grep -q 'primary-nav' /tmp/sonic-home.html
grep -q 'css/atlas.css' /tmp/sonic-home.html
! grep -q '__manus__' /tmp/sonic-home.html
curl -sS -o /dev/null -w 'health %{http_code}\\n' http://127.0.0.1:${PORT}/health
curl -sS -o /dev/null -w 'css %{http_code}\\n' http://127.0.0.1:${PORT}/css/atlas.css
curl -sS -o /dev/null -w 'js %{http_code}\\n' http://127.0.0.1:${PORT}/js/app.js
curl -sS -o /dev/null -w 'day %{http_code}\\n' http://127.0.0.1:${PORT}/day-01.html
curl -sS -o /dev/null -w 'track %{http_code}\\n' http://127.0.0.1:${PORT}/track-01.html
rm -f "${REMOTE_TGZ}"
echo OK
`));

    console.log(`\n部署完成：http://${CONFIG_HOST()}:${PORT}/`);
  } finally {
    conn.end();
    try { fs.unlinkSync(localTgz); } catch (_) {}
  }
})().catch((e) => {
  console.error('\nDEPLOY FAIL:', e.message || e);
  process.exit(1);
});

function CONFIG_HOST() {
  return process.env.NAS_HOST || '10.20.30.203';
}
