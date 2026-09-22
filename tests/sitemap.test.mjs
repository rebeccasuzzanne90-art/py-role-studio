import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getSitemapContent } from '../lib/sitemap-content.ts';

test('includes current MDX pages, four payroll services and all six articles', () => {
 const entries=getSitemapContent(path.resolve('content'),'https://www.thepayrollstudio.com.au');
 assert.equal(entries.filter(e=>e.path.startsWith('/services/')).length,4);
 assert.equal(entries.filter(e=>e.path.startsWith('/blog/')).length,6);
 assert.ok(entries.some(e=>e.path==='/'));
 assert.ok(entries.some(e=>e.path==='/about'));
 assert.ok(!entries.some(e=>e.path==='/services/hipaa'));
});
test('discovers new nested content and excludes noindex, private and noncanonical pages', () => {
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'payroll-sitemap-'));
 try {
  for(const [file,data] of Object.entries({
   'pages/new/nested.mdx':'title: New',
   'pages/hidden.mdx':'seo:\n  noIndex: true',
   'pages/admin/internal.mdx':'title: Private',
   'pages/duplicate.mdx':'seo:\n  canonicalUrl: https://example.com/other',
   'blog/posts/new-post.mdx':'publishDate: "2026-01-02"',
  })) {
   fs.mkdirSync(path.dirname(path.join(dir,file)),{recursive:true});
   fs.writeFileSync(path.join(dir,file),`---\n${data}\n---\nBody`);
  }
  const entries=getSitemapContent(dir,'https://example.com');
  assert.deepEqual(entries.map(e=>e.path).sort(),['/blog/new-post','/new/nested']);
  assert.equal(entries.find(e=>e.path==='/blog/new-post').lastModified,'2026-01-02T00:00:00.000Z');
 } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
