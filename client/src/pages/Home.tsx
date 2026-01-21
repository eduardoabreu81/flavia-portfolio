import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const heroSlides = [
    {
      image: "/images/banner-pain-relief-gen.webp",
      title: "Dor e Inflamação",
      subtitle: "Tratamento para alívio da dor e recuperação funcional em Alphaville, Barueri e região."
    },
    {
      image: "/images/treatment-harmonization-user.webp",
      title: "Harmonização Corporal",
      subtitle: "Estratégias para melhora do contorno e qualidade do tecido, com foco em naturalidade e proporção."
    },
    {
      image: "/images/treatment-lipedema-user.webp",
      title: "Tratamento de Lipedema",
      subtitle: "Cuidado com manejo do tecido, controle de inflamação e orientação consciente."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Fisioterapia Integrativa e Estética em Alphaville"
        description="Dra. Flávia Abreu oferece tratamentos em Lipedema, Pós-Operatório, Dores e Estética Integrativa com atendimento domiciliar em Alphaville e Barueri."
        canonical="/"
      />

      {/* Hero Section with Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F9F7F2]">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            {heroSlides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-black/30 z-10" />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        <div className="container relative z-20 text-center text-white pt-20">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <span className="font-script text-4xl md:text-5xl text-primary-foreground block mb-4 drop-shadow-md">
              Dra. Flávia Abreu
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 drop-shadow-lg">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md mb-10">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full px-8 py-6 text-lg bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all border-none">
                Agendar Avaliação
              </Link>
              <Link href="/tratamentos" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full px-8 py-6 text-lg border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-all duration-300">
                Conhecer Tratamentos
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir para o slide ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
        
        <button onClick={prevSlide} aria-label="Slide anterior" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors hidden md:block">
          <ChevronLeft size={48} />
        </button>
        <button onClick={nextSlide} aria-label="Próximo slide" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors hidden md:block">
          <ChevronRight size={48} />
        </button>
      </section>

      {/* Philosophy Section - Updated Content */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Meu Compromisso</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Não é sobre padrão de beleza. <br/>
              É sobre <span className="italic text-secondary">saúde, função e cuidado consciente</span>.
            </h2>
            <div className="w-24 h-[1px] bg-primary/30 my-2" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Meu trabalho é cuidar do corpo de forma responsável, individualizada e consciente. 
              Aqui, cada atendimento é conduzido por mim, do início ao fim, respeitando a história, os limites e o tempo de cada pessoa.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium text-primary">
              Não trabalho com protocolos genéricos, promessas imediatistas ou padrões de beleza. 
              Meu compromisso é com processos bem indicados, escolhas claras e resultados possíveis — sempre com ética, escuta e critério técnico.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
              {[
                { icon: Star, title: "Diferenciais Reais", text: "Avaliação clínica antes de qualquer protocolo. Estética como consequência da função." },
                { icon: Heart, title: "Cuidado Integral", text: "Protocolos ajustados ao corpo, não ao pacote. Clareza e transparência em cada decisão." },
                { icon: Sparkles, title: "Ética e Presença", text: "Meu trabalho não é volume. É cuidado. Ética acima de tendências." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#F9F7F2] hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/10">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-sm mb-2">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-serif text-xl text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Preview - Updated Content */}
      <section className="py-24 bg-[#F5F2EB]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Áreas de Cuidado</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                Fisioterapia Dermatofuncional <br/>& Estética Integrativa
              </h2>
            </div>
            <Link href="/tratamentos" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-primary hover:text-primary/80 group text-lg p-0 h-auto">
              Ver todos os tratamentos <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Dor e Inflamação", 
                desc: "Tratamento direcionado à origem do problema, respeitando limites e devolvendo funcionalidade e conforto.", 
                img: "/images/banner-pain-relief-gen.webp" 
              },
              { 
                title: "Lipedema", 
                desc: "Cuidado com manejo do tecido, controle de inflamação e orientação consciente.", 
                img: "/images/treatment-lipedema-user.webp" 
              },
              { 
                title: "Harmonização Corporal", 
                desc: "Estratégias para melhora do contorno e qualidade do tecido, com foco em naturalidade e proporção.", 
                img: "/images/treatment-harmonization-user.webp" 
              },
              { 
                title: "Pós-Operatórios", 
                desc: "Acompanhamento para uma recuperação segura, funcional e com menos intercorrências.", 
                img: "/images/treatment-post-op-gen.webp" 
              },
              { 
                title: "Massagem Terapêutica", 
                desc: "Alívio de tensões, reorganização corporal e sensação real de bem-estar.", 
                img: "/images/treatment-massage-gen.webp" 
              },
              { 
                title: "Flacidez", 
                desc: "Tratamento de alterações de tecido com foco na saúde e função da pele.", 
                img: "/images/treatment-flaccidity-gen.webp" 
              }
            ].map((item, idx) => (
              <Link key={idx} href="/tratamentos" className="group relative aspect-[4/5] overflow-hidden rounded-xl block cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.desc}
                    </p>
                    <div className="w-12 h-[1px] bg-white/50 mt-4 group-hover:w-full transition-all duration-500" />
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/90 z-0">
          <div className="absolute inset-0 bg-[url('/images/PATTERNSEMFUNDO.webp')] opacity-10 bg-repeat mix-blend-overlay" />
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">
            Sua jornada de transformação <br/>começa com uma conversa.
          </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-light">
            Agende uma avaliação personalizada no conforto do seu lar em Alphaville, Barueri e região, e descubra o melhor da sua beleza natural.
          </p>
          <Link href="/contato" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary hover:bg-white/90 rounded-full px-10 py-8 text-xl shadow-2xl transition-transform hover:scale-105">
            Falar com Dra. Flávia
          </Link>
        </div>
      </section>
    </div>
  );
}
