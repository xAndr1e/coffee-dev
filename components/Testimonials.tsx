const reviews = [
  {
    name: "Mikael Santos",
    handle: "@mikael_builds",
    stars: 5,
    text: "Best remote work spot in BGC. The pour over is consistently exceptional, and the WiFi never drops. I've written more code here than anywhere else.",
  },
  {
    name: "Clara Reyes",
    handle: "@claradesigns",
    stars: 5,
    text: "The almond croissant alone is worth the trip. Perfectly laminated, fragrant, not overly sweet. Pair it with the oat latte and you're set for the morning.",
  },
  {
    name: "Jed Villanueva",
    handle: "@jed.v",
    stars: 5,
    text: "Super cozy vibes, never too loud. The team actually knows their coffee — they walked me through the bean origins and I ended up learning so much.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-foam py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-caramel tracking-widest uppercase mb-3">
            — What People Say
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            Loved by Coffee Nerds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="bg-white rounded-3xl p-7 border border-cream-dark flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-caramel text-base">★</span>
                ))}
              </div>
              <p className="font-body text-sm text-mocha/80 leading-relaxed flex-1">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-cream-dark">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-caramel to-mocha flex items-center justify-center text-foam font-display font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-espresso">
                    {r.name}
                  </p>
                  <p className="font-mono text-[10px] text-mocha/40">
                    {r.handle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
