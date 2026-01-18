import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Activity, HeartPulse, Droplets, Waves, Zap, Heart, ShieldCheck, Flame } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Treatments() {
  const treatments = [
    {
      title: "Harmonização Corporal",
      icon: Sparkles,
      desc: "Um conjunto de técnicas que equilibram e valorizam seu corpo. Reduz medidas, define contornos, melhora a pele. Resultados naturais, sem parecer 'feito'. Combinamos tecnologias avançadas com terapias manuais especializadas.",
      target: "Quem quer melhorar a silhueta, reduzir inchaços, definir formas com naturalidade.",
      image: "/images/treatment-harmonization-user.png"
    },
    {
      title: "Lipedema",
      icon: Activity,
      desc: "O lipedema causa dor, inchaço e desconforto. Técnicas exclusivas que aliviam dor, reduzem inchaço e melhoram a aparência. O foco é sua funcionalidade e bem-estar, não só a estética.",
      target: "Mulheres com diagnóstico ou suspeita de lipedema que buscam alívio e controle.",
      image: "/images/treatment-lipedema-user.png"
    },
    {
      title: "Diástase Abdominal",
      icon: HeartPulse,
      desc: "Diástase deixa o abdômen fraco e inchado, mas pode ser recuperado de verdade. Exercícios específicos, tecnologias avançadas e terapias manuais trabalham juntos para recuperar a função e a aparência.",
      target: "Mulheres no pós-parto ou qualquer pessoa com separação dos músculos abdominais.",
      image: "/images/treatment-diastasis-user.png"
    },
    {
      title: "Celulite",
      icon: Waves,
      desc: "Celulite é comum, mas tratável. Combinamos tecnologias que estimulam circulação com terapias que fortalecem os tecidos. A textura melhora, a pele fica mais firme e uniforme.",
      target: "Quem quer reduzir a aparência de celulite e ter uma pele mais uniforme.",
      image: "/images/treatment-cellulite-user.png"
    },
    {
      title: "Estrias",
      icon: Droplets,
      desc: "Estrias deixam marcas, mas podem ser significativamente reduzidas. Estimulamos a regeneração da pele com tecnologias que aumentam colágeno. A pele fica mais uniforme, hidratada e revitalizada.",
      target: "Quem tem estrias e quer melhorar a textura e aparência da pele.",
      image: "/images/treatment-stretch-marks-user.png"
    },
    {
      title: "Flacidez",
      icon: Zap,
      desc: "Hoje existem recursos que realmente transformam pele flácida em pele firme e jovem. Várias tecnologias trabalham para estimular colágeno e melhorar hidratação.",
      target: "Quem quer recuperar firmeza, elasticidade e aquele aspecto mais jovem.",
      image: "/images/treatment-flaccidity-gen.jpg"
    },
    {
      title: "Massagem Terapêutica",
      icon: Heart,
      desc: "Massagem que alivia dores, reduz tensões, melhora circulação e promove relaxamento profundo. Uma abordagem personalizada que restaura o equilíbrio do seu corpo.",
      target: "Quem carrega estresse no corpo, tem dores musculares ou simplesmente precisa se cuidar.",
      image: "/images/treatment-massage-gen.jpg"
    },
    {
      title: "Pós-Operatórios",
      icon: ShieldCheck,
      desc: "Acompanhamento especializado para garantir uma recuperação segura, funcional e com menos intercorrências. O cuidado no pós-operatório é essencial para o resultado final.",
      target: "Quem vai passar ou passou por cirurgias plásticas ou vasculares e precisa de reabilitação adequada.",
      image: "/images/treatment-post-op-gen.jpg"
    },
    {
      title: "Dor e Inflamação",
      icon: Flame,
      desc: "Tratamento focado no alívio da dor crônica ou aguda e redução de processos inflamatórios. Utilizamos recursos terapêuticos manuais e tecnológicos para devolver sua qualidade de vida e movimento sem dor.",
      target: "Pessoas com dores crônicas, lesões musculares, tendinites ou processos inflamatórios persistentes.",
      image: "/images/banner-pain-relief-gen.jpg"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title="Tratamentos de Fisioterapia e Estética"
        description="Conheça nossos tratamentos: Lipedema, Harmonização Corporal, Pós-Operatório, Dores, Flacidez e mais. Fisioterapia integrativa em Alphaville."
        canonical="/tratamentos"
      />
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Áreas de Cuidado</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Tratamentos
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Atuo no cuidado corporal integrativo, unindo fisioterapia dermatofuncional e estética com foco em saúde, função e bem-estar real.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {treatments.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <item.icon size={24} />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground">{item.title}</h2>
                </div>
                <div className="w-16 h-[2px] bg-primary/30" />
                
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">O que é</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Indicado para</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.target}</p>
                </div>

                <Link href="/contato">
                  <Button variant="outline" className="w-fit mt-4 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                    Agendar Avaliação
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
