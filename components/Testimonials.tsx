import { supabase } from "@/lib/supabase";
import ReviewForm from "./ReviewForm";

export default async function Testimonials() {
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .limit(6);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {reviews?.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-7 border border-cream-dark flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-caramel text-base">★</span>
                ))}
              </div>
              <p className="font-body text-sm text-mocha/80 leading-relaxed flex-1">
                "{r.body}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-cream-dark">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-caramel to-mocha flex items-center justify-center text-foam font-display font-bold text-sm">
                  {r.author_name?.[0] ?? "?"}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-espresso">{r.author_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="font-mono text-xs text-caramel tracking-widest uppercase mb-3">
            — Share Your Experience
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-espresso">
            Leave a Review
          </h3>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-10 border border-cream-dark">
          <ReviewForm />
        </div>

      </div>
    </section>
  );
}