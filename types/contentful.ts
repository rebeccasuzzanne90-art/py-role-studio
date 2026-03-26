import type { Entry, Asset, EntrySkeletonType } from "contentful";

// ─── Shared section-level style fields ──────────────────────────────
export interface SectionStyleFields {
  backgroundColor?: string;
  textColor?: string;
  paddingSize?: "small" | "medium" | "large";
  containerWidth?: "narrow" | "default" | "wide" | "full";
}

// ─── SEO ────────────────────────────────────────────────────────────
export interface SeoFields {
  internalName: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Asset;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  structuredDataType?: "WebPage" | "Article" | "Service" | "FAQPage" | "Organization" | "AboutPage" | "ContactPage";
  keywords?: string;
}

export interface SeoSkeleton extends EntrySkeletonType {
  contentTypeId: "seo";
  fields: SeoFields;
}

// ─── FAQ ────────────────────────────────────────────────────────────
export interface FaqItemFields {
  question: string;
  answer: unknown; // RichText
}

export interface FaqItemSkeleton extends EntrySkeletonType {
  contentTypeId: "faqItem";
  fields: FaqItemFields;
}

export interface FaqSectionFields extends SectionStyleFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  items: Entry<FaqItemSkeleton>[];
}

export interface FaqSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "faqSection";
  fields: FaqSectionFields;
}

// ─── Author ─────────────────────────────────────────────────────────
export interface AuthorFields {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  credentials?: string;
  photo?: Asset;
  linkedIn?: string;
  twitter?: string;
}

export interface AuthorSkeleton extends EntrySkeletonType {
  contentTypeId: "author";
  fields: AuthorFields;
}

// ─── Site Settings (global design tokens) ───────────────────────────
export interface SiteSettingsFields {
  siteName: string;
  logo?: Asset;
  logoDark?: Asset;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  fontHeading?: string;
  fontBody?: string;
  borderRadius?: "none" | "small" | "medium" | "large" | "full";
  footerText?: string;
  socialLinkedin?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialX?: string;
  socialYoutube?: string;
  defaultOgImage?: Asset;
  titleTemplate?: string;
  defaultMetaDescription?: string;
  aiCrawlerPolicy?: "allow-all" | "block-all" | "selective";
}

export interface SiteSettingsSkeleton extends EntrySkeletonType {
  contentTypeId: "siteSettings";
  fields: SiteSettingsFields;
}

// ─── Navigation ─────────────────────────────────────────────────────
export interface NavigationLinkFields {
  internalName: string;
  label: string;
  url: string;
  external?: boolean;
  children?: Entry<NavigationLinkSkeleton>[];
}

export interface NavigationLinkSkeleton extends EntrySkeletonType {
  contentTypeId: "navigationLink";
  fields: NavigationLinkFields;
}

export interface NavigationFields {
  internalName: string;
  logo?: Asset;
  links: Entry<NavigationLinkSkeleton>[];
  primaryCta?: Entry<CtaSkeleton>;
}

export interface NavigationSkeleton extends EntrySkeletonType {
  contentTypeId: "navigation";
  fields: NavigationFields;
}

// ─── CTA ────────────────────────────────────────────────────────────
export interface CtaFields {
  internalName: string;
  label: string;
  url: string;
  variant: "primary" | "secondary" | "tertiary";
}

export interface CtaSkeleton extends EntrySkeletonType {
  contentTypeId: "cta";
  fields: CtaFields;
}

// ─── Hero Banner ────────────────────────────────────────────────────
export interface HeroBannerFields {
  internalName: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  body?: string;
  searchPlaceholder?: string;
  backgroundImage?: Asset;
  primaryCta?: Entry<CtaSkeleton>;
  secondaryCta?: Entry<CtaSkeleton>;
  textColor?: string;
  buttonColor?: string;
}

export interface HeroBannerSkeleton extends EntrySkeletonType {
  contentTypeId: "heroBanner";
  fields: HeroBannerFields;
}

// ─── Feature Card ───────────────────────────────────────────────────
export interface FeatureCardFields {
  internalName: string;
  title: string;
  description?: string;
  image?: Asset;
  cta?: Entry<CtaSkeleton>;
}

export interface FeatureCardSkeleton extends EntrySkeletonType {
  contentTypeId: "featureCard";
  fields: FeatureCardFields;
}

// ─── Duplex / Triplex ───────────────────────────────────────────────
export interface DuplexFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  items: Entry<FeatureCardSkeleton>[];
}

export interface DuplexSkeleton extends EntrySkeletonType {
  contentTypeId: "duplex";
  fields: DuplexFields;
}

export interface TriplexFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  items: Entry<FeatureCardSkeleton>[];
}

export interface TriplexSkeleton extends EntrySkeletonType {
  contentTypeId: "triplex";
  fields: TriplexFields;
}

