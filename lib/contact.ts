export const phoneCountries = [
  { code: "AU", label: "Australia", dial: "+61" },
  { code: "NZ", label: "New Zealand", dial: "+64" },
  { code: "GB", label: "United Kingdom", dial: "+44" },
  { code: "US", label: "United States", dial: "+1" },
  { code: "CA", label: "Canada", dial: "+1" },
  { code: "SG", label: "Singapore", dial: "+65" },
  { code: "IN", label: "India", dial: "+91" },
  { code: "OTHER", label: "Other (include country code)", dial: "" },
];

export type ContactData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  message: string;
  newsSignup: boolean;
};

export function validateContact(input: unknown): ContactData | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const fields = ["firstName", "lastName", "email", "company", "country", "phone", "message"] as const;
  const result = {} as ContactData;
  for (const field of fields) {
    const value = raw[field];
    if (typeof value !== "string" || !value.trim() || value.length > (field === "message" ? 5000 : 254)) return null;
    result[field] = value.trim();
  }
  if (/[\r\n]/.test(result.email + result.firstName + result.lastName) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) return null;
  const country = phoneCountries.find(c => c.code === result.country);
  if (!country || !/^[+\d\s().-]+$/.test(result.phone)) return null;
  const digits = result.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15 || (country.code === "OTHER" && !result.phone.startsWith("+"))) return null;
  if (typeof raw.newsSignup !== "boolean") return null;
  result.newsSignup = raw.newsSignup;
  return result;
}

export function contactEmail(data: ContactData) {
  const country = phoneCountries.find(c => c.code === data.country)!;
  const phone = data.phone.startsWith("+") ? data.phone : `${country.dial} ${data.phone.replace(/^0/, "")}`;
  return {
    to: ["rebeccasuzzanne90@gmail.com"],
    replyTo: data.email,
    subject: `Payroll Studio enquiry: ${data.firstName} ${data.lastName}`,
    text: `First name: ${data.firstName}\nLast name: ${data.lastName}\nEmail: ${data.email}\nCompany name: ${data.company}\nPhone country: ${country.label}\nPhone: ${phone}\nSign up for news and updates: ${data.newsSignup ? "Yes" : "No"}\n\nMessage:\n${data.message}`,
  };
}
