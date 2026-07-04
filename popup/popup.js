import { ADVANCED_TARGETS, scanTargets, checkUrl } from "../lib/scanner.js";

const originEl = document.getElementById("targetOrigin");
const resultsEl = document.getElementById("resultsList");
const toggleEl = document.getElementById("autoScanToggle");
const manualBtn = document.getElementById("manualScanBtn");
const statusEl = document.getElementById("statusText");
const advancedToggleEl = document.getElementById("advancedScanToggle");
const advancedResultsEl = document.getElementById("advancedResults");
const themeToggleEl = document.getElementById("themeToggle");
const settingsToggleEl = document.getElementById("settingsToggle");
const settingsPanelEl = document.getElementById("settingsPanel");
const fontSizeSelectEl = document.getElementById("fontSizeSelect");
const accentColorInputEl = document.getElementById("accentColorInput");
const popupSizeSelectEl = document.getElementById("popupSizeSelect");
const sourceMapToggleEl = document.getElementById("sourceMapScanToggle");
const sourceMapResultsEl = document.getElementById("sourceMapResults");
const customToggleEl = document.getElementById("customScanToggle");
const customBodyEl = document.getElementById("customBody");
const customResultsEl = document.getElementById("customResults");
const customTextareaEl = document.getElementById("customTargetsTextarea");
const saveCustomBtn = document.getElementById("saveCustomBtn");

const DEFAULT_ACCENT = "#811e1e";

let currentTabId = null;
let currentOrigin = null;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggleEl.textContent = theme === "light" ? "☀" : "☾";
}

themeToggleEl.addEventListener("click", async () => {
  const next =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
  await chrome.storage.local.set({ theme: next });
});

settingsToggleEl.addEventListener("click", () => {
  settingsPanelEl.classList.toggle("hidden");
});

function applyFontSize(size) {
  document.documentElement.dataset.fontsize = size;
  fontSizeSelectEl.value = size;
}

fontSizeSelectEl.addEventListener("change", async () => {
  const size = fontSizeSelectEl.value;
  applyFontSize(size);
  await chrome.storage.local.set({ fontSize: size });
});

function applyPopupSize(size) {
  document.documentElement.dataset.size = size;
  popupSizeSelectEl.value = size;
}

popupSizeSelectEl.addEventListener("change", async () => {
  const size = popupSizeSelectEl.value;
  applyPopupSize(size);
  await chrome.storage.local.set({ popupSize: size });
});

function lighten(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function applyAccentColor(hex) {
  document.documentElement.style.setProperty("--accent-color", hex);
  document.documentElement.style.setProperty(
    "--accent-hover",
    lighten(hex, 90),
  );
  accentColorInputEl.value = hex;
}

accentColorInputEl.addEventListener("input", async () => {
  const hex = accentColorInputEl.value;
  applyAccentColor(hex);
  await chrome.storage.local.set({ accentColor: hex });
});

function originFromUrl(urlString) {
  try {
    const u = new URL(urlString);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.origin;
  } catch {
    return null;
  }
}

function renderRow(result) {
  const row = document.createElement("div");
  row.className = "result-row";

  const link = document.createElement("a");
  link.className = "result-path";
  link.href = result.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.title = result.url;
  link.textContent = result.path;

  const downloadBtn = document.createElement("button");
  downloadBtn.type = "button";
  downloadBtn.className = "dl-btn";
  downloadBtn.title = "Download";
  downloadBtn.textContent = "⬇";
  downloadBtn.addEventListener("click", () => {
    chrome.downloads.download({ url: result.url });
  });

  const actions = document.createElement("div");
  actions.className = "result-actions";
  actions.append(downloadBtn);

  row.append(link, actions);
  return row;
}

function renderInto(container, results) {
  container.innerHTML = "";
  if (!results) return;

  const found = results.filter((r) => r.found);
  if (found.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-hint";
    empty.textContent = "Nothing found.";
    container.appendChild(empty);
    return;
  }
  for (const result of found) container.appendChild(renderRow(result));
}

function renderResults(results) {
  renderInto(resultsEl, results);
}

async function runAdvancedScan() {
  if (!currentOrigin) return;
  advancedResultsEl.classList.remove("hidden");
  renderInto(advancedResultsEl, null);
  const results = await scanTargets(currentOrigin, ADVANCED_TARGETS);
  renderInto(advancedResultsEl, results);
}

async function getScriptUrls(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => Array.from(document.querySelectorAll("script[src]")).map((s) => s.src),
  });
  return [...new Set(result)].slice(0, 30);
}

async function runSourceMapScan() {
  if (!currentOrigin || currentTabId == null) return;
  sourceMapResultsEl.classList.remove("hidden");
  renderInto(sourceMapResultsEl, null);

  const scripts = await getScriptUrls(currentTabId);
  const results = await Promise.all(
    scripts.map(async (src) => {
      const mapUrl = src + ".map";
      const check = await checkUrl(mapUrl);
      return { path: src.replace(currentOrigin, "") + ".map", url: mapUrl, found: check.found, status: check.status };
    }),
  );
  renderInto(sourceMapResultsEl, results);
}

function normalizeCustomTargets(text) {
  return [
    ...new Set(
      text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => (line.startsWith("/") ? line : "/" + line)),
    ),
  ];
}