// ─── Stat Item & Stats Section ──────────────────────────────────────
export interface StatItemFields {
  internalName: string;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface StatItemSkeleton extends EntrySkeletonType {
  contentTypeId: "statItem";
  fields: StatItemFields;
}

export interface StatsSectionFields extends SectionStyleFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  stats: Entry<StatItemSkeleton>[];
}

export interface StatsSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "statsSection";
  fields: StatsSectionFields;
}

// ─── Testimonial & Testimonial Section ──────────────────────────────
export interface TestimonialFields {
  internalName: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  companyLogo?: Asset;
  authorPhoto?: Asset;
  rating?: number;
}

export interface TestimonialSkeleton extends EntrySkeletonType {
  contentTypeId: "testimonial";
  fields: TestimonialFields;
}

export interface TestimonialSectionFields extends SectionStyleFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  testimonials: Entry<TestimonialSkeleton>[];
}

export interface TestimonialSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "testimonialSection";
  fields: TestimonialSectionFields;
}

// ─── Trust Logo Strip ───────────────────────────────────────────────
export interface TrustLogoStripFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  logos: Asset[];
  backgroundColor?: string;
  paddingSize?: "small" | "medium" | "large";
}

export interface TrustLogoStripSkeleton extends EntrySkeletonType {
  contentTypeId: "trustLogoStrip";
  fields: TrustLogoStripFields;
}

// ─── Service & Services Section ─────────────────────────────────────
export interface ServiceFields {
  internalName: string;
  title: string;
  slug: string;
  category?: string;
  tagline?: string;
  iconName?: string;
  shortDescription: string;
  body?: unknown;
  featuredImage?: Asset;
  features?: string;
  seo?: Entry<SeoSkeleton>;
}

export interface ServiceSkeleton extends EntrySkeletonType {
  contentTypeId: "service";
  fields: ServiceFields;
}

export interface ServicesSectionFields extends SectionStyleFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  services: Entry<ServiceSkeleton>[];
  columns?: "2" | "3" | "4";
  displayMode?: "grid" | "cards";
}

export interface ServicesSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "servicesSection";
  fields: ServicesSectionFields;
}

// ─── Text Block ─────────────────────────────────────────────────────
export interface TextBlockFields extends SectionStyleFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: unknown;
  ctas?: Entry<CtaSkeleton>[];
  image?: Asset;
  imagePosition?: "left" | "right" | "top" | "bottom" | "background";
  textAlign?: "left" | "center" | "right";
}

export interface TextBlockSkeleton extends EntrySkeletonType {
  contentTypeId: "textBlock";
  fields: TextBlockFields;
}

// ─── Newsletter Section ─────────────────────────────────────────────
export interface NewsletterSectionFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  backgroundColor?: string;
  paddingSize?: "small" | "medium" | "large";
}

export interface NewsletterSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "newsletterSection";
  fields: NewsletterSectionFields;
}

// ─── Article & Article Slider ───────────────────────────────────────
export interface ArticleFields {
  internalName: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  body?: unknown;
  image?: Asset;
  publishDate?: string;
  author?: Entry<AuthorSkeleton>;
  summary?: string;
  keyTakeaways?: string;
  seo?: Entry<SeoSkeleton>;
}

export interface ArticleSkeleton extends EntrySkeletonType {
  contentTypeId: "article";
  fields: ArticleFields;
}

export interface ArticleSliderFields {
  internalName: string;
  heading?: string;
  articles: Entry<ArticleSkeleton>[];
}

export interface ArticleSliderSkeleton extends EntrySkeletonType {
  contentTypeId: "articleSlider";
  fields: ArticleSliderFields;
}

// ─── Accordion Section ──────────────────────────────────────────────
export interface AccordionSectionFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  quote?: string;
  items: Entry<FaqItemSkeleton>[];
  ctas?: Entry<CtaSkeleton>[];
  layout?: "split" | "stacked";
  displayMode?: "accordion" | "numberedList";
  showWaveDivider?: boolean;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  paddingSize?: "small" | "medium" | "large";
}

export interface AccordionSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "accordionSection";
  fields: AccordionSectionFields;
}

// ─── Page ───────────────────────────────────────────────────────────
export type SectionEntry =
  | Entry<DuplexSkeleton>
  | Entry<TriplexSkeleton>
  | Entry<CtaSkeleton>
  | Entry<ArticleSliderSkeleton>
  | Entry<StatsSectionSkeleton>
  | Entry<TestimonialSectionSkeleton>
  | Entry<TrustLogoStripSkeleton>
  | Entry<ServicesSectionSkeleton>
  | Entry<TextBlockSkeleton>
  | Entry<NewsletterSectionSkeleton>
  | Entry<FaqSectionSkeleton>
  | Entry<AccordionSectionSkeleton>;

export interface PageFields {
  internalName: string;
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  navigation?: Entry<NavigationSkeleton>;
  hero?: Entry<HeroBannerSkeleton>;
  sections?: SectionEntry[];
  seo?: Entry<SeoSkeleton>;
}

export interface PageSkeleton extends EntrySkeletonType {
  contentTypeId: "page";
  fields: PageFields;
}
