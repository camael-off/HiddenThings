import { PASSIVE_TARGETS, scanTargets } from '../lib/scanner.js';

const CACHE_TTL_MS = 5 * 60 * 1000;

function getOrigin(urlString) {
  try {
    const u = new URL(urlString);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.origin;
  } catch {
    return null;
  }
}

function cacheKey(origin) {
  return `scan:${origin}`;
}

async function getCachedScan(origin) {
  const key = cacheKey(origin);
  const data = await chrome.storage.session.get(key);
  return data[key] ?? null;
}

async function setCachedScan(origin, results) {
  await chrome.storage.session.set({
    [cacheKey(origin)]: { timestamp: Date.now(), results },
  });
}

async function shouldRescan(origin) {
  const cached = await getCachedScan(origin);
  return !cached || Date.now() - cached.timestamp > CACHE_TTL_MS;
}

async function isAutoScanEnabled() {
  const { autoScanEnabled = true } = await chrome.storage.local.get('autoScanEnabled');
  return autoScanEnabled;
}

function updateBadge(tabId, foundCount) {
  chrome.action.setBadgeText({ tabId, text: foundCount > 0 ? String(foundCount) : '' });
  chrome.action.setBadgeBackgroundColor({
    tabId,
    color: foundCount > 0 ? '#22c55e' : '#6b7280',
  });
}

async function runPassiveScan(tabId, origin) {
  const results = await scanTargets(origin, PASSIVE_TARGETS);
  await setCachedScan(origin, results);
  updateBadge(tabId, results.filter((r) => r.found).length);
  return results;
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete' || !tab.url) return;

  const origin = getOrigin(tab.url);
  if (!origin) return;
  if (!(await isAutoScanEnabled())) return;
  if (!(await shouldRescan(origin))) return;

  runPassiveScan(tabId, origin).catch((err) =>
    console.error('[HiddenThings] scan failed for', origin, err)
  );
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  const origin = tab.url ? getOrigin(tab.url) : null;
  if (!origin) {
    updateBadge(tabId, 0);
    return;
  }

  const cached = await getCachedScan(origin);
  updateBadge(tabId, cached ? cached.results.filter((r) => r.found).length : 0);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'GET_CACHED_RESULTS') {
    getCachedScan(message.origin).then((cached) => sendResponse(cached ? cached.results : null));
    return true;
  }

  if (message?.type === 'RUN_PASSIVE_SCAN') {
    runPassiveScan(message.tabId, message.origin)
      .then((results) => sendResponse(results))
      .catch((err) => sendResponse({ error: String(err) }));
    return true;
  }
});
