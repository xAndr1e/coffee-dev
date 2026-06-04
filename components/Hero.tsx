import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-espresso grain-overlay">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
          alt="Coffee shop atmosphere"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-caramel/20 border border-caramel/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
            <span className="font-mono text-xs text-latte tracking-widest uppercase">
              Now Open · Mon–Sun 7am–10pm
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-foam leading-[1.05] mb-6 animate-fade-up">
            Brewed Fresh,
            <br />
            <span className="text-latte italic">Served Warm.</span>
          </h1>

          <p
            className="font-body text-lg text-foam/70 leading-relaxed mb-10 max-w-lg animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Coffee.Dev is a specialty café built for makers, builders, and
            dreamers. Exceptional single-origin coffee, house-baked pastries,
            and blazing fast WiFi — your second home.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="#menu"
              className="bg-foam text-espresso font-body font-semibold px-8 py-3.5 rounded-full hover:bg-cream transition-colors duration-200 text-sm tracking-wide"
            >
              View Menu
            </Link>
            <Link
              href="#about"
              className="border border-foam/40 text-foam font-body font-medium px-8 py-3.5 rounded-full hover:bg-foam/10 transition-colors duration-200 text-sm tracking-wide"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Floating stats */}
        <div
          className="absolute bottom-12 right-6 lg:right-10 hidden lg:flex flex-col gap-3 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { value: "12+", label: "Origin Beans" },
            { value: "4.9★", label: "500+ Reviews" },
            { value: "Since '22", label: "Est. Coffee.Dev" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-foam/10 backdrop-blur-sm border border-foam/15 rounded-2xl px-5 py-3 text-right"
            >
              <div className="font-display text-xl font-bold text-latte">
                {stat.value}
              </div>
              <div className="font-body text-xs text-foam/50 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-foam/30" />
        <span className="font-mono text-[10px] text-foam/40 tracking-widest uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
