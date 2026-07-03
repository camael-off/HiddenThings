export const PASSIVE_TARGETS = [
  '/robots.txt',
  '/sitemap.xml',
  '/.well-known/security.txt',
  '/.well-known/openid-configuration',
  '/.well-known/change-password',
  '/.well-known/assetlinks.json',
  '/.well-known/apple-app-site-association',
  '/.well-known/pgp-key.txt',
  '/.well-known/gpg-key.txt',
  '/.well-known/keybase.txt',
  '/.well-known/dnt-policy.txt',
  '/.well-known/mta-sts.txt',
  '/.well-known/webfinger',
  '/.well-known/nodeinfo',
  '/.well-known/ai-plugin.json',
  '/.well-known/gpc.json',
  '/.well-known/acme-challenge/',
  '/.well-known/pki-validation/',
  '/.well-known/oauth-authorization-server',
  '/.well-known/webauthn',
  '/.well-known/passkey-endpoints',
  '/.well-known/apple-developer-merchantid-domain-association',
  '/.well-known/microsoft-identity-association.json',
  '/.well-known/host-meta',
  '/.well-known/host-meta.json',
  '/.well-known/matrix/',
  '/.well-known/openpgpkey/hu/',
  '/.well-known/ad-properties',
  '/.well-known/posh',
  '/.well-known/payment-manifest.json',
  '/.well-known/dat',
  '/.well-known/ni/',
  '/.well-known/hosting-provider',
  '/.well-known/gs1-digital-link',
  '/.well-known/hsts',
  '/.well-known/csaf/',
  '/.well-known/security-metadata/',
  '/.well-known/matrix/client',
  '/.well-known/matrix/server',
  '/.well-known/did.json',
  '/.well-known/lnurlp/',
  '/.well-known/nostr.json',
  '/.well-known/atproto-did',
  '/.well-known/scim/',
  '/.well-known/est/',
  '/.well-known/ni/sha-256/',
  '/.well-known/void/',
  '/.well-known/looking-glass/',
  '/.well-known/looking-glass.txt',
  '/.well-known/timezone/',
  '/.well-known/core',
  '/.well-known/coap/',
  '/ads.txt',
  '/humans.txt',
  '/manifest.json',
];

export const ADVANCED_TARGETS = [
  '/.git/',
  '/.git/HEAD',
  '/.git/config',
  '/.git/index',
  '/.git/logs/HEAD',
  '/.git/refs/remotes/',
  '/.git/packed-refs',
  '/.git/hooks/',
  '/.git-credentials',
  '/.gitconfig',
  '/.github/workflows/',
  '/.svn/',
  '/.svn/entries',
  '/.hg/',
  '/.hg/hgrc',
  '/.bzr/',
  '/CVS/',
  '/CVS/Entries',
  '/CVS/Repository',
  '/.gitignore',

  '/.env',
  '/.env.local',
  '/.env.production',
  '/.env.bak',
  '/.env.example',
  '/.env.test',
  '/.env.dev',
  '/.aws/credentials',
  '/.aws/config',
  '/.azure/',
  '/.gcloud/',
  '/.kube/config',
  '/.vault-token',
  '/.npmrc',
  '/.npmrc.bak',
  '/.pypirc',
  '/.yarnrc',
  '/.docker/config.json',
  '/.dockercfg',
  '/id_rsa',
  '/id_rsa.pub',
  '/id_rsa.bak',
  '/id_rsa.old',
  '/id_dsa',
  '/id_ed25519',
  '/authorized_keys',
  '/.ssh/authorized_keys',
  '/.ssh/config',
  '/.ssh/known_hosts',
  '/server.key',
  '/server.crt',
  '/server.csr',
  '/domain.key',
  '/cert.pem',
  '/key.pem',
  '/privkey.pem',
  '/cacert.pem',
  '/bundle.crt',
  '/.pfx',
  '/.p12',
  '/.pkcs12',
  '/config/jwt/',
  '/config/jwt/private.pem',
  '/config/jwt/public.pem',
  '/.anyconnect',
  '/.ovpn',
  '/.openvpn/',

  '/config.json',
  '/config.php',
  '/configuration.php',
  '/config.yml',
  '/config.xml',
  '/secrets.yml',
  '/credentials.json',
  '/sftp-config.json',
  '/.ftppass',
  '/.remote-sync.json',
  '/deployment-config.json',
  '/.elasticbeanstalk/',
  '/.serverless/',
  '/.bclogs/',
  '/.dbeaver/',
  '/.filezilla/',
  '/filezilla.xml',
  '/recentservers.xml',

  '/package.json',
  '/package-lock.json',
  '/composer.json',
  '/composer.lock',
  '/yarn.lock',
  '/Gemfile',
  '/requirements.txt',
  '/Cargo.toml',
  '/pom.xml',
  '/build.gradle',
  '/Dockerfile',
  '/docker-compose.yml',
  '/.dockercompose.yml',
  '/WEB-INF/web.xml',
  '/WEB-INF/config.xml',
  '/META-INF/',
  '/META-INF/maven/',

  '/security.txt',
  '/.well-known/security.txt.bak',
  '/.well-known/security.txt.old',
  '/web.config',
  '/.htaccess',
  '/.htpasswd',
  '/nginx.conf',
  '/httpd.conf',
  '/phpinfo.php',
  '/info.php',
  '/test.php',
  '/status.html',
  '/server-status',
  '/server-info',
  '/elmah.axd',
  '/trace.axd',
  '/crossdomain.xml',
  '/clientaccesspolicy.xml',
  '/phpmyadmin/',
  '/pma/',
  '/adminer.php',

  '/wp-config.php',
  '/wp-config.php.bak',
  '/wp-json/',
  '/wp-json/wp/v2/users',
  '/wp-content/uploads/',
  '/wp-content/plugins/',
  '/wp-content/debug.log',
  '/wp-admin/',
  '/xmlrpc.php',
  '/admin/',
  '/administrator/',
  '/cpanel/',
  '/dashboard/',
  '/login.php',

  '/backup.zip',
  '/backup.sql',
  '/backup.tar.gz',
  '/dump.sql',
  '/database.sql',
  '/db.sqlite',
  '/site.zip',
  '/www.zip',
  '/.DS_Store',
  '/Thumbs.db',
  '/.idea/',
  '/.idea/workspace.xml',
  '/.vscode/',
  '/.vscode/settings.json',
  '/.history/',
  '/.bak/',
  '/.old/',
  '/.temp/',
  '/.tmp/',
  '/.swap/',
  '/.swp',
  '/.local/share/',
  '/.config/',
  '/.bash_history',
  '/.bashrc',
  '/.zsh_history',
  '/.ash_history',
  '/.viminfo',
  '/.mysql_history',
  '/.psql_history',
  '/.nano_history',
  '/.lesshst',
  '/.python_history',
  '/.node_repl_history',
  '/.sqlite_history',
  '/.tftp_history',

  '/actuator/',
  '/actuator/health',
  '/actuator/env',
  '/actuator/heapdump',
  '/actuator/mappings',
  '/actuator/beans',
  '/actuator/configprops',
  '/actuator/threaddump',
  '/actuator/loggers',
  '/debug/pprof/',
  '/debug/vars',
  '/metrics',
  '/prometheus',
  '/core',
  '/heapdump',
  '/jmx-console/',
  '/solr/',
  '/v1/kv/',
  '/v1/sys/init',
  '/api/v1/user/',
  '/api/v2/user/',
  '/api/v1/auth/',
  '/api/v1/debug/',
  '/api/v1/console/',
  '/api-docs',
  '/v1/api-docs',
  '/v2/api-docs',
  '/swagger.json',
  '/swagger-ui.html',
  '/graphql',
  '/graphiql',
  '/console',

  '/error_log',
  '/error.log',
  '/access_log',
  '/access.log',
  '/debug.log',
  '/ws_ftp.log',
  '/ftp.log',
  '/sql.log',
  '/mysql.log',
  '/postgres.log',
  '/laravel.log',
  '/application.log',
  '/system.log',
  '/syslog',
  '/auth.log',
  '/cron.log',
];

