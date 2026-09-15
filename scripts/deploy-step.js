'use strict';
const { connect, execCmd } = require('./nas-ssh');
const REMOTE_DIR = '/vol1/1000/docker/sonic-pm-academy';

function oneLine(cmd) {
  // remote sh -c via JSON.stringify turns \n into 'n' — keep a single line
  return cmd.replace(/\s*\n\s*/g, ' ').trim();
}

(async () => {
  const conn = await connect();
  try {
    const steps = [
      ['replace_site', oneLine(`
cd ${REMOTE_DIR};
tar -czf /tmp/site-old.tgz site;
rm -rf site;
mkdir -p site;
tar -xzf /tmp/sonic-pm-atlas-deploy.tgz -C site;
ls -la site;
ls site/css site/js site/assets
`)],
      ['build', oneLine(`cd ${REMOTE_DIR}; docker compose build`)],
      ['up', oneLine(`
cd ${REMOTE_DIR};
docker compose up -d;
sleep 5;
docker ps --filter name=sonic-pm-academy --format '{{.Names}} {{.Status}} {{.Ports}}';
curl -sS -o /tmp/sonic-home.html -w 'HTTP %{http_code} bytes=%{size_download}' http://127.0.0.1:8788/;
echo;
head -c 500 /tmp/sonic-home.html;
echo;
curl -sS -o /dev/null -w 'health %{http_code}' http://127.0.0.1:8788/health;
echo;
curl -sS -o /dev/null -w 'css %{http_code}' http://127.0.0.1:8788/css/atlas.css;
echo;
curl -sS -o /dev/null -w 'day %{http_code}' http://127.0.0.1:8788/day-01.html;
echo
`)],
    ];
    for (const [label, cmd] of steps) {
      console.log(`\n========== ${label} ==========`);
      console.log(cmd.slice(0, 200));
      const r = await execCmd(conn, cmd, { timeoutMs: 600000 });
      console.log('exit', r.code);
      console.log((r.stdout || '').trim());
      if ((r.stderr || '').trim()) console.log('STDERR:', r.stderr.trim());
      if (r.code !== 0) { console.log('STOP at', label); break; }
    }
  } finally { conn.end(); }
})().catch((e) => { console.error(e); process.exit(1); });
