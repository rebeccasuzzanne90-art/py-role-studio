import { readFile } from 'node:fs/promises';

const origin = 'https://www.thepayrollstudio.com.au';
const keyFile = 'b614963744914af08a92cfca943fa940.txt';
const key = (await readFile(new URL(`../public/${keyFile}`, import.meta.url), 'utf8')).trim();
const keyLocation = `${origin}/${keyFile}`;
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const supplied = args.filter(arg => arg !== '--dry-run');
if (!supplied.length) throw new Error('Supply changed URL paths, or --sitemap for the initial public-page submission. Add --dry-run to inspect without submitting.');

async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(90_000) });
  if (!response.ok) throw new Error(`GET ${url}: HTTP ${response.status}`);
  return response.text();
}

let paths = supplied;
if (supplied.length === 1 && supplied[0] === '--sitemap') {
  const xml = await get(`${origin}/sitemap.xml`);
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&'));
  // The audit identified placeholder offers and an empty resource listing.
  // They remain on the site but should not be promoted by the initial submission.
  paths = paths.filter(value => !/^\/(shop(?:\/|$)|resources\/?$)/.test(new URL(value).pathname));
}
const urlList = [...new Set(paths.map(value => {
  const url = new URL(value, origin);
  if (url.origin !== origin || url.username || url.password || /^\/(admin|portal|api)(\/|$)/.test(url.pathname)) {
    throw new Error(`Not an approved public site URL: ${value}`);
  }
  if (url.search || url.hash) throw new Error('Use canonical URLs without query strings or fragments.');
  return url.href;
}))];
if (!urlList.length || urlList.length > 10_000) throw new Error('Supply 1–10,000 URLs.');
console.log(JSON.stringify({ host: new URL(origin).host, urlList, dryRun }, null, 2));
if (!dryRun) {
  if ((await get(keyLocation)).trim() !== key) throw new Error('The live IndexNow verification file does not match. Deploy it first.');
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(90_000),
  });
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}: ${await response.text()}`);
  console.log(`IndexNow HTTP ${response.status}: ${response.status === 200 ? 'URLs received' : 'URLs received; key validation pending'}. This does not guarantee indexing.`);
}
