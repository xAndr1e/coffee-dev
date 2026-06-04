import Image from "next/image";

const stats = [
  { value: "226", label: "Google Reviews" },
  { value: "4.9", label: "Average Rating" },
  { value: "12+", label: "Bean Origins" },
  { value: "3+", label: "Years Brewing" },
];

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-72 rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80"
                  alt="Coffee shop interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-72 rounded-3xl overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"
                  alt="Barista making coffee"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="lg:pl-8">
            <p className="font-mono text-xs text-caramel tracking-widest uppercase mb-4">
              — About Coffee.Dev
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight mb-6">
              A Café Built for
              <br />
              <span className="italic text-mocha">Deep Work & Good Taste.</span>
            </h2>
            <p className="font-body text-base text-mocha/80 leading-relaxed mb-5">
              Coffee.Dev started as a small passion project in 2022 — a space where specialty coffee meets a developer-friendly environment. We source our beans directly from farms in Ethiopia, Colombia, and Guatemala, roasting them fresh weekly.
            </p>
            <p className="font-body text-base text-mocha/80 leading-relaxed mb-10">
              Beyond great coffee, we believe a café can be a place of focus and community. Fast fiber WiFi, long communal tables, and zero judgment about how many refills you've had.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-foam rounded-2xl p-5 border border-cream-dark"
                >
                  <div className="font-display text-3xl font-bold text-caramel mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-mocha/60 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
