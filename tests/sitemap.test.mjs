import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getSitemapContent } from '../lib/sitemap-content.ts';

test('includes current MDX pages, six payroll services and the current article collection', () => {
 const entries=getSitemapContent(path.resolve('content'),'https://www.thepayrollstudio.com.au');
 assert.equal(entries.filter(e=>e.path.startsWith('/services/')).length,6);
 const expectedArticles = [
  'modern-award-interpretation-mistakes', 'payroll-accountability-hr-finance',
  'payroll-compliance', 'payroll-governance', 'payroll-governance-capability-uplift',
  'payroll-governance-training-guide', 'payroll-governed-or-managed',
  'payroll-in-the-boardroom', 'payroll-model-inhouse-outsourced-hybrid',
  'payroll-remediation', 'payroll-remediation/checklist',
  'payroll-remediation/employee-communications', 'payroll-remediation/root-causes',
  'payroll-remediation/validating-results', 'payroll-risk-vs-payroll-error',
 ];
 assert.deepEqual(entries.filter(e=>e.path.startsWith('/blog/')).map(e=>e.path).sort(),
  expectedArticles.map(slug=>`/blog/${slug}`).sort());
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