const DEFAULT_TIMEOUT_MS = 3000;

async function probe(url, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      credentials: 'omit',
      cache: 'no-store',
    });

    if (response.status === 403 || response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        credentials: 'omit',
        cache: 'no-store',
      });
    }

    const contentLength = response.headers.get('content-length');
    return {
      url,
      found: response.ok,
      status: response.status,
      contentLength: contentLength ? Number(contentLength) : null,
      error: null,
      response,
    };
  } catch (err) {
    const reason = err.name === 'AbortError' ? 'timeout' : 'network';
    return { url, found: false, status: null, contentLength: null, error: reason, response: null };
  } finally {
    clearTimeout(timer);
  }
}

export async function checkPath(origin, path, options = {}) {
  const { response, ...result } = await probe(origin + path, options);
  return { path, ...result };
}

export async function checkUrl(url, options = {}) {
  const { response, ...result } = await probe(url, options);
  return result;
}

function randomToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function matchesBaseline(result, baseline) {
  if (!baseline.found || result.status !== baseline.status) return false;
  if (result.contentLength == null || baseline.contentLength == null) return true;

  const diff = Math.abs(result.contentLength - baseline.contentLength);
  const tolerance = Math.max(32, baseline.contentLength * 0.02);
  return diff <= tolerance;
}

export async function scanTargets(origin, targets, options = {}) {
  const filePath = `/hiddenthings-${randomToken()}-probe`;
  const dirPath = `/hiddenthings-${randomToken()}-probe/`;

  const [baselineFile, baselineDir, ...results] = await Promise.all([
    checkPath(origin, filePath, options),
    checkPath(origin, dirPath, options),
    ...targets.map((path) => checkPath(origin, path, options)),
  ]);

  return results.map((result) => {
    if (!result.found) return result;
    const baseline = result.path.endsWith('/') ? baselineDir : baselineFile;
    return matchesBaseline(result, baseline) ? { ...result, found: false } : result;
  });
}

export function parseRobotsTxt(text, origin) {
  const paths = new Set();
  for (const line of text.split(/\r?\n/)) {
    const rule = line.match(/^\s*(?:Disallow|Allow)\s*:\s*(\S+)/i);
    if (rule) {
      const p = rule[1].split('?')[0];
      if (p.startsWith('/') && p !== '/' && !p.includes('*')) paths.add(p);
      continue;
    }
    const sitemap = line.match(/^\s*Sitemap\s*:\s*(\S+)/i);
    if (sitemap) {
      try {
        const u = new URL(sitemap[1], origin);
        if (u.origin === origin) paths.add(u.pathname);
      } catch {}
    }
  }
  return [...paths].slice(0, 40);
}
