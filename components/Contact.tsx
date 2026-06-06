import { MapPin, Clock, Phone, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

const info = [
  {
    icon: MapPin,
    label: "Find Us",
    lines: ["123 Brew Street, BGC", "Taguig City, Metro Manila"],
  },
  {
    icon: Clock,
    label: "Hours",
    lines: ["Mon–Fri: 7:00am – 10:00pm", "Sat–Sun: 8:00am – 11:00pm"],
  },
  {
    icon: Phone,
    label: "Call",
    lines: ["+63 917 123 4567"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["hello@coffee.dev"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-cream py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="font-mono text-xs text-caramel tracking-widest uppercase mb-4">
              — Come Say Hi
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight mb-6">
              We'd Love to
              <br />
              <span className="italic">Brew One For You.</span>
            </h2>
            <p className="font-body text-base text-mocha/70 leading-relaxed mb-10">
              Whether you're stopping by for a quick espresso or setting up your
              laptop for a full day's work — you're always welcome here.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {info.map(({ icon: Icon, label, lines }) => (
                <div
                  key={label}
                  className="flex gap-4 items-start bg-foam rounded-2xl p-5 border border-cream-dark"
                >
                  <div className="w-9 h-9 bg-caramel/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-caramel" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-mocha/50 uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    {lines.map((line) => (
                      <p key={line} className="font-body text-sm text-espresso">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-espresso rounded-3xl p-8 lg:p-10">
            <h3 className="font-display text-2xl font-bold text-foam mb-2">
              Send us a message
            </h3>
            <p className="font-body text-sm text-foam/50 mb-8">
              Reservations, events, or just want to say hello.
            </p>
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}