/**
 * Seed the Contentful "About" page with entries matching existing content types.
 * Run with: node scripts/seed-about-page.mjs
 *
 * Previously created IDs (reused):
 *   heroBanner   : 4CGHZ7WOzJECtUR3bLTbPw
 *   textBlock    : 1VN15qRT1igkFyEyLb5mSI  (mission)
 *   featureCard 1: 3xzXvw98G4UnYued5INNV1  (Security First)
 *   featureCard 2: 75IyAlLuwlZCEC89XuOLK9  (Results Driven)
 *   featureCard 3: 1Q0kbfFdvVYDfESg06yi1c  (Expert Guidance)
 *   featureCard 4: wAP6KpQL7BGxZ48ODM4cH   (Partner Approach)
 *   triplex (bad): 2LV6ZyEXJGPRFZXtKAeh8C  → will be deleted
 */

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? "6d8gpvtx5ods";
const MGMT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
if (!MGMT_TOKEN) {
  console.error("❌ Set CONTENTFUL_MANAGEMENT_TOKEN in your .env.local before running this script.");
  process.exit(1);
}
const ENV = "master";
const BASE = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV}`;

const authHeaders = {
  Authorization: `Bearer ${MGMT_TOKEN}`,
};

const jsonHeaders = (contentTypeId) => ({
  ...authHeaders,
  "Content-Type": "application/vnd.contentful.management.v1+json",
  ...(contentTypeId ? { "X-Contentful-Content-Type": contentTypeId } : {}),
});

async function deleteEntry(entryId) {
  // must unpublish first (if published), then delete
  await fetch(`${BASE}/entries/${entryId}/published`, {
    method: "DELETE",
    headers: authHeaders,
  });
  const res = await fetch(`${BASE}/entries/${entryId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  if (!res.ok && res.status !== 404) {
    const err = await res.text();
    throw new Error(`Failed to delete ${entryId}: ${err}`);
  }
  console.log(`🗑  Deleted entry: ${entryId}`);
}

async function createEntry(contentTypeId, fields) {
  const res = await fetch(`${BASE}/entries`, {
    method: "POST",
    headers: jsonHeaders(contentTypeId),
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create ${contentTypeId}: ${err}`);
  }
  return res.json();
}

async function publishEntry(entryId, version) {
  const res = await fetch(`${BASE}/entries/${entryId}/published`, {
    method: "PUT",
    headers: { ...authHeaders, "X-Contentful-Version": String(version) },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to publish ${entryId}: ${err}`);
  }
  return res.json();
}

async function createAndPublish(contentTypeId, fields) {
  const entry = await createEntry(contentTypeId, fields);
  const published = await publishEntry(entry.sys.id, entry.sys.version);
  console.log(`✅  ${contentTypeId.padEnd(20)} ${entry.sys.id}`);
  return published;
}

const text  = (v) => ({ "en-US": v });
const links = (ids) => ({ "en-US": ids.map((id) => ({ sys: { type: "Link", linkType: "Entry", id } })) });
const link  = (id)  => ({ "en-US": { sys: { type: "Link", linkType: "Entry", id } } });

function richText(paragraphs) {
  return {
    "en-US": {
      nodeType: "document",
      data: {},
      content: paragraphs.map((p) => ({
        nodeType: "paragraph",
        data: {},
        content: [{ nodeType: "text", value: p, marks: [], data: {} }],
      })),
    },
  };
}

async function main() {
  console.log("🚀 Completing About page seed in Contentful…\n");

  // Clean up the bad triplex from the previous run
  await deleteEntry("2LV6ZyEXJGPRFZXtKAeh8C");

  // Reuse already-published IDs from previous run
  const heroId    = "4CGHZ7WOzJECtUR3bLTbPw";
  const missionId = "1VN15qRT1igkFyEyLb5mSI";
  const card1Id   = "3xzXvw98G4UnYued5INNV1"; // Security First
  const card2Id   = "75IyAlLuwlZCEC89XuOLK9"; // Results Driven
  const card3Id   = "1Q0kbfFdvVYDfESg06yi1c"; // Expert Guidance
  const card4Id   = "wAP6KpQL7BGxZ48ODM4cH";  // Partner Approach

  // Duplex 1: Security First + Results Driven
  const duplex1 = await createAndPublish("duplex", {
    internalName: text("About - Values Row 1"),
    eyebrow:      text("What We Believe"),
    heading:      text("Our Values"),
    items:        links([card1Id, card2Id]),
  });

  // Duplex 2: Expert Guidance + Partner Approach
  const duplex2 = await createAndPublish("duplex", {
    internalName: text("About - Values Row 2"),
    items:        links([card3Id, card4Id]),
  });

  // CTA — Work With Us
  const cta = await createAndPublish("cta", {
    internalName: text("About - Work With Us CTA"),
    label:        text("Work With Us"),
    url:          text("/contact"),
    variant:      text("primary"),
  });

  // Team text block
  const team = await createAndPublish("textBlock", {
    internalName: text("About - Team"),
    heading:      text("Our Team"),
    subheading:   text(
      "Led by Rob and Dawn Van Buskirk, our team of compliance experts brings decades of experience across healthcare, fintech, SaaS, and telecommunications."
    ),
    textAlign:    text("center"),
    ctas:         links([cta.sys.id]),
  });

  // Page entry
  const page = await createAndPublish("page", {
    internalName: text("About Page"),
    title:        text("About"),
    slug:         text("about"),
    hero:         link(heroId),
    sections:     links([missionId, duplex1.sys.id, duplex2.sys.id, team.sys.id]),
  });

  console.log(`\n🎉 Done! Page entry ID: ${page.sys.id}`);
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
