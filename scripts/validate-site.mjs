import { readFile, stat } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'node:fs/promises';

const root = fileURLToPath(new URL('..', import.meta.url));
const ignored = new Set(['placeholder.html', '404.html']);
const files = [];
for await (const file of glob('**/*.html', { cwd: root, exclude: ['.git/**'] })) {
  if (!ignored.has(file)) files.push(file);
}

const errors = [];
const routes = new Set(['/']);
const expectedWufooForms = new Map([
  ['daycare/assessment.html', 'm1hfxeyx169hbq7'],
  ['reservations/boarding/new.html', 'zecci530h92lbb'],
  ['reservations/boarding/existing.html', 'r1nr665w10ivpwi'],
  ['reservations/grooming/new.html', 'w1v8c0qr1u43zus'],
  ['reservations/grooming/existing.html', 'p4bkaoh1c7olms'],
]);
const expectedReleasePages = new Map([
  ['daycare/assessment.html', 'Jollytails Doggy Daycare Inc., a Nova Scotia Corporation'],
  ['reservations/boarding/new.html', 'Jollytails Resort, a Nova Scotia Corporation'],
]);
for (const file of files) {
  const route = file === 'index.html' ? '/' : `/${file.replace(/\.html$/, '')}`;
  routes.add(route);
}

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

for (const file of files) {
  const html = await readFile(join(root, file), 'utf8');
  const h1s = html.match(/<h1\b/g) || [];
  if (h1s.length !== 1) errors.push(`${file}: expected 1 H1, found ${h1s.length}`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${file}: missing title`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) errors.push(`${file}: missing description`);
  if (!/<meta name="robots" content="noindex, nofollow, noarchive">/.test(html)) errors.push(`${file}: missing noindex metadata`);
  if (!/<link rel="canonical" href="https:\/\/jollytailsresort\.ca\//.test(html)) errors.push(`${file}: missing production canonical architecture`);

  const expectedWufooHash = expectedWufooForms.get(file);
  if (expectedWufooHash) {
    const embeddedHashes = [...html.matchAll(/'formHash':'([^']+)'/g)].map(([, hash]) => hash);
    if (embeddedHashes.length !== 1 || embeddedHashes[0] !== expectedWufooHash) {
      errors.push(`${file}: expected Wufoo form ${expectedWufooHash}, found ${embeddedHashes.join(', ') || 'none'}`);
    }
    if (!html.includes(`https://jollytailsresort.wufoo.com/forms/${expectedWufooHash}/`)) {
      errors.push(`${file}: missing direct Wufoo fallback link for ${expectedWufooHash}`);
    }
  }

  const expectedReleaseOrganization = expectedReleasePages.get(file);
  const releaseBlock = html.match(/<article class="release-card">([\s\S]*?)<\/article>/);
  if (expectedReleaseOrganization) {
    if (!releaseBlock) {
      errors.push(`${file}: missing release, waiver of liability, and indemnification`);
    } else {
      const releaseParagraphs = releaseBlock[1].match(/<p>/g) || [];
      if (releaseParagraphs.length !== 11) errors.push(`${file}: expected 11 release paragraphs, found ${releaseParagraphs.length}`);
      if (!releaseBlock[1].includes(expectedReleaseOrganization)) errors.push(`${file}: release has the wrong organization wording`);
    }
  } else if (releaseBlock) {
    errors.push(`${file}: unexpected release content`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/.test(value)) continue;
    if (value.startsWith('/assets/') || /\.(?:css|js|png|jpe?g|webp|svg)$/.test(value)) {
      const assetPath = value.startsWith('/') ? join(root, value.slice(1)) : join(dirname(join(root, file)), value);
      if (!await exists(assetPath)) errors.push(`${file}: missing asset ${value}`);
      continue;
    }
    if (value.startsWith('/')) {
      const route = value.split(/[?#]/)[0].replace(/\/$/, '') || '/';
      if (!routes.has(route)) errors.push(`${file}: missing route ${route}`);
      continue;
    }
    const local = join(dirname(join(root, file)), value.split(/[?#]/)[0]);
    if (!await exists(local)) errors.push(`${file}: missing local file ${relative(root, local)}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} HTML pages: metadata, H1s, internal routes, assets, noindex, Wufoo mappings, and required releases are present.`);
}
