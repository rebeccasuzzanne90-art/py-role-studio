// Plain TypeScript types for the MDX-based content system.
// No Contentful SDK dependencies.

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImagePath?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  structuredDataType?:
    | "WebPage"
    | "Article"
    | "Service"
    | "FAQPage"
    | "Organization"
    | "AboutPage"
    | "ContactPage";
  keywords?: string;
}

export interface CtaData {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "tertiary";
}

export interface HeroData {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  body?: string;
  primaryCta?: CtaData;
  secondaryCta?: CtaData;
  backgroundImagePath?: string;
  textColor?: string;
  layout?: "default" | "split";
}

// ─── Shared style fields ────────────────────────────────────────────
interface SectionStyleData {
  backgroundColor?: string;
  textColor?: string;
  paddingSize?: "small" | "medium" | "large";
  containerWidth?: "narrow" | "default" | "wide" | "full";
}

// ─── Section types ──────────────────────────────────────────────────
export interface FaqItemData {
  question: string;
  answer: string;
}

export interface AccordionSectionData extends SectionStyleData {
  _type: "accordionSection";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  quote?: string;
  items: FaqItemData[];
  ctas?: CtaData[];
  layout?: "split" | "stacked";
  displayMode?: "accordion" | "numberedList";
  showWaveDivider?: boolean;
  accentColor?: string;
}

export interface ServiceCardData {
  slug: string;
  title: string;
  tagline?: string;
  shortDescription: string;
  category?: string;
  iconName?: string;
}

export interface ServicesSectionData extends SectionStyleData {
  _type: "servicesSection";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  services: ServiceCardData[];
  columns?: "2" | "3" | "4";
  displayMode?: "grid" | "cards";
}

export interface TextBlockSectionData extends SectionStyleData {
  _type: "textBlock";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: string;
  ctas?: CtaData[];
  imageUrl?: string;
  imagePosition?: "left" | "right" | "top" | "bottom" | "background";
  textAlign?: "left" | "center" | "right";
}

export interface FeatureCardData {
  title: string;
  description?: string;
  imageUrl?: string;
  cta?: CtaData;
}

export interface DuplexSectionData {
  _type: "duplex";
  eyebrow?: string;
  heading?: string;
  items: FeatureCardData[];
  variant?: "default" | "boxed";
  backgroundColor?: string;
  textColor?: string;
}

export interface TriplexSectionData {
  _type: "triplex";
  eyebrow?: string;
  heading?: string;
  items: FeatureCardData[];
}

export interface StatItemData {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsSectionData extends SectionStyleData {
  _type: "statsSection";
  eyebrow?: string;
  heading?: string;
  stats: StatItemData[];
}

export interface TestimonialData {
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  rating?: number;
}

export interface TestimonialSectionData extends SectionStyleData {
  _type: "testimonialSection";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  testimonials: TestimonialData[];
}

export interface TrustLogoData {
  name: string;
  imageUrl?: string;
}

export interface TrustLogoStripData {
  _type: "trustLogoStrip";
  eyebrow?: string;
  heading?: string;
  logos: TrustLogoData[];
  backgroundColor?: string;
  paddingSize?: "small" | "medium" | "large";
}

export interface NewsletterSectionData {
  _type: "newsletterSection";
  eyebrow?: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  backgroundColor?: string;
  paddingSize?: "small" | "medium" | "large";
}

export interface ArticleCardData {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  imagePath?: string;
}

export interface ArticleSliderData {
  _type: "articleSlider";
  heading?: string;
  articles: ArticleCardData[];
}

export interface CtaSectionData {
  _type: "cta";
  label: string;
  href: string;
  variant: "primary" | "secondary" | "tertiary";
}

export interface FaqSectionData extends SectionStyleData {
  _type: "faqSection";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  items: FaqItemData[];
}

export type SectionData =
  | AccordionSectionData
  | ServicesSectionData
  | TextBlockSectionData
  | DuplexSectionData
  | TriplexSectionData
  | StatsSectionData
  | TestimonialSectionData
  | TrustLogoStripData
  | NewsletterSectionData
  | ArticleSliderData
  | CtaSectionData
  | FaqSectionData;

// ─── Page ───────────────────────────────────────────────────────────
export interface PageData {
  title: string;
  slug: string;
  hero?: HeroData;
  sections?: SectionData[];
  seo?: SeoData;
}

// ─── Blog ───────────────────────────────────────────────────────────
export interface AuthorData {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface ArticleData {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishDate?: string;
  imagePath?: string;
  author?: AuthorData;
  seo?: SeoData;
  body?: string; // MDX source
}

// ─── Navigation ─────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  children?: NavLink[];
}

export interface NavData {
  logoPath?: string;
  logoAlt?: string;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

// ─── Site Settings ──────────────────────────────────────────────────
export interface SiteSettingsData {
  siteName: string;
  logoPath?: string;
  logoDarkPath?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  fontHeading?: string;
  fontBody?: string;
  borderRadius?: string;
  footerText?: string;
  socialLinkedin?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialX?: string;
  socialYoutube?: string;
  defaultMetaDescription?: string;
  titleTemplate?: string;
}
