import { Instagram } from "lucide-react";

export default function InstagramFeed() {
  const images = [
    { src: "/images/treatment-harmonization-user.webp", alt: "Harmonização Corporal" },
    { src: "/images/banner-pain-relief-gen.webp", alt: "Alívio da Dor" },
    { src: "/images/treatment-lipedema-user.webp", alt: "Tratamento de Lipedema" },
    { src: "/images/treatment-massage-gen.webp", alt: "Massagem Terapêutica" },
    { src: "/images/treatment-post-op-gen.webp", alt: "Pós-Operatório" },
    { src: "/images/treatment-flaccidity-gen.webp", alt: "Tratamento de Flacidez" },
  ];

  return (
    <section className="py-16 bg-white border-t border-primary/5">
      <div className="container">
        <div className="flex flex-col items-center mb-10 text-center">
          <a 
            href="https://instagram.com/draflaviaabreu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-2 group"
          >
            <Instagram size={24} />
            <span className="font-serif text-2xl">@draflaviaabreu</span>
          </a>
          <p className="text-muted-foreground text-sm tracking-wide uppercase">Acompanhe no Instagram</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((img, idx) => (
            <a 
              key={idx}
              href="https://instagram.com/draflaviaabreu"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer block"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100" size={32} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
