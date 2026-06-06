import Image from "next/image";
import { supabase } from "@/lib/supabase";



export default async function Gallery() {
  const {data: items, error} = await supabase
  .from("gallery_images") 
  .select("*") 
  .limit(12);

  const spanPatterns = [
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

  const images = items?.map((item, index) => ({
  src: item.url,
  alt: item.caption || "Coffee moment",
  span: spanPatterns[index % spanPatterns.length],
  })) || [];


  return (
    <section id="gallery" className="bg-espresso py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs text-caramel tracking-widest uppercase mb-3">
              — Visual Diary
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foam leading-tight">
              Life at Coffee.Dev
            </h2>
          </div>
          <p className="font-body text-sm text-foam/50 max-w-xs">
            Follow us on{" "}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-latte hover:text-caramel transition-colors underline underline-offset-2"
            >
              @coffee.dev
            </a>{" "}
            for daily shots and behind-the-bar moments.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`${img.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition-colors duration-300 flex items-end p-4">
                <span className="font-body text-sm text-foam opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
