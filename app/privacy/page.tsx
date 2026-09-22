import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How The Payroll Studio website handles enquiries and website analytics.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Website privacy</h1>
      <h2 className="text-2xl font-semibold">Enquiries</h2>
      <p>When you submit our contact form, we use the contact details and message you provide to receive and respond to your enquiry. Our website uses Resend to deliver enquiry notification emails.</p>
      <h2 className="text-2xl font-semibold">Website analytics</h2>
      <p>We use Google Analytics to understand website visits, pages viewed and successful enquiry submissions. Google Analytics uses cookies and similar identifiers to measure website activity. Our enquiry tracking event does not include your name, email address, phone number or message.</p>
      <p>Learn <a className="underline" href="https://policies.google.com/technologies/partner-sites">how Google uses information from websites that use its services</a>. You can manage cookies in your browser or use the <a className="underline" href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out browser add-on</a>.</p>
      <h2 className="text-2xl font-semibold">Questions</h2>
      <p>For questions about information you have provided through this website, please <a className="underline" href="/contact">contact us</a>.</p>
    </article>
  );
}