async function runCustomScan() {
  if (!currentOrigin) return;
  const { customTargets = [] } = await chrome.storage.local.get("customTargets");
  customResultsEl.classList.remove("hidden");
  if (customTargets.length === 0) {
    renderInto(customResultsEl, []);
    return;
  }
  renderInto(customResultsEl, null);
  const results = await scanTargets(currentOrigin, customTargets);
  renderInto(customResultsEl, results);
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) {
    statusEl.textContent = "Can't scan this page";
    return;
  }

  currentTabId = tab.id;
  currentOrigin = tab.url ? originFromUrl(tab.url) : null;

  const {
    autoScanEnabled = true,
    advancedScanEnabled = false,
    theme = "dark",
    fontSize = "normal",
    popupSize = "normal",
    accentColor = DEFAULT_ACCENT,
    sourceMapEnabled = false,
    customScanEnabled = false,
    customTargets = [],
  } = await chrome.storage.local.get([
    "autoScanEnabled",
    "advancedScanEnabled",
    "theme",
    "fontSize",
    "popupSize",
    "accentColor",
    "sourceMapEnabled",
    "customScanEnabled",
    "customTargets",
  ]);
  toggleEl.checked = autoScanEnabled;
  advancedToggleEl.checked = advancedScanEnabled;
  sourceMapToggleEl.checked = sourceMapEnabled;
  customToggleEl.checked = customScanEnabled;
  customBodyEl.classList.toggle("hidden", !customScanEnabled);
  customTextareaEl.value = customTargets.join("\n");
  applyTheme(theme);
  applyFontSize(fontSize);
  applyPopupSize(popupSize);
  applyAccentColor(accentColor);

  if (!currentOrigin) {
    originEl.textContent = "Can't scan this page (chrome://, local file…)";
    renderResults(null);
    statusEl.textContent = "—";
    manualBtn.classList.add("hidden");
    advancedToggleEl.disabled = true;
    sourceMapToggleEl.disabled = true;
    customToggleEl.disabled = true;
    return;
  }

  originEl.textContent = currentOrigin;
  manualBtn.classList.remove("hidden");
  advancedToggleEl.disabled = false;
  sourceMapToggleEl.disabled = false;
  customToggleEl.disabled = false;

  if (advancedScanEnabled) runAdvancedScan();
  if (sourceMapEnabled) runSourceMapScan();
  if (customScanEnabled) runCustomScan();

  const cached = await chrome.runtime.sendMessage({
    type: "GET_CACHED_RESULTS",
    origin: currentOrigin,
  });

  if (cached) {
    renderResults(cached);
    statusEl.textContent = "";
    return;
  }

  renderResults(null);
  statusEl.textContent = "Scanning…";
  const results = await chrome.runtime.sendMessage({
    type: "RUN_PASSIVE_SCAN",
    tabId: currentTabId,
    origin: currentOrigin,
  });

  if (!results || results.error) {
    statusEl.textContent = "Scan failed";
    return;
  }
  renderResults(results);
  statusEl.textContent = "";
}

toggleEl.addEventListener("change", async () => {
  const enabled = toggleEl.checked;
  await chrome.storage.local.set({ autoScanEnabled: enabled });
  statusEl.textContent = enabled
    ? "Auto scan enabled"
    : "Auto scan disabled";
});

manualBtn.addEventListener("click", async () => {
  if (!currentOrigin || currentTabId == null) return;

  manualBtn.disabled = true;
  statusEl.textContent = "Scanning…";
  renderResults(null);

  const results = await chrome.runtime.sendMessage({
    type: "RUN_PASSIVE_SCAN",
    tabId: currentTabId,
    origin: currentOrigin,
  });

  manualBtn.disabled = false;

  if (!results || results.error) {
    statusEl.textContent = "Scan failed";
    return;
  }

  renderResults(results);
  statusEl.textContent = "";
});

advancedToggleEl.addEventListener("change", async () => {
  const enabled = advancedToggleEl.checked;
  await chrome.storage.local.set({ advancedScanEnabled: enabled });
  if (enabled) {
    runAdvancedScan();
  } else {
    advancedResultsEl.classList.add("hidden");
    advancedResultsEl.innerHTML = "";
  }
});

sourceMapToggleEl.addEventListener("change", async () => {
  const enabled = sourceMapToggleEl.checked;
  await chrome.storage.local.set({ sourceMapEnabled: enabled });
  if (enabled) {
    runSourceMapScan();
  } else {
    sourceMapResultsEl.classList.add("hidden");
    sourceMapResultsEl.innerHTML = "";
  }
});

customToggleEl.addEventListener("change", async () => {
  const enabled = customToggleEl.checked;
  await chrome.storage.local.set({ customScanEnabled: enabled });
  customBodyEl.classList.toggle("hidden", !enabled);
  if (enabled) {
    runCustomScan();
  } else {
    customResultsEl.classList.add("hidden");
    customResultsEl.innerHTML = "";
  }
});

saveCustomBtn.addEventListener("click", async () => {
  const targets = normalizeCustomTargets(customTextareaEl.value);
  customTextareaEl.value = targets.join("\n");
  await chrome.storage.local.set({ customTargets: targets });
  if (customToggleEl.checked) runCustomScan();
});

init();
