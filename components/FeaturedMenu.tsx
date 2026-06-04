import Image from "next/image";
import Link from "next/link";

const featured = [
  {
    name: "Single Origin Pour Over",
    origin: "Ethiopia Yirgacheffe",
    price: "₱180",
    description: "Bright, floral, and fruit-forward. Citrus notes with a clean finish.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    tag: "Signature",
  },
  {
    name: "Oat Milk Cappuccino",
    origin: "Colombia Huila",
    price: "₱165",
    description: "Silky microfoam over a rich double shot. Sweet and perfectly balanced.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    tag: "Best Seller",
  },
  {
    name: "Cold Brew Float",
    origin: "Guatemala Antigua",
    price: "₱195",
    description: "24-hour cold brew topped with housemade vanilla bean ice cream.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    tag: "Seasonal",
  },
  {
    name: "Almond Croissant",
    origin: "House-baked daily",
    price: "₱120",
    description: "Laminated with cultured butter, filled with almond frangipane.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    tag: "Pastry",
  },
];

export default function FeaturedMenu() {
  return (
    <section id="menu" className="bg-foam py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs text-caramel tracking-widest uppercase mb-3">
              — What We Brew
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
              Menu Highlights
            </h2>
          </div>
          <Link
            href="#full-menu"
            className="self-start md:self-auto font-body text-sm text-mocha underline underline-offset-4 decoration-caramel hover:text-caramel transition-colors"
          >
            See full menu →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item, i) => (
            <div
              key={item.name}
              className="group bg-white rounded-3xl overflow-hidden border border-cream-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-cream">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Tag */}
                <div className="absolute top-3 left-3 bg-espresso/80 text-foam font-mono text-[10px] px-3 py-1 rounded-full tracking-wider">
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-base font-bold text-espresso leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-mono text-sm font-medium text-caramel shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-mocha/60 tracking-wide mb-3 uppercase">
                  {item.origin}
                </p>
                <p className="font-body text-xs text-mocha/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
