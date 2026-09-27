export type ContactData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  message: string;
  newsSignup: boolean;
};

export function validateContact(input: unknown): ContactData | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const fields = ["firstName", "lastName", "email", "company", "role", "phone", "message"] as const;
  const result = {} as ContactData;
  for (const field of fields) {
    const required = ["firstName", "lastName", "email", "message"].includes(field);
    const value = raw[field] ?? (required ? undefined : "");
    if (typeof value !== "string" || (required && !value.trim()) || value.length > (field === "message" ? 5000 : field === "phone" ? 30 : 254)) return null;
    result[field] = value.trim();
  }
  if (/[\r\n]/.test(result.email + result.firstName + result.lastName) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) return null;
  // The untouched default country prefix is an omitted optional phone number.
  if (result.phone === "+61") result.phone = "";
  if (result.phone) {
    if (!/^\+?[\d\s().-]+$/.test(result.phone)) return null;
    const phone = result.phone.startsWith("+") ? result.phone : `+61 ${result.phone.replace(/^0/, "")}`;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) return null;
    result.phone = phone;
  }
  if (typeof raw.newsSignup !== "boolean") return null;
  result.newsSignup = raw.newsSignup;
  return result;
}

export function contactEmail(data: ContactData) {
  return {
    to: ["rebecca@thepayrollstudio.com.au"],
    replyTo: data.email,
    subject: `Payroll Studio enquiry: ${data.firstName} ${data.lastName}`,
    text: `First name: ${data.firstName}\nLast name: ${data.lastName}\nEmail: ${data.email}\nCompany name: ${data.company}\nRole: ${data.role || "Not provided"}\nPhone: ${data.phone || "Not provided"}\nSign up for news and updates: ${data.newsSignup ? "Yes" : "No"}\n\nMessage:\n${data.message}`,
  };
}
