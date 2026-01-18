import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function About() {
  const education = [
    "Pós-graduação em Fisioterapia Dermatofuncional",
    "Pós-graduação em Estética Avançada",
    "Pós-graduação em Terapia Ortomolecular",
    "Pós-graduação em Ozonioterapia e Terapias Pró-Oxidativas",
    "Pós-graduação em Fisiologia Clínica",
    "Pós-graduação em Acupuntura e Dor (em conclusão)",
    "Formação especializada em Harmonização Corporal",
    "Formação especializada em Lipedema",
    "Formação especializada em Tratamento de Diástase",
    "Formação especializada em Pós-operatórios",
    "Formação em Prescrição em Saúde Integrativa"
  ];

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title="Sobre a Dra. Flávia Abreu"
        description="Fisioterapeuta especializada em Dermatofuncional, Estética Avançada e Saúde Integrativa. Conheça a trajetória e formação da Dra. Flávia Abreu."
        canonical="/sobre"
      />
      <div className="container">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/flavia-profile-new.webp" 
                  alt="Dra. Flávia Abreu" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[url('/images/SUBMARCASEMFUNDO.webp')] bg-contain bg-no-repeat opacity-20 rotate-12" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Quem Sou</span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              Devolvendo autoestima, saúde e qualidade de vida.
            </h1>
            <div className="w-20 h-[2px] bg-secondary my-2" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Olá, sou Dra. Flávia Abreu. Natural de Guarulhos, São Paulo, e graduada em Fisioterapia pela Universidade São Marcos.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Escolhi ser fisioterapeuta porque adoro trabalhar com as mãos e ajudar pessoas. Mas não só na prevenção e reabilitação. Quero trabalhar na transformação. Na autoestima. No bem-estar completo.
            </p>
            <h3 className="font-serif text-2xl text-primary mt-4 mb-2">Minha História</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ao longo da minha trajetória, compreendi que nenhum corpo responde bem quando é tratado como igual a outro. Resultados reais não vêm de procedimentos isolados, mas de um olhar atento, de decisões bem fundamentadas e de um cuidado que considera função, saúde e estética como partes de um mesmo processo.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Por isso, hoje atuo de forma exclusiva e personalizada, acompanhando cada paciente de perto, com escuta ativa, técnica precisa e responsabilidade clínica. Mais do que tratar sintomas, meu trabalho é ajudar o corpo a voltar a funcionar melhor.
            </p>
            
            <div className="p-6 bg-[#F9F7F2] rounded-xl border-l-4 border-primary mt-4">
              <p className="font-serif text-xl italic text-foreground/80">
                "Não é sobre padrão de beleza. É sobre saúde, função e cuidado consciente."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Education Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Minha Formação</h2>
            <p className="text-muted-foreground">
              Uma trajetória de constante aprendizado para oferecer o melhor cuidado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {education.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/5 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Registro Profissional</p>
            <p className="font-serif text-2xl text-primary">Crefito 3 - 108.019-F</p>
          </div>
        </div>
      </div>
    </div>
  );
}
