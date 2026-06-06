import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { error } from "console";

export default async function FeaturedMenu() {
  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("featured", true)
    .limit(4);

    console.log("items:", items);
    console.log("error:", error);

  return (
    <section id="menu" className="bg-foam py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs text-caramel tracking-widest uppercase mb-3">
              — What We Brew
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight">
              Menu Highlights
            </h2>
          </div>
          <Link href="#full-menu" className="self-start md:self-auto font-body text-sm text-mocha underline underline-offset-4 decoration-caramel hover:text-caramel transition-colors">
            See full menu →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items?.map((item) => (
            <div key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-cream-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-52 overflow-hidden bg-cream">
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                ) : (
                  <div className="w-full h-full bg-cream-dark flex items-center justify-center text-mocha/30 text-4xl">☕</div>
                )}
                <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-sm text-foam font-mono text-[10px] px-3 py-1 rounded-full tracking-wider capitalize">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-base font-bold text-espresso leading-snug">{item.name}</h3>
                  <span className="font-mono text-sm font-medium text-caramel shrink-0">₱{item.price}</span>
                </div>
                <p className="font-body text-xs text-mocha/70 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}