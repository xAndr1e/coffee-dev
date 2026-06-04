import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    alt: "Latte art closeup",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
    alt: "Coffee beans",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80",
    alt: "Espresso shot",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",
    alt: "Café interior",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80",
    alt: "Croissants",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=600&q=80",
    alt: "Coffee and laptop",
    span: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
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
