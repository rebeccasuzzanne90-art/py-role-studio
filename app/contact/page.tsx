import Script from "next/script";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Ready to start your compliance journey? Get in touch for a free risk
            review.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      thepayrollstudio@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Australia (Remote-first)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HubSpot form */}
            <div className="lg:col-span-2">
              <Script
                src="https://js-ap1.hsforms.net/forms/embed/442998450.js"
                strategy="lazyOnload"
              />
              <div
                className="hs-form-frame"
                data-region="ap1"
                data-form-id="b8475605-26c1-402b-9976-047a89532d6a"
                data-portal-id="442998450"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
